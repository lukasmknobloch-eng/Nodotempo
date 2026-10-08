import type { Metadata } from "next";
import Link from "next/link";
import { ChevronIcon } from "@/components/Icons";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Häufige Fragen" };

const faqs: { group: string; items: { q: string; a: React.ReactNode }[] }[] = [
  {
    group: "Bestellung & Zahlung",
    items: [
      {
        q: "Welche Zahlungsarten bietet ihr an?",
        a: "Du kannst mit Kreditkarte (Visa, Mastercard, American Express), Apple Pay, Google Pay, PayPal und Klarna (Rechnung, Ratenkauf oder Sofort) bezahlen. Die Zahlung wird verschlüsselt über unseren Zahlungsdienstleister Stripe abgewickelt.",
      },
      {
        q: "Brauche ich ein Kundenkonto?",
        a: "Nein. Du bestellst bequem als Gast und erhältst deine Bestellbestätigung per E-Mail.",
      },
      {
        q: "Kann ich einen Rabattcode einlösen?",
        a: "Ja. Im Bezahlschritt findest du das Feld „Rabattcode hinzufügen“.",
      },
      {
        q: "Kann ich meine Bestellung noch ändern?",
        a: (
          <>
            Schreib uns so schnell wie möglich über das <Link href="/kontakt">Kontaktformular</Link>. Solange deine
            Bestellung noch nicht versendet wurde, passen wir sie gerne an.
          </>
        ),
      },
    ],
  },
  {
    group: "Versand & Rückgabe",
    items: [
      {
        q: "Wie lange dauert der Versand?",
        a: `Innerhalb Deutschlands ${site.shipping.standard.minDays}–${site.shipping.standard.maxDays} Werktage mit Standardversand, ${site.shipping.express.minDays}–${site.shipping.express.maxDays} Werktage mit Express.`,
      },
      {
        q: "Was kostet der Versand?",
        a: `Standardversand kostet ${formatPrice(site.shipping.standard.amount)} und ist ab einem Bestellwert von ${formatPrice(site.shipping.freeFrom)} kostenlos. Express kostet ${formatPrice(site.shipping.express.amount)}.`,
      },
      {
        q: "Wie funktioniert eine Rückgabe?",
        a: (
          <>
            Du hast {site.returnDays} Tage Zeit. Alle Details findest du unter{" "}
            <Link href="/versand-rueckgabe">Versand & Rückgabe</Link>.
          </>
        ),
      },
      {
        q: "Kann ich die Farbe umtauschen?",
        a: "Ja. Schreib uns kurz mit deiner Bestellnummer und der gewünschten Farbe – wir kümmern uns um den Rest.",
      },
    ],
  },
  {
    group: "Produkt & Pflege",
    items: [
      {
        q: "Welche Größe passt mir?",
        a: (
          <>
            Alle Armbänder sind über zwei Schiebeknoten stufenlos verstellbar und passen damit an nahezu jedes
            Handgelenk. Wie das Verstellen funktioniert, zeigen wir unter <Link href="/tragen">Tragen & Größe</Link>.
          </>
        ),
      },
      {
        q: "Kann ich das Armband neben meiner Uhr tragen?",
        a: "Dafür sind unsere Armbänder entworfen. Die leichte Stoffkordel kratzt nicht am Gehäuse und trägt kaum auf. Wir empfehlen, das Armband mit etwas Abstand zur Uhr zu tragen, damit beide frei sitzen.",
      },
      {
        q: "Darf das Armband nass werden?",
        a: "Die Kordel ist alltagstauglich. Wird sie nass, lass sie einfach an der Luft trocknen. Zum Reinigen genügt lauwarmes Wasser mit etwas milder Seife.",
      },
      {
        q: "Kann ich mehrere Armbänder zusammen tragen?",
        a: "Unbedingt. Zwei oder drei Farben übereinander sehen besonders gut aus – zum Beispiel Notte mit Rosso oder Kaki mit Sole.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="container page narrow">
      <header className="page-head">
        <p className="eyebrow">Service</p>
        <h1 className="h1">Häufige Fragen</h1>
      </header>
      {faqs.map((g) => (
        <section key={g.group} className="faq-group">
          <h2 className="h3">{g.group}</h2>
          <div className="accordion">
            {g.items.map((item) => (
              <details key={item.q}>
                <summary>
                  {item.q} <ChevronIcon />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}
      <p className="muted">
        Deine Frage ist nicht dabei? <Link href="/kontakt" className="underline">Schreib uns</Link> – wir antworten in
        der Regel innerhalb eines Werktags.
      </p>
    </div>
  );
}
