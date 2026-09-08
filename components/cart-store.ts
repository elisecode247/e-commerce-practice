"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "lace-cart";
const EMPTY_CART: CartItem[] = [];

export type CartItem = {
  productId: string;
  quantity: number;
};

let cachedValue: string | null | undefined;
let cachedCart = EMPTY_CART;
const listeners = new Set<() => void>();

function parseCart(value: string | null): CartItem[] {
  if (!value) {
    return EMPTY_CART;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return EMPTY_CART;
    }

    return parsed.flatMap((item) => {
      if (
        typeof item === "object" &&
        item !== null &&
        "productId" in item &&
        "quantity" in item &&
        typeof item.productId === "string" &&
        typeof item.quantity === "number" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0
      ) {
        return [
          {
            productId: item.productId,
            quantity: Math.min(item.quantity, 99),
          },
        ];
      }

      return [];
    });
  } catch {
    return EMPTY_CART;
  }
}

function getCartSnapshot() {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  const value = window.localStorage.getItem(STORAGE_KEY);

  if (value !== cachedValue) {
    cachedValue = value;
    cachedCart = parseCart(value);
  }

  return cachedCart;
}

function getServerSnapshot() {
  return EMPTY_CART;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cachedValue = undefined;
      listener();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function writeCart(items: CartItem[]) {
  const value = JSON.stringify(items);
  window.localStorage.setItem(STORAGE_KEY, value);
  cachedValue = value;
  cachedCart = items;
  listeners.forEach((listener) => listener());
}

function addItem(productId: string) {
  const current = getCartSnapshot();
  const existing = current.find((item) => item.productId === productId);

  if (existing) {
    writeCart(
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
          : item,
      ),
    );
    return;
  }

  writeCart([...current, { productId, quantity: 1 }]);
}

function setQuantity(productId: string, quantity: number) {
  const current = getCartSnapshot();

  if (quantity <= 0) {
    writeCart(current.filter((item) => item.productId !== productId));
    return;
  }

  writeCart(
    current.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.min(quantity, 99) }
        : item,
    ),
  );
}

function removeItem(productId: string) {
  writeCart(
    getCartSnapshot().filter((item) => item.productId !== productId),
  );
}

export function useCart() {
  const items = useSyncExternalStore(
    subscribe,
    getCartSnapshot,
    getServerSnapshot,
  );

  return {
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    addItem,
    setQuantity,
    removeItem,
  };
}
