import type { Metadata } from "next";
import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { formatPrice } from "@/lib/format";
import { ClearCart } from "./ClearCart";

export const metadata: Metadata = { title: "Vielen Dank für deine Bestellung", robots: { index: false } };

type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function SuccessPage({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const stripe = getStripe();

  const session =
    stripe && session_id?.startsWith("cs_")
      ? await stripe.checkout.sessions.retrieve(session_id, { expand: ["line_items"] }).catch(() => null)
      : null;

  const paid = session && (session.payment_status === "paid" || session.payment_status === "no_payment_required");
  const shippingCost = session?.shipping_cost?.amount_total ?? 0;

  return (
    <div className="container page success">
      {session && <ClearCart />}
      <p className="eyebrow">Bestellung {paid ? "bestätigt" : "eingegangen"}</p>
      <h1 className="h1">Vielen Dank{session?.customer_details?.name ? `, ${session.customer_details.name.split(" ")[0]}` : ""}.</h1>
      <p className="page-lead">
        {paid
          ? "Deine Zahlung war erfolgreich. Wir bereiten dein Armband jetzt mit Sorgfalt für den Versand vor."
          : "Wir haben deine Bestellung erhalten. Sobald die Zahlung bestätigt ist, bereiten wir den Versand vor."}
        {session?.customer_details?.email && (
          <> Eine Bestätigung geht an <strong>{session.customer_details.email}</strong>.</>
        )}
      </p>

      {session?.line_items && (
        <div className="success-card">
          <p className="small muted">Bestellnummer: {session.id.slice(-10).toUpperCase()}</p>
          <ul>
            {session.line_items.data.map((li) => (
              <li key={li.id} className="summary-row">
                <span>
                  {li.quantity} × {li.description}
                </span>
                <span>{formatPrice(li.amount_total)}</span>
              </li>
            ))}
            <li className="summary-row">
              <span>Versand</span>
              <span>{shippingCost === 0 ? "Kostenlos" : formatPrice(shippingCost)}</span>
            </li>
            {session.total_details?.amount_discount ? (
              <li className="summary-row">
                <span>Rabatt</span>
                <span>−{formatPrice(session.total_details.amount_discount)}</span>
              </li>
            ) : null}
            <li className="summary-row summary-total">
              <span>Gesamt</span>
              <strong>{formatPrice(session.amount_total ?? 0)}</strong>
            </li>
          </ul>
        </div>
      )}

      <div className="hero-actions">
        <Link href="/shop" className="btn btn-primary">
          Weiter einkaufen
        </Link>
        <Link href="/kontakt" className="btn btn-ghost">
          Fragen zur Bestellung?
        </Link>
      </div>
    </div>
  );
}
