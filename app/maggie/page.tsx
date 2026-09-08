import Link from "next/link";

export default function MaggiePage() {
  return (
    <section className="flex flex-col items-start gap-6">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
        Maggie
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">Maggie&apos;s Page</h1>
      <p className="max-w-lg text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        This route now renders inside the same shared layout as the home page.
      </p>
      <Link
        className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 font-medium text-background transition-opacity hover:opacity-80"
        href="/maggie/finnley"
      >
        Visit Finnley
      </Link>
    </section>
  );
}
