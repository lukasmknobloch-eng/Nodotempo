import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/ueber-uns", "/tragen", "/faq", "/versand-rueckgabe", "/kontakt", "/impressum", "/datenschutz", "/agb", "/widerruf"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}` })),
    ...products.map((p) => ({ url: `${site.url}/produkt/${p.slug}` })),
  ];
}
