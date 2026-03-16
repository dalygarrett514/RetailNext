import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckoutForm } from "@/components/checkout-form";
import { CartProvider } from "@/providers/cart-provider";

describe("CheckoutForm", () => {
  it("does not render a discount code field", () => {
    render(
      <CartProvider>
        <CheckoutForm />
      </CartProvider>,
    );

    expect(
      screen.queryByRole("textbox", { name: /discount/i }),
    ).not.toBeInTheDocument();
  });
});
