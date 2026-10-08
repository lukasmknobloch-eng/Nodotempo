import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getCatalogProduct } from "@/lib/catalog";
import { site } from "@/lib/site";

type Item = { slug: string; size: string; quantity: number };

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Die Zahlung ist noch nicht eingerichtet. Bitte STRIPE_SECRET_KEY in der .env-Datei hinterlegen." },
      { status: 503 },
    );
  }

  let items: Item[];
  try {
    const body = (await req.json()) as { items?: Item[] };
    items = Array.isArray(body.items) ? body.items : [];
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }
  if (items.length === 0 || items.length > 50) {
    return NextResponse.json({ error: "Dein Warenkorb ist leer." }, { status: 400 });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  const canShowImages = origin.startsWith("https://");

  // Preise werden ausschließlich serverseitig aus dem Katalog übernommen –
  // niemals aus der Anfrage des Browsers.
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let subtotal = 0;
  for (const item of items) {
    const product = getCatalogProduct(String(item.slug));
    const quantity = Math.floor(Number(item.quantity));
    if (!product || product.soldOut || !product.sizes.includes(item.size) || !(quantity >= 1 && quantity <= 10)) {
      return NextResponse.json(
        { error: "Ein Artikel in deinem Warenkorb ist nicht mehr verfügbar. Bitte aktualisiere den Warenkorb." },
        { status: 400 },
      );
    }
    subtotal += product.price * quantity;
    lineItems.push({
      quantity,
      price_data: {
        currency: "eur",
        unit_amount: product.price,
        tax_behavior: "inclusive",
        product_data: {
          name: `${product.name} – Größe ${item.size}`,
          description: product.shortDescription,
          images: canShowImages ? product.images.slice(0, 1).map((src) => new URL(src, origin).toString()) : undefined,
          metadata: { slug: product.slug, size: item.size },
        },
      },
    });
  }

  const { shipping } = site;
  const freeShipping = subtotal >= shipping.freeFrom;
  const rate = (
    label: string,
    amount: number,
    min: number,
    max: number,
  ): Stripe.Checkout.SessionCreateParams.ShippingOption => ({
    shipping_rate_data: {
      type: "fixed_amount",
      display_name: label,
      fixed_amount: { amount, currency: "eur" },
      tax_behavior: "inclusive",
      delivery_estimate: {
        minimum: { unit: "business_day", value: min },
        maximum: { unit: "business_day", value: max },
      },
    },
  });

  const configured = (process.env.STRIPE_PAYMENT_METHODS ?? "card,paypal,klarna").trim();
  const paymentMethods =
    configured === "auto"
      ? undefined
      : (configured.split(",").map((s) => s.trim()).filter(Boolean) as Stripe.Checkout.SessionCreateParams.AllowedPaymentMethodType[]);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      locale: "de",
      line_items: lineItems,
      allowed_payment_method_types: paymentMethods,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      shipping_address_collection: { allowed_countries: [...shipping.countries] },
      phone_number_collection: { enabled: true },
      shipping_options: [
        rate(
          freeShipping ? "Kostenloser Standardversand (2–4 Werktage)" : shipping.standard.label,
          freeShipping ? 0 : shipping.standard.amount,
          shipping.standard.minDays,
          shipping.standard.maxDays,
        ),
        rate(shipping.express.label, shipping.express.amount, shipping.express.minDays, shipping.express.maxDays),
      ],
      submit_type: "pay",
      custom_text: {
        submit: {
          message: `Mit deiner Bestellung akzeptierst du unsere AGB (${origin}/agb) und hast die Widerrufsbelehrung (${origin}/widerruf) sowie die Datenschutzerklärung (${origin}/datenschutz) zur Kenntnis genommen.`,
        },
      },
      metadata: {
        cart: JSON.stringify(items.map((i) => [i.slug, i.size, i.quantity])).slice(0, 500),
      },
      success_url: `${origin}/bestellung/erfolg?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/warenkorb`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout] Stripe-Fehler:", err);
    return NextResponse.json(
      { error: "Der Bezahlvorgang konnte nicht gestartet werden. Bitte versuche es später erneut." },
      { status: 500 },
    );
  }
}
