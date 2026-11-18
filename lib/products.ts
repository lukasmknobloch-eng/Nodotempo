// ─────────────────────────────────────────────────────────────────────────────
//  PRODUKTKATALOG
//
//  Zwei Modelle (Nodo No. 1 und Nodo No. 2), jeweils in mehreren Farben.
//  Preise in Cent (1690 = 16,90 €).
//
//  BILDER: Pro Farbe ein Ordner  public/produkte/<modell>/<farbe>/
//  z. B. public/produkte/nodo-no-2/gelb/1.jpg, 2.jpg, …
//  Bild 1 ist das Hauptbild, Bild 2 erscheint beim Darüberfahren in der
//  Übersicht. Erlaubt: .jpg .jpeg .png .webp .avif – sortiert nach Dateiname.
//
//  NEUE FARBE: eine Zeile in "variants" ergänzen (italienischer Name + deutsche
//  Farbbeschreibung) und den Bildordner anlegen.
// ─────────────────────────────────────────────────────────────────────────────

export type Variant = {
  /** Teil der Adresse und Name des Bildordners, z. B. "gelb" */
  id: string;
  /** Farbname (italienisch), wie er im Shop erscheint */
  name: string;
  /** Farbbeschreibung auf Deutsch (für Suche und Produktseite) */
  color: string;
  /** Material laut Etikett – bitte je Farbe eintragen */
  fiber?: string;
  soldOut?: boolean;
  /** Höher = neuer (für Sortierung "Neuheiten") */
  added?: number;
};

export type Product = {
  slug: string;
  name: string;
  /** Optionaler Zusatz unter dem Namen */
  subtitle?: string;
  price: number;
  compareAtPrice?: number;
  /** Noch nicht bestellbar – wird als "Bald verfügbar" gezeigt */
  comingSoon?: boolean;
  description: string;
  details: string[];
  variants: Variant[];
};

export const productInfo = {
  /** Name der Serie, zu der alle Armbänder gehören */
  series: "The Nato-Series",
  material: "Fallschirmseil aus 100 % Nylon",
  care: "Bei Bedarf mit lauwarmem Wasser und etwas milder Seife von Hand waschen und an der Luft trocknen lassen. Nicht in den Trockner geben.",
};

export const ONE_SIZE = "Einheitsgröße · verstellbar";

export const products: Product[] = [
  {
    slug: "nodo-no-2",
    name: "Nodo No. 2",
    price: 1690,
    description:
      "Geflochtenes Fallschirmseil aus Nylon, von Hand zu einem Armband geknüpft. Zwei Schiebeknoten machen es stufenlos verstellbar: an den Enden ziehen, bis es sitzt. Leicht genug für jeden Tag, präsent genug, um neben einer Uhr zu bestehen.",
    details: [
      "Stufenlos verstellbar über zwei Schiebeknoten",
      "Passt für nahezu jedes Handgelenk",
      "Von Hand geknüpft",
      "Kratzt nicht am Uhrengehäuse",
    ],
    variants: [
      { id: "blau-weiss", name: "Cielo", color: "Blau / Weiß", added: 8 },
      { id: "gelb", name: "Sole", color: "Gelb", added: 7 },
      { id: "braun-beige", name: "Moka", color: "Braun / Beige", added: 6 },
      { id: "beere-rosa", name: "Vino", color: "Beere / Rosa", added: 5 },
      { id: "blau-sand", name: "Riva", color: "Blau / Sand", added: 4 },
      { id: "hellgruen", name: "Salvia", color: "Hellgrün", added: 3 },
      { id: "bordeaux-grau", name: "Granato", color: "Bordeaux / Grau", added: 2 },
      { id: "sand", name: "Sabbia", color: "Sand", added: 1 },
      { id: "camo-braun", name: "Terra", color: "Camo Braun", added: 11 },
      { id: "camo-gruen", name: "Bosco", color: "Camo Grün", added: 10 },
      { id: "rosa-creme", name: "Rosa", color: "Rosa / Creme", added: 9 },
    ],
  },
  {
    slug: "nodo-no-1",
    name: "Nodo No. 1",
    price: 1390,
    description:
      "Die schmalere Schwester von Nodo No. 2: feineres Fallschirmseil, derselbe Knoten. Zurückhaltend allein getragen, ideal zum Kombinieren mit mehreren Farben.",
    details: [
      "Feineres Fallschirmseil aus Nylon",
      "Stufenlos verstellbar über zwei Schiebeknoten",
      "Von Hand geknüpft",
      "Ideal zum Kombinieren",
    ],
    variants: [
      { id: "pino", name: "Pino", color: "Dunkelgrün", added: 14 },
      { id: "notte", name: "Notte", color: "Navy", added: 13 },
      { id: "bordo", name: "Bordò", color: "Bordeaux", added: 12 },
      { id: "celeste", name: "Celeste", color: "Hellblau", added: 16 },
      { id: "oliva", name: "Oliva", color: "Grün / Beige", added: 15 },
      { id: "ciliegia", name: "Ciliegia", color: "Bordeaux / Weiß", added: 18 },
      { id: "cipria", name: "Cipria", color: "Rosa", added: 17 },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
