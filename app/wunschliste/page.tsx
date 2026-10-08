import type { Metadata } from "next";
import { WishlistView } from "./WishlistView";

export const metadata: Metadata = { title: "Wunschliste", robots: { index: false } };

export default function WishlistPage() {
  return (
    <div className="container page">
      <WishlistView />
    </div>
  );
}
