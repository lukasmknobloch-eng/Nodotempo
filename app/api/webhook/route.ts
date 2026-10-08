import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

// Stripe meldet hier abgeschlossene Zahlungen. Im Stripe-Dashboard unter
// Entwickler → Webhooks die URL https://<deine-domain>/api/webhook eintragen
// und die Events "checkout.session.completed",
// "checkout.session.async_payment_succeeded" und
// "checkout.session.async_payment_failed" auswählen.

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Webhook nicht konfiguriert" }, { status: 503 });

  const signature = req.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "Signatur fehlt" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(await req.text(), signature, secret);
  } catch (err) {
    console.error("[webhook] Ungültige Signatur", err);
    return NextResponse.json({ error: "Ungültige Signatur" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const session = event.data.object;
      if (session.payment_status === "paid") {
        await fulfillOrder(session);
      }
      break;
    }
    case "checkout.session.async_payment_failed":
      console.warn("[webhook] Zahlung fehlgeschlagen:", event.data.object.id);
      break;
  }

  return NextResponse.json({ received: true });
}

async function fulfillOrder(session: Stripe.Checkout.Session) {
  // Hier kann die Bestellung weiterverarbeitet werden, z. B.:
  //  – Bestellbestätigung per E-Mail senden
  //  – Versandetikett erstellen (DHL, Sendcloud, …)
  //  – Lagerbestand reduzieren
  // Alle Bestellungen sind zusätzlich im Stripe-Dashboard unter "Zahlungen" sichtbar.
  console.log("[webhook] Neue bezahlte Bestellung:", {
    id: session.id,
    email: session.customer_details?.email,
    total: session.amount_total,
    cart: session.metadata?.cart,
  });
}
