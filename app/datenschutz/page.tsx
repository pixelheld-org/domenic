import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Heilmasseur Domenic Hacker",
  description:
    "Datenschutzerklärung und Informationen zur Datenverarbeitung auf heilmasseur-domenic.at.",
  alternates: {
    canonical: "https://heilmasseur-domenic.at/datenschutz",
  },
};

export default function Datenschutz() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-5 sm:px-8 py-16 sm:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d4f4f] hover:underline mb-8"
        >
          <ArrowLeft size={16} />
          Zurück zur Startseite
        </Link>

        <h1 data-edit-id="datenschutz-title" className="text-4xl font-extrabold text-[#111] mb-8">
          Datenschutzerklärung
        </h1>

        <div className="prose prose-gray max-w-none space-y-6 text-[#333] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              1. Verantwortlicher
            </h2>
            <p>
              Verantwortlicher im Sinne der DSGVO:
            </p>
            <p>
              <strong>Domenic Hacker</strong>
              <br />
              Diplomierter medizinischer Masseur und Heilmasseur
              <br />
              Feldgasse 3/20
              <br />
              1080 Wien, Österreich
              <br />
              <br />
              Telefon:{" "}
              <a
                href="tel:+436701895256"
                className="text-[#0d4f4f] hover:underline"
              >
                +43 670 189 52 56
              </a>
              <br />
              E-Mail:{" "}
              <a
                href="mailto:praxis@heilmasseur-domenic.at"
                className="text-[#0d4f4f] hover:underline"
              >
                praxis@heilmasseur-domenic.at
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              2. Erhobene Daten und Verarbeitungszwecke
            </h2>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              2.1 Website-Nutzungsdaten
            </h3>
            <p>
              Beim Besuch unserer Website werden automatisch technische Daten
              erhoben (IP-Adresse, Browsertyp, Betriebssystem, Referrer-URL,
              Zugriffszeitpunkt). Diese werden für den technischen Betrieb der
              Website benötigt.
              <br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
              (berechtigte Interessen).
            </p>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              2.2 Terminbuchung
            </h3>
            <p>
              Für die Online-Terminbuchung nutzen wir den Dienst Calendly. Bei
              der Buchung werden Ihr Name, Ihre E-Mail-Adresse und ggf.
              Telefonnummer an Calendly übermittelt. Calendly verarbeitet diese
              Daten in unserem Auftrag.
              <br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
              (Vertragsanbahnung).
            </p>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              2.3 Kontaktaufnahme
            </h3>
            <p>
              Bei Kontaktaufnahme per E-Mail oder Telefon werden Ihre Angaben
              zur Bearbeitung der Anfrage und für mögliche Anschlussfragen
              gespeichert.
              <br />
              <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO
              (berechtigte Interessen).
            </p>

            <h3 data-edit-id="datenschutz-gutschein-title" className="text-lg font-semibold text-[#111] mt-6 mb-2">
              2.4 Gutscheinkauf
            </h3>
            <p data-edit-id="datenschutz-gutschein-text">
              Wenn Sie online einen Gutschein oder eine Block-Karte kaufen, verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse, optional den Namen der beschenkten Person sowie die Bestelldaten (Produkt, Betrag, Gutscheincode, Kaufdatum). Wir benötigen diese Daten, um die Zahlung abzuwickeln, den Gutschein auszustellen, Ihnen die Bestätigung per E-Mail zu senden und den Gutschein später einzulösen. Die Zahlungsdaten selbst (z. B. Kartennummer) gibt Stripe nicht an uns weiter.
            </p>
            <p className="mt-1">
              <strong>Rechtsgrundlage:</strong>{" "}
              <span data-edit-id="datenschutz-gutschein-basis">Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 6 Abs. 1 lit. c DSGVO (steuerrechtliche Aufbewahrungspflichten).</span>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              3. Verwendete Dienste
            </h2>

            <h3 className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Hosting (Vercel)
            </h3>
            <p data-edit-id="datenschutz-hosting-text">
              Diese Website wird bei Vercel Inc. (440 N Barranca Avenue #4133, Covina, CA 91723, USA) gehostet. Bei jedem Zugriff werden automatisch Server-Logfiles gespeichert. Vercel verarbeitet Daten auch in den USA. Vercel ist nach dem EU-US Data Privacy Framework zertifiziert, ergänzend gelten die EU-Standardvertragsklauseln.
            </p>

            <h3 data-edit-id="datenschutz-vercel-analytics-title" className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Vercel Web Analytics
            </h3>
            <p data-edit-id="datenschutz-vercel-analytics-text">
              Wir nutzen Vercel Web Analytics, um zu sehen, welche Seiten aufgerufen werden. Der Dienst setzt keine Cookies und erstellt keine Profile. Besucher werden nur über einen Hash erkannt, der täglich verworfen wird. Wir sehen ausschließlich zusammengefasste Zahlen.
            </p>
            <p className="mt-1">
              <strong>Rechtsgrundlage:</strong>{" "}
              <span data-edit-id="datenschutz-vercel-analytics-basis">Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer funktionierenden, verbesserten Website).</span>
            </p>
            <h3 data-edit-id="datenschutz-ga-title" className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Google Analytics
            </h3>
            <p data-edit-id="datenschutz-ga-text">
              Wenn Sie im Cookie-Banner der Kategorie „Analyse & Verbesserung“ zustimmen, laden wir Google Analytics 4 der Google Ireland Limited (Gordon House, Barrow Street, Dublin 4, Irland), die die Daten in unserem Auftrag verarbeitet. Vorher wird keine Verbindung zu Google aufgebaut. Google Analytics setzt Cookies und wertet Ihre Nutzung der Website aus, die IP-Adresse wird dabei gekürzt. Daten können auch an Google LLC in den USA übermittelt werden. Google ist nach dem EU-US Data Privacy Framework zertifiziert. Ihre Einwilligung können Sie jederzeit über „Cookie-Einstellungen“ im Footer widerrufen.
            </p>
            <p className="mt-1">
              <strong>Rechtsgrundlage:</strong>{" "}
              <span data-edit-id="datenschutz-ga-basis">Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).</span>
            </p>
            <h3 data-edit-id="datenschutz-fonts-title" className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Schriftarten
            </h3>
            <p data-edit-id="datenschutz-fonts-text">
              Die Schriftart dieser Website wird von unserem eigenen Server ausgeliefert. Beim Laden der Seite wird keine Verbindung zu Google Fonts oder anderen Schrift-Anbietern aufgebaut.
            </p>
            <h3 data-edit-id="datenschutz-calendly-title" className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Calendly
            </h3>
            <p data-edit-id="datenschutz-calendly-text">
              Für die Terminbuchung wird Calendly eingebunden. Beim Laden des Buchungsformulars werden Daten an Calendly, LLC (USA) übermittelt. Calendly ist nach dem EU-US Data Privacy Framework zertifiziert, ergänzend gelten die EU-Standardvertragsklauseln.
            </p>
            <h3 data-edit-id="datenschutz-google-reviews-title" className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Google-Bewertungen
            </h3>
            <p data-edit-id="datenschutz-google-reviews-text">
              Zur Darstellung unserer Google-Bewertungen ruft unser Server die Bewertungen über die Google Places API ab. Ihr Browser stellt dabei keine Verbindung zu Google her, es werden keine Daten der Website-Besucher an Google übermittelt. Profilbilder der Bewertenden zeigen wir nicht an.
            </p>
            <h3 data-edit-id="datenschutz-stripe-title" className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Stripe
            </h3>
            <p data-edit-id="datenschutz-stripe-text">
              Online-Zahlungen für Gutscheine und Block-Karten wickeln wir über Stripe ab (Stripe Payments Europe, Limited, Dublin, Irland). Erst wenn Sie auf der Gutschein-Seite zum Bezahlschritt kommen, wird das Zahlungsformular von Stripe geladen. Stripe verarbeitet dann Ihre Zahlungsdaten, Name, E-Mail-Adresse, IP-Adresse und Geräteinformationen und setzt Cookies, die für die sichere Zahlung und zur Betrugsvorbeugung nötig sind. Für die Zahlungsabwicklung handelt Stripe in unserem Auftrag, für Betrugsvorbeugung und gesetzliche Pflichten (z. B. Geldwäscheprävention) als eigenständig Verantwortlicher. Stripe kann Daten auch an Stripe-Gesellschaften in den USA übermitteln, auf Basis des EU-US Data Privacy Framework und der EU-Standardvertragsklauseln. Details: stripe.com/at/privacy.
            </p>
            <p className="mt-1">
              <strong>Rechtsgrundlage:</strong>{" "}
              <span data-edit-id="datenschutz-stripe-basis">Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) und Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherer Zahlungsabwicklung).</span>
            </p>
            <h3 data-edit-id="datenschutz-sanity-title" className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Sanity
            </h3>
            <p data-edit-id="datenschutz-sanity-text">
              Gekaufte Gutscheine speichern wir bei Sanity (Sanity US Inc., 351 California Street, Suite 650, San Francisco, CA 94104, USA), damit wir sie verwalten und einlösen können. Gespeichert werden die unter 2.4 genannten Bestelldaten. Sanity verarbeitet die Daten in unserem Auftrag auf Servern von Google Cloud in Belgien und teilweise in den USA. Die Übermittlung in die USA erfolgt auf Basis der EU-Standardvertragsklauseln.
            </p>
            <p className="mt-1">
              <strong>Rechtsgrundlage:</strong>{" "}
              <span data-edit-id="datenschutz-sanity-basis">Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</span>
            </p>
            <h3 data-edit-id="datenschutz-resend-title" className="text-lg font-semibold text-[#111] mt-6 mb-2">
              Resend
            </h3>
            <p data-edit-id="datenschutz-resend-text">
              Die Bestätigungs-E-Mail mit Ihrem Gutschein versenden wir über Resend (Plus Five Five, Inc., USA). Dafür werden Ihr Name, Ihre E-Mail-Adresse und der Inhalt der Bestätigung an Resend übermittelt und in den USA gespeichert. Resend ist nach dem EU-US Data Privacy Framework zertifiziert, ergänzend gelten die EU-Standardvertragsklauseln.
            </p>
            <p className="mt-1">
              <strong>Rechtsgrundlage:</strong>{" "}
              <span data-edit-id="datenschutz-resend-basis">Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</span>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              4. Cookies
            </h2>
            <p data-edit-id="datenschutz-cookies-text">
              Diese Website verwendet Cookies. Technisch notwendige Cookies werden ohne Einwilligung gesetzt. Dazu gehören das Cookie, in dem wir Ihre Cookie-Auswahl speichern, die Cookies von Calendly auf der Buchungsseite und die Cookies von Stripe im Bezahlschritt der Gutschein-Seite. Analyse-Cookies von Google Analytics werden nur mit Ihrer Einwilligung über den Cookie-Banner gesetzt. Ihre Auswahl können Sie jederzeit über den Link „Cookie-Einstellungen“ im Footer ändern.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              5. Speicherdauer
            </h2>
            <p>
              Wir speichern personenbezogene Daten nur so lange, wie es für die
              jeweiligen Zwecke erforderlich ist oder gesetzliche
              Aufbewahrungspflichten bestehen:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>Terminbuchungsdaten: 1 Jahr nach dem Termin</li>
              <li>Kontaktanfragen: 2 Jahre nach Abschluss der Korrespondenz</li>
              <li>
                Buchhaltungsrelevante Daten: 7 Jahre gemäß österreichischem
                Steuerrecht
              </li>
              <li>Technische Log-Daten: maximal 30 Tage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              6. Ihre Rechte
            </h2>
            <p>
              Sie haben gemäß DSGVO folgende Rechte gegenüber dem
              Verantwortlichen:
            </p>
            <ul className="list-disc pl-6 mt-2">
              <li>
                <strong>Auskunftsrecht</strong> (Art. 15 DSGVO)
              </li>
              <li>
                <strong>Berichtigungsrecht</strong> (Art. 16 DSGVO)
              </li>
              <li>
                <strong>Löschungsrecht</strong> (Art. 17 DSGVO)
              </li>
              <li>
                <strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)
              </li>
              <li>
                <strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)
              </li>
              <li>
                <strong>Widerspruchsrecht</strong> (Art. 21 DSGVO)
              </li>
              <li>
                <strong>Widerrufsrecht</strong> (Art. 7 Abs. 3 DSGVO)
              </li>
            </ul>
            <p className="mt-4">
              Zur Ausübung dieser Rechte wenden Sie sich bitte an:{" "}
              <a
                href="mailto:praxis@heilmasseur-domenic.at"
                className="text-[#0d4f4f] hover:underline"
              >
                praxis@heilmasseur-domenic.at
              </a>
            </p>
            <p className="mt-4">
              Sie haben außerdem das Recht, sich bei der zuständigen
              Datenschutzbehörde zu beschweren:
            </p>
            <p className="mt-2">
              <strong>Österreichische Datenschutzbehörde</strong>
              <br />
              Barichgasse 40–42
              <br />
              1030 Wien
              <br />
              E-Mail: dsb@dsb.gv.at
              <br />
              Website:{" "}
              <a
                href="https://www.dsb.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0d4f4f] hover:underline"
              >
                www.dsb.gv.at
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              7. Datensicherheit
            </h2>
            <p>
              Wir setzen technische und organisatorische Sicherheitsmaßnahmen
              ein, um Ihre Daten gegen Manipulationen, Verlust, Zerstörung oder
              unbefugten Zugriff zu schützen. Alle Datenübertragungen erfolgen
              verschlüsselt (TLS/HTTPS).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#111] mt-8 mb-3">
              8. Aktualität und Änderungen
            </h2>
            <p>
              Diese Datenschutzerklärung wurde zuletzt am 12.10.2026
              aktualisiert. Wir behalten uns vor, diese Datenschutzerklärung
              anzupassen, damit sie stets den aktuellen rechtlichen
              Anforderungen entspricht.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
