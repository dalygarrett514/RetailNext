import { describe, expect, it } from "vitest";
import {
  LAST_ORDER_STORAGE_KEY,
  buildOrderSnapshot,
  calculateSubtotalCents,
  cartReducer,
  createCartLine,
  initialCartState,
  loadOrderSnapshot,
} from "@/lib/cart";
import { products } from "@/lib/products";

const sampleShipping = {
  fullName: "Alex Example",
  address: "123 Sample Street",
  city: "Demo City",
  state: "CA",
  zipCode: "99999",
};

describe("cartReducer", () => {
  it("increments quantity when the same product is added again", () => {
    const firstAdd = cartReducer(initialCartState, {
      type: "add",
      line: createCartLine(products[0].id),
    });
    const secondAdd = cartReducer(firstAdd, {
      type: "add",
      line: createCartLine(products[0].id),
    });

    expect(secondAdd.lines).toHaveLength(1);
    expect(secondAdd.lines[0].quantity).toBe(2);
    expect(secondAdd.isOpen).toBe(true);
  });

  it("removes a single line and updates subtotal", () => {
    const lineA = createCartLine(products[0].id);
    const lineB = createCartLine(products[1].id);
    const seededState = {
      ...initialCartState,
      lines: [lineA, lineB],
    };

    const nextState = cartReducer(seededState, {
      type: "remove",
      lineId: lineA.lineId,
    });

    expect(nextState.lines).toHaveLength(1);
    expect(calculateSubtotalCents(nextState.lines)).toBe(products[1].priceCents);
  });
});

describe("buildOrderSnapshot", () => {
  it("builds a complete order record from cart lines and shipping", () => {
    const lines = [createCartLine(products[3].id), createCartLine(products[1].id)];

    const order = buildOrderSnapshot(lines, sampleShipping);

    expect(order.orderId).toMatch(/^RNX-\d{6}$/);
    expect(order.items).toHaveLength(2);
    expect(order.items[0].quantity).toBe(1);
    expect(order.subtotalCents).toBe(
      products[3].priceCents + products[1].priceCents,
    );
    expect(order.shipping.city).toBe(sampleShipping.city);
  });

  it("returns a stable snapshot reference when storage is unchanged", () => {
    const order = buildOrderSnapshot(
      [createCartLine(products[3].id)],
      sampleShipping,
    );

    window.sessionStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(order));

    const firstRead = loadOrderSnapshot();
    const secondRead = loadOrderSnapshot();

    expect(firstRead).toBe(secondRead);
  });
});
