import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { PaymentBadges } from "./PaymentBadges";
import { site } from "@/lib/site";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "Alle Armbänder" },
      { href: "/#farben", label: "Alle Farben" },
      { href: "/shop?sortierung=neu", label: "Neuheiten" },
      { href: "/wunschliste", label: "Wunschliste" },
    ],
  },
  {
    title: "Service",
    links: [
      { href: "/tragen", label: "Tragen & Größe" },
      { href: "/versand-rueckgabe", label: "Versand & Rückgabe" },
      { href: "/faq", label: "Häufige Fragen" },
      { href: "/kontakt", label: "Kontakt" },
    ],
  },
  {
    title: "Nodotempo",
    links: [
      { href: "/ueber-uns", label: "Die Marke" },
      { href: "/tragen#pflege", label: "Pflege" },
      { href: site.instagram, label: "Instagram" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Logo className="logo-light" />
            <p className="footer-claim">{site.claim}</p>
            <div className="footer-newsletter">
              <p className="eyebrow">Newsletter</p>
              <NewsletterForm dark />
            </div>
          </div>
          <div className="footer-cols">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="eyebrow">{col.title}</p>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <PaymentBadges className="payment-badges-dark" />
          <nav className="footer-legal" aria-label="Rechtliches">
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
            <Link href="/agb">AGB</Link>
            <Link href="/widerruf">Widerrufsbelehrung</Link>
          </nav>
          <p className="small">© {new Date().getFullYear()} Nodotempo. Alle Preise {site.taxNote}.</p>
        </div>
      </div>
    </footer>
  );
}
