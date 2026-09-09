import "server-only";

import type { QueryResultRow } from "pg";
import { cacheLife } from "next/cache";
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

export type ReviewsResult = {
  reviews: Review[];
  errorMessage: string | null;
};

async function queryReviewsByProductId(productId: string): Promise<Review[]> {
  "use cache";
  cacheLife("reviews");

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

  return result.rows;
}

function getErrorCode(error: unknown) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  ) {
    return error.code;
  }

  return null;
}

function getReviewErrorMessage(errorCode: string | null) {
  if (errorCode === "42P01") {
    return "Reviews are unavailable because the reviews table has not been created in this environment. Run db/schema.sql against the production database.";
  }

  if (errorCode === "3D000" || errorCode === "28P01") {
    return "Reviews are unavailable because the production database name or credentials are invalid. Check DATABASE_URL.";
  }

  if (
    errorCode === "ECONNREFUSED" ||
    errorCode === "ENOTFOUND" ||
    errorCode === "ETIMEDOUT" ||
    errorCode?.startsWith("08")
  ) {
    return "Reviews are unavailable because the database could not be reached. Check DATABASE_URL and the database server status.";
  }

  return "Reviews could not be loaded from PostgreSQL. Check the server logs for the underlying database error.";
}

export const getReviewsByProductId = cache(
  async (productId: string): Promise<ReviewsResult> => {
    try {
      return {
        reviews: await queryReviewsByProductId(productId),
        errorMessage: null,
      };
    } catch (error) {
      const errorCode = getErrorCode(error);

      console.error("Failed to load product reviews", {
        productId,
        errorCode,
        error,
      });

      return {
        reviews: [],
        errorMessage: getReviewErrorMessage(errorCode),
      };
    }
  },
);
