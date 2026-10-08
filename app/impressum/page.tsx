import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalNotice } from "@/components/LegalNotice";

export const metadata: Metadata = { title: "Impressum" };

export default function ImprintPage() {
  const c = site.company;
  return (
    <div className="container page narrow prose">
      <h1 className="h1">Impressum</h1>
      <LegalNotice />
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        {c.legalName}
        <br />
        {c.street}
        <br />
        {c.city}
        <br />
        {c.country}
      </p>
      <h2>Kontakt</h2>
      <p>
        Telefon: {c.phone}
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <h2>Umsatzsteuer-ID</h2>
      <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: {c.vatId}</p>
      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        {c.owner}, {c.street}, {c.city}
      </p>
      <h2>Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
        teilzunehmen.
      </p>
    </div>
  );
}
