"use client";

import { useCart } from "@/components/cart-store";

type AddToCartButtonProps = {
  productId: string;
  productName: string;
  className?: string;
  variant?: "overlay" | "inline";
};

export function AddToCartButton({
  productId,
  productName,
  className = "",
  variant = "overlay",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const variantClasses =
    variant === "overlay"
      ? "absolute bottom-4 right-4 z-30 translate-y-0 opacity-100 shadow-lg sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:translate-y-0 sm:focus-visible:opacity-100"
      : "relative w-full justify-center px-6 py-4 text-sm";

  return (
    <button
      type="button"
      aria-label={`Add ${productName} to bag`}
      onClick={() => addItem(productId)}
      className={`inline-flex items-center gap-2 rounded-full bg-[#171713] px-4 py-2.5 text-xs font-semibold text-white transition duration-300 hover:bg-[#f04b2f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171713] ${variantClasses} ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      >
        <path d="M6.5 8.5h11l-.8 11h-9.4l-.8-11Z" />
        <path d="M9 9V6.8a3 3 0 0 1 6 0V9M12 12v4M10 14h4" />
      </svg>
      Add to bag
    </button>
  );
}
