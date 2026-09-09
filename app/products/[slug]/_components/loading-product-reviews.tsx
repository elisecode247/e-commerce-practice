const skeletonCards = Array.from({ length: 3 });

export default function LoadingProductReviews() {
  return (
    <section
      aria-label="Loading customer reviews"
      aria-busy="true"
      className="animate-pulse scroll-mt-24 py-20 sm:py-28"
    >
      <div className="grid gap-10 border-b border-black/10 pb-10 md:grid-cols-[0.7fr_1.3fr]">
        <div>
          <div className="h-3 w-28 rounded-full bg-black/10" />
          <div className="mt-4 h-10 w-64 max-w-full rounded-xl bg-black/10" />
        </div>

        <div className="flex items-end gap-5 md:justify-end">
          <div className="h-16 w-24 rounded-2xl bg-black/10" />
          <div className="space-y-3 pb-1">
            <div className="h-4 w-24 rounded-full bg-black/10" />
            <div className="h-4 w-32 rounded-full bg-black/10" />
          </div>
        </div>
      </div>

      <div className="grid gap-5 pt-8 md:grid-cols-2 lg:grid-cols-3">
        {skeletonCards.map((_, index) => (
          <article
            key={index}
            className="rounded-3xl border border-black/10 bg-white p-6"
          >
            <div className="h-4 w-24 rounded-full bg-black/10" />
            <div className="mt-5 h-6 w-3/4 rounded-lg bg-black/10" />
            <div className="mt-4 space-y-3">
              <div className="h-4 w-full rounded-full bg-black/5" />
              <div className="h-4 w-full rounded-full bg-black/5" />
              <div className="h-4 w-5/6 rounded-full bg-black/5" />
            </div>
            <div className="mt-6 flex gap-2 border-t border-black/10 pt-4">
              <div className="h-3 w-20 rounded-full bg-black/10" />
              <div className="h-3 w-24 rounded-full bg-black/10" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
