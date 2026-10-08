// ─────────────────────────────────────────────────────────────────────────────
//  PRODUKTKATALOG
//
//  Hier werden alle Armbänder gepflegt. Preise in Cent (2900 = 29,00 €).
//
//  BILDER: Lege Fotos einfach in den Ordner  public/produkte/<slug>/
//  (z. B. public/produkte/nodo-acqua/1.jpg, 2.jpg, …). Sie erscheinen
//  automatisch, sortiert nach Dateiname. Erlaubt: .jpg .jpeg .png .webp .avif
//  Solange kein Foto vorhanden ist, zeigt der Shop eine gezeichnete Vorschau
//  in den Farben aus "art" (primary = Grundfarbe, secondary = Musterfarbe).
// ─────────────────────────────────────────────────────────────────────────────

export type Product = {
  slug: string;
  name: string;
  /** Farbbezeichnung auf Deutsch (für Suche & Anzeige) */
  color: string;
  price: number;
  compareAtPrice?: number;
  badge?: "Neu" | "Bestseller" | "Limitiert";
  soldOut?: boolean;
  featured?: boolean;
  /** Je kleiner, desto weiter vorne in "Empfohlen" */
  rank: number;
  /** Höher = neuer (für Sortierung "Neuheiten") */
  added: number;
  shortDescription: string;
  description: string;
  sizes: string[];
  art: { primary: string; secondary: string; background: string };
};

// Gemeinsame Angaben für alle Armbänder
export const PRICE = 2900;
export const ONE_SIZE = "Einheitsgröße · verstellbar";

export const productInfo = {
  material: "Geflochtene Stoffkordel mit Rautenmuster",
  details: [
    "Zwei Schiebeknoten – stufenlos verstellbar",
    "Von Hand geknüpft",
    "Leicht und angenehm zu tragen – auch neben der Uhr",
    "Kombinierbar: mehrere Farben übereinander tragen",
  ],
  care: "Bei Bedarf mit lauwarmem Wasser und etwas milder Seife von Hand waschen und an der Luft trocknen lassen. Nicht in den Trockner geben.",
};

type Color = {
  slug: string;
  name: string;
  color: string;
  primary: string;
  secondary: string;
  mood: string;
  featured?: boolean;
};

// Reihenfolge = Reihenfolge im Shop ("Empfohlen")
const colors: Color[] = [
  { slug: "nodo-notte", name: "Nodo Notte", color: "Dunkelblau", primary: "#17203a", secondary: "#c98a4a", mood: "Tiefes Nachtblau mit feinen kupferfarbenen Akzenten – der unauffälligste Begleiter jeder Uhr.", featured: true },
  { slug: "nodo-oliva", name: "Nodo Oliva", color: "Olivgrün", primary: "#5f6b3d", secondary: "#c4c08a", mood: "Gedecktes Olivgrün mit hellem Muster – passt zu Lederbändern und Stahl gleichermaßen.", featured: true },
  { slug: "nodo-cielo", name: "Nodo Cielo", color: "Himmelblau", primary: "#1d8fd8", secondary: "#8fd0f4", mood: "Klares Himmelblau mit hellem Muster – ein frischer Farbakzent für den Sommer.", featured: true },
  { slug: "nodo-rosso", name: "Nodo Rosso", color: "Rot", primary: "#a8282a", secondary: "#4e1414", mood: "Kräftiges Rot mit dunklem Rautenmuster – selbstbewusst, ohne laut zu sein.", featured: true },
  { slug: "nodo-acqua", name: "Nodo Acqua", color: "Aquamarin", primary: "#86d9d2", secondary: "#effcf9", mood: "Helles Aquamarin mit weißem Muster – leicht wie Wasser." },
  { slug: "nodo-kaki", name: "Nodo Kaki", color: "Khaki", primary: "#55573a", secondary: "#d2cba0", mood: "Dunkles Khaki mit sandfarbenem Muster – der Klassiker zu Feld- und Fliegeruhren." },
  { slug: "nodo-mogano", name: "Nodo Mogano", color: "Dunkelbraun", primary: "#2b1817", secondary: "#7d3a33", mood: "Fast schwarzes Mahagoni mit rötlichem Schimmer – elegant zu Gold und braunem Leder." },
  { slug: "nodo-bosco", name: "Nodo Bosco", color: "Waldgrün", primary: "#4c6638", secondary: "#2c3f25", mood: "Waldgrün in zwei Tönen – natürlich und unaufgeregt." },
  { slug: "nodo-sole", name: "Nodo Sole", color: "Gelb", primary: "#f3c300", secondary: "#ffe774", mood: "Leuchtendes Sonnengelb – für alle, die Farbe tragen wollen." },
  { slug: "nodo-nebbia", name: "Nodo Nebbia", color: "Grau", primary: "#7b8c89", secondary: "#dfe7e4", mood: "Kühles Nebelgrau mit hellem Muster – passt zu jedem Stahlgehäuse." },
  { slug: "nodo-moka", name: "Nodo Moka", color: "Mokka", primary: "#8e6d5d", secondary: "#45302a", mood: "Warmes Mokkabraun mit dunklem Muster – zurückhaltend und vielseitig." },
  { slug: "nodo-laguna", name: "Nodo Laguna", color: "Petrol", primary: "#1b8c96", secondary: "#0d4a52", mood: "Sattes Petrol mit dunklem Rautenmuster – erinnert an Taucheruhren." },
  { slug: "nodo-tramonto", name: "Nodo Tramonto", color: "Bunt", primary: "#c8b489", secondary: "#d65a3d", mood: "Sand, Koralle und Grün in einer Kordel – der Sonnenuntergang am Handgelenk." },
  { slug: "nodo-vino", name: "Nodo Vino", color: "Weinrot", primary: "#5b1e33", secondary: "#d98ca1", mood: "Dunkles Weinrot mit rosafarbenem Muster – edel zu Gold und Roségold." },
  { slug: "nodo-rosa", name: "Nodo Rosa", color: "Rosa", primary: "#f2bad0", secondary: "#fde6ef", mood: "Zartes Rosa mit hellem Muster – sanft und hell." },
];

export const products: Product[] = colors.map((c, i) => ({
  slug: c.slug,
  name: c.name,
  color: c.color,
  price: PRICE,
  featured: c.featured,
  rank: i + 1,
  added: colors.length - i,
  shortDescription: `Geflochtene Stoffkordel in ${c.color}, stufenlos verstellbar.`,
  description: `${c.mood} Wie jedes Nodotempo-Armband wird ${c.name} von Hand geknüpft. Zwei Schiebeknoten machen es stufenlos verstellbar – einfach an den Enden ziehen, bis es sitzt.`,
  sizes: [ONE_SIZE],
  art: { primary: c.primary, secondary: c.secondary, background: "#ece7df" },
}));

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
