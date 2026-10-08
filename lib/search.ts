import { categoryLabel, type Product } from "./products";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** true, wenn alle Wörter der Suche im Produkt vorkommen */
export function matchesQuery(query: string, p: Product) {
  const haystack = norm(`${p.name} ${p.collection} ${categoryLabel(p.category)} ${p.material} ${p.shortDescription}`);
  return norm(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}
