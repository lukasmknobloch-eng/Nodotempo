import type { Card } from "./shop";

const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** true, wenn alle Wörter der Suche in Modell oder Farbe vorkommen */
export function matchesQuery(query: string, card: Card) {
  const haystack = norm(`${card.title} ${card.subtitle} ${card.product.subtitle} paracord armband`);
  return norm(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}
