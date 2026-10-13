# heilmasseur-domenic.at

Website von Domenic (Heilmasseur, Wien). Next.js 16 (App Router), gehostet auf Vercel.

## Wo die Inhalte liegen

- **Texte und Bilder** stehen direkt im Code: Texte im JSX der Seiten und Komponenten, Bilder unter `public/images/`. Domenic ändert sie über das **Pixelheld-Portal**. Dafür braucht jedes sichtbare Textelement ein eindeutiges, statisches `data-edit-id`.
- **Sanity** ist kein CMS mehr. Es dient nur noch als Gutschein-Datenbank: Der Stripe-Webhook legt gekaufte Gutscheine dort an, eingelöst werden sie im Studio unter `/studio`. Die alten Content-Dokumente liegen dort und in `content-backup/` nur noch als Archiv und wirken nicht auf die Live-Seite.
- **Preise der Blockkarten** stehen in `lib/blockOptions.ts`.

## Branches

- `main` → Produktion (heilmasseur-domenic.at). Das Portal arbeitet auf `main`.
- `preview` → Staging (domenic-snowy.vercel.app). Branch nicht löschen.

Ablauf: Arbeit nach `preview` pushen, dort prüfen, dann PR `preview → main`.

Details und Regeln für Agenten stehen in [AGENTS.md](AGENTS.md).

## Lokal starten

```bash
npm install
npm run dev
```

Der Build muss auch ohne Stripe-, Resend- und Sanity-Variablen durchlaufen.
