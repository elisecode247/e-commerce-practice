"use client";

import { useState, useEffect } from "react";

type FavoriteButtonProps = {
  productName: string;
  className?: string;
};

export function FavoriteButton({
  productName,
  className = "",
}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  function handleClick() {
    setIsFavorite((favorite) => !favorite)
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHydrated(true);
  }, []);

  return (
    <button
      type="button"
      aria-label={
        isFavorite
          ? `Remove ${productName} from favorites`
          : `Add ${productName} to favorites`
      }
      aria-pressed={isFavorite}
      onClick={handleClick}
      className={`grid size-14 shrink-0 place-items-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#171713] ${
        isFavorite
          ? "border-[#f04b2f] bg-[#f04b2f] text-white"
          : "border-black/15 bg-white text-[#171713] hover:border-[#f04b2f] hover:text-[#f04b2f]"
      } ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-5"
        fill={isFavorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      >
        <path d="M20.8 4.9a5.5 5.5 0 0 0-7.8 0L12 5.9l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.3 1-1a5.5 5.5 0 0 0 0-7.8Z" />
      </svg>
      <p>
        {hydrated ? "✅ Hydrated" : "⏳ Server HTML"}
      </p>
    </button>
  );
}
