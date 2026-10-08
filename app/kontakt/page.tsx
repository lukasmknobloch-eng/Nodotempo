import type { Metadata } from "next";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "Kontakt" };

export default function ContactPage() {
  return (
    <div className="container page">
      <div className="contact-layout">
        <div>
          <p className="eyebrow">Kontakt</p>
          <h1 className="h1">Wir sind für dich da.</h1>
          <p className="page-lead">
            Fragen zu einer Bestellung, zur passenden Größe oder zur Kombination mit deiner Uhr? Schreib uns – wir
            antworten in der Regel innerhalb eines Werktags.
          </p>
          <div className="contact-info">
            <p className="eyebrow">E-Mail</p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p className="eyebrow">Instagram</p>
            <p>
              <a href={site.instagram} target="_blank" rel="noreferrer">@nodotempo</a>
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
