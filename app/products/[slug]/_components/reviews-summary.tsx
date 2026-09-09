import { getReviewsByProductId } from "@/lib/reviews";

function stars(rating: number) {
  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)));
  return `${"★".repeat(roundedRating)}${"☆".repeat(5 - roundedRating)}`;
}

type ReviewsSummaryProps = {
  productId: string;
};

export default async function ReviewsSummary({
  productId,
}: ReviewsSummaryProps) {
  const reviews = await getReviewsByProductId(productId);
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
    : 0;
  const averageRatingLabel = averageRating.toFixed(1);
  const reviewCountLabel = `${reviews.length} ${
    reviews.length === 1 ? "review" : "reviews"
  }`;

  return (
    <a
      href="#reviews"
      className="flex items-center gap-2 text-sm transition-opacity hover:opacity-60"
    >
      <span
        aria-label={`${averageRatingLabel} out of 5 stars`}
        className="tracking-widest"
      >
        {stars(averageRating)}
      </span>
      <span className="text-zinc-500">
        {averageRatingLabel} · {reviewCountLabel}
      </span>
    </a>
  );
}
