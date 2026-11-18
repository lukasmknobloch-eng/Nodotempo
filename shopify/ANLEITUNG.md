# Shopify einrichten – Schritt für Schritt

Shop-Adresse: **nodotempo.myshopify.com** (Admin: `admin.shopify.com`)

## 1. Theme verbinden (Design)
1. **Onlineshop → Themes → Theme hinzufügen → Über GitHub verbinden**
2. GitHub-Konto verbinden, Repository **Nodotempo**, Branch **`shopify-theme`** wählen
3. Beim neuen Theme „Nodotempo“ auf **⋯ → Veröffentlichen**

Ab jetzt übernimmt Shopify jede Änderung, die Claude auf diesem Branch hochlädt, automatisch.

## 2. Produkte importieren
1. Datei `shopify/produkte-import.csv` aus dem Repository herunterladen
2. **Produkte → Importieren** → Datei auswählen → **Produkte importieren**
3. Ergebnis: Nodo No. 2 (11 Farben, 17,90 €) und Nodo No. 1 (7 Farben, 14,90 €) mit allen Fotos

Wichtig: Der Alt-Text der Bilder (z. B. `Cielo | Blau / Weiß`) ordnet die Fotos den Farben zu. Bei neuen Fotos immer so benennen.

## 3. Seiten anlegen
**Onlineshop → Seiten → Seite hinzufügen**, Inhalt leer lassen, rechts unter **Theme-Vorlage** wählen:

| Titel | Vorlage | Adresse (unter „Suchmaschinen-Listing“) |
| --- | --- | --- |
| Häufige Fragen | `faq` | `faq` |
| Tragen & Größe | `tragen` | `tragen` |
| Die Marke | `marke` | `marke` |
| Kontakt | `kontakt` | `kontakt` |

Die Texte stehen schon im Theme und lassen sich im Theme-Editor ändern.

## 4. Rechtstexte
**Einstellungen → Richtlinien**: Texte aus `shopify/rechtstexte.md` einfügen. Prüfen lassen!

## 5. Steuern (Kleinunternehmer)
**Einstellungen → Steuern und Zölle → Deutschland**: keine Umsatzsteuer erheben. Im Theme steht bereits „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.“

## 6. Versand
**Einstellungen → Versand und Zustellung**: Versandzone Deutschland, Standard 3,90 €, kostenlos ab 50 € (Bedingung: Bestellwert). Weitere Länder nach Bedarf.

## 7. Zahlungen
**Einstellungen → Zahlungen**: Shopify Payments aktivieren (Ausweis, Bankkonto). Damit gehen Karte, Apple Pay, Google Pay und Klarna. PayPal zusätzlich verbinden.

## 8. Vorschau nur für Freunde (Passwort)
**Onlineshop → Einstellungen → Passwortschutz**: Passwort festlegen und an Freunde weitergeben. Sie sehen den ganzen Shop mit allen Farben. Die Passwortseite ist im Nodotempo-Design und hat ein Newsletter-Feld für alle ohne Passwort.

## 9. Bilder im Theme-Editor
**Onlineshop → Themes → Anpassen**:
- Startseite → **Großes Bild**: Titelbild hochladen (wird automatisch schwarz-weiß)
- **Theme-Einstellungen → Marke**: Logo-Zeichen (N im Quadrat) und Favicon hochladen
- Optional: Zwei Bilder, Banner, Bild mit Produkt, Instagram-Raster

## 10. Vor dem Livegang
- Tarif wählen
- Testbestellung machen
- Domain verbinden (**Einstellungen → Domains**)
- Passwortschutz entfernen
- Bestell-E-Mails prüfen (**Einstellungen → Benachrichtigungen**)
- LUCID-Registrierung (Verpackungsgesetz) erledigt
