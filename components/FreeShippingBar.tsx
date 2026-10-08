import { site } from "@/lib/site";
import { formatPrice } from "@/lib/format";

export function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const missing = site.shipping.freeFrom - subtotal;
  const progress = Math.min(100, (subtotal / site.shipping.freeFrom) * 100);
  return (
    <div className="shipping-bar">
      <p>
        {missing > 0 ? (
          <>
            Noch <strong>{formatPrice(missing)}</strong> bis zum kostenlosen Versand
          </>
        ) : (
          <>Dein Versand ist <strong>kostenlos</strong></>
        )}
      </p>
      <div className="shipping-bar-track">
        <div className="shipping-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
