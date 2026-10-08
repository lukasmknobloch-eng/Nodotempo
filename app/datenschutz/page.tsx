import type { Metadata } from "next";
import { site } from "@/lib/site";
import { LegalNotice } from "@/components/LegalNotice";

export const metadata: Metadata = { title: "Datenschutzerklärung" };

export default function PrivacyPage() {
  const c = site.company;
  return (
    <div className="container page narrow prose">
      <h1 className="h1">Datenschutzerklärung</h1>
      <LegalNotice />

      <h2>1. Verantwortlicher</h2>
      <p>
        {c.legalName}, {c.street}, {c.city}, {c.country}. E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>2. Hosting und Server-Logfiles</h2>
      <p>
        Beim Aufruf unserer Website werden durch unseren Hosting-Anbieter [Name, Anschrift des Hosters] automatisch
        Informationen erfasst (IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser). Die Verarbeitung erfolgt auf
        Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur Gewährleistung eines sicheren Betriebs. Die Daten werden nach
        spätestens [7] Tagen gelöscht.
      </p>

      <h2>3. Lokaler Speicher (Warenkorb & Wunschliste)</h2>
      <p>
        Wir speichern den Inhalt deines Warenkorbs und deiner Wunschliste im lokalen Speicher deines Browsers
        (localStorage). Diese Daten verlassen dein Gerät nicht und sind für die Funktion des Shops technisch
        erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Wir setzen keine Analyse- oder Marketing-Cookies ein. Schriften werden
        lokal ausgeliefert; es findet keine Verbindung zu Google-Servern statt.
      </p>

      <h2>4. Bestellung und Zahlung</h2>
      <p>
        Zur Abwicklung deiner Bestellung verarbeiten wir die von dir angegebenen Daten (Name, Anschrift, E-Mail,
        Telefonnummer, Bestelldaten) gemäß Art. 6 Abs. 1 lit. b DSGVO. Die Zahlungsabwicklung erfolgt über Stripe
        Payments Europe Ltd., 1 Grand Canal Street Lower, Dublin 2, Irland. Je nach gewählter Zahlungsart werden deine
        Daten zudem an PayPal (Europe) S.à r.l. et Cie, S.C.A., Luxemburg, oder an die Klarna Bank AB (publ),
        Stockholm, Schweden, übermittelt. Klarna kann zur Prüfung der Identität und Bonität Daten an Auskunfteien
        übermitteln. Für Lieferungen geben wir Name und Anschrift an das beauftragte Versandunternehmen [Name] weiter.
        Gesetzliche Aufbewahrungsfristen (§ 147 AO, § 257 HGB) betragen bis zu zehn Jahre.
      </p>

      <h2>5. Kontaktformular und E-Mail</h2>
      <p>
        Wenn du uns kontaktierst, verarbeiten wir deine Angaben zur Bearbeitung der Anfrage (Art. 6 Abs. 1 lit. b bzw.
        f DSGVO). [Falls genutzt: Der Versand erfolgt über Resend, Inc., USA, auf Grundlage von
        Standardvertragsklauseln.]
      </p>

      <h2>6. Newsletter</h2>
      <p>
        Für den Newsletter verwenden wir das Double-Opt-in-Verfahren. Rechtsgrundlage ist deine Einwilligung (Art. 6
        Abs. 1 lit. a DSGVO), die du jederzeit über den Abmeldelink widerrufen kannst. Versanddienstleister: [Name].
      </p>

      <h2>7. Deine Rechte</h2>
      <p>
        Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
        und Widerspruch (Art. 15–21 DSGVO) sowie das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren.
      </p>
    </div>
  );
}
