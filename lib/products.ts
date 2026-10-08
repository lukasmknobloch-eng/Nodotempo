// ─────────────────────────────────────────────────────────────────────────────
//  PRODUKTKATALOG
//
//  Hier werden alle Artikel gepflegt. Preise in Cent (8900 = 89,00 €).
//
//  BILDER: Lege Fotos einfach in den Ordner  public/produkte/<slug>/
//  (z. B. public/produkte/ora-onyx/1.jpg, 2.jpg, …). Sie erscheinen automatisch,
//  sortiert nach Dateiname. Erlaubt: .jpg .jpeg .png .webp .avif
//  Solange kein Foto vorhanden ist, zeigt der Shop eine gezeichnete Vorschau
//  (siehe "art" unten).
// ─────────────────────────────────────────────────────────────────────────────

export type Category = "perlen" | "leder" | "metall" | "kordel";

export type ArtStyle = "beads" | "chain" | "leather" | "cord";

export type Product = {
  slug: string;
  name: string;
  collection: string;
  category: Category;
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
  material: string;
  details: string[];
  care: string;
  sizes: string[];
  /** Platzhalter-Illustration, solange keine Fotos hinterlegt sind */
  art: { style: ArtStyle; primary: string; secondary?: string; accent: string; background: string };
};

export const categories: { id: Category; label: string; description: string }[] = [
  { id: "perlen", label: "Naturstein", description: "Handverlesene Steinperlen mit Edelstahl-Akzent." },
  { id: "leder", label: "Leder", description: "Vollnarbiges italienisches Leder, das mit dir altert." },
  { id: "metall", label: "Edelstahl", description: "Klare Linien aus 316L-Edelstahl – präzise wie ein Uhrwerk." },
  { id: "kordel", label: "Kordel", description: "Geflochtene Seide mit dem namensgebenden Knoten." },
];

const beadSizes = ["S · 16 cm", "M · 18 cm", "L · 20 cm"];
const leatherSizes = ["S · 17 cm", "M · 19 cm", "L · 21 cm"];

export const products: Product[] = [
  {
    slug: "ora-onyx",
    name: "Ora Onyx",
    collection: "Ora",
    category: "perlen",
    price: 8900,
    badge: "Bestseller",
    featured: true,
    rank: 1,
    added: 1,
    shortDescription: "Matter Onyx, 8 mm, mit gebürstetem Edelstahl-Akzent.",
    description:
      "Ora ist unser Klassiker: tiefschwarzer, matt geschliffener Onyx, unterbrochen von einem einzelnen Element aus gebürstetem Edelstahl. Zurückhaltend genug für jeden Tag, präsent genug, um neben einer Taucheruhr wie neben einem Dress-Watch zu bestehen.",
    material: "Matter Onyx (8 mm), Edelstahl 316L, hochelastischer Nylonfaden",
    details: ["Perlendurchmesser 8 mm", "Edelstahl-Element, gebürstet", "Doppelt gezogener Elastikfaden", "Von Hand gefertigt"],
    care: "Vor dem Duschen, Schwimmen und Sport ablegen. Mit einem weichen, trockenen Tuch reinigen. Nicht mit Parfum oder Ölen in Kontakt bringen.",
    sizes: beadSizes,
    art: { style: "beads", primary: "#1c1c1c", accent: "#b8b4ad", background: "#e9e4dc" },
  },
  {
    slug: "ora-tigerauge",
    name: "Ora Tigerauge",
    collection: "Ora",
    category: "perlen",
    price: 8900,
    featured: true,
    rank: 3,
    added: 2,
    shortDescription: "Goldbraunes Tigerauge, 8 mm, mit Edelstahl-Akzent in Gold.",
    description:
      "Das warme Schimmern des Tigerauges verändert sich mit jedem Lichteinfall – ein lebendiger Kontrast zum kühlen Metall einer Uhr. Kombiniert mit einem Akzent aus vergoldetem Edelstahl.",
    material: "Tigerauge (8 mm), Edelstahl 316L mit 18k-Vergoldung, hochelastischer Nylonfaden",
    details: ["Perlendurchmesser 8 mm", "Vergoldetes Edelstahl-Element", "Jeder Stein ein Unikat", "Von Hand gefertigt"],
    care: "Vor dem Duschen, Schwimmen und Sport ablegen. Mit einem weichen, trockenen Tuch reinigen.",
    sizes: beadSizes,
    art: { style: "beads", primary: "#8a5a26", secondary: "#c08a44", accent: "#c9a45c", background: "#ece4d8" },
  },
  {
    slug: "notte-lava",
    name: "Notte Lava",
    collection: "Notte",
    category: "perlen",
    price: 7900,
    rank: 5,
    added: 3,
    shortDescription: "Vulkanischer Lavastein mit offener Struktur.",
    description:
      "Lavastein ist leicht, rau und ehrlich. Seine offenporige Oberfläche nimmt auf Wunsch einen Tropfen Duftöl auf – ein Armband, das man nicht nur sieht.",
    material: "Lavastein (8 mm), Hämatit, Edelstahl 316L, hochelastischer Nylonfaden",
    details: ["Perlendurchmesser 8 mm", "Hämatit-Zwischenelemente", "Besonders leicht", "Von Hand gefertigt"],
    care: "Vor dem Kontakt mit Wasser ablegen. Duftöl sparsam verwenden.",
    sizes: beadSizes,
    art: { style: "beads", primary: "#2b2a28", secondary: "#3d3a36", accent: "#6f6f72", background: "#e6e2dc" },
  },
  {
    slug: "marea-lapis",
    name: "Marea Lapis",
    collection: "Marea",
    category: "perlen",
    price: 9500,
    badge: "Limitiert",
    rank: 6,
    added: 6,
    shortDescription: "Lapislazuli mit goldenen Pyrit-Einschlüssen. Limitierte Auflage.",
    description:
      "Tiefes Ultramarin mit feinen goldenen Einschlüssen – Lapislazuli war über Jahrhunderte kostbarer als Gold. Marea erscheint in einer limitierten Auflage von 150 Stück.",
    material: "Lapislazuli (8 mm), Edelstahl 316L mit 18k-Vergoldung, hochelastischer Nylonfaden",
    details: ["Limitiert auf 150 Stück", "Perlendurchmesser 8 mm", "Vergoldetes Edelstahl-Element", "Von Hand gefertigt"],
    care: "Vor dem Kontakt mit Wasser ablegen. Nur trocken reinigen.",
    sizes: beadSizes,
    art: { style: "beads", primary: "#1f3170", secondary: "#2c4592", accent: "#c9a45c", background: "#e5e5e8" },
  },
  {
    slug: "linea-acciaio",
    name: "Linea Acciaio",
    collection: "Linea",
    category: "metall",
    price: 12900,
    featured: true,
    rank: 2,
    added: 4,
    shortDescription: "Flache Glieder aus gebürstetem Edelstahl mit Faltschließe.",
    description:
      "Inspiriert von klassischen Uhrenarmbändern: flache, präzise gefertigte Glieder mit abwechselnd gebürsteten und polierten Kanten. Die Faltschließe sitzt sicher und trägt kaum auf.",
    material: "Edelstahl 316L, gebürstet und poliert",
    details: ["Gliederbreite 6 mm", "Faltschließe mit Sicherung", "Hypoallergen & nickelfrei", "Wasserfest"],
    care: "Wasserfest. Gelegentlich mit lauwarmem Wasser und einer weichen Bürste reinigen.",
    sizes: leatherSizes,
    art: { style: "chain", primary: "#a9aaad", secondary: "#e6e7e9", accent: "#7d7f83", background: "#e8e6e2" },
  },
  {
    slug: "linea-oro",
    name: "Linea Oro",
    collection: "Linea",
    category: "metall",
    price: 14900,
    badge: "Neu",
    featured: true,
    rank: 4,
    added: 9,
    shortDescription: "Flache Edelstahlglieder mit 18k-Gelbgold-Beschichtung.",
    description:
      "Linea in warmem Gold. Die PVD-Beschichtung mit 18k-Gelbgold ist besonders widerstandsfähig und bleibt auch nach Jahren brillant – die ideale Ergänzung zu Uhren mit Goldakzenten oder Bicolor-Band.",
    material: "Edelstahl 316L mit 18k-Gelbgold PVD-Beschichtung",
    details: ["Gliederbreite 6 mm", "Faltschließe mit Sicherung", "Hypoallergen & nickelfrei", "Wasserfest"],
    care: "Wasserfest. Nicht mit scheuernden Mitteln reinigen.",
    sizes: leatherSizes,
    art: { style: "chain", primary: "#c49a4a", secondary: "#f0d79a", accent: "#94702c", background: "#ece6dc" },
  },
  {
    slug: "pelle-nero",
    name: "Pelle Nero",
    collection: "Pelle",
    category: "leder",
    price: 9900,
    rank: 7,
    added: 5,
    shortDescription: "Vollnarbiges italienisches Leder, schwarz, mit Magnetverschluss.",
    description:
      "Pflanzlich gegerbtes Vollnarbenleder aus der Toskana, von Hand gesäumt und mit einem schlanken Magnetverschluss aus Edelstahl versehen. Das Leder entwickelt mit der Zeit eine eigene Patina – wie ein gutes Uhrenarmband.",
    material: "Italienisches Vollnarbenleder (pflanzlich gegerbt), Edelstahl 316L",
    details: ["Breite 5 mm, doppelt gelegt", "Magnetverschluss mit Sicherung", "Handgenäht", "Leder aus der Toskana"],
    care: "Vor Wasser schützen. Gelegentlich mit farbloser Lederpflege behandeln.",
    sizes: leatherSizes,
    art: { style: "leather", primary: "#1d1b1a", secondary: "#3a3532", accent: "#b8b4ad", background: "#e9e4dc" },
  },
  {
    slug: "pelle-cognac",
    name: "Pelle Cognac",
    collection: "Pelle",
    category: "leder",
    price: 9900,
    rank: 8,
    added: 7,
    shortDescription: "Vollnarbiges italienisches Leder in Cognac mit Magnetverschluss.",
    description:
      "Der warme Cognac-Ton ergänzt braune Uhrenarmbänder ebenso wie Edelstahl. Pflanzlich gegerbt, von Hand gesäumt, mit schlankem Magnetverschluss.",
    material: "Italienisches Vollnarbenleder (pflanzlich gegerbt), Edelstahl 316L",
    details: ["Breite 5 mm, doppelt gelegt", "Magnetverschluss mit Sicherung", "Handgenäht", "Leder aus der Toskana"],
    care: "Vor Wasser schützen. Gelegentlich mit farbloser Lederpflege behandeln.",
    sizes: leatherSizes,
    art: { style: "leather", primary: "#8b4f26", secondary: "#a8673a", accent: "#c9a45c", background: "#ede5da" },
  },
  {
    slug: "nodo-corda",
    name: "Nodo Corda",
    collection: "Nodo",
    category: "kordel",
    price: 6900,
    badge: "Neu",
    rank: 9,
    added: 8,
    shortDescription: "Geflochtene Seidenkordel mit Knoten und Element aus 925 Silber.",
    description:
      "Das Armband, das unserem Namen am nächsten ist: ein einzelner, von Hand gelegter Knoten – nodo – auf feiner, geflochtener Seidenkordel. Ein kleines Element aus 925 Sterlingsilber hält die Schiebeverschlüsse in Position.",
    material: "Geflochtene Seidenkordel, 925 Sterlingsilber",
    details: ["Stufenlos verstellbar", "Kordelstärke 2 mm", "925 Sterlingsilber", "Handgeknüpft"],
    care: "Vor Wasser schützen. Silber mit einem Silberputztuch auffrischen.",
    sizes: ["Einheitsgröße · verstellbar"],
    art: { style: "cord", primary: "#24324a", secondary: "#2f405d", accent: "#c7c9cc", background: "#e7e5e1" },
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function categoryLabel(id: Category) {
  return categories.find((c) => c.id === id)?.label ?? id;
}
