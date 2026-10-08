# Nodotempo – Online-Shop

Hochwertiger Online-Shop für Nodotempo-Armbänder. Gebaut mit **Next.js** und **Stripe**
(Kreditkarte, Apple Pay, Google Pay, **PayPal** und **Klarna** über eine einzige Integration).

## Funktionen

- Startseite mit Markengeschichte, Farbübersicht und ausgewählten Armbändern
- Shop mit allen 15 Farben, Sortierung und Suche
- Produktseiten mit Bildergalerie, Farbwechsler, Menge, Lieferdatum, Material- & Pflegehinweisen
- Warenkorb (Seitenleiste + eigene Seite) mit Fortschrittsbalken „kostenloser Versand“
- Wunschliste, Schnellsuche, Seite „Tragen & Größe“
- Sicherer Checkout über Stripe (Rabattcodes, Express-/Standardversand, Lieferadresse)
- Bestellbestätigungsseite, Webhook für bezahlte Bestellungen
- Kontaktformular, Newsletter-Anmeldung, FAQ, Versand & Rückgabe
- Impressum, Datenschutz, AGB, Widerrufsbelehrung (Vorlagen)
- Responsive für Smartphone, Tablet und Desktop, SEO (Sitemap, strukturierte Produktdaten)

## Lokal starten

```bash
npm install
cp .env.example .env.local   # Schlüssel eintragen
npm run dev                  # http://localhost:3000
```

## Produktbilder einfügen

Fotos einfach in den Ordner des jeweiligen Artikels legen:

```
public/produkte/nodo-notte/1.jpg
public/produkte/nodo-notte/2.jpg
```

- Erlaubt: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` – sortiert nach Dateiname (1, 2, 3 …).
- Das erste Bild ist das Hauptbild, das zweite erscheint beim Darüberfahren in der Übersicht.
- Empfohlen: Hochformat 4:5, mindestens 1600 × 2000 px.
- Solange kein Foto vorhanden ist, zeigt der Shop eine gezeichnete Vorschau.

Weitere Bilder der Website (optional, ersetzen die Illustrationen):

| Datei                            | Wo                         |
| -------------------------------- | -------------------------- |
| `public/bilder/hero.jpg`         | Großes Bild Startseite     |
| `public/bilder/story.jpg`        | „Der Name“ auf der Startseite |
| `public/bilder/geschenk.jpg`     | Geschenk-Abschnitt         |
| `public/bilder/marke.jpg`        | Seite „Die Marke“          |

Nach dem Hinzufügen von Bildern muss die Seite neu gebaut werden (bei Vercel passiert das
automatisch mit jedem Push).

## Produkte, Preise & Texte ändern

- **Produkte:** `lib/products.ts` – Farben, Namen, Beschreibungen, Preis (`PRICE`, in Cent), „ausverkauft“. Eine neue Farbe = eine neue Zeile in der Farbliste.
- **Shop-Einstellungen:** `lib/site.ts` – Versandkosten, Grenze für kostenlosen Versand,
  Lieferländer, Rückgabefrist, Firmendaten fürs Impressum.
- **Logo:** `components/Logo.tsx` (vorläufiges Logo) und `app/icon.svg` (Browser-Icon).

## Zahlungen einrichten (Stripe)

1. Konto bei [stripe.com](https://stripe.com) anlegen und verifizieren.
2. Unter **Einstellungen → Zahlungsmethoden** **PayPal** und **Klarna** aktivieren
   (Karten, Apple Pay & Google Pay sind standardmäßig aktiv).
3. API-Schlüssel (`sk_test_…` bzw. `sk_live_…`) als `STRIPE_SECRET_KEY` eintragen.
4. Webhook anlegen: **Entwickler → Webhooks →** URL `https://<deine-domain>/api/webhook`,
   Events `checkout.session.completed`, `checkout.session.async_payment_succeeded`,
   `checkout.session.async_payment_failed`. Das Signatur-Geheimnis als `STRIPE_WEBHOOK_SECRET` eintragen.
5. Unter **Einstellungen → E-Mails** „Erfolgreiche Zahlungen“ aktivieren, damit Kund:innen automatisch
   eine Quittung erhalten.
6. Rabattcodes unter **Produkte → Gutscheine** anlegen – sie sind im Checkout sofort einlösbar.

Alle Bestellungen erscheinen im Stripe-Dashboard unter **Zahlungen**.

## Veröffentlichen

Am einfachsten über [Vercel](https://vercel.com): Repository importieren, die Umgebungsvariablen
aus `.env.example` eintragen (inkl. `NEXT_PUBLIC_SITE_URL=https://deine-domain.de`) und Domain verbinden.

## Vor dem Livegang

- [ ] Firmendaten in `lib/site.ts` ausfüllen
- [ ] Impressum, Datenschutz, AGB und Widerrufsbelehrung rechtlich prüfen lassen (Vorlagen!)
- [ ] Produkttexte, Materialangaben und Preise prüfen (aktuell Beispielinhalte)
- [ ] Stripe auf Live-Schlüssel umstellen, Testbestellung durchführen
- [ ] Newsletter-Dienst anbinden (`app/api/newsletter/route.ts`, Double-Opt-in)
- [ ] Optional: `RESEND_API_KEY` für das Kontaktformular setzen
