import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { PaymentBadges } from "./PaymentBadges";
import { site } from "@/lib/site";

const links = [
  { href: "/shop", label: "The Nato-Series" },
  { href: "/tragen", label: "Tragen & Größe" },
  { href: "/versand-rueckgabe", label: "Versand & Rückgabe" },
  { href: "/faq", label: "Häufige Fragen" },
  { href: "/kontakt", label: "Kontakt" },
];

const legal = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerrufsbelehrung" },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <Logo />
      </div>
      <div className="footer-grid">
        <p className="footer-about">
          Nodo, der Knoten. Tempo, die Zeit. Wir knüpfen Armbänder, die neben der Uhr getragen werden und ganz für sich
          bestehen. <strong>Getragen neben der Zeit.</strong>
        </p>
        <div className="footer-cols">
          <div>
            <p className="footer-label">Service</p>
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-label">Rechtliches</p>
            <ul>
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-newsletter">
          <p className="footer-title">Neuheiten & neue Farben zuerst erfahren</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Nodotempo · <a href={site.instagram}>Instagram</a>
        </p>
        <PaymentBadges />
        <p>Alle Preise {site.taxNote}.</p>
      </div>
    </footer>
  );
}
