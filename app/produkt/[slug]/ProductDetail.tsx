"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { productInfo, ONE_SIZE } from "@/lib/products";
import { useShop } from "@/components/ShopProvider";
import { ProductImage } from "@/components/ProductImage";
import { QuantityStepper } from "@/components/QuantityStepper";
import { WishlistButton } from "@/components/WishlistButton";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ChevronIcon } from "@/components/Icons";

type Props = { product: CatalogProduct; syncUrl?: boolean };

export function ProductDetail({ product, syncUrl }: Props) {
  return syncUrl ? <WithUrl product={product} /> : <Detail product={product} initial={product.variants[0]?.id} />;
}

/** Liest die gewählte Farbe aus der Adresse (?farbe=…) und hält sie aktuell. */
function WithUrl({ product }: { product: CatalogProduct }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const fromUrl = params.get("farbe");
  const initial = product.variants.find((v) => v.id === fromUrl)?.id ?? product.variants[0]?.id;
  return (
    <Detail
      key={initial}
      product={product}
      initial={initial}
      onVariantChange={(id) => router.replace(`${pathname}?farbe=${id}`, { scroll: false })}
    />
  );
}

function Detail({
  product,
  initial,
  onVariantChange,
}: {
  product: CatalogProduct;
  initial?: string;
  onVariantChange?: (id: string) => void;
}) {
  const { addToCart } = useShop();
  const [variantId, setVariantId] = useState(initial);
  const [active, setActive] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const variant = product.variants.find((v) => v.id === variantId);
  const images = variant?.images.length ? variant.images : product.images;
  const slides = images.length > 0 ? images : [undefined];
  const unavailable = product.comingSoon || variant?.soldOut;

  useEffect(() => setActive(0), [variantId]);

  // Erst im Browser berechnen, damit das Datum nicht vom Build-Zeitpunkt stammt
  const [delivery, setDelivery] = useState<string | null>(null);
  useEffect(() => setDelivery(deliveryWindow()), []);

  function chooseVariant(id: string) {
    setVariantId(id);
    onVariantChange?.(id);
  }

  return (
    <div className="pdp">
      <div className="pdp-gallery">
        {images.length > 1 && (
          <div className="pdp-thumbs" role="tablist" aria-label="Produktbilder">
            {images.map((src, i) => (
              <button
                key={src}
                role="tab"
                aria-selected={i === active}
                aria-label={`Bild ${i + 1}`}
                className={`pdp-thumb ${i === active ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <ProductImage src={src} alt="" sizes="80px" />
              </button>
            ))}
          </div>
        )}
        <div className="pdp-main">
          <ProductImage
            src={slides[active]}
            alt={variant ? `${product.name} in ${variant.name}` : product.name}
            sizes="(max-width: 900px) 100vw, 50vw"
            preload
            placeholder={product.comingSoon ? "Bald verfügbar" : undefined}
          />
        </div>
      </div>

      <div className="pdp-info">
        <p className="pdp-series">{productInfo.series}</p>
        <h1 className="pdp-title">{product.name}</h1>
        <p className="pdp-subtitle">{product.subtitle}</p>
        <p className="pdp-price">
          {product.compareAtPrice && <s>{formatPrice(product.compareAtPrice)}</s>}
          {formatPrice(product.price)}
        </p>
        <p className="muted">
          {site.taxNote}.{" "}
          <Link href="/versand-rueckgabe" className="underline">
            Versand
          </Link>{" "}
          wird an der Kasse berechnet.
        </p>

        {product.variants.length > 0 && (
          <div className="pdp-option">
            <p className="pdp-option-label">
              Farbe: {variant?.name} <span>· {variant?.color}</span>
            </p>
            <div className="swatches" role="radiogroup" aria-label="Farbe wählen">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  role="radio"
                  aria-checked={v.id === variantId}
                  aria-label={`${v.name} (${v.color})`}
                  title={`${v.name} · ${v.color}`}
                  className={`swatch ${v.id === variantId ? "is-active" : ""} ${v.soldOut ? "is-soldout" : ""}`}
                  onClick={() => chooseVariant(v.id)}
                >
                  <ProductImage src={v.images[0]} alt="" sizes="56px" />
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="pdp-fit">
          Größe: {ONE_SIZE}.{" "}
          <Link href="/tragen" className="underline">
            So funktioniert’s
          </Link>
        </p>

        {product.comingSoon ? (
          <div className="pdp-soon">
            <button className="btn btn-primary btn-block" disabled>
              Bald verfügbar
            </button>
            <p className="pdp-soon-text">Trag dich ein, und wir sagen dir Bescheid, sobald {product.name} erhältlich ist.</p>
            <NewsletterForm />
          </div>
        ) : (
          <>
            <div className="pdp-buy">
              <QuantityStepper value={quantity} onChange={setQuantity} min={1} />
              <button
                className="btn btn-primary btn-grow"
                disabled={unavailable || !variant}
                onClick={() => {
                  if (!variant) return;
                  addToCart(product.slug, variant.id, quantity);
                  setQuantity(1);
                }}
              >
                {unavailable ? "Ausverkauft" : "In den Warenkorb"}
              </button>
            </div>
            <p className="pdp-delivery muted">
              Lieferung voraussichtlich{" "}
              {delivery ?? `in ${site.shipping.standard.minDays}–${site.shipping.standard.maxDays} Werktagen`} ·
              Kostenloser Versand ab {formatPrice(site.shipping.freeFrom)}
            </p>
          </>
        )}

        {variant && <WishlistButton itemKey={`${product.slug}:${variant.id}`} withLabel className="wish-inline" />}

        <p className="pdp-description">{product.description}</p>

        <div className="accordion">
          <details>
            <summary>
              Details <ChevronIcon size={14} />
            </summary>
            <ul className="bullets">
              {product.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </details>
          <details>
            <summary>
              Material & Pflege <ChevronIcon size={14} />
            </summary>
            <p>
              {productInfo.material}
              .
            </p>
            <p>{productInfo.care}</p>
          </details>
          <details>
            <summary>
              Versand & Rückgabe <ChevronIcon size={14} />
            </summary>
            <p>
              {site.shipping.standard.label}: {formatPrice(site.shipping.standard.amount)}, ab{" "}
              {formatPrice(site.shipping.freeFrom)} kostenlos. {site.shipping.express.label}:{" "}
              {formatPrice(site.shipping.express.amount)}. Rückgabe innerhalb von {site.returnDays} Tagen.{" "}
              <Link href="/versand-rueckgabe" className="underline">
                Mehr erfahren
              </Link>
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}

function deliveryWindow() {
  const add = (days: number) => {
    const d = new Date();
    let added = 0;
    while (added < days) {
      d.setDate(d.getDate() + 1);
      if (d.getDay() !== 0 && d.getDay() !== 6) added++;
    }
    return d;
  };
  const fmt = new Intl.DateTimeFormat("de-DE", { weekday: "short", day: "numeric", month: "short" });
  return `${fmt.format(add(site.shipping.standard.minDays))} – ${fmt.format(add(site.shipping.standard.maxDays))}`;
}
