"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useShop } from "./ShopProvider";
import { CloseIcon, SearchIcon } from "./Icons";
import { ProductImage } from "./ProductImage";
import { formatPrice } from "@/lib/format";
import { matchesQuery } from "@/lib/search";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen, cards } = useShop();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!searchOpen) return;
    setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen, setSearchOpen]);

  const results = useMemo(
    () => (query.trim() ? cards.filter((c) => matchesQuery(query, c)).slice(0, 8) : []),
    [query, cards],
  );

  const close = () => setSearchOpen(false);

  return (
    <div className={`search ${searchOpen ? "is-open" : ""}`} aria-hidden={!searchOpen}>
      <div className="search-backdrop" onClick={close} />
      <div className="search-panel" role="dialog" aria-label="Suche">
        <form
          className="search-form"
          onSubmit={(e) => {
            e.preventDefault();
            close();
            router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
          }}
        >
          <SearchIcon size={18} />
          <input
            ref={inputRef}
            type="search"
            placeholder="Suche nach Farbe oder Modell"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Suchbegriff"
          />
          <button type="button" className="header-link" aria-label="Suche schließen" onClick={close}>
            <CloseIcon size={18} />
          </button>
        </form>
        <div className="search-results">
          {query.trim() === "" ? (
            <div className="search-suggestions">
              <span className="muted">Beliebt:</span>
              {["Blau", "Gelb", "Sand", "Grün", "Bordeaux"].map((s) => (
                <button key={s} className="text-btn" onClick={() => setQuery(s)}>
                  {s}
                </button>
              ))}
            </div>
          ) : results.length === 0 ? (
            <p className="muted">Keine Treffer für „{query}“.</p>
          ) : (
            <ul className="search-grid">
              {results.map((c) => (
                <li key={c.key}>
                  <Link href={c.href} onClick={close} className="search-item">
                    <ProductImage src={c.images[0]} alt={c.title} sizes="64px" />
                    <div>
                      <p className="upper">{c.title}</p>
                      <p className="muted">
                        {c.subtitle} · {formatPrice(c.product.price)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
