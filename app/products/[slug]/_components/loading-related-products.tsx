const skeletonCards = Array.from({ length: 3 });

export default function LoadingRelatedProducts() {
  return (
    <section
      aria-label="Loading related shoes"
      aria-busy="true"
      className="animate-pulse pb-12"
    >
      <div className="flex items-end justify-between gap-6">
        <div>
          <div className="h-3 w-24 rounded-full bg-black/10" />
          <div className="mt-4 h-10 w-56 max-w-full rounded-xl bg-black/10" />
        </div>
        <div className="hidden h-4 w-16 rounded-full bg-black/10 sm:block" />
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {skeletonCards.map((_, index) => (
          <article key={index}>
            <div className="aspect-4/3 rounded-3xl bg-black/5" />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="h-4 w-3/4 rounded-full bg-black/10" />
                <div className="h-4 w-1/2 rounded-full bg-black/5" />
              </div>
              <div className="h-4 w-14 shrink-0 rounded-full bg-black/10" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
