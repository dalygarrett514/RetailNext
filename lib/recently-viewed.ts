import { getProductById } from "@/lib/products";
import type { Product } from "@/lib/types";

const RECENTLY_VIEWED_KEY = "retailnext:recently-viewed";
const MAX_RECENTLY_VIEWED = 8;

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadRecentlyViewedIds(): string[] {
  if (!isBrowser()) {
    return [];
  }

  const storedValue = window.localStorage.getItem(RECENTLY_VIEWED_KEY);

  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(storedValue);

    return Array.isArray(parsedValue)
      ? parsedValue.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

export function saveRecentlyViewedProduct(productId: string) {
  if (!isBrowser()) {
    return;
  }

  const nextIds = [
    productId,
    ...loadRecentlyViewedIds().filter((id) => id !== productId),
  ].slice(0, MAX_RECENTLY_VIEWED);

  window.localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(nextIds));
}

export function loadRecentlyViewedProducts(excludedId?: string): Product[] {
  return loadRecentlyViewedIds()
    .filter((id) => id !== excludedId)
    .map((id) => getProductById(id))
    .filter((product): product is Product => Boolean(product));
}
