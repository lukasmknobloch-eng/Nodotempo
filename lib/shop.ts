import type { CatalogProduct, CatalogVariant } from "./catalog";

/** Eine Kachel im Shop: ein Modell in einer Farbe (oder ein Modell ohne Farben). */
export type Card = {
  key: string;
  product: CatalogProduct;
  variant?: CatalogVariant;
  href: string;
  title: string;
  subtitle: string;
  images: string[];
};

export function productHref(slug: string, variantId?: string) {
  return variantId ? `/produkt/${slug}?farbe=${variantId}` : `/produkt/${slug}`;
}

export function toCards(catalog: CatalogProduct[]): Card[] {
  return catalog.flatMap((product) =>
    product.variants.length === 0
      ? [
          {
            key: product.slug,
            product,
            href: productHref(product.slug),
            title: product.name,
            subtitle: product.comingSoon ? "Bald verfügbar" : (product.subtitle ?? ""),
            images: product.images,
          },
        ]
      : product.variants.map((variant) => ({
          key: `${product.slug}:${variant.id}`,
          product,
          variant,
          href: productHref(product.slug, variant.id),
          title: product.name,
          subtitle: variant.name,
          images: variant.images.length ? variant.images : product.images,
        })),
  );
}
