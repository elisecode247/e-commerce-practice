const productSkeletons = Array.from({ length: 6 });

export default function HomeLoading() {
  return (
    <div aria-label="Loading shoe store" aria-busy="true" className="animate-pulse">
      <section className="grid min-h-120 overflow-hidden rounded-4xl bg-black/5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="flex flex-col justify-center px-7 py-12 sm:px-12">
          <div className="h-3 w-36 rounded-full bg-black/10" />
          <div className="mt-6 h-28 w-full max-w-md rounded-2xl bg-black/10" />
          <div className="mt-6 h-16 w-full max-w-sm rounded-2xl bg-black/5" />
          <div className="mt-8 h-12 w-48 rounded-full bg-black/10" />
        </div>
        <div className="min-h-90 bg-black/5 lg:min-h-155" />
      </section>

      <section className="py-20 sm:py-28">
        <div className="h-12 w-72 max-w-full rounded-xl bg-black/10" />
        <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {productSkeletons.map((_, index) => (
            <article key={index}>
              <div className="aspect-4/3 rounded-3xl bg-black/5" />
              <div className="mt-5 flex justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-2/3 rounded-full bg-black/10" />
                  <div className="h-4 w-1/2 rounded-full bg-black/5" />
                </div>
                <div className="h-4 w-14 rounded-full bg-black/10" />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
