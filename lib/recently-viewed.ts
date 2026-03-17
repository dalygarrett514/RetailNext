import { getProductById } from "@/lib/products";
import type { Product } from "@/lib/types";

const RECENTLY_VIEWED_KEY = "retailnext:recently-viewed";
const MAX_RECENTLY_VIEWED = 8;
const RECENTLY_VIEWED_EVENT = "retailnext:recently-viewed-updated";

let cachedSerializedIds: string | null | undefined;
let cachedProducts: Product[] = [];

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
  window.dispatchEvent(new Event(RECENTLY_VIEWED_EVENT));
}

export function loadRecentlyViewedProducts(excludedId?: string): Product[] {
  return loadRecentlyViewedIds()
    .filter((id) => id !== excludedId)
    .map((id) => getProductById(id))
    .filter((product): product is Product => Boolean(product));
}

export function subscribeToRecentlyViewed(onStoreChange: () => void) {
  if (!isBrowser()) {
    return () => {};
  }

  const handleChange = () => {
    cachedSerializedIds = undefined;
    onStoreChange();
  };

  window.addEventListener("storage", handleChange);
  window.addEventListener(RECENTLY_VIEWED_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(RECENTLY_VIEWED_EVENT, handleChange);
  };
}

export function getRecentlyViewedProductsSnapshot() {
  if (!isBrowser()) {
    return [];
  }

  const serializedIds = window.localStorage.getItem(RECENTLY_VIEWED_KEY);

  if (serializedIds === cachedSerializedIds) {
    return cachedProducts;
  }

  cachedSerializedIds = serializedIds;
  cachedProducts = loadRecentlyViewedProducts();

  return cachedProducts;
}
