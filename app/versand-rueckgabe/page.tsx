import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { title: "Versand & Rückgabe" };

const countryNames: Record<string, string> = {
  DE: "Deutschland", AT: "Österreich", CH: "Schweiz", NL: "Niederlande", BE: "Belgien",
  LU: "Luxemburg", FR: "Frankreich", IT: "Italien", ES: "Spanien", DK: "Dänemark",
};

export default function ShippingPage() {
  const { shipping } = site;
  return (
    <div className="container page narrow prose">
      <header className="page-head">
        <p className="eyebrow">Service</p>
        <h1 className="h1">Versand & Rückgabe</h1>
      </header>

      <h2>Versand</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Versandart</th>
            <th>Lieferzeit</th>
            <th>Kosten</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Standard</td>
            <td>{shipping.standard.minDays}–{shipping.standard.maxDays} Werktage</td>
            <td>{formatPrice(shipping.standard.amount)} · ab {formatPrice(shipping.freeFrom)} kostenlos</td>
          </tr>
          <tr>
            <td>Express</td>
            <td>{shipping.express.minDays}–{shipping.express.maxDays} Werktage</td>
            <td>{formatPrice(shipping.express.amount)}</td>
          </tr>
        </tbody>
      </table>
      <p>
        Wir liefern nach: {shipping.countries.map((c) => countryNames[c] ?? c).join(", ")}. Bei Lieferungen in die
        Schweiz können Einfuhrabgaben anfallen. Bestellungen, die werktags bis 14 Uhr eingehen, verlassen unser Atelier
        in der Regel am selben Tag. Sobald dein Paket unterwegs ist, erhältst du eine E-Mail mit Sendungsverfolgung.
      </p>
      <p>Jedes Armband wird liebevoll verpackt verschickt – ideal auch als Geschenk.</p>

      <h2>Rückgabe & Umtausch</h2>
      <p>
        Du kannst Artikel innerhalb von {site.returnDays} Tagen nach Erhalt zurückgeben – ungetragen und in der
        Originalverpackung. Gerne tauschen wir dein Armband auch gegen eine andere Farbe.
      </p>
      <ol>
        <li>
          Schreib uns über das <Link href="/kontakt">Kontaktformular</Link> mit deiner Bestellnummer.
        </li>
        <li>Du erhältst von uns ein Rücksendeetikett per E-Mail.</li>
        <li>Verpacke den Artikel sicher und gib das Paket bei der nächsten Annahmestelle ab.</li>
        <li>Nach Eingang erstatten wir den Betrag innerhalb von 14 Tagen über die ursprüngliche Zahlungsart.</li>
      </ol>
      <p>
        Dein gesetzliches Widerrufsrecht bleibt davon unberührt. Details findest du in der{" "}
        <Link href="/widerruf">Widerrufsbelehrung</Link>.
      </p>
    </div>
  );
}
