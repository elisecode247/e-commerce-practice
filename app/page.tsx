import Image from "next/image";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { getProducts } from "@/lib/products";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

export default async function Home() {
  const products = await getProducts();
  const firstProduct = products.at(0);
console.log('this should appear in the terminal')
  if (!firstProduct) {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center rounded-4xl bg-[#f0efdc] px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f04b2f]">
          LACE.
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tighter">
          New shoes are on the way.
        </h1>
        <p className="mt-4 max-w-md leading-7 text-[#5d5b50]">
          The catalog is empty right now. Check back soon for the next drop.
        </p>
      </section>
    );
  }

  const featuredProduct = products.at(2) ?? firstProduct;

  return (
    <>
      <section className="grid overflow-hidden rounded-4xl bg-[#f0efdc] lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-center px-7 py-12 sm:px-12 sm:py-16 lg:py-24">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-[#f04b2f]">
            The autumn edit · 2026
          </p>
          <h1 className="max-w-xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-[#171713] sm:text-7xl">
            Shoes for going places.
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-[#5d5b50] sm:text-lg">
            Everyday pairs with a little more personality. Designed for long
            walks, late nights, and everything between.
          </p>
          <a
            href="#collection"
            className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-[#171713] px-6 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Shop the collection
            <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="group relative min-h-90 bg-[#d6e6ff] lg:min-h-155">
          <div className="absolute inset-x-8 bottom-7 top-8 rounded-full border border-[#171713]/10 sm:inset-x-16" />
          <Image
            src={featuredProduct.image}
            alt={`${featuredProduct.name} in ${featuredProduct.color}`}
            fill
            priority
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="z-10 object-contain p-7 mix-blend-multiply sm:p-12"
          />
          <div className="absolute bottom-7 left-7 z-20 rounded-2xl bg-white/90 px-5 py-4 shadow-sm backdrop-blur sm:bottom-10 sm:left-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#f04b2f]">
              Featured
            </p>
            <p className="mt-1 font-semibold text-[#171713]">
              {featuredProduct.name}
            </p>
            <p className="text-sm text-[#5d5b50]">
              {priceFormatter.format(featuredProduct.priceInCents / 100)}
            </p>
          </div>
          <AddToCartButton
            productId={featuredProduct.id}
            productName={featuredProduct.name}
            className="bottom-7 right-7 sm:bottom-10 sm:right-10"
          />
        </div>
      </section>

      <section id="collection" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f04b2f]">
              Fresh out of the box
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.045em] text-[#171713] sm:text-5xl">
              Find your next pair.
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-zinc-500">
            {products.length} styles, made to be worn on repeat. Free shipping
            and returns on every order.
          </p>
        </div>

        <div className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <article key={product.id} className="group">
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-[#f4f2ec]">
                {product.badge ? (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#171713] shadow-sm">
                    {product.badge}
                  </span>
                ) : null}
                <Image
                  src={product.image}
                  alt={`${product.name} in ${product.color}`}
                  fill
                  priority={index < 3}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-contain p-5 mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                />
                <AddToCartButton
                  productId={product.id}
                  productName={product.name}
                />
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold tracking-tight text-[#171713]">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {product.category} · {product.color}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-[#171713]">
                  {priceFormatter.format(product.priceInCents / 100)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-8 grid overflow-hidden rounded-4xl bg-[#171713] text-white md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f47b61]">
            Walk easy
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.045em]">
            Comfort should not be complicated.
          </h2>
          <p className="mt-5 max-w-md leading-7 text-white/65">
            Cushioned foot-beds, thoughtful materials, and silhouettes that work
            with the rest of your closet.
          </p>
        </div>
        <div className="group relative min-h-80 bg-[#ff8065]">
          <Image
            src={firstProduct.image}
            alt={`${firstProduct.name} in ${firstProduct.color}`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain p-8 mix-blend-multiply"
          />
          <AddToCartButton
            productId={firstProduct.id}
            productName={firstProduct.name}
          />
        </div>
      </section>
    </>
  );
}
