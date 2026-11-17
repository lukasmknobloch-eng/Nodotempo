"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { BagIcon, CloseIcon, MenuIcon, SearchIcon } from "./Icons";
import { useShop } from "./ShopProvider";
import { navigation, site } from "@/lib/site";

export function Header() {
  const { count, wishlist, setCartOpen, setSearchOpen, menuOpen, setMenuOpen, ready } = useShop();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Auf der Startseite liegt die Kopfzeile transparent über dem großen Bild
  const overlay = pathname === "/" && !scrolled;

  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, setMenuOpen]);

  return (
    <>
      <header className={`header ${overlay ? "is-overlay" : ""} ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner">
          <button className="header-link" onClick={() => setMenuOpen(true)} aria-label="Menü öffnen">
            <MenuIcon size={18} />
            <span className="hide-sm">Menü</span>
          </button>

          <Link href="/" className="header-logo" aria-label="Nodotempo – Startseite">
            <Logo />
          </Link>

          <nav className="header-right" aria-label="Service">
            <button className="header-link" onClick={() => setSearchOpen(true)} aria-label="Suche öffnen">
              <SearchIcon size={17} className="show-sm-inline" />
              <span className="hide-sm">Suche</span>
            </button>
            <Link href="/wunschliste" className="header-link hide-sm">
              Wunschliste{ready && wishlist.length > 0 ? ` (${wishlist.length})` : ""}
            </Link>
            <button className="header-link" onClick={() => setCartOpen(true)} aria-label={`Warenkorb öffnen, ${count} Artikel`}>
              <BagIcon size={18} className="show-sm-inline" />
              <span className="hide-sm">Warenkorb</span> ({ready ? count : 0})
            </button>
          </nav>
        </div>
      </header>

      <div className={`menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="menu-panel" role="dialog" aria-label="Menü">
          <div className="menu-top">
            <button className="header-link" onClick={() => setMenuOpen(false)} aria-label="Menü schließen">
              <CloseIcon size={18} /> Schließen
            </button>
          </div>
          <nav className="menu-nav">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="menu-foot">
            <Link href="/wunschliste">Wunschliste</Link>
            <Link href="/faq">Häufige Fragen</Link>
            <Link href="/versand-rueckgabe">Versand & Rückgabe</Link>
            <Link href="/kontakt">Kontakt</Link>
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
