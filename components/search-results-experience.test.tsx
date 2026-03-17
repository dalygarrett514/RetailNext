import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SearchResultsExperience } from "@/components/search-results-experience";

describe("SearchResultsExperience", () => {
  it("renders search results for the starting query", () => {
    render(<SearchResultsExperience initialQuery="tee" />);

    expect(within(screen.getByTestId("product-grid")).getAllByTestId("product-card")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "Results for “tee”" })).toBeInTheDocument();
  });

  it("applies facets to narrow the result set", async () => {
    const user = userEvent.setup();

    render(<SearchResultsExperience initialQuery="tee" />);

    await user.click(screen.getByLabelText("Best Sellers"));

    expect(within(screen.getByTestId("product-grid")).getAllByTestId("product-card")).toHaveLength(2);
    expect(screen.getByText("2 styles matched “tee”")).toBeInTheDocument();
  });

  it("shows filter recovery when facets remove all matches", async () => {
    const user = userEvent.setup();

    render(<SearchResultsExperience initialQuery="tee" />);

    await user.click(screen.getByLabelText("Studio Picks"));
    await user.click(screen.getByLabelText("Back in Stock"));

    expect(screen.getByRole("heading", { name: "The current facets are too narrow" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear all facets" })).toBeInTheDocument();
  });

  it("shows zero-result search recovery suggestions", () => {
    render(<SearchResultsExperience initialQuery="zzzx" />);

    expect(screen.getByRole("heading", { name: "No matches for “zzzx” yet" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try “Best sellers”" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse all products" })).toHaveAttribute(
      "href",
      "/?view=catalog",
    );
  });
});
