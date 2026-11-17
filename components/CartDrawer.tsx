"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useShop } from "./ShopProvider";
import { CloseIcon } from "./Icons";
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

  const close = () => setCartOpen(false);

  return (
    <div className={`drawer ${cartOpen ? "is-open" : ""}`} aria-hidden={!cartOpen}>
      <div className="drawer-backdrop" onClick={close} />
      <aside className="drawer-panel" role="dialog" aria-label="Warenkorb" aria-modal="true">
        <div className="drawer-head">
          <h2>Warenkorb ({count})</h2>
          <button className="header-link" aria-label="Warenkorb schließen" onClick={close}>
            <CloseIcon size={18} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p>Dein Warenkorb ist leer.</p>
            <Link href="/shop" className="btn btn-outline" onClick={close}>
              Armbänder ansehen
            </Link>
          </div>
        ) : (
          <>
            <FreeShippingBar subtotal={subtotal} />
            <ul className="drawer-lines">
              {lines.map((line) => (
                <li key={line.key} className="cart-line">
                  <Link href={line.href} className="cart-line-img" onClick={close}>
                    <ProductImage src={line.image} alt={line.product.name} sizes="96px" />
                  </Link>
                  <div className="cart-line-body">
                    <div className="cart-line-top">
                      <Link href={line.href} onClick={close} className="cart-line-name">
                        {line.product.name}
                      </Link>
                      <span>{formatPrice(line.lineTotal)}</span>
                    </div>
                    {line.variantInfo && <p className="muted">{line.variantInfo.name}</p>}
                    <div className="cart-line-actions">
                      <QuantityStepper small value={line.quantity} onChange={(q) => setQuantity(line.slug, line.variant, q)} />
                      <button className="link-btn" onClick={() => removeFromCart(line.slug, line.variant)}>
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
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="muted small">{site.taxNote}. Versand und Rabattcodes im nächsten Schritt.</p>
              {error && <p className="form-error">{error}</p>}
              <button className="btn btn-primary btn-block" onClick={checkout} disabled={loading}>
                {loading ? "Einen Moment …" : "Zur Kasse"}
              </button>
              <Link href="/warenkorb" className="btn btn-outline btn-block" onClick={close}>
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
