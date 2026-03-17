import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "@/components/site-header";
import { CartProvider } from "@/providers/cart-provider";

describe("SiteHeader search", () => {
  it("shows live typo-tolerant product results", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <SiteHeader />
      </CartProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Open search" }));
    await user.type(screen.getByRole("textbox", { name: "Search products" }), "essentil");

    expect(await screen.findByText("Essential Tee")).toBeInTheDocument();
    expect(screen.getByText("CORE UNIFORM")).toBeInTheDocument();
  });

  it("renders an icon-only account link in the header actions", () => {
    render(
      <CartProvider>
        <SiteHeader />
      </CartProvider>,
    );

    const accountLink = screen.getByRole("link", { name: "Account" });

    expect(accountLink).toHaveAttribute("href", "/account/login");
    expect(accountLink).not.toHaveTextContent("Account");
  });
});
