import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopBrowser } from "./ShopBrowser";

export const metadata: Metadata = {
  title: "Alle Armbänder",
  description: "Alle Nodotempo Armbänder: handgeknüpftes Paracord, stufenlos verstellbar, in vielen Farben.",
};

export default function ShopPage() {
  return (
    <div className="page-shop">
      <Suspense>
        <ShopBrowser />
      </Suspense>
    </div>
  );
}
