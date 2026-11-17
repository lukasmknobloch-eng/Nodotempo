import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCatalog, getCatalogProduct } from "@/lib/catalog";
import { products, productInfo } from "@/lib/products";
import { toCards } from "@/lib/shop";
import { site } from "@/lib/site";
import { ProductCard } from "@/components/ProductCard";
import { ProductDetail } from "./ProductDetail";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getCatalogProduct(slug);
  if (!product) return {};
  const image = product.variants[0]?.images[0] ?? product.images[0];
  return {
    title: product.name,
    description: product.description.slice(0, 160),
    openGraph: { title: product.name, images: image ? [image] : [] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getCatalogProduct(slug);
  if (!product) notFound();

  const related = toCards(getCatalog())
    .filter((c) => c.product.slug !== product.slug || c.variant)
    .slice(0, 8);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: site.name },
    material: productInfo.material,
    variesBy: ["https://schema.org/color"],
    hasVariant: product.variants.map((v) => ({
      "@type": "Product",
      name: `${product.name} ${v.name}`,
      color: v.name,
      image: v.images.map((src) => new URL(src, site.url).toString()),
      offers: {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: (product.price / 100).toFixed(2),
        availability: v.soldOut || product.comingSoon ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
        url: new URL(`/produkt/${product.slug}?farbe=${v.id}`, site.url).toString(),
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="page-pdp">
        <Suspense fallback={<ProductDetail product={product} />}>
          <ProductDetail product={product} syncUrl />
        </Suspense>
      </div>
      <section className="section-grid">
        <h2 className="section-title">Das könnte dir auch gefallen</h2>
        <div className="grid-products">
          {related.slice(0, 4).map((c) => (
            <ProductCard key={c.key} card={c} />
          ))}
        </div>
      </section>
    </>
  );
}
