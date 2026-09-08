"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-store";

export function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Shopping bag with ${itemCount} ${itemCount === 1 ? "item" : "items"}`}
      className="rounded-full border border-black/15 px-3 py-1.5 transition-colors hover:bg-black hover:text-white"
    >
      Bag · {itemCount}
    </Link>
  );
}
