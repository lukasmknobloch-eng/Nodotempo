import { NextResponse } from "next/server";

// Platzhalter: Hier einen Newsletter-Dienst anbinden (z. B. Brevo, Mailchimp
// oder Klaviyo). In Deutschland ist das Double-Opt-in-Verfahren Pflicht – die
// genannten Dienste übernehmen das automatisch.
export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Ungültige E-Mail-Adresse" }, { status: 400 });
  }
  console.log("[newsletter] Neue Anmeldung:", email);
  return NextResponse.json({ ok: true });
}
