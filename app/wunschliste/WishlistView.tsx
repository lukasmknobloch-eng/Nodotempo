"use client";

import Link from "next/link";
import { useShop } from "@/components/ShopProvider";
import { ProductCard } from "@/components/ProductCard";

export function WishlistView() {
  const { wishlist, catalog, ready } = useShop();
  const items = catalog.filter((p) => wishlist.includes(p.slug));

  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Gemerkt</p>
        <h1 className="h1">Wunschliste</h1>
        {ready && items.length > 0 && (
          <p className="page-lead">Deine Favoriten werden in diesem Browser gespeichert.</p>
        )}
      </header>
      {ready && items.length === 0 ? (
        <div className="empty">
          <p className="serif-lg">Noch nichts gemerkt.</p>
          <p className="muted">Tippe auf das Herz bei einem Armband, um es hier zu speichern.</p>
          <Link href="/shop" className="btn btn-primary">
            Zur Kollektion
          </Link>
        </div>
      ) : (
        <div className="grid-products grid-products-shop">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </>
  );
}
