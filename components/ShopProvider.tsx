"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CatalogProduct, CatalogVariant } from "@/lib/catalog";
import { productHref, toCards, type Card } from "@/lib/shop";

export type CartLine = { slug: string; variant: string; quantity: number };

export type ResolvedLine = CartLine & {
  key: string;
  product: CatalogProduct;
  variantInfo?: CatalogVariant;
  image?: string;
  href: string;
  lineTotal: number;
};

type ShopState = {
  catalog: CatalogProduct[];
  cards: Card[];
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  ready: boolean;
  addToCart: (slug: string, variant: string, quantity?: number) => void;
  setQuantity: (slug: string, variant: string, quantity: number) => void;
  removeFromCart: (slug: string, variant: string) => void;
  clearCart: () => void;
  /** Schlüssel der Form "modell:farbe" */
  wishlist: string[];
  toggleWishlist: (key: string) => void;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

const ShopContext = createContext<ShopState | null>(null);

const CART_KEY = "nodotempo.cart.v2";
const WISH_KEY = "nodotempo.wishlist.v2";
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

const same = (l: CartLine, slug: string, variant: string) => l.slug === slug && l.variant === variant;

export function ShopProvider({ catalog, children }: { catalog: CatalogProduct[]; children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    document.body.style.overflow = cartOpen || searchOpen || menuOpen ? "hidden" : "";
  }, [cartOpen, searchOpen, menuOpen]);

  const cards = useMemo(() => toCards(catalog), [catalog]);
  const bySlug = useMemo(() => new Map(catalog.map((p) => [p.slug, p])), [catalog]);

  const lines = useMemo<ResolvedLine[]>(
    () =>
      cart.flatMap((line) => {
        const product = bySlug.get(line.slug);
        if (!product || product.comingSoon) return [];
        const variantInfo = product.variants.find((v) => v.id === line.variant);
        if (product.variants.length > 0 && !variantInfo) return [];
        return [
          {
            ...line,
            key: `${line.slug}:${line.variant}`,
            product,
            variantInfo,
            image: (variantInfo?.images ?? product.images)[0],
            href: productHref(line.slug, variantInfo?.id),
            lineTotal: product.price * line.quantity,
          },
        ];
      }),
    [cart, bySlug],
  );

  const addToCart = useCallback((slug: string, variant: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((l) => same(l, slug, variant));
      if (existing) {
        return prev.map((l) => (l === existing ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + quantity) } : l));
      }
      return [...prev, { slug, variant, quantity: Math.min(MAX_QTY, quantity) }];
    });
    setCartOpen(true);
  }, []);

  const setQuantity = useCallback((slug: string, variant: string, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((l) => !same(l, slug, variant))
        : prev.map((l) => (same(l, slug, variant) ? { ...l, quantity: Math.min(MAX_QTY, quantity) } : l)),
    );
  }, []);

  const removeFromCart = useCallback((slug: string, variant: string) => {
    setCart((prev) => prev.filter((l) => !same(l, slug, variant)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((key: string) => {
    setWishlist((prev) => (prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]));
  }, []);

  const value: ShopState = {
    catalog,
    cards,
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
    menuOpen,
    setMenuOpen,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop muss innerhalb von <ShopProvider> verwendet werden");
  return ctx;
}

export { MAX_QTY };
