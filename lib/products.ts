import "server-only";

import type { QueryResultRow } from "pg";
import { connection } from "next/server";
import { db } from "@/lib/db";

export type Product = {
  id: string;
  name: string;
  category: string;
  priceInCents: number;
  image: string;
  color: string;
  badge: string | null;
};

type ProductRow = Product & QueryResultRow;

export async function getProducts(): Promise<Product[]> {
  await connection();
console.log('this should appear in the terminal')

  const result = await db.query<ProductRow>(`
    SELECT
      id::text AS id,
      name,
      category,
      price_in_cents AS "priceInCents",
      image_url AS image,
      color,
      badge
    FROM products AS product
    WHERE product.is_active = TRUE
    ORDER BY product.id
  `);

  return result.rows;
}
