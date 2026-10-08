import { NextResponse } from "next/server";

type Body = { name?: string; email?: string; topic?: string; order?: string; message?: string };

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as Body;
  const name = body.name?.trim().slice(0, 200);
  const email = body.email?.trim().slice(0, 200);
  const message = body.message?.trim().slice(0, 5000);
  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Bitte fülle alle Pflichtfelder aus." }, { status: 400 });
  }
  const topic = body.topic?.slice(0, 100) ?? "Allgemein";
  const order = body.order?.slice(0, 100) ?? "";

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Ohne E-Mail-Dienst wird die Nachricht nur im Server-Log ausgegeben.
    console.log("[kontakt] Neue Nachricht:", { name, email, topic, order, message });
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Nodotempo <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? "hallo@nodotempo.de",
      reply_to: email,
      subject: `Kontaktanfrage: ${topic}${order ? ` (Bestellung ${order})` : ""}`,
      html: `<p><strong>${escape(name)}</strong> (${escape(email)})</p><p>Thema: ${escape(topic)}<br/>Bestellnummer: ${escape(order || "–")}</p><p>${escape(message).replace(/\n/g, "<br/>")}</p>`,
    }),
  });
  if (!res.ok) {
    console.error("[kontakt] Versand fehlgeschlagen", await res.text());
    return NextResponse.json({ error: "Nachricht konnte nicht gesendet werden." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
