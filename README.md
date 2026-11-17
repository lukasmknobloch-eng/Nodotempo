# Nodotempo – Online-Shop

Hochwertiger Online-Shop für Nodotempo-Armbänder. Gebaut mit **Next.js** und **Stripe**
(Kreditkarte, Apple Pay, Google Pay, **PayPal** und **Klarna** über eine einzige Integration).

## Funktionen

- Startseite im Fashion-Stil: großes Bild, Produktraster, Bildstrecken, Instagram-Raster
- Shop mit allen Farben, Filter nach Modell, Sortierung und Suche
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

Jede Farbe hat einen eigenen Ordner:

```
public/produkte/nodo-no-2/gelb/1.jpg   ← Hauptbild (Übersicht & Produktseite)
public/produkte/nodo-no-2/gelb/2.jpg   ← erscheint beim Darüberfahren
public/produkte/nodo-no-2/gelb/3.jpg   ← weitere Bilder in der Galerie
```

- Erlaubt: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, sortiert nach Dateiname.
- Empfohlen: quadratisch, mindestens 1500 × 1500 px, gleicher Hintergrund wie die bisherigen Fotos.
- Neue Farbe: in `lib/products.ts` eine Zeile bei `variants` ergänzen und den Ordner anlegen.

Bilder der Startseite (optional, ersetzen die Produktfotos) in `public/bilder/`:

| Datei | Wo |
| --- | --- |
| `hero.jpg` | großes Bild ganz oben (Querformat) |
| `editorial-1.jpg`, `editorial-2.jpg` | zwei Bilder nebeneinander |
| `banner.jpg` | breites Bild für Nodo No. 1 |
| `feature.jpg` | großes Bild links neben dem Produkt (Hochformat 4:5) |
| `instagram-1.jpg` … `instagram-6.jpg` | Instagram-Raster |
| `marke.jpg` | Seite „Die Marke“ |

## Produkte, Preise & Texte ändern

- **Produkte:** `lib/products.ts` – Modelle (Nodo No. 1, Nodo No. 2), Preise in Cent, Farben, „ausverkauft“ (`soldOut`), „bald verfügbar“ (`comingSoon`).
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
