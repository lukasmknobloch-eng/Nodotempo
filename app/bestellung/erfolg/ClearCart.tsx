"use client";

import { useEffect } from "react";
import { useShop } from "@/components/ShopProvider";

export function ClearCart() {
  const { clearCart, ready } = useShop();
  useEffect(() => {
    if (ready) clearCart();
  }, [ready, clearCart]);
  return null;
}
