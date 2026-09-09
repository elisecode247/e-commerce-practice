"use client";

import { useCart } from "@/components/cart-store";

type AddToCartButtonProps = {
  productId: string;
  productName: string;
  className?: string;
};

export function AddToCartButton({
  productId,
  productName,
  className = "",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
    console.log('this should appear in the browser');
  return (
    <button
      type="button"
      aria-label={`Add ${productName} to bag`}
      onClick={() => addItem(productId)}
      className={`absolute bottom-4 right-4 z-30 inline-flex translate-y-0 items-center gap-2 rounded-full bg-[#171713] px-4 py-2.5 text-xs font-semibold text-white opacity-100 shadow-lg transition duration-300 hover:bg-[#f04b2f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171713] sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:focus-visible:translate-y-0 sm:focus-visible:opacity-100 ${className}`}
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
