import Link from "next/link";

export default function FinnleyPage() {
  return (
    <section className="flex flex-col items-start gap-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
        Maggie / Finnley
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">
        Finnley&apos;s Page
      </h1>
      <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Finnley is a nested route, while the navigation and page frame stay in
        place.
      </p>
      <Link
        className="inline-flex h-12 items-center justify-center rounded-full border border-black/8 px-6 font-medium transition-colors hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-white/8"
        href="/maggie"
      >
        Back to Maggie
      </Link>
    </section>
  );
}
