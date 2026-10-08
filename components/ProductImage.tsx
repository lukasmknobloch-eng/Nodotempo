import Image from "next/image";
import { BraceletArt } from "./BraceletArt";
import type { Product } from "@/lib/products";

type Props = {
  product: Pick<Product, "name" | "art">;
  src?: string;
  sizes?: string;
  preload?: boolean;
  className?: string;
};

/** Zeigt das Produktfoto – oder die gezeichnete Vorschau, falls (noch) keines existiert. */
export function ProductImage({ product, src, sizes = "(max-width: 768px) 50vw, 25vw", preload, className }: Props) {
  return (
    <div className={`product-image ${className ?? ""}`}>
      {src ? (
        <Image src={src} alt={product.name} fill sizes={sizes} preload={preload} quality={90} />
      ) : (
        <BraceletArt art={product.art} label={product.name} />
      )}
    </div>
  );
}
