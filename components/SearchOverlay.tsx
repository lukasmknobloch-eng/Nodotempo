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
  const { searchOpen, setSearchOpen, catalog } = useShop();
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
    () => (query.trim() ? catalog.filter((p) => matchesQuery(query, p)).slice(0, 6) : []),
    [query, catalog],
  );

  const close = () => setSearchOpen(false);

  return (
    <div className={`search ${searchOpen ? "is-open" : ""}`} aria-hidden={!searchOpen}>
      <div className="search-backdrop" onClick={close} />
      <div className="search-panel" role="dialog" aria-label="Suche">
        <form
          className="search-form container"
          onSubmit={(e) => {
            e.preventDefault();
            close();
            router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
          }}
        >
          <SearchIcon size={22} />
          <input
            ref={inputRef}
            type="search"
            placeholder="Wonach suchst du? z. B. Blau, Grün, Rot"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Suchbegriff"
          />
          <button type="button" className="icon-btn" aria-label="Suche schließen" onClick={close}>
            <CloseIcon />
          </button>
        </form>
        <div className="container search-results">
          {query.trim() === "" ? (
            <div className="search-suggestions">
              <span className="eyebrow">Beliebte Suchen</span>
              {["Blau", "Grün", "Rot", "Rosa", "Braun"].map((s) => (
                <button key={s} className="chip" onClick={() => setQuery(s)}>
                  {s}
                </button>
              ))}
            </div>
          ) : results.length === 0 ? (
            <p className="muted">Keine Treffer für „{query}“.</p>
          ) : (
            <ul className="search-grid">
              {results.map((p) => (
                <li key={p.slug}>
                  <Link href={`/produkt/${p.slug}`} onClick={close} className="search-item">
                    <ProductImage product={p} src={p.images[0]} sizes="80px" />
                    <div>
                      <p>{p.name}</p>
                      <p className="muted small">{formatPrice(p.price)}</p>
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
