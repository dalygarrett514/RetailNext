import { describe, expect, it } from "vitest";
import {
  getProductsByCategory,
  getSearchRecoverySuggestions,
  products,
  searchProducts,
} from "@/lib/products";

describe("getProductsByCategory", () => {
  it("returns the full catalog for all", () => {
    expect(getProductsByCategory("all")).toHaveLength(products.length);
  });

  it("returns only t-shirts", () => {
    const results = getProductsByCategory("t-shirt");

    expect(results).toHaveLength(3);
    expect(results.every((product) => product.category === "t-shirt")).toBe(true);
  });

  it("returns only pants", () => {
    const results = getProductsByCategory("pants");

    expect(results).toHaveLength(3);
    expect(results.every((product) => product.category === "pants")).toBe(true);
  });

  it("returns only sweatshirts", () => {
    const results = getProductsByCategory("sweatshirt");

    expect(results).toHaveLength(3);
    expect(results.every((product) => product.category === "sweatshirt")).toBe(
      true,
    );
  });
});

describe("searchProducts", () => {
  it("returns typo-tolerant product matches", () => {
    const results = searchProducts("essentil");

    expect(results[0]?.name).toBe("Essential Tee");
  });

  it("matches collection and fit language", () => {
    expect(searchProducts("core uniform")[0]?.name).toBe("Essential Tee");
    expect(searchProducts("relaxed taper")[0]?.name).toBe("Commuter Pleated Trouser");
  });
});

describe("getSearchRecoverySuggestions", () => {
  it("returns fallback recovery terms when there is no close suggestion", () => {
    expect(getSearchRecoverySuggestions("zzzx")).toEqual([
      "Best sellers",
      "T-shirts",
      "CORE UNIFORM",
    ]);
  });
});
