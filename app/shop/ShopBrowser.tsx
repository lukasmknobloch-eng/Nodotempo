"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { CatalogProduct } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { matchesQuery } from "@/lib/search";
import { CloseIcon } from "@/components/Icons";

const sorts = {
  empfohlen: { label: "Empfohlen", fn: (a: CatalogProduct, b: CatalogProduct) => a.rank - b.rank },
  neu: { label: "Neuheiten", fn: (a: CatalogProduct, b: CatalogProduct) => b.added - a.added },
  "preis-auf": { label: "Preis aufsteigend", fn: (a: CatalogProduct, b: CatalogProduct) => a.price - b.price },
  "preis-ab": { label: "Preis absteigend", fn: (a: CatalogProduct, b: CatalogProduct) => b.price - a.price },
} as const;

type SortKey = keyof typeof sorts;

export function ShopBrowser({ catalog }: { catalog: CatalogProduct[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sortParam = params.get("sortierung");
  const sort: SortKey = sortParam && sortParam in sorts ? (sortParam as SortKey) : "empfohlen";
  const query = params.get("q") ?? "";

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const visible = useMemo(
    () =>
      catalog
        .filter((p) => !query || matchesQuery(query, p))
        .sort(sorts[sort].fn),
    [catalog, query, sort],
  );

  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Shop</p>
        <h1 className="h1">Alle Armbänder</h1>
        <p className="page-lead">
          Handgeknüpfte Stoffarmbänder in {catalog.length} Farben – stufenlos verstellbar und entworfen, um neben der Uhr
          zu bestehen. Oder ganz für sich.
        </p>
      </header>

      <div className="toolbar">
        <span className="muted small">{visible.length} Armbänder</span>
        <div className="toolbar-right">
          <label className="select">
            <span className="sr-only">Sortieren nach</span>
            <select value={sort} onChange={(e) => update("sortierung", e.target.value === "empfohlen" ? null : e.target.value)}>
              {Object.entries(sorts).map(([key, s]) => (
                <option key={key} value={key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {query && (
        <div className="active-query">
          Suchergebnisse für „{query}“
          <button className="chip chip-sm" onClick={() => update("q", null)} aria-label="Suche zurücksetzen">
            <CloseIcon size={14} /> zurücksetzen
          </button>
        </div>
      )}

      {visible.length === 0 ? (
        <div className="empty">
          <p className="serif-lg">Keine passenden Armbänder gefunden.</p>
          <button className="btn btn-ghost" onClick={() => router.replace(pathname)}>
            Filter zurücksetzen
          </button>
        </div>
      ) : (
        <div className="grid-products grid-products-shop">
          {visible.map((p, i) => (
            <ProductCard key={p.slug} product={p} preload={i < 4} />
          ))}
        </div>
      )}
    </>
  );
}
