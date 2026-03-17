import { describe, expect, it } from "vitest";
import {
  loadRecentlyViewedIds,
  loadRecentlyViewedProducts,
  saveRecentlyViewedProduct,
} from "@/lib/recently-viewed";

const RECENTLY_VIEWED_KEY = "retailnext:recently-viewed";

describe("loadRecentlyViewedIds", () => {
  it("returns an empty list when localStorage contains invalid JSON", () => {
    window.localStorage.setItem(RECENTLY_VIEWED_KEY, "{not-valid-json");

    expect(loadRecentlyViewedIds()).toEqual([]);
  });

  it("ignores non-string values in stored recently viewed data", () => {
    window.localStorage.setItem(
      RECENTLY_VIEWED_KEY,
      JSON.stringify(["prod-essential-tee", 42, null, { id: "bad" }]),
    );

    expect(loadRecentlyViewedIds()).toEqual(["prod-essential-tee"]);
  });
});

describe("loadRecentlyViewedProducts", () => {
  it("ignores stale product ids that no longer resolve", () => {
    window.localStorage.setItem(
      RECENTLY_VIEWED_KEY,
      JSON.stringify(["missing-product", "prod-essential-tee"]),
    );

    const products = loadRecentlyViewedProducts();

    expect(products).toHaveLength(1);
    expect(products[0]?.name).toBe("Essential Tee");
  });
});

describe("saveRecentlyViewedProduct", () => {
  it("moves an existing product to the front instead of duplicating it", () => {
    window.localStorage.setItem(
      RECENTLY_VIEWED_KEY,
      JSON.stringify(["prod-weekend-box-tee", "prod-essential-tee"]),
    );

    saveRecentlyViewedProduct("prod-essential-tee");

    expect(loadRecentlyViewedIds()).toEqual([
      "prod-essential-tee",
      "prod-weekend-box-tee",
    ]);
  });
});
