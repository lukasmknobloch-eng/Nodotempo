import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopBrowser } from "./ShopBrowser";

export const metadata: Metadata = {
  title: "The Nato-Series",
  description: "Alle Nodotempo Armbänder: The Nato-Series, handgeknüpft aus Fallschirmseil, stufenlos verstellbar, in vielen Farben.",
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
