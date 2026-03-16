import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CatalogExperience } from "@/components/catalog-experience";
import { getProductsByCategory } from "@/lib/products";

describe("CatalogExperience", () => {
  it("renders the full catalog by default", () => {
    render(
      <CatalogExperience
        selectedCategory="all"
        totalProductCount={9}
        visibleProducts={getProductsByCategory("all")}
      />,
    );

    expect(screen.getAllByTestId("product-card")).toHaveLength(9);
  });

  it("renders the filtered category set", () => {
    render(
      <CatalogExperience
        selectedCategory="t-shirt"
        totalProductCount={3}
        visibleProducts={getProductsByCategory("t-shirt")}
      />,
    );

    expect(screen.getAllByTestId("product-card")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "T-shirts" })).toBeInTheDocument();
  });

  it("keeps the grid unchanged when the inert toolbar buttons are clicked", () => {
    render(
      <CatalogExperience
        selectedCategory="all"
        totalProductCount={9}
        visibleProducts={getProductsByCategory("all")}
      />,
    );

    const beforeCount = screen.getAllByTestId("product-card").length;

    fireEvent.click(screen.getByTestId("toolbar-filter"));
    fireEvent.click(screen.getByTestId("toolbar-sort"));

    expect(screen.getAllByTestId("product-card")).toHaveLength(beforeCount);
  });
});
