import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalog, getCatalogProduct } from "@/lib/catalog";
import { categoryLabel, products } from "@/lib/products";
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
  return {
    title: product.name,
    description: `${product.shortDescription} ${product.description}`.slice(0, 160),
    openGraph: { title: product.name, images: product.images.slice(0, 1) },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getCatalogProduct(slug);
  if (!product) notFound();

  const related = getCatalog()
    .filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category) || a.rank - b.rank)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: site.name },
    material: product.material,
    image: product.images.map((src) => new URL(src, site.url).toString()),
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      price: (product.price / 100).toFixed(2),
      availability: product.soldOut ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      url: new URL(`/produkt/${product.slug}`, site.url).toString(),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="container page page-tight">
        <nav className="breadcrumbs" aria-label="Brotkrümelnavigation">
          <Link href="/">Start</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <Link href={`/shop?kategorie=${product.category}`}>{categoryLabel(product.category)}</Link>
          <span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
        <ProductDetail product={product} />
      </div>
      <section className="section container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Passend dazu</p>
            <h2 className="h2">Das könnte dir gefallen</h2>
          </div>
        </div>
        <div className="grid-products">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
