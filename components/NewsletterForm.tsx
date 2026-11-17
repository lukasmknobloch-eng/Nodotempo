"use client";

import Link from "next/link";
import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }

  if (state === "done") {
    return <p className="newsletter-done">Danke! Bitte bestätige deine Anmeldung über den Link in deinem Postfach.</p>;
  }

  return (
    <form className="newsletter" onSubmit={submit}>
      <div className="newsletter-row">
        <input
          type="email"
          required
          placeholder="Deine E-Mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="E-Mail-Adresse"
        />
        <button className="text-btn" disabled={state === "loading"}>
          Abonnieren
        </button>
      </div>
      {state === "error" && <p className="form-error">Das hat leider nicht geklappt. Bitte versuche es erneut.</p>}
      <p className="muted small">
        Abmeldung jederzeit möglich. Hinweise in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>
    </form>
  );
}
