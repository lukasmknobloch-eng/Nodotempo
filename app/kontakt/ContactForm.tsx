"use client";

import Link from "next/link";
import { useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/kontakt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }

  if (state === "done") {
    return (
      <div className="form-card">
        <p className="serif-lg">Danke für deine Nachricht.</p>
        <p className="muted">Wir melden uns so schnell wie möglich bei dir.</p>
      </div>
    );
  }

  return (
    <form className="form-card form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Name*
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          E-Mail*
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <div className="form-row">
        <label>
          Thema
          <select name="topic" defaultValue="Allgemeine Frage">
            <option>Allgemeine Frage</option>
            <option>Meine Bestellung</option>
            <option>Rückgabe & Umtausch</option>
            <option>Größe & Beratung</option>
            <option>Kooperation & Presse</option>
          </select>
        </label>
        <label>
          Bestellnummer (optional)
          <input name="order" />
        </label>
      </div>
      <label>
        Nachricht*
        <textarea name="message" rows={6} required />
      </label>
      <p className="small muted">
        Mit dem Absenden stimmst du der Verarbeitung deiner Angaben zur Beantwortung deiner Anfrage zu. Mehr in der{" "}
        <Link href="/datenschutz" className="underline">Datenschutzerklärung</Link>.
      </p>
      {state === "error" && <p className="form-error">Senden fehlgeschlagen. Bitte versuche es erneut.</p>}
      <button className="btn btn-primary" disabled={state === "loading"}>
        {state === "loading" ? "Wird gesendet …" : "Nachricht senden"}
      </button>
    </form>
  );
}
