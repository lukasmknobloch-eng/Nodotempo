"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";

export type CartLine = { slug: string; size: string; quantity: number };

export type ResolvedLine = CartLine & { key: string; product: CatalogProduct; lineTotal: number };

type ShopState = {
  catalog: CatalogProduct[];
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  addToCart: (slug: string, size: string, quantity?: number) => void;
  setQuantity: (slug: string, size: string, quantity: number) => void;
  removeFromCart: (slug: string, size: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (slug: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
};

const ShopContext = createContext<ShopState | null>(null);

const CART_KEY = "nodotempo.cart.v1";
const WISH_KEY = "nodotempo.wishlist.v1";
const MAX_QTY = 10;

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Speicher nicht verfügbar – Warenkorb bleibt nur für diese Sitzung */
  }
}

export function ShopProvider({ catalog, children }: { catalog: CatalogProduct[]; children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setCart(read<CartLine[]>(CART_KEY, []));
    setWishlist(read<string[]>(WISH_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) write(CART_KEY, cart);
  }, [cart, ready]);

  useEffect(() => {
    if (ready) write(WISH_KEY, wishlist);
  }, [wishlist, ready]);

  // Seite nicht scrollen, solange ein Overlay offen ist
  useEffect(() => {
    document.body.style.overflow = cartOpen || searchOpen ? "hidden" : "";
  }, [cartOpen, searchOpen]);

  const bySlug = useMemo(() => new Map(catalog.map((p) => [p.slug, p])), [catalog]);

  const lines = useMemo<ResolvedLine[]>(
    () =>
      cart.flatMap((line) => {
        const product = bySlug.get(line.slug);
        if (!product || !product.sizes.includes(line.size)) return [];
        return [{ ...line, key: `${line.slug}__${line.size}`, product, lineTotal: product.price * line.quantity }];
      }),
    [cart, bySlug],
  );

  const addToCart = useCallback((slug: string, size: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.slug === slug && l.size === size);
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + quantity) } : l,
        );
      }
      return [...prev, { slug, size, quantity: Math.min(MAX_QTY, quantity) }];
    });
    setCartOpen(true);
  }, []);

  const setQuantity = useCallback((slug: string, size: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((l) => !(l.slug === slug && l.size === size))
        : prev.map((l) => (l.slug === slug && l.size === size ? { ...l, quantity: Math.min(MAX_QTY, quantity) } : l)),
    );
  }, []);

  const removeFromCart = useCallback((slug: string, size: string) => {
    setCart((prev) => prev.filter((l) => !(l.slug === slug && l.size === size)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }, []);

  const value: ShopState = {
    catalog,
    lines,
    count: lines.reduce((n, l) => n + l.quantity, 0),
    subtotal: lines.reduce((n, l) => n + l.lineTotal, 0),
    ready,
    addToCart,
    setQuantity,
    removeFromCart,
    clearCart,
    wishlist,
    toggleWishlist,
    cartOpen,
    setCartOpen,
    searchOpen,
    setSearchOpen,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop muss innerhalb von <ShopProvider> verwendet werden");
  return ctx;
}

export { MAX_QTY };
