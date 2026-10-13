import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Impressum | Heilmasseur Domenic Hacker",
  description: "Impressum und rechtliche Informationen von Heilmasseur Domenic Hacker, Wien 1080.",
  alternates: {
    canonical: "https://heilmasseur-domenic.at/impressum",
  },
};

export default function Impressum() {
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

        <h1 data-edit-id="impressum-title" className="text-4xl font-extrabold text-[#111] mb-8">
          Impressum
        </h1>

        <div className="prose prose-gray max-w-none space-y-6 text-[#333] leading-relaxed">
          <section>
            <h2 data-edit-id="impressum-angaben-title" className="text-xl font-bold text-[#111] mt-8 mb-3">
              Angaben gemäß § 5 ECG / § 25 MedienG
            </h2>
            <p>
              <strong data-edit-id="impressum-name">Domenic Hacker</strong>
              <br />
              <span data-edit-id="impressum-angaben-beruf">Diplomierter medizinischer Masseur und Heilmasseur</span>
              <br />
              <span data-edit-id="impressum-strasse">Feldgasse 3/20</span>
              <br />
              <span data-edit-id="impressum-ort">1080 Wien, Österreich</span>
              <br />
              <span data-edit-id="impressum-gegenstand">Unternehmensgegenstand: Heilmassage und Massage</span>
            </p>
          </section>

          <section>
            <h2 data-edit-id="impressum-kontakt-title" className="text-xl font-bold text-[#111] mt-8 mb-3">
              Kontakt
            </h2>
            <p>
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
            <h2 data-edit-id="impressum-beruf-title" className="text-xl font-bold text-[#111] mt-8 mb-3">
              Berufsbezeichnung
            </h2>
            <p>
              <span data-edit-id="impressum-beruf-text">Diplomierter medizinischer Masseur und Heilmasseur</span>
              <br />
              <span data-edit-id="impressum-beruf-land">Berufsbezeichnung verliehen in: Österreich</span>
              <br />
              <span data-edit-id="impressum-gewerbe">Gewerbe: Massage, ausgenommen ganzheitlich in sich geschlossene Systeme (GISA-Zahl 38211751)</span>
            </p>
          </section>

          <section>
            <h2 data-edit-id="impressum-behoerde-title" className="text-xl font-bold text-[#111] mt-8 mb-3">
              Zuständige Aufsichtsbehörde
            </h2>
            <p>
              <span data-edit-id="impressum-behoerde-text">Heilmasseur (freiberuflich): Magistrat der Stadt Wien</span>
              <br />
              <span data-edit-id="impressum-gewerbebehoerde">Gewerbebehörde: Magistratisches Bezirksamt für den 1. und 8. Bezirk</span>
            </p>
          </section>

          <section>
            <h2 data-edit-id="impressum-kammer-title" className="text-xl font-bold text-[#111] mt-8 mb-3">
              Kammerzugehörigkeit
            </h2>
            <p>
              <span data-edit-id="impressum-kammer-text">Wirtschaftskammer Wien (WKO)</span>
              <br />
              <span data-edit-id="impressum-kammer-fachgruppe">Landesinnung Wien der Fußpfleger, Kosmetiker und Masseure</span>
            </p>
          </section>

          <section>
            <h2 data-edit-id="impressum-recht-title" className="text-xl font-bold text-[#111] mt-8 mb-3">
              Anwendbare Rechtsvorschriften
            </h2>
            <p>
              <span data-edit-id="impressum-recht-mmhmg">Medizinischer Masseur- und Heilmasseurgesetz (MMHmG)</span>
              <br />
              <span data-edit-id="impressum-recht-gewo">Gewerbeordnung (GewO)</span>
              <br />
              Zugänglich unter:{" "}
              <a
                href="https://www.ris.bka.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0d4f4f] hover:underline"
              >
                ris.bka.gv.at
              </a>
            </p>
          </section>

          <section>
            <h2 data-edit-id="impressum-haftung-title" className="text-xl font-bold text-[#111] mt-8 mb-3">
              Haftungsausschluss
            </h2>
            <p data-edit-id="impressum-haftung-text">
              Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              kann jedoch keine Gewähr übernommen werden.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
