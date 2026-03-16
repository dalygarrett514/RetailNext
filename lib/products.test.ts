import { describe, expect, it } from "vitest";
import { getProductsByCategory, products } from "@/lib/products";

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
