import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { getProductBySlug } from "@/lib/products";
import ReviewsSummary from "./_components/reviews-summary";
import ProductReviews from "./_components/product-reviews";
import RelatedProducts from "./_components/related-products";
import LoadingReviewsSummary from "./_components/loading-reviews-summary";
import LoadingProductReviews from "./_components/loading-product-reviews";
import LoadingRelatedProducts from "./_components/loading-related-products";
import { FavoriteButton } from "./_components/favorite-button";
import { Suspense } from "react";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

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
            <Suspense fallback={<LoadingReviewsSummary />}>
              <ReviewsSummary productId={product.id} />
            </Suspense>
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

          <div className="mt-7 flex gap-3">
            <AddToCartButton
              productId={product.id}
              productName={product.name}
              variant="inline"
            />
            <FavoriteButton productName={product.name} />
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
      <Suspense fallback={<LoadingProductReviews />}>
        <ProductReviews productId={product.id} />
      </Suspense>
      <Suspense fallback={<LoadingRelatedProducts />}>
        <RelatedProducts product={product} />
      </Suspense>
    </div>
  );
}
