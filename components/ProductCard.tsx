import Link from "next/link";
import type { CatalogProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "./ProductImage";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product, preload }: { product: CatalogProduct; preload?: boolean }) {
  const [first, second] = product.images;
  return (
    <Link href={`/produkt/${product.slug}`} className="card">
      <div className="card-media">
        <ProductImage product={product} src={first} preload={preload} />
        {second && <ProductImage product={product} src={second} className="card-media-alt" />}
        {product.badge && !product.soldOut && <span className="tag">{product.badge}</span>}
        {product.soldOut && <span className="tag tag-muted">Ausverkauft</span>}
        <WishlistButton slug={product.slug} className="card-wish" />
        <span className="card-cta">Ansehen</span>
      </div>
      <div className="card-body">
        <div>
          <h3 className="card-title">{product.name}</h3>
          <p className="card-sub">{product.shortDescription}</p>
        </div>
        <p className="card-price">
          {product.compareAtPrice && <s>{formatPrice(product.compareAtPrice)}</s>}
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
