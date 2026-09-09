import "server-only";

import type { QueryResultRow } from "pg";
import { connection } from "next/server";
import { cache } from "react";
import { db } from "@/lib/db";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  priceInCents: number;
  image: string;
  color: string;
  badge: string | null;
};

type ProductRow = Product & QueryResultRow;

const RELATED_PRODUCTS_FETCH_DELAY_MS = 3_000;

export const getProducts = cache(async (): Promise<Product[]> => {
  await connection();
console.log('this should appear in the terminal')

  const result = await db.query<ProductRow>(`
    SELECT
      id::text AS id,
      slug,
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
});

export const getProductBySlug = cache(
  async (slug: string): Promise<Product | null> => {
    await connection();

    const result = await db.query<ProductRow>(
      `
        SELECT
          id::text AS id,
          slug,
          name,
          category,
          price_in_cents AS "priceInCents",
          image_url AS image,
          color,
          badge
        FROM products AS product
        WHERE product.slug = $1
          AND product.is_active = TRUE
        LIMIT 1
      `,
      [slug],
    );

    return result.rows.at(0) ?? null;
  },
);

export const getRelatedProducts = cache(
  async (productId: string, category: string): Promise<Product[]> => {
    await connection();
    await new Promise((resolve) =>
      setTimeout(resolve, RELATED_PRODUCTS_FETCH_DELAY_MS),
    );

    const result = await db.query<ProductRow>(
      `
        SELECT
          id::text AS id,
          slug,
          name,
          category,
          price_in_cents AS "priceInCents",
          image_url AS image,
          color,
          badge
        FROM products AS product
        WHERE product.is_active = TRUE
          AND product.id <> $1
        ORDER BY
          CASE WHEN product.category = $2 THEN 0 ELSE 1 END,
          product.id
        LIMIT 3
      `,
      [productId, category],
    );

    return result.rows;
  },
);
