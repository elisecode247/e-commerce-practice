import { getReviewsByProductId } from "@/lib/reviews";

type ProductReviewsProps = {
  productId: string;
};

function stars(rating: number) {
  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)));
  return `${"★".repeat(roundedRating)}${"☆".repeat(5 - roundedRating)}`;
}

const reviewDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default async function ProductReviews({
  productId,
}: ProductReviewsProps) {
  const reviews = await getReviewsByProductId(productId);
  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
    : 0;
  const averageRatingLabel = averageRating.toFixed(1);
  const reviewCountLabel = `${reviews.length} ${
    reviews.length === 1 ? "review" : "reviews"
  }`;

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
        <div className="grid gap-10 border-b border-black/10 pb-10 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f04b2f]">
              Worn and loved
            </p>
            <h2
              id="reviews-heading"
              className="mt-3 text-4xl font-semibold tracking-[-0.045em]"
            >
              Customer reviews
            </h2>
          </div>
          <div className="flex items-end gap-5 md:justify-end">
            <p className="text-7xl font-semibold leading-none tracking-[-0.06em]">
              {averageRatingLabel}
            </p>
            <div>
              <p
                aria-label={`${averageRatingLabel} out of 5 stars`}
                className="tracking-[0.12em]"
              >
                {stars(averageRating)}
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Based on {reviewCountLabel}
              </p>
            </div>
          </div>
        </div>

        {reviews.length > 0 ? (
          <div className="grid gap-5 pt-8 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-3xl border border-black/10 bg-white p-6"
              >
                <p
                  aria-label={`${review.rating} out of 5 stars`}
                  className="text-sm tracking-[0.12em]"
                >
                  {stars(review.rating)}
                </p>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {review.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  {review.body}
                </p>
                <footer className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-black/10 pt-4 text-xs text-zinc-500">
                  <span className="font-semibold text-[#171713]">
                    {review.reviewerName}
                  </span>
                  {review.isVerifiedPurchase ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-emerald-700">
                        Verified purchase
                      </span>
                    </>
                  ) : null}
                  <span aria-hidden="true">·</span>
                  <time dateTime={review.createdAt.toISOString()}>
                    {reviewDateFormatter.format(review.createdAt)}
                  </time>
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <p className="pt-8 text-sm text-zinc-500">
            No reviews yet. Be the first to review this shoe.
          </p>
        )}
    </section>
  );
}
