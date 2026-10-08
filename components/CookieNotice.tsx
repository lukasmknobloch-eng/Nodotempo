"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "nodotempo.notice.v1";

// Der Shop nutzt nur technisch notwendigen lokalen Speicher (Warenkorb,
// Wunschliste). Werden später Analyse- oder Marketing-Tools eingebunden,
// muss hier ein echtes Einwilligungs-Banner (Consent) eingebaut werden.
export function CookieNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      setShow(!localStorage.getItem(KEY));
    } catch {
      setShow(false);
    }
  }, []);

  if (!show) return null;

  const accept = () => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
    setShow(false);
  };

  return (
    <div className="cookie" role="region" aria-label="Hinweis zu Cookies">
      <p>
        Wir verwenden ausschließlich technisch notwendige Speicher, damit Warenkorb und Wunschliste funktionieren. Kein
        Tracking. Mehr in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
      </p>
      <button className="btn btn-primary btn-sm" onClick={accept}>
        Verstanden
      </button>
    </div>
  );
}
