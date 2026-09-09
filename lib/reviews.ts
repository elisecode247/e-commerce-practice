import "server-only";
import { cacheLife } from 'next/cache'

import type { QueryResultRow } from "pg";
import { cache } from "react";
import { db } from "@/lib/db";

export type Review = {
  id: string;
  reviewerName: string;
  rating: number;
  title: string;
  body: string;
  isVerifiedPurchase: boolean;
  createdAt: Date;
};

type ReviewRow = Review & QueryResultRow;

const REVIEW_FETCH_DELAY_MS = 5_000;

export const getReviewsByProductId = cache(
  async (productId: string): Promise<Review[]> => {
    'use cache';
    await new Promise((resolve) => setTimeout(resolve, REVIEW_FETCH_DELAY_MS));
    const result = await db.query<ReviewRow>(
      `
        SELECT
          id::text AS id,
          reviewer_name AS "reviewerName",
          rating::int AS rating,
          title,
          body,
          is_verified_purchase AS "isVerifiedPurchase",
          created_at AS "createdAt"
        FROM reviews
        WHERE product_id = $1
        ORDER BY created_at DESC, id DESC
      `,
      [productId],
    );
    cacheLife('reviews');
    return result.rows;
  },
);
