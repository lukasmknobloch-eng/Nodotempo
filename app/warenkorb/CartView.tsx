"use client";

import Link from "next/link";
import { useShop } from "@/components/ShopProvider";
import { ProductImage } from "@/components/ProductImage";
import { QuantityStepper } from "@/components/QuantityStepper";
import { FreeShippingBar } from "@/components/FreeShippingBar";
import { PaymentBadges } from "@/components/PaymentBadges";
import { LockIcon, ReturnIcon, TruckIcon } from "@/components/Icons";
import { useCheckout } from "@/components/useCheckout";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export function CartView() {
  const { lines, subtotal, setQuantity, removeFromCart, ready } = useShop();
  const { checkout, loading, error } = useCheckout();
  const shipping = subtotal >= site.shipping.freeFrom ? 0 : site.shipping.standard.amount;

  if (!ready) return <div className="page-head"><h1 className="h1">Warenkorb</h1></div>;

  if (lines.length === 0) {
    return (
      <div className="empty empty-page">
        <h1 className="h1">Dein Warenkorb ist leer.</h1>
        <p className="muted">Entdecke Armbänder, die neben der Zeit bestehen.</p>
        <Link href="/shop" className="btn btn-primary">
          Zur Kollektion
        </Link>
      </div>
    );
  }

  return (
    <>
      <header className="page-head">
        <h1 className="h1">Warenkorb</h1>
      </header>
      <div className="cart-layout">
        <ul className="cart-table">
          {lines.map((line) => (
            <li key={line.key} className="cart-line cart-line-lg">
              <Link href={`/produkt/${line.slug}`} className="cart-line-img">
                <ProductImage product={line.product} src={line.product.images[0]} sizes="140px" />
              </Link>
              <div className="cart-line-body">
                <div className="cart-line-top">
                  <div>
                    <Link href={`/produkt/${line.slug}`} className="cart-line-name">
                      {line.product.name}
                    </Link>
                    <p className="muted small">Größe {line.size} · {formatPrice(line.product.price)} / Stück</p>
                  </div>
                  <strong>{formatPrice(line.lineTotal)}</strong>
                </div>
                <div className="cart-line-actions">
                  <QuantityStepper value={line.quantity} onChange={(q) => setQuantity(line.slug, line.size, q)} />
                  <button className="link-btn small" onClick={() => removeFromCart(line.slug, line.size)}>
                    Entfernen
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="cart-summary">
          <h2 className="h3">Übersicht</h2>
          <FreeShippingBar subtotal={subtotal} />
          <div className="summary-row">
            <span>Zwischensumme</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-row">
            <span>Versand (Deutschland)</span>
            <span>{shipping === 0 ? "Kostenlos" : formatPrice(shipping)}</span>
          </div>
          <div className="summary-row summary-total">
            <span>Gesamt</span>
            <strong>{formatPrice(subtotal + shipping)}</strong>
          </div>
          <p className="muted small">
            inkl. MwSt. Rabattcodes kannst du im nächsten Schritt einlösen. Versandkosten ins Ausland werden an der Kasse
            berechnet.
          </p>
          {error && <p className="form-error">{error}</p>}
          <button className="btn btn-primary btn-block" onClick={checkout} disabled={loading}>
            <LockIcon size={16} /> {loading ? "Einen Moment …" : "Sicher zur Kasse"}
          </button>
          <PaymentBadges className="center" />
          <ul className="cart-assurance">
            <li>
              <TruckIcon size={18} /> Versand in 1–2 Werktagen
            </li>
            <li>
              <ReturnIcon size={18} /> {site.returnDays} Tage Rückgabe
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}
