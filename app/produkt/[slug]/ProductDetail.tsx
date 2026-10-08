"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { productInfo } from "@/lib/products";
import { CordSwatch } from "@/components/BraceletArt";
import { useShop } from "@/components/ShopProvider";
import { ProductImage } from "@/components/ProductImage";
import { QuantityStepper } from "@/components/QuantityStepper";
import { WishlistButton } from "@/components/WishlistButton";
import { PaymentBadges } from "@/components/PaymentBadges";
import { ChevronIcon, LockIcon, ReturnIcon, TruckIcon } from "@/components/Icons";

export function ProductDetail({ product }: { product: CatalogProduct }) {
  const { addToCart, catalog } = useShop();
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const images = product.images;
  const slides = images.length > 0 ? images : [undefined];

  function add() {
    if (!size) {
      setSizeError(true);
      return;
    }
    addToCart(product.slug, size, quantity);
    setQuantity(1);
  }

  // Erst im Browser berechnen, damit das Datum nicht vom Build-Zeitpunkt stammt
  const [delivery, setDelivery] = useState<string | null>(null);
  useEffect(() => setDelivery(deliveryWindow()), []);

  return (
    <div className="pdp">
      <div className="pdp-gallery">
        <div className="pdp-main">
          <ProductImage product={product} src={slides[active]} sizes="(max-width: 900px) 100vw, 55vw" preload />
          {product.badge && <span className="tag">{product.badge}</span>}
        </div>
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
                <ProductImage product={product} src={src} sizes="96px" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pdp-info">
        <p className="eyebrow">Handgeknüpft · {product.color}</p>
        <h1 className="pdp-title">{product.name}</h1>
        <p className="pdp-price">
          {product.compareAtPrice && <s>{formatPrice(product.compareAtPrice)}</s>}
          {formatPrice(product.price)}
        </p>
        <p className="muted small">
          {site.taxNote} ·{" "}
          <Link href="/versand-rueckgabe" className="underline">
            Versandinformationen
          </Link>
        </p>
        <p className="pdp-lead">{product.shortDescription}</p>

        <div className="pdp-option">
          <div className="pdp-option-head">
            <span>
              Farbe: <strong>{product.color}</strong>
            </span>
          </div>
          <div className="swatches" aria-label="Farbe wählen">
            {catalog.map((p) => (
              <Link
                key={p.slug}
                href={`/produkt/${p.slug}`}
                className={`swatch ${p.slug === product.slug ? "is-active" : ""}`}
                aria-label={`${p.name} (${p.color})`}
                aria-current={p.slug === product.slug ? "page" : undefined}
                title={p.color}
                scroll={false}
              >
                <CordSwatch art={p.art} size={34} />
              </Link>
            ))}
          </div>
        </div>

        {product.sizes.length === 1 ? (
          <p className="pdp-fit">
            <strong>Größe:</strong> stufenlos verstellbar über zwei Schiebeknoten – passt für nahezu jedes Handgelenk.{" "}
            <Link href="/tragen" className="underline">
              So funktioniert’s
            </Link>
          </p>
        ) : (
        <div className="pdp-option">
          <div className="pdp-option-head">
            <span>
              Größe{size && <strong>: {size}</strong>}
            </span>
            <Link href="/tragen" className="underline small">
              Tragen & Größe
            </Link>
          </div>
          <div className="size-grid" role="radiogroup" aria-label="Größe wählen">
            {product.sizes.map((s) => (
              <button
                key={s}
                role="radio"
                aria-checked={size === s}
                className={`size-btn ${size === s ? "is-active" : ""}`}
                onClick={() => {
                  setSize(s);
                  setSizeError(false);
                }}
              >
                {s}
              </button>
            ))}
          </div>
          {sizeError && <p className="form-error">Bitte wähle eine Größe.</p>}
        </div>
        )}

        <div className="pdp-buy">
          <QuantityStepper value={quantity} onChange={setQuantity} min={1} />
          <button className="btn btn-primary btn-grow" onClick={add} disabled={product.soldOut}>
            {product.soldOut ? "Ausverkauft" : `In den Warenkorb · ${formatPrice(product.price * quantity)}`}
          </button>
        </div>
        <WishlistButton slug={product.slug} withLabel className="wish-inline" />

        <ul className="pdp-trust">
          <li>
            <TruckIcon />
            <span>
              Lieferung voraussichtlich{" "}
              <strong>{delivery ?? `in ${site.shipping.standard.minDays}–${site.shipping.standard.maxDays} Werktagen`}</strong>. Kostenlos ab {formatPrice(site.shipping.freeFrom)}.
            </span>
          </li>
          <li>
            <ReturnIcon />
            <span>{site.returnDays} Tage Rückgaberecht.</span>
          </li>
          <li>
            <LockIcon />
            <span>Sichere Zahlung mit Kreditkarte, PayPal oder Klarna.</span>
          </li>
        </ul>
        <PaymentBadges />

        <div className="accordion">
          <details open>
            <summary>
              Beschreibung <ChevronIcon />
            </summary>
            <p>{product.description}</p>
          </details>
          <details>
            <summary>
              Details & Material <ChevronIcon />
            </summary>
            <p>{productInfo.material}</p>
            <ul className="bullets">
              {productInfo.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </details>
          <details>
            <summary>
              Pflege <ChevronIcon />
            </summary>
            <p>{productInfo.care}</p>
          </details>
          <details>
            <summary>
              Versand & Rückgabe <ChevronIcon />
            </summary>
            <p>
              {site.shipping.standard.label}: {formatPrice(site.shipping.standard.amount)}, ab{" "}
              {formatPrice(site.shipping.freeFrom)} kostenlos. {site.shipping.express.label}:{" "}
              {formatPrice(site.shipping.express.amount)}. Du kannst deine Bestellung innerhalb von {site.returnDays}{" "}
              Tagen zurückgeben. <Link href="/versand-rueckgabe" className="underline">Mehr erfahren</Link>
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
