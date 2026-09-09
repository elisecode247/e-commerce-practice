const recommendationSkeletons = Array.from({ length: 3 });

export default function CartLoading() {
  return (
    <div
      aria-label="Loading shopping bag"
      aria-busy="true"
      className="animate-pulse py-6 sm:py-10"
    >
      <div className="h-4 w-36 rounded-full bg-black/10" />

      <div className="mt-9 flex items-end justify-between border-b border-black/10 pb-7">
        <div>
          <div className="h-3 w-24 rounded-full bg-black/10" />
          <div className="mt-4 h-14 w-52 rounded-2xl bg-black/10" />
        </div>
        <div className="h-4 w-14 rounded-full bg-black/10" />
      </div>

      <div className="grid gap-6 py-8 lg:grid-cols-[1.5fr_0.75fr] lg:gap-10">
        <div className="min-h-105 rounded-4xl bg-black/5" />
        <div className="h-72 rounded-4xl border border-black/10 bg-white p-8">
          <div className="h-6 w-36 rounded-lg bg-black/10" />
          <div className="mt-8 space-y-5">
            <div className="h-4 rounded-full bg-black/5" />
            <div className="h-4 rounded-full bg-black/5" />
            <div className="h-4 rounded-full bg-black/10" />
          </div>
          <div className="mt-8 h-12 rounded-full bg-black/10" />
        </div>
      </div>

      <div className="pt-16 sm:pt-24">
        <div className="h-10 w-60 max-w-full rounded-xl bg-black/10" />
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {recommendationSkeletons.map((_, index) => (
            <div key={index}>
              <div className="aspect-4/3 rounded-3xl bg-black/5" />
              <div className="mt-4 h-4 w-2/3 rounded-full bg-black/10" />
              <div className="mt-3 h-4 w-1/3 rounded-full bg-black/5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
