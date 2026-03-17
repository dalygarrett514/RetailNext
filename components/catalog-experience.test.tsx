import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CatalogExperience } from "@/components/catalog-experience";
import { getProductsByCategory } from "@/lib/products";

describe("CatalogExperience", () => {
  it("renders the full catalog by default", () => {
    render(
      <CatalogExperience
        selectedCategory="all"
        visibleProducts={getProductsByCategory("all")}
      />,
    );

    expect(within(screen.getByTestId("product-grid")).getAllByTestId("product-card")).toHaveLength(9);
  });

  it("renders the filtered category set", () => {
    render(
      <CatalogExperience
        selectedCategory="t-shirt"
        visibleProducts={getProductsByCategory("t-shirt")}
      />,
    );

    expect(within(screen.getByTestId("product-grid")).getAllByTestId("product-card")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "T-shirts" })).toBeInTheDocument();
  });

  it("filters the grid when a merchandising filter is selected", async () => {
    const user = userEvent.setup();

    render(
      <CatalogExperience
        selectedCategory="all"
        visibleProducts={getProductsByCategory("all")}
      />,
    );

    await user.click(screen.getByTestId("toolbar-filter"));
    await user.click(screen.getByRole("menuitemradio", { name: "Studio Picks" }));

    expect(within(screen.getByTestId("product-grid")).getAllByTestId("product-card")).toHaveLength(4);
    expect(screen.getByText("4 styles")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "All products" })).toBeInTheDocument();
  });

  it("sorts the visible products by price", async () => {
    const user = userEvent.setup();

    render(
      <CatalogExperience
        selectedCategory="all"
        visibleProducts={getProductsByCategory("all")}
      />,
    );

    await user.click(screen.getByTestId("toolbar-sort"));
    await user.click(screen.getByRole("menuitemradio", { name: "Price: High to Low" }));

    const cards = screen.getAllByTestId("product-card");
    expect(within(cards[0]).getByRole("heading", { name: "Commuter Pleated Trouser" }))
      .toBeInTheDocument();
  });
});
