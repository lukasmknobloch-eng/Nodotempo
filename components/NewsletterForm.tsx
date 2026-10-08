"use client";

import { useState } from "react";

export function NewsletterForm({ dark }: { dark?: boolean }) {
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
    <form className={`newsletter ${dark ? "newsletter-dark" : ""}`} onSubmit={submit}>
      <div className="newsletter-row">
        <input
          type="email"
          required
          placeholder="Deine E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="E-Mail-Adresse"
        />
        <button className="btn btn-primary" disabled={state === "loading"}>
          Anmelden
        </button>
      </div>
      {state === "error" && <p className="form-error">Das hat leider nicht geklappt. Bitte versuche es erneut.</p>}
      <p className="small muted">
        Neuheiten, limitierte Auflagen und exklusive Vorabzugänge. Abmeldung jederzeit möglich. Hinweise in der{" "}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>
    </form>
  );
}
