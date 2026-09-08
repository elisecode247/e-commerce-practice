import type { Metadata } from "next";
import { CartView } from "@/app/cart/cart-view";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Your Bag | LACE",
  description: "Review the shoes in your LACE shopping bag.",
};

export default async function CartPage() {
  const products = await getProducts();

  return <CartView products={products} />;
}
