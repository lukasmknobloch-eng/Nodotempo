"use client";

import Link from "next/link";
import { useShop } from "@/components/ShopProvider";
import { ProductCard } from "@/components/ProductCard";

export function WishlistView() {
  const { wishlist, cards, ready } = useShop();
  const items = cards.filter((c) => wishlist.includes(c.key));

  return (
    <>
      <header className="page-head">
        <h1 className="h1">Wunschliste</h1>
        {ready && items.length > 0 && <p className="muted">Deine Favoriten werden in diesem Browser gespeichert.</p>}
      </header>
      {ready && items.length === 0 ? (
        <div className="empty">
          <p>Noch nichts gemerkt.</p>
          <p className="muted">Auf der Produktseite kannst du jede Farbe zur Wunschliste hinzufügen.</p>
          <Link href="/shop" className="btn btn-outline">
            Armbänder ansehen
          </Link>
        </div>
      ) : (
        <div className="grid-products">
          {items.map((c) => (
            <ProductCard key={c.key} card={c} />
          ))}
        </div>
      )}
    </>
  );
}
