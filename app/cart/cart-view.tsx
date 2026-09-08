"use client";

import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { useCart } from "@/components/cart-store";
import type { Product } from "@/lib/products";

type CartViewProps = {
  products: Product[];
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export function CartView({ products }: CartViewProps) {
  const { items, itemCount, removeItem, setQuantity } = useCart();
  const cartLines = items.flatMap((item) => {
    const product = products.find(({ id }) => id === item.productId);
    return product ? [{ ...item, product }] : [];
  });
  const cartProductIds = new Set(cartLines.map(({ productId }) => productId));
  const recommendations = products
    .filter(({ id }) => !cartProductIds.has(id))
    .slice(0, 3);
  const subtotal = cartLines.reduce(
    (total, { product, quantity }) =>
      total + product.priceInCents * quantity,
    0,
  );

  return (
    <div className="py-6 sm:py-10">
      <Link
        href="/#collection"
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-[#171713]"
      >
        <span aria-hidden="true">←</span>
        Continue shopping
      </Link>

      <div className="mt-9 flex items-end justify-between border-b border-black/10 pb-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f04b2f]">
            Almost there
          </p>
          <h1 className="mt-3 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">
            Your bag
          </h1>
        </div>
        <p className="pb-1 text-sm text-zinc-500">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </p>
      </div>

      <div className="grid gap-6 py-8 lg:grid-cols-[1.5fr_0.75fr] lg:gap-10">
        {cartLines.length === 0 ? (
          <EmptyCart />
        ) : (
          <section aria-label="Shopping bag items" className="space-y-4">
            {cartLines.map(({ product, quantity }) => (
              <article
                key={product.id}
                className="grid grid-cols-[7rem_1fr] gap-5 rounded-3xl border border-black/10 bg-white p-4 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6 sm:p-5"
              >
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-[#f4f2ec]">
                  <Image
                    src={product.image}
                    alt={`${product.name} in ${product.color}`}
                    fill
                    sizes="160px"
                    className="object-contain p-3 mix-blend-multiply"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#f04b2f]">
                    {product.category}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">{product.color}</p>
                  <button
                    type="button"
                    onClick={() => removeItem(product.id)}
                    className="mt-4 text-xs font-semibold text-zinc-500 underline decoration-black/20 underline-offset-4 transition-colors hover:text-[#f04b2f]"
                  >
                    Remove
                  </button>
                </div>
                <div className="col-span-2 flex items-center justify-between gap-5 border-t border-black/10 pt-4 sm:col-span-1 sm:flex-col sm:items-end sm:border-0 sm:pt-0">
                  <p className="font-semibold">
                    {priceFormatter.format(
                      (product.priceInCents * quantity) / 100,
                    )}
                  </p>
                  <div
                    className="flex items-center rounded-full border border-black/15 bg-[#fffdf8]"
                    aria-label={`Quantity for ${product.name}`}
                  >
                    <button
                      type="button"
                      aria-label={`Decrease ${product.name} quantity`}
                      onClick={() => setQuantity(product.id, quantity - 1)}
                      className="grid size-9 place-items-center rounded-full transition-colors hover:bg-black/5"
                    >
                      −
                    </button>
                    <span className="min-w-7 text-center text-sm font-semibold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase ${product.name} quantity`}
                      onClick={() => setQuantity(product.id, quantity + 1)}
                      className="grid size-9 place-items-center rounded-full transition-colors hover:bg-black/5"
                    >
                      +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}

        <aside className="h-fit rounded-4xl border border-black/10 bg-white p-7 sm:p-8">
          <h2 className="text-xl font-semibold tracking-tight">Order summary</h2>
          <dl className="mt-7 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Subtotal</dt>
              <dd className="font-medium">
                {priceFormatter.format(subtotal / 100)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Shipping</dt>
              <dd className="font-medium">
                {subtotal > 0 ? "Free" : "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-zinc-500">Estimated tax</dt>
              <dd className="font-medium">—</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-black/10 pt-5 text-base">
              <dt className="font-semibold">Estimated total</dt>
              <dd className="font-semibold">
                {priceFormatter.format(subtotal / 100)}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            disabled
            className="mt-7 w-full cursor-not-allowed rounded-full bg-zinc-200 px-5 py-4 text-sm font-semibold text-zinc-400"
          >
            {cartLines.length > 0 ? "Checkout coming soon" : "Checkout"}
          </button>
          <p className="mt-4 text-center text-xs leading-5 text-zinc-400">
            {cartLines.length > 0
              ? "Your items are saved in this browser."
              : "Add an item to your bag to continue."}
          </p>
        </aside>
      </div>

      {recommendations.length > 0 ? (
        <Recommendations products={recommendations} />
      ) : null}
    </div>
  );
}

function EmptyCart() {
  return (
    <section
      aria-labelledby="empty-cart-heading"
      className="relative flex min-h-105 overflow-hidden rounded-4xl bg-[#d6e6ff] px-7 py-10 sm:px-12"
    >
      <div className="relative z-10 flex max-w-sm flex-col items-start justify-center">
        <div className="grid size-12 place-items-center rounded-full bg-white/85 shadow-sm">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          >
            <path d="M6.5 8.5h11l-.8 11h-9.4l-.8-11Z" />
            <path d="M9 9V6.8a3 3 0 0 1 6 0V9" />
          </svg>
        </div>
        <h2
          id="empty-cart-heading"
          className="mt-7 text-3xl font-semibold tracking-[-0.04em]"
        >
          Your bag is feeling light.
        </h2>
        <p className="mt-3 leading-7 text-[#4d5360]">
          Find a pair that feels like you. Anything you add will be waiting
          right here.
        </p>
        <Link
          href="/#collection"
          className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#171713] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
        >
          Explore the collection
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <Image
        src="/shoe2.png"
        alt=""
        fill
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="pointer-events-none translate-x-[35%] translate-y-[22%] object-contain p-5 opacity-35 mix-blend-multiply sm:opacity-55"
      />
    </section>
  );
}

function Recommendations({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="recommendations-heading" className="pt-16 sm:pt-24">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f04b2f]">
            A good place to start
          </p>
          <h2
            id="recommendations-heading"
            className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl"
          >
            You might like
          </h2>
        </div>
        <Link
          href="/#collection"
          className="hidden text-sm font-semibold underline decoration-black/25 underline-offset-4 transition-opacity hover:opacity-55 sm:block"
        >
          View all shoes
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="group">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-[#f4f2ec]">
              <Image
                src={product.image}
                alt={`${product.name} in ${product.color}`}
                fill
                sizes="(min-width: 640px) 30vw, 100vw"
                className="object-contain p-5 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              />
              <AddToCartButton
                productId={product.id}
                productName={product.name}
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold tracking-tight">{product.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{product.color}</p>
              </div>
              <p className="shrink-0 text-sm font-semibold">
                {priceFormatter.format(product.priceInCents / 100)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
