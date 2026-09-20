// editkit/edit-kit.tsx — pixelheld EditKit
// Aktiv nur im Editier-Modus (in der Vercel Sandbox). Liefert Hover- und
// Auswahl-Highlight und meldet das angeklickte Element an den Portal-Editor.
"use client";

import { useEffect } from "react";

function cssPath(element: Element): string {
  const parts: string[] = [];
  let current: Element | null = element;
  while (current && current.tagName !== "HTML" && parts.length < 8) {
    const tag = current.tagName.toLowerCase();
    const parent: Element | null = current.parentElement;
    if (!parent) break;
    const siblings = Array.from(parent.children).filter((c) => c.tagName === current!.tagName);
    parts.unshift(siblings.length > 1 ? `${tag}:nth-of-type(${siblings.indexOf(current) + 1})` : tag);
    current = parent;
  }
  return parts.join(" > ");
}

export function EditKit() {
  useEffect(() => {
    if ((process.env.NEXT_PUBLIC_PIXELHELD_EDIT_MODE ?? process.env.NEXT_PUBLIC_PIXELMEISTER_EDIT_MODE) !== "1") return;

    // Portal-Origin per Handshake bestimmen (robust gegen localhost vs.
    // 127.0.0.1 vs. Preview-URL): Der Editor schickt nach dem Laden eine
    // "init"-Nachricht; deren origin merken wir uns als Ziel aller künftigen
    // postMessages. Fallback auf die Env-Variable, falls (noch) kein Handshake.
    let portalOrigin: string | null =
      (process.env.NEXT_PUBLIC_PIXELHELD_PORTAL_ORIGIN ?? process.env.NEXT_PUBLIC_PIXELMEISTER_PORTAL_ORIGIN) ?? null;

    // Both first-party portals can open the same persistent sandbox.
    const allowedPortalOrigins = new Set([
      "https://pixelheld.at", "https://preview.pixelheld.at",
      ...(portalOrigin ? [portalOrigin] : []),
    ]);
    let connectedOrigin: string | null = null;

    let messageSource = process.env.NEXT_PUBLIC_PIXELHELD_EDIT_MODE === "1"
      ? "pixelheld-editkit" : "pixelmeister-editkit";

    const hover = document.createElement("div");
    hover.style.cssText =
      "position:fixed;pointer-events:none;border:2px dashed #6366f1;border-radius:6px;z-index:2147483646;transition:all .06s ease;display:none;box-sizing:border-box";
    document.body.appendChild(hover);

    const selectionBox = document.createElement("div");
    selectionBox.style.cssText =
      "position:fixed;pointer-events:none;border:2px solid #6366f1;border-radius:6px;z-index:2147483647;display:none;box-sizing:border-box;box-shadow:0 0 0 9999px rgba(99,102,241,0.07)";
    document.body.appendChild(selectionBox);

    const label = document.createElement("div");
    label.style.cssText =
      "position:fixed;pointer-events:none;z-index:2147483647;background:#6366f1;color:#fff;font:600 11px/1.4 system-ui,sans-serif;padding:2px 8px;border-radius:6px;display:none;white-space:nowrap;transform:translateY(-100%)";
    document.body.appendChild(label);

    const originalCursor = document.body.style.cursor;
    let mode = "select";
    document.body.style.cursor = "crosshair";

    function reportPageContext(requestId?: string) {
      const visible = (el: Element) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && getComputedStyle(el).visibility !== "hidden"; };
      const headings = Array.from(document.querySelectorAll("h1,h2,h3")).filter(visible).slice(0, 8);
      const center = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
      const section = center?.closest("section, article") ?? headings[0]?.closest("section, article, main, header, footer") ?? center?.closest("main, header, footer");
      post("page-context", { requestId, page: {
        path: location.pathname,
        title: document.title.slice(0, 200),
        viewport: { width: innerWidth, height: innerHeight }, scrollY: window.scrollY,
        section: section ? { id: section.getAttribute("data-edit-id") ?? section.id, heading: (section.querySelector("h1,h2,h3")?.textContent ?? "").trim().slice(0, 200) } : undefined,
        visibleHeadings: headings.map(el => (el.textContent ?? "").trim().slice(0, 200)),
      } });
    }

    function reportLocation() {
      if (!portalOrigin) return;
      const url = new URL(window.location.href);
      url.searchParams.delete("pm_token");
      url.searchParams.delete("v");
      window.parent.postMessage({ source: messageSource, type: "location-changed",
        payload: { path: url.pathname + url.search + url.hash } }, portalOrigin);
    }
    let lastLocation = window.location.href;
    const locationTimer = window.setInterval(() => {
      if (lastLocation === window.location.href) return;
      lastLocation = window.location.href;
      saving = false;
      cancelText();
      selectedEl = null;
      refreshSelection();
      reportLocation();
    }, 200);
    let selectedEl: Element | null = null;
    let editing: { element: HTMLElement; previousText: string; editId: string; editable: string | null; cursor: string } | null = null;
    let textLocked = false;
    let saving = false;

    function post(type: string, payload?: unknown) {
      if (portalOrigin) window.parent.postMessage({ source: messageSource, type, payload }, portalOrigin);
    }

    // Text-Overlay: Direkt gespeicherte Texte sind sofort committet, der Vorschau-
    // Build läuft aber gebündelt im Hintergrund. Bis er fertig ist, liefert der
    // Server noch den alten Text aus. Das Overlay setzt die gespeicherten Texte
    // nach Seitenwechsel oder Re-Render wieder ein, damit nie der alte Stand
    // aufblitzt. Der Editor leert es, sobald der Build den Stand enthält.
    const overlayKey = "pixelheld-text-overlay";
    // Nur ein Editor, der das Overlay auch wieder leert, darf es benutzen. Ältere
    // Editoren (z. B. Produktion, während Staging schon neuer ist) teilen sich
    // dieselbe Sandbox und würden es sonst für immer stehen lassen.
    let overlayEnabled = false;
    function readOverlay(): Record<string, string> {
      try {
        const parsed: unknown = JSON.parse(sessionStorage.getItem(overlayKey) ?? "{}");
        return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed as Record<string, string> : {};
      } catch { return {}; }
    }
    function writeOverlay(next: Record<string, string>) {
      try {
        if (Object.keys(next).length === 0) sessionStorage.removeItem(overlayKey);
        else sessionStorage.setItem(overlayKey, JSON.stringify(next));
      } catch { /* Speicher gesperrt (z. B. Privatmodus): Overlay ist nur Komfort. */ }
    }
    function applyOverlay() {
      if (!overlayEnabled) return;
      const overlay = readOverlay();
      for (const [id, text] of Object.entries(overlay)) {
        if (typeof text !== "string" || editing?.editId === id) continue;
        const nodes = Array.from(document.querySelectorAll("[data-edit-id]")).filter(node => node.getAttribute("data-edit-id") === id);
        if (nodes.length !== 1) continue;
        const el = nodes[0];
        // Nur reine Textelemente anfassen und nur schreiben, wenn es wirklich abweicht
        // (sonst würde der MutationObserver sich selbst auslösen).
        if (el.children.length === 0 && el.textContent !== text) el.textContent = text;
      }
    }
    let overlayTimer: ReturnType<typeof setTimeout> | null = null;
    const overlayObserver = new MutationObserver(() => {
      if (overlayTimer) return;
      overlayTimer = setTimeout(() => { overlayTimer = null; applyOverlay(); }, 50);
    });
    function editableText(el: Element): el is HTMLElement {
      const id = el.getAttribute("data-edit-id");
      return el instanceof HTMLElement && /^(H[1-6]|P|BUTTON|A|SPAN|LABEL|LI|DT|DD|BLOCKQUOTE|TD|TH|FIGCAPTION|STRONG|EM|SMALL)$/.test(el.tagName) &&
        !!id && /^[a-zA-Z0-9_.:-]{1,120}$/.test(id) && el.children.length === 0 &&
        !el.isContentEditable && (el.textContent?.length ?? 0) <= 5000 &&
        Array.from(document.querySelectorAll("[data-edit-id]")).filter(node => node.getAttribute("data-edit-id") === id).length === 1;
    }
    // Wechsel ohne Enter: Klickt der Kunde während einer Bearbeitung woandershin,
    // wird der aktuelle Text gespeichert. `pendingNext` merkt sich, was danach
    // passieren soll, falls die Bestätigung des Editors noch aussteht.
    let pendingNext: { element: Element; action: "edit" | "select" } | null = null;
    // Grund, warum ein Element nur über den Chat (KI) änderbar ist. Der Editor zeigt
    // dazu einen Hinweis, statt den Doppelklick stumm zu ignorieren.
    function directTextReason(el: Element): "image" | "mixed" | "other" {
      if (el.matches("img, picture, svg, video, canvas") || el.closest("svg")) return "image";
      const hasOwnText = Array.from(el.childNodes).some(node => node.nodeType === Node.TEXT_NODE && (node.textContent ?? "").trim());
      if (hasOwnText && el.children.length > 0) return "mixed";
      return "other";
    }
    // Der Hinweis gehört dorthin, wo der Kunde gerade hinschaut: ans Element.
    function flagAiOnly(el: Element) {
      const reason = directTextReason(el);
      selectedEl = el;
      label.textContent = reason === "image" ? "Bild · Änderung im Chat beschreiben" : "Nur über den Chat änderbar";
      refreshSelection();
      post("direct-text-unavailable", { reason });
    }
    function restoreEditable() {
      if (!editing) return;
      editing.element.style.cursor = editing.cursor;
      if (editing.editable === null) editing.element.removeAttribute("contenteditable");
      else editing.element.setAttribute("contenteditable", editing.editable);
    }
    function cancelText() {
      if (!editing || saving) return;
      editing.element.textContent = editing.previousText;
      restoreEditable();
      editing = null;
      post("text-edit-ended");
      refreshSelection();
    }
    function startText(el: Element | null) {
      if (saving || editing || !el || !editableText(el)) return;
      if (textLocked) { post("text-edit-error", { message: "Bitte warte, bis die laufende Änderung fertig ist. Danach kannst du den Text bearbeiten." }); return; }
      editing = { element: el, previousText: el.textContent ?? "", editId: el.getAttribute("data-edit-id")!, editable: el.getAttribute("contenteditable"), cursor: el.style.cursor };
      el.style.cursor = "text";
      el.setAttribute("contenteditable", "plaintext-only");
      selectedEl = el;
      hover.style.display = "none";
      label.textContent = "Text bearbeiten";
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      post("text-edit-started", { editId: editing.editId });
      refreshSelection();
    }
    function submitText() {
      if (!editing || saving) return;
      const text = (editing.element.textContent ?? "").replace(/\s+/g, " ").trim();
      if (text === editing.previousText.replace(/\s+/g, " ").trim()) { cancelText(); return; }
      if (!text || text.length > 5000) { post("text-edit-error", { message: "Bitte einen Text mit 1 bis 5.000 Zeichen eingeben." }); return; }
      saving = true;
      editing.element.setAttribute("contenteditable", "false");
      post("text-edit-submit", { editId: editing.editId, previousText: editing.previousText, text });
    }
    /** Speichert (oder verwirft bei unverändertem Text) die laufende Bearbeitung.
     *  true = Bearbeitung ist sofort beendet, false = wartet auf den Editor oder ist ungültig. */
    function finishEditing(): boolean {
      if (!editing) return true;
      if (!saving) submitText();
      return !editing;
    }
    function runPendingNext() {
      const next = pendingNext;
      pendingNext = null;
      if (!next || !next.element.isConnected || editing) return;
      if (next.action === "edit") startText(next.element);
      else selectElement(next.element);
    }
    function onDoubleClick(event: MouseEvent) {
      if (mode !== "select") return;
      const el = targetFor(event);
      if (editing) {
        if (!el || editing.element.contains(el)) return; // Wort markieren im eigenen Text
        event.preventDefault();
        event.stopPropagation();
        if (!editableText(el)) { if (finishEditing()) flagAiOnly(el); return; }
        if (finishEditing()) startText(el);
        else if (saving) pendingNext = { element: el, action: "edit" };
        return;
      }
      if (!el) return;
      event.preventDefault();
      event.stopPropagation();
      if (!editableText(el)) { flagAiOnly(el); return; }
      pendingNext = null;
      startText(el);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (!editing || event.isComposing) return;
      if (event.key === "Escape" || event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        if (event.key === "Escape") cancelText();
        else if (!event.isComposing) submitText();
      }
    }
    // Chrome klappt <details> beim Loslassen der Leertaste um, auch wenn gerade in
    // der Frage getippt wird.
    function onKeyUp(event: KeyboardEvent) {
      if (editing && event.key === " " && editing.element.closest("summary")) event.preventDefault();
    }
    function onPaste(event: ClipboardEvent) {
      if (!editing || saving || !editing.element.contains(event.target as Node)) return;
      event.preventDefault();
      const text = event.clipboardData?.getData("text/plain").replace(/\s+/g, " ") ?? "";
      // insertText preserves the browser's native undo history and inserts no HTML.
      document.execCommand("insertText", false, text);
    }
    function onBeforeUnload(event: BeforeUnloadEvent) {
      if (!editing) return;
      event.preventDefault();
      event.returnValue = "";
    }

    function targetFor(event: MouseEvent): Element | null {
      const el = event.target as Element | null;
      if (!el || el === document.body || el === document.documentElement) return null;
      return el;
    }

    function place(box: HTMLElement, rect: DOMRect) {
      box.style.display = "block";
      box.style.top = `${rect.top - 2}px`;
      box.style.left = `${rect.left - 2}px`;
      box.style.width = `${rect.width}px`;
      box.style.height = `${rect.height}px`;
    }

    function refreshSelection() {
      if (!selectedEl || !selectedEl.isConnected) {
        selectionBox.style.display = "none";
        label.style.display = "none";
        return;
      }
      const rect = selectedEl.getBoundingClientRect();
      place(selectionBox, rect);
      label.style.display = "block";
      label.style.top = `${rect.top - 4}px`;
      label.style.left = `${rect.left - 2}px`;
    }

    function onMove(event: MouseEvent) {
      if (mode !== "select") return;
      const el = targetFor(event);
      if (!el) return void (hover.style.display = "none");
      place(hover, el.getBoundingClientRect());
    }

    function onClick(event: MouseEvent) {
      if (mode !== "select") return;
      if (editing) {
        if (editing.element.contains(event.target as Node) && !saving) {
          if (editing.element.matches("a, button")) event.preventDefault();
          event.stopPropagation(); return;
        }
        // Klick außerhalb: aktuellen Text speichern und das angeklickte Element wählen.
        event.preventDefault(); event.stopPropagation();
        const outside = targetFor(event);
        if (finishEditing()) { if (outside) selectElement(outside); }
        else if (saving && outside && pendingNext?.action !== "edit") pendingNext = { element: outside, action: "select" };
        return;
      }
      const el = targetFor(event);
      if (!el) return;
      event.preventDefault();
      // Zugeklappte Akkordeons und Menüs (aria-expanded="false") dürfen ihren eigenen
      // Klick-Handler behalten, sonst sind die Texte darin nie erreichbar. Nur zum
      // Öffnen: Ist der Bereich offen, wird der Klick wie sonst abgefangen.
      if (!el.closest("[aria-expanded='false']")) event.stopPropagation();
      selectElement(el);
    }

    function selectElement(el: Element) {
      // Eingeklappte Bereiche (FAQ): Im Auswahlmodus ist der Klick auf die Frage
      // unterdrückt, die Antwort wäre sonst nie erreichbar. Nur öffnen, nie schließen,
      // damit ein Doppelklick auf die Frage nicht auf- und wieder zuklappt.
      const details = el.closest("summary")?.parentElement;
      if (details instanceof HTMLDetailsElement && !details.open) details.open = true;
      selectedEl = el;
      const editId = el.getAttribute("data-edit-id");
      label.textContent = editId ?? el.tagName.toLowerCase();
      refreshSelection();
      hover.style.display = "none";
      if (portalOrigin) {
        window.parent.postMessage(
          {
            source: messageSource,
            type: "element-selected",
            payload: {
              directText: editableText(el),
              domPath: cssPath(el),
              editId,
              text: (el.textContent ?? "").slice(0, 500),
              outerHtml: el.outerHTML.slice(0, 2000),
            },
          },
          portalOrigin,
        );
      }
    }

    function onPortalMessage(event: MessageEvent) {
      if (event.source !== window.parent) return;
      if (!allowedPortalOrigins.has(event.origin)) return;
      if (connectedOrigin && event.origin !== connectedOrigin) return;
      const data = event.data;
      if (!["pixelheld-editor", "pixelmeister-editor"].includes(data?.source)) return;
      if (data.type === "init") {
        connectedOrigin = event.origin;
        portalOrigin = event.origin;
        messageSource = data.source === "pixelheld-editor" ? "pixelheld-editkit" : "pixelmeister-editkit";
        // Der Legacy-Handshake kommt zuerst und ohne Payload; nur der neue Editor schaltet frei.
        if (data.payload?.textOverlay === true) { overlayEnabled = true; applyOverlay(); }
        else if (data.source === "pixelheld-editor") { overlayEnabled = false; writeOverlay({}); }
        window.parent.postMessage({ source: messageSource, type: "capabilities", payload: { navigation: true, directText: true, textOverlay: true } }, portalOrigin);
        reportLocation();
      } else if (data.type === "get-page-context") {
        reportPageContext(data.payload?.requestId);
      } else if (data.type === "set-text-locked") {
        textLocked = data.payload?.locked === true;
      } else if (data.type === "edit-text") {
        startText(selectedEl);
      } else if (data.type === "save-text") {
        submitText();
      } else if (data.type === "cancel-text") {
        cancelText();
      } else if (data.type === "text-save-result" && editing) {
        saving = false;
        if (data.payload?.ok) {
          if (overlayEnabled) writeOverlay({ ...readOverlay(), [editing.editId]: editing.element.textContent ?? "" });
          restoreEditable(); editing = null; post("text-edit-ended");
          runPendingNext();
        } else {
          pendingNext = null;
          editing.element.setAttribute("contenteditable", "plaintext-only");
          editing.element.focus();
          post("text-edit-error", { message: data.payload?.message ?? "Text konnte nicht gespeichert werden." });
        }
      } else if (data.type === "clear-text-overlay") {
        // Der Vorschau-Build enthält jetzt alle gespeicherten Texte.
        writeOverlay({});
      } else if (data.type === "restore-text" && typeof data.payload?.editId === "string" && typeof data.payload?.text === "string") {
        // Eine Textänderung aus der Warteschlange ist gescheitert: alten Text zurücksetzen.
        const overlay = readOverlay();
        delete overlay[data.payload.editId];
        writeOverlay(overlay);
        const nodes = Array.from(document.querySelectorAll("[data-edit-id]")).filter(node => node.getAttribute("data-edit-id") === data.payload.editId);
        if (nodes.length === 1 && nodes[0].children.length === 0 && editing?.editId !== data.payload.editId) nodes[0].textContent = data.payload.text;
      } else if (data.type === "set-mode" && ["select", "navigate"].includes(data.payload?.mode)) {
        mode = data.payload.mode;
        selectedEl = null;
        hover.style.display = "none";
        document.body.style.cursor = mode === "select" ? "crosshair" : originalCursor;
        refreshSelection();
      } else if (data.type === "clear-selection") {
        selectedEl = null;
        refreshSelection();
      }
    }

    function onScrollResize() {
      refreshSelection();
      hover.style.display = "none";
    }

    document.addEventListener("input", refreshSelection, true);
    document.addEventListener("dblclick", onDoubleClick, true);
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("keyup", onKeyUp, true);
    document.addEventListener("paste", onPaste, true);
    window.addEventListener("beforeunload", onBeforeUnload);
    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    window.addEventListener("message", onPortalMessage);
    window.addEventListener("scroll", onScrollResize, true);
    window.addEventListener("resize", onScrollResize);
    overlayObserver.observe(document.body, { childList: true, subtree: true, characterData: true });

    // Inhaltsloser Ready-Ping → der Editor antwortet mit "init" (Handshake).
    window.parent.postMessage({ source: messageSource, type: "ready" }, "*");

    return () => {
      saving = false;
      cancelText();
      document.removeEventListener("input", refreshSelection, true);
      document.removeEventListener("dblclick", onDoubleClick, true);
      document.removeEventListener("keyup", onKeyUp, true);
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("paste", onPaste, true);
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("message", onPortalMessage);
      window.removeEventListener("scroll", onScrollResize, true);
      window.removeEventListener("resize", onScrollResize);
      overlayObserver.disconnect();
      if (overlayTimer) clearTimeout(overlayTimer);
      hover.remove();
      selectionBox.remove();
      label.remove();
      window.clearInterval(locationTimer);
      document.body.style.cursor = originalCursor;
    };
  }, []);

  return null;
}
