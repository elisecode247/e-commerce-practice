export default function LoadingReviewsSummary() {
  return (
    <div
      aria-label="Loading review summary"
      aria-busy="true"
      className="flex animate-pulse items-center gap-2"
    >
      <span className="h-4 w-24 rounded-full bg-black/10" />
      <span className="h-4 w-28 rounded-full bg-black/10" />
    </div>
  );
}
