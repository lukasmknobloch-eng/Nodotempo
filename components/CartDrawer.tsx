"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useShop } from "./ShopProvider";
import { CloseIcon, LockIcon } from "./Icons";
import { ProductImage } from "./ProductImage";
import { QuantityStepper } from "./QuantityStepper";
import { FreeShippingBar } from "./FreeShippingBar";
import { PaymentBadges } from "./PaymentBadges";
import { useCheckout } from "./useCheckout";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

export function CartDrawer() {
  const { cartOpen, setCartOpen, lines, subtotal, count, setQuantity, removeFromCart } = useShop();
  const { checkout, loading, error } = useCheckout();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  return (
    <div className={`drawer ${cartOpen ? "is-open" : ""}`} aria-hidden={!cartOpen}>
      <div className="drawer-backdrop" onClick={() => setCartOpen(false)} />
      <aside className="drawer-panel" role="dialog" aria-label="Warenkorb" aria-modal="true">
        <div className="drawer-head">
          <h2>
            Warenkorb <span className="muted">({count})</span>
          </h2>
          <button className="icon-btn" aria-label="Warenkorb schließen" onClick={() => setCartOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p className="serif-lg">Dein Warenkorb ist leer.</p>
            <p className="muted">Entdecke Armbänder, die neben der Zeit bestehen.</p>
            <Link href="/shop" className="btn btn-primary" onClick={() => setCartOpen(false)}>
              Zur Kollektion
            </Link>
          </div>
        ) : (
          <>
            <FreeShippingBar subtotal={subtotal} />
            <ul className="drawer-lines">
              {lines.map((line) => (
                <li key={line.key} className="cart-line">
                  <Link href={`/produkt/${line.slug}`} className="cart-line-img" onClick={() => setCartOpen(false)}>
                    <ProductImage product={line.product} src={line.product.images[0]} sizes="96px" />
                  </Link>
                  <div className="cart-line-body">
                    <div className="cart-line-top">
                      <Link href={`/produkt/${line.slug}`} onClick={() => setCartOpen(false)} className="cart-line-name">
                        {line.product.name}
                      </Link>
                      <span>{formatPrice(line.lineTotal)}</span>
                    </div>
                    <p className="muted small">Größe {line.size}</p>
                    <div className="cart-line-actions">
                      <QuantityStepper small value={line.quantity} onChange={(q) => setQuantity(line.slug, line.size, q)} />
                      <button className="link-btn small" onClick={() => removeFromCart(line.slug, line.size)}>
                        Entfernen
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <div className="summary-row">
                <span>Zwischensumme</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className="muted small">{site.taxNote}. Versand und Rabattcodes im nächsten Schritt.</p>
              {error && <p className="form-error">{error}</p>}
              <button className="btn btn-primary btn-block" onClick={checkout} disabled={loading}>
                <LockIcon size={16} /> {loading ? "Einen Moment …" : "Sicher zur Kasse"}
              </button>
              <Link href="/warenkorb" className="btn btn-ghost btn-block" onClick={() => setCartOpen(false)}>
                Warenkorb ansehen
              </Link>
              <PaymentBadges className="center" />
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
