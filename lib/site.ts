// Zentrale Shop-Einstellungen. Hier lassen sich Texte, Versandkosten und
// Firmendaten an einer Stelle anpassen.

export const site = {
  name: "Nodotempo",
  claim: "Armbänder, getragen neben der Zeit.",
  description:
    "Nodotempo – handgeknüpfte Paracord-Armbänder. Entworfen, um neben der Uhr getragen zu werden – und ohne sie zu bestehen.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hallo@nodotempo.de",
  instagram: "https://instagram.com/nodo.tempo",
  instagramHandle: "nodo.tempo",

  // Angaben für Impressum & Rechtstexte – bitte vor dem Livegang ausfüllen.
  company: {
    owner: "[Vor- und Nachname]",
    legalName: "Nodotempo – Inhaber [Vor- und Nachname]",
    street: "[Straße Hausnummer]",
    city: "[PLZ Ort]",
    country: "Deutschland",
    phone: "[Telefonnummer]",
    vatId: "[USt-IdNr., falls vorhanden]",
  },

  currency: "EUR",
  locale: "de-DE",
  taxNote: "inkl. MwSt., zzgl. Versand",

  shipping: {
    // Beträge in Cent
    freeFrom: 5000,
    standard: { label: "Standardversand (2–4 Werktage)", amount: 390, minDays: 2, maxDays: 4 },
    express: { label: "Expressversand (1–2 Werktage)", amount: 990, minDays: 1, maxDays: 2 },
    countries: ["DE", "AT", "CH", "NL", "BE", "LU", "FR", "IT", "ES", "DK"] as const,
  },

  returnDays: 30,
} as const;

export const navigation = [
  { href: "/shop", label: "Alle Armbänder" },
  { href: "/produkt/nodo-no-2", label: "Nodo No. 2" },
  { href: "/produkt/nodo-no-1", label: "Nodo No. 1" },
  { href: "/tragen", label: "Tragen & Größe" },
  { href: "/ueber-uns", label: "Die Marke" },
];
