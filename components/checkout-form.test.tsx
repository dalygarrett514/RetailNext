import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CheckoutForm } from "@/components/checkout-form";
import { CART_STORAGE_KEY, createCartLine } from "@/lib/cart";
import { products } from "@/lib/products";
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

  it("only shows billing and card fields when credit card is selected", async () => {
    const user = userEvent.setup();

    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([createCartLine(products[0].id)]),
    );

    render(
      <CartProvider>
        <CheckoutForm />
      </CartProvider>,
    );

    expect(screen.getByLabelText("Full name")).toBeInTheDocument();
    expect(screen.getByLabelText("Card number")).toBeInTheDocument();
    expect(
      screen.queryByLabelText("Billing full name"),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /paypal/i }));

    expect(screen.queryByLabelText("Full name")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Card number")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /credit card/i }));
    await user.click(
      screen.getByRole("button", {
        name: /billing address same as shipping/i,
      }),
    );

    expect(await screen.findByLabelText("Billing full name")).toBeInTheDocument();
    expect(screen.getByLabelText("Billing address")).toBeInTheDocument();
  });
});
