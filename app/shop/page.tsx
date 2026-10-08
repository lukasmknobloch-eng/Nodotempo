import type { Metadata } from "next";
import { Suspense } from "react";
import { getCatalog } from "@/lib/catalog";
import { ShopBrowser } from "./ShopBrowser";

export const metadata: Metadata = {
  title: "Shop – Alle Armbänder",
  description: "Alle Nodotempo Armbänder: handgeknüpfte, verstellbare Stoffarmbänder in 15 Farben.",
};

export default function ShopPage() {
  const catalog = getCatalog();
  return (
    <div className="container page">
      <Suspense>
        <ShopBrowser catalog={catalog} />
      </Suspense>
    </div>
  );
}
