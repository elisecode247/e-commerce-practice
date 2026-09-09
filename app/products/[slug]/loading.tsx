export default function ProductLoading() {
  return (
    <div className="animate-pulse py-8">
      <div className="h-4 w-48 rounded-full bg-black/10" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        <div className="min-h-105 rounded-4xl bg-black/5 sm:min-h-150" />
        <div className="flex flex-col justify-center gap-5">
          <div className="h-3 w-32 rounded-full bg-black/10" />
          <div className="h-16 w-4/5 rounded-2xl bg-black/10" />
          <div className="h-7 w-24 rounded-full bg-black/10" />
          <div className="mt-3 h-24 rounded-2xl bg-black/5" />
          <div className="h-14 rounded-full bg-black/10" />
        </div>
      </div>
    </div>
  );
}
