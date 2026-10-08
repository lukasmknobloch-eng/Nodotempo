import type { Metadata } from "next";
import { CartView } from "./CartView";

export const metadata: Metadata = { title: "Warenkorb", robots: { index: false } };

export default function CartPage() {
  return (
    <div className="container page">
      <CartView />
    </div>
  );
}
