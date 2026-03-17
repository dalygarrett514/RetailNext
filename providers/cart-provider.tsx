"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import {
  calculateSubtotalCents,
  cartReducer,
  createCartLine,
  initialCartState,
  loadCartLines,
  resolveCartLines,
  saveCartLines,
  type CartLineWithProduct,
} from "@/lib/cart";
import type { CartLine } from "@/lib/types";

interface CartContextValue {
  lines: CartLine[];
  lineItems: CartLineWithProduct[];
  isOpen: boolean;
  itemCount: number;
  subtotalCents: number;
  openCart: () => void;
  closeCart: () => void;
  addProduct: (productId: CartLine["productId"]) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    dispatch({ type: "hydrate", lines: loadCartLines() });
  }, []);

  useEffect(() => {
    if (!state.hasHydrated) {
      return;
    }

    saveCartLines(state.lines);
  }, [state.hasHydrated, state.lines]);

  const lineItems = resolveCartLines(state.lines);
  const value: CartContextValue = {
    lines: state.lines,
    lineItems,
    isOpen: state.isOpen,
    itemCount: state.lines.length,
    subtotalCents: calculateSubtotalCents(state.lines),
    openCart: () => dispatch({ type: "open" }),
    closeCart: () => dispatch({ type: "close" }),
    addProduct: (productId) =>
      dispatch({ type: "add", line: createCartLine(productId) }),
    updateQuantity: (lineId, quantity) =>
      dispatch({ type: "update-quantity", lineId, quantity }),
    removeLine: (lineId) => dispatch({ type: "remove", lineId }),
    clearCart: () => dispatch({ type: "clear" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
