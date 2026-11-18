"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import type { Card } from "@/lib/shop";
import { products } from "@/lib/products";
import { matchesQuery } from "@/lib/search";
import { useShop } from "@/components/ShopProvider";
import { ProductCard } from "@/components/ProductCard";

const sorts = {
  empfohlen: { label: "Empfohlen", fn: (_a: Card, _b: Card) => 0 },
  neu: { label: "Neuheiten", fn: (a: Card, b: Card) => (b.variant?.added ?? 0) - (a.variant?.added ?? 0) },
  "preis-auf": { label: "Preis aufsteigend", fn: (a: Card, b: Card) => a.product.price - b.product.price },
  "preis-ab": { label: "Preis absteigend", fn: (a: Card, b: Card) => b.product.price - a.product.price },
} as const;

type SortKey = keyof typeof sorts;

export function ShopBrowser() {
  const { cards } = useShop();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const model = params.get("modell");
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
      cards
        .filter((c) => !model || c.product.slug === model)
        .filter((c) => !query || matchesQuery(query, c))
        .sort(sorts[sort].fn),
    [cards, model, query, sort],
  );

  return (
    <>
      <header className="series-head">
        <h1>The Nato-Series</h1>
        <p>Handgeknüpft aus Fallschirmseil. Zwei Modelle, viele Farben, stufenlos verstellbar.</p>
      </header>
      <div className="toolbar">
        <div className="toolbar-filters" role="group" aria-label="Modell filtern">
          <button className={`text-btn ${!model ? "is-active" : ""}`} onClick={() => update("modell", null)}>
            Alle
          </button>
          {products.map((p) => (
            <button
              key={p.slug}
              className={`text-btn ${model === p.slug ? "is-active" : ""}`}
              onClick={() => update("modell", p.slug)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          <span className="muted">{visible.length} Artikel</span>
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
          Suche: „{query}“{" "}
          <button className="text-btn" onClick={() => update("q", null)}>
            zurücksetzen
          </button>
        </div>
      )}

      {visible.length === 0 ? (
        <div className="empty">
          <p>Keine passenden Armbänder gefunden.</p>
          <button className="btn btn-outline" onClick={() => router.replace(pathname)}>
            Filter zurücksetzen
          </button>
        </div>
      ) : (
        <div className="grid-products">
          {visible.map((c, i) => (
            <ProductCard key={c.key} card={c} preload={i < 4} />
          ))}
        </div>
      )}
    </>
  );
}
