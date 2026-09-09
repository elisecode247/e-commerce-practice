import { getRelatedProducts, type Product } from "@/lib/products";
import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "@/components/add-to-cart-button";

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

type RelatedProductsProps = {
  product: Product;
};

export default async function RelatedProducts({ product }: RelatedProductsProps) {
    const relatedProducts = await getRelatedProducts(product.id, product.category);

    return relatedProducts.length > 0 ? (
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
      ) : null
}
