import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { LegalNotice } from "@/components/LegalNotice";

export const metadata: Metadata = { title: "Allgemeine Geschäftsbedingungen" };

export default function TermsPage() {
  const c = site.company;
  return (
    <div className="container page narrow prose">
      <h1 className="h1">Allgemeine Geschäftsbedingungen</h1>
      <LegalNotice />

      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese AGB gelten für alle Bestellungen, die Verbraucher und Unternehmer über den Online-Shop von{" "}
        {c.legalName}, {c.street}, {c.city} (nachfolgend „Nodotempo“) abschließen.
      </p>

      <h2>§ 2 Vertragsschluss</h2>
      <p>
        Die Darstellung der Produkte im Shop stellt kein rechtlich bindendes Angebot dar. Durch Klicken auf den Button
        „Bezahlen“ im Bezahlvorgang gibst du eine verbindliche Bestellung ab. Der Vertrag kommt zustande, wenn wir die
        Bestellung per E-Mail bestätigen oder die Ware versenden. Der Vertragstext wird von uns gespeichert und dir mit
        der Bestellbestätigung zugesandt. Vertragssprache ist Deutsch.
      </p>

      <h2>§ 3 Preise und Versandkosten</h2>
      <p>
        Alle Preise sind Endpreise in Euro inklusive der gesetzlichen Mehrwertsteuer. Zusätzlich anfallende
        Versandkosten werden im Bestellprozess angezeigt; siehe auch{" "}
        <Link href="/versand-rueckgabe">Versand & Rückgabe</Link>.
      </p>

      <h2>§ 4 Zahlung</h2>
      <p>
        Die Zahlung erfolgt wahlweise per Kreditkarte, Apple Pay, Google Pay, PayPal oder Klarna. Die Abwicklung
        übernimmt der Zahlungsdienstleister Stripe. Bei Zahlung über Klarna gelten ergänzend deren
        Nutzungsbedingungen.
      </p>

      <h2>§ 5 Lieferung</h2>
      <p>
        Die Lieferung erfolgt an die angegebene Lieferadresse in die im Bestellprozess genannten Länder. Lieferzeiten
        sind auf der Seite <Link href="/versand-rueckgabe">Versand & Rückgabe</Link> angegeben.
      </p>

      <h2>§ 6 Eigentumsvorbehalt</h2>
      <p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>

      <h2>§ 7 Widerrufsrecht</h2>
      <p>
        Verbrauchern steht ein gesetzliches Widerrufsrecht zu, siehe <Link href="/widerruf">Widerrufsbelehrung</Link>.
        Darüber hinaus gewähren wir eine freiwillige Rückgabefrist von {site.returnDays} Tagen.
      </p>

      <h2>§ 8 Gewährleistung</h2>
      <p>Es gelten die gesetzlichen Mängelhaftungsrechte.</p>

      <h2>§ 9 Schlussbestimmungen</h2>
      <p>
        Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Bei Verbrauchern gilt
        diese Rechtswahl nur, soweit dadurch nicht zwingende Verbraucherschutzvorschriften des Aufenthaltsstaates
        entzogen werden.
      </p>
    </div>
  );
}
