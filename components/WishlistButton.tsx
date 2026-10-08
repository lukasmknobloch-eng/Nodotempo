"use client";

import { HeartIcon } from "./Icons";
import { useShop } from "./ShopProvider";

export function WishlistButton({ slug, className, withLabel }: { slug: string; className?: string; withLabel?: boolean }) {
  const { wishlist, toggleWishlist, ready } = useShop();
  const active = ready && wishlist.includes(slug);
  return (
    <button
      type="button"
      className={`wish-btn ${active ? "is-active" : ""} ${className ?? ""}`}
      aria-pressed={active}
      aria-label={active ? "Von der Wunschliste entfernen" : "Zur Wunschliste hinzufügen"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(slug);
      }}
    >
      <HeartIcon size={18} filled={active} />
      {withLabel && <span>{active ? "Auf der Wunschliste" : "Wunschliste"}</span>}
    </button>
  );
}
