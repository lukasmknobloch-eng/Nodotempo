import "server-only";
import fs from "node:fs";
import path from "node:path";
import { products, type Product } from "./products";

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const PUBLIC_DIR = path.join(process.cwd(), "public");

export type CatalogProduct = Product & { images: string[] };

/** Alle Bilder in public/<dir>/, sortiert nach Dateiname. */
function listImages(dir: string): string[] {
  const abs = path.join(PUBLIC_DIR, dir);
  if (!fs.existsSync(abs)) return [];
  return fs
    .readdirSync(abs)
    .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "de", { numeric: true }))
    .map((f) => `/${dir}/${encodeURIComponent(f)}`);
}

/** Sucht ein einzelnes Bild, z. B. findImage("bilder/hero") → /bilder/hero.jpg */
export function findImage(base: string): string | undefined {
  for (const ext of IMAGE_EXT) {
    if (fs.existsSync(path.join(PUBLIC_DIR, base + ext))) return `/${base}${ext}`;
  }
  return undefined;
}

export function getCatalog(): CatalogProduct[] {
  return products.map((p) => ({ ...p, images: listImages(`produkte/${p.slug}`) }));
}

export function getCatalogProduct(slug: string): CatalogProduct | undefined {
  return getCatalog().find((p) => p.slug === slug);
}
