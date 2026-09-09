import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { getProductBySlug, getRelatedProducts } from "@/lib/products";
import { getReviewsByProductId } from "@/lib/reviews";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

const reviewDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function stars(rating: number) {
  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)));
  return `${"★".repeat(roundedRating)}${"☆".repeat(5 - roundedRating)}`;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found | LACE" };
  }

  return {
    title: `${product.name} | LACE`,
    description: `Shop the ${product.name} in ${product.color}. ${product.category} by LACE.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [relatedProducts, reviews] = await Promise.all([
    getRelatedProducts(product.id, product.category),
    getReviewsByProductId(product.id),
  ]);

  const averageRating = reviews.length
    ? reviews.reduce((total, review) => total + review.rating, 0) /
      reviews.length
    : 0;
  const averageRatingLabel = averageRating.toFixed(1);
  const reviewCountLabel = `${reviews.length} ${
    reviews.length === 1 ? "review" : "reviews"
  }`;

  return (
    <div className="py-4 sm:py-8">
      <nav aria-label="Breadcrumb" className="mb-7 text-sm text-zinc-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="transition-colors hover:text-[#171713]">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/#collection"
              className="transition-colors hover:text-[#171713]"
            >
              Shoes
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-[#171713]" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        <div className="relative min-h-105 overflow-hidden rounded-4xl bg-[#f0efdc] sm:min-h-150">
          {product.badge ? (
            <span className="absolute left-6 top-6 z-10 rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] shadow-sm">
              {product.badge}
            </span>
          ) : null}
          <div className="absolute inset-10 rounded-full border border-black/10 sm:inset-20" />
          <Image
            src={product.image}
            alt={`${product.name} in ${product.color}`}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-contain p-8 mix-blend-multiply sm:p-16"
          />
        </div>

        <div className="flex flex-col justify-center lg:py-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#f04b2f]">
            {product.category}
          </p>
          <h1 className="mt-4 text-5xl font-semibold leading-none tracking-[-0.055em] sm:text-6xl">
            {product.name}
          </h1>
          <div className="mt-5 flex items-center justify-between gap-6">
            <p className="text-xl font-semibold">
              {priceFormatter.format(product.priceInCents / 100)}
            </p>
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
          </div>

          <p className="mt-7 border-t border-black/10 pt-7 leading-7 text-zinc-600">
            A considered take on the {product.category.toLowerCase()}, made for
            everyday wear with a cushioned footbed, flexible lining, and a
            durable sole that goes the distance.
          </p>

          <div className="mt-7">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Color</p>
              <p className="text-sm text-zinc-500">{product.color}</p>
            </div>
            <div className="mt-3 flex items-center gap-3 rounded-2xl border border-black/10 bg-white p-3">
              <span className="size-9 rounded-full border-4 border-white bg-[#f04b2f] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]" />
              <span className="text-sm font-medium">{product.color}</span>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Available sizes</p>
              <p className="text-xs text-zinc-500">US sizing</p>
            </div>
            <ul className="mt-3 grid grid-cols-6 gap-2" aria-label="Available sizes">
              {[6, 7, 8, 9, 10, 11].map((size) => (
                <li
                  key={size}
                  className="grid h-11 place-items-center rounded-xl border border-black/10 bg-white text-sm font-medium"
                >
                  {size}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7">
            <AddToCartButton
              productId={product.id}
              productName={product.name}
              variant="inline"
            />
          </div>

          <div className="mt-7 divide-y divide-black/10 border-y border-black/10">
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
                Product details
                <span className="text-lg font-normal transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-1 pt-3 text-sm leading-6 text-zinc-500">
                Soft interior lining, cushioned support, and a hard-wearing sole.
                Designed in small batches for daily rotation.
              </p>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
                Fit and sizing
                <span className="text-lg font-normal transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-1 pt-3 text-sm leading-6 text-zinc-500">
                Fits true to size. If you are between sizes, we recommend sizing
                up for a more relaxed fit.
              </p>
            </details>
            <details className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
                Shipping and returns
                <span className="text-lg font-normal transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-1 pt-3 text-sm leading-6 text-zinc-500">
                Free standard shipping and easy returns within 30 days of
                delivery.
              </p>
            </details>
          </div>
        </div>
      </section>

      <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-24 py-20 sm:py-28">
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

      {relatedProducts.length > 0 ? (
        <section aria-labelledby="related-heading" className="pb-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f04b2f]">
                Keep looking
              </p>
              <h2
                id="related-heading"
                className="mt-3 text-4xl font-semibold tracking-[-0.045em]"
              >
                Related shoes
              </h2>
            </div>
            <Link
              href="/#collection"
              className="hidden text-sm font-semibold underline decoration-black/25 underline-offset-4 transition-opacity hover:opacity-55 sm:block"
            >
              Shop all
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <article key={relatedProduct.id} className="group">
                <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-[#f4f2ec]">
                  <Link
                    href={`/products/${relatedProduct.slug}`}
                    aria-label={`View ${relatedProduct.name}`}
                    className="absolute inset-0 z-10"
                  >
                    <Image
                      src={relatedProduct.image}
                      alt={`${relatedProduct.name} in ${relatedProduct.color}`}
                      fill
                      sizes="(min-width: 640px) 30vw, 100vw"
                      className="object-contain p-5 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    />
                  </Link>
                  <AddToCartButton
                    productId={relatedProduct.id}
                    productName={relatedProduct.name}
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold tracking-tight">
                      <Link
                        href={`/products/${relatedProduct.slug}`}
                        className="transition-colors hover:text-[#f04b2f]"
                      >
                        {relatedProduct.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {relatedProduct.color}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold">
                    {priceFormatter.format(relatedProduct.priceInCents / 100)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
