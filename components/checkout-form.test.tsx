import { fireEvent, render, screen } from "@testing-library/react";
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

  it("blocks empty cart checkout and shows a return-to-catalog state", () => {
    render(
      <CartProvider>
        <CheckoutForm />
      </CartProvider>,
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /shop all products/i }),
    ).toHaveAttribute("href", "/?view=catalog");
    expect(
      screen.getByRole("button", { name: /complete purchase/i }),
    ).toBeDisabled();
  });

  it("shows inline validation errors for invalid credit card checkout details", async () => {
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

    await user.clear(screen.getByLabelText("Full name"));
    await user.clear(screen.getByLabelText("Address"));
    await user.clear(screen.getByLabelText("City"));
    await user.clear(screen.getByLabelText("State"));
    await user.clear(screen.getByLabelText("ZIP code"));

    fireEvent.submit(document.getElementById("checkout-form") as HTMLFormElement);

    expect(await screen.findByText("full name is required.")).toBeInTheDocument();
    expect(screen.getByText("address is required.")).toBeInTheDocument();
    expect(screen.getByText("city is required.")).toBeInTheDocument();
    expect(screen.getByText("state must be a 2-letter code.")).toBeInTheDocument();
    expect(screen.getByText("ZIP code must be valid.")).toBeInTheDocument();
    expect(
      screen.getByText("Card number must be 13 to 19 digits."),
    ).toBeInTheDocument();
    expect(screen.getByText("Name on card is required.")).toBeInTheDocument();
    expect(
      screen.getByText("Expiration date must be in MM/YY format."),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Security code must be 3 or 4 digits."),
    ).toBeInTheDocument();
  });
});
