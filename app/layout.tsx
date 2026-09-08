import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { CartLink } from "@/components/cart-link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LACE — Shoes for Going Places",
  description: "Distinctive everyday shoes for every kind of day.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#fffdf8] font-sans text-[#171713]">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 border-b border-black/10 bg-[#fffdf8]/90 backdrop-blur-xl">
            <nav
              aria-label="Main navigation"
              className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
            >
              <Link
                className="text-xl font-black tracking-[-0.06em]"
                href="/"
              >
                LACE<span className="text-[#f04b2f]">.</span>
              </Link>
              <div className="flex items-center gap-5 text-sm font-medium sm:gap-8">
                <Link className="transition-opacity hover:opacity-55" href="/#collection">
                  Shop
                </Link>
                <Link
                  className="hidden transition-opacity hover:opacity-55 sm:block"
                  href="/maggie"
                >
                  Maggie
                </Link>
                <Link
                  className="hidden transition-opacity hover:opacity-55 sm:block"
                  href="/maggie/finnley"
                >
                  Finnley
                </Link>
                <CartLink />
              </div>
            </nav>
          </header>
          <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-6 sm:px-8 sm:py-8">
            {children}
          </main>
          <footer className="border-t border-black/10">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p>© 2026 LACE. Made for the long way home.</p>
              <p>Free shipping over $75 · Easy 30-day returns</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
