"use client";

import { HeartIcon } from "./Icons";
import { useShop } from "./ShopProvider";

export function WishlistButton({ itemKey, className, withLabel }: { itemKey: string; className?: string; withLabel?: boolean }) {
  const { wishlist, toggleWishlist, ready } = useShop();
  const active = ready && wishlist.includes(itemKey);
  return (
    <button
      type="button"
      className={`wish-btn ${active ? "is-active" : ""} ${className ?? ""}`}
      aria-pressed={active}
      aria-label={active ? "Von der Wunschliste entfernen" : "Zur Wunschliste hinzufügen"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(itemKey);
      }}
    >
      <HeartIcon size={16} filled={active} />
      {withLabel && <span>{active ? "Auf der Wunschliste" : "Zur Wunschliste"}</span>}
    </button>
  );
}
