import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CartDrawer } from "@/components/cart-drawer";
import { CART_STORAGE_KEY, createCartLine } from "@/lib/cart";
import { products } from "@/lib/products";
import { CartProvider, useCart } from "@/providers/cart-provider";

function CartHarness() {
  const { openCart } = useCart();

  return (
    <>
      <button onClick={openCart} type="button">
        Open cart
      </button>
      <CartDrawer />
    </>
  );
}

describe("CartDrawer", () => {
  it("updates quantity, subtotal, and clears the cart", async () => {
    const user = userEvent.setup();
    const seededLine = createCartLine(products[0].id);

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([seededLine]));

    render(
      <CartProvider>
        <CartHarness />
      </CartProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Open cart" }));

    await waitFor(() => {
      expect(screen.getAllByText("$58.00")).toHaveLength(2);
    });

    await user.click(
      screen.getByRole("button", {
        name: `Increase quantity of ${products[0].name}`,
      }),
    );

    await waitFor(() => {
      expect(screen.getAllByText("$116.00")).toHaveLength(2);
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    await user.click(screen.getByRole("button", { name: "Clear cart" }));

    await waitFor(() => {
      expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
      expect(screen.getByText("$0.00")).toBeInTheDocument();
    });
  });
});
