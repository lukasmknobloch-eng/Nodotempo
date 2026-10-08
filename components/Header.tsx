"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, SearchIcon } from "./Icons";
import { useShop } from "./ShopProvider";
import { navigation, site } from "@/lib/site";
import { formatPrice } from "@/lib/format";

export function Header() {
  const { count, wishlist, setCartOpen, setSearchOpen, ready } = useShop();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="announcement">
        <span>Kostenloser Versand ab {formatPrice(site.shipping.freeFrom)}</span>
        <span className="announcement-sep hide-sm" aria-hidden="true">·</span>
        <span className="hide-sm">{site.returnDays} Tage Rückgaberecht</span>
        <span className="announcement-sep hide-sm" aria-hidden="true">·</span>
        <span className="hide-sm">Zahlung mit Karte, PayPal & Klarna</span>
      </div>
      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="header-inner container">
          <div className="header-left">
            <button className="icon-btn show-md" aria-label="Menü öffnen" onClick={() => setMenuOpen(true)}>
              <MenuIcon />
            </button>
            <nav className="nav hide-md" aria-label="Hauptnavigation">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Link href="/" className="header-logo" aria-label="Nodotempo – Startseite">
            <Logo />
          </Link>

          <div className="header-right">
            <button className="icon-btn" aria-label="Suche öffnen" onClick={() => setSearchOpen(true)}>
              <SearchIcon />
            </button>
            <Link href="/wunschliste" className="icon-btn hide-sm" aria-label="Wunschliste">
              <HeartIcon />
              {ready && wishlist.length > 0 && <span className="badge-count">{wishlist.length}</span>}
            </Link>
            <button className="icon-btn" aria-label={`Warenkorb öffnen, ${count} Artikel`} onClick={() => setCartOpen(true)}>
              <BagIcon />
              {ready && count > 0 && <span className="badge-count">{count}</span>}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="mobile-menu-panel" role="dialog" aria-label="Menü">
          <div className="mobile-menu-top">
            <Logo />
            <button className="icon-btn" aria-label="Menü schließen" onClick={() => setMenuOpen(false)}>
              <CloseIcon />
            </button>
          </div>
          <nav className="mobile-nav">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/wunschliste">Wunschliste</Link>
          </nav>
          <div className="mobile-menu-foot">
            <Link href="/tragen">Tragen & Größe</Link>
            <Link href="/faq">Häufige Fragen</Link>
            <Link href="/kontakt">Kontakt</Link>
          </div>
        </div>
      </div>
    </>
  );
}
