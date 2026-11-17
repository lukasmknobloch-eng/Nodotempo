import Link from "next/link";
import type { Card } from "@/lib/shop";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "./ProductImage";

export function ProductCard({ card, preload }: { card: Card; preload?: boolean }) {
  const [first, second] = card.images;
  const { product, variant } = card;
  const alt = variant ? `${product.name} in ${variant.name}` : product.name;
  return (
    <Link href={card.href} className="card">
      <div className="card-media">
        <ProductImage src={first} alt={alt} preload={preload} placeholder={product.comingSoon ? "Bald verfügbar" : undefined} />
        {second && <ProductImage src={second} alt={alt} className="card-media-alt" />}
        {variant?.soldOut && <span className="tag">Ausverkauft</span>}
        {product.comingSoon && first && <span className="tag">Bald verfügbar</span>}
      </div>
      <div className="card-body">
        <div>
          <h3 className="card-title">{card.title}</h3>
          <p className="card-sub">{card.subtitle}</p>
        </div>
        <p className="card-price">
          {product.compareAtPrice && <s>{formatPrice(product.compareAtPrice)}</s>}
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
