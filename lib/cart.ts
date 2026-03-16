import { products } from "@/lib/products";
import type {
  CartLine,
  CheckoutForm,
  OrderItem,
  OrderSnapshot,
  Product,
} from "@/lib/types";

export const CART_STORAGE_KEY = "retailnext-cart-lines";
export const LAST_ORDER_STORAGE_KEY = "retailnext-last-order";

let cachedOrderRawValue: string | null | undefined;
let cachedOrderSnapshot: OrderSnapshot | null = null;

export const DEFAULT_CHECKOUT_FORM: CheckoutForm = {
  fullName: "Alex Example",
  address: "123 Sample Street",
  city: "Demo City",
  state: "CA",
  zipCode: "99999",
};

export interface CartLineWithProduct extends CartLine {
  product: Product;
}

export interface CartState {
  hasHydrated: boolean;
  isOpen: boolean;
  lines: CartLine[];
}

export type CartAction =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "open" }
  | { type: "close" }
  | { type: "add"; line: CartLine }
  | { type: "remove"; lineId: string }
  | { type: "clear" };

export const initialCartState: CartState = {
  hasHydrated: false,
  isOpen: false,
  lines: [],
};

function createLineId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `line-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createOrderId(): string {
  return `RNX-${Math.floor(100000 + Math.random() * 900000)}`;
}

export function createCartLine(productId: Product["id"]): CartLine {
  return {
    lineId: createLineId(),
    productId,
    addedAt: new Date().toISOString(),
  };
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return {
        ...state,
        hasHydrated: true,
        lines: action.lines,
      };
    case "open":
      return {
        ...state,
        isOpen: true,
      };
    case "close":
      return {
        ...state,
        isOpen: false,
      };
    case "add":
      return {
        ...state,
        isOpen: true,
        lines: [...state.lines, action.line],
      };
    case "remove":
      return {
        ...state,
        lines: state.lines.filter((line) => line.lineId !== action.lineId),
      };
    case "clear":
      return {
        ...state,
        isOpen: false,
        lines: [],
      };
    default:
      return state;
  }
}

export function resolveCartLines(lines: CartLine[]): CartLineWithProduct[] {
  return lines.flatMap((line) => {
    const product = products.find((candidate) => candidate.id === line.productId);

    if (!product) {
      return [];
    }

    return [{ ...line, product }];
  });
}

export function calculateSubtotalCents(lines: CartLine[]): number {
  return resolveCartLines(lines).reduce(
    (subtotal, line) => subtotal + line.product.priceCents,
    0,
  );
}

export function loadCartLines(): CartLine[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawValue = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue) as CartLine[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (line) =>
        typeof line.lineId === "string" &&
        typeof line.productId === "string" &&
        typeof line.addedAt === "string",
    );
  } catch {
    return [];
  }
}

export function saveCartLines(lines: CartLine[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
}

export function loadOrderSnapshot(): OrderSnapshot | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.sessionStorage.getItem(LAST_ORDER_STORAGE_KEY);

  if (rawValue === cachedOrderRawValue) {
    return cachedOrderSnapshot;
  }

  cachedOrderRawValue = rawValue;

  if (!rawValue) {
    cachedOrderSnapshot = null;
    return null;
  }

  try {
    cachedOrderSnapshot = JSON.parse(rawValue) as OrderSnapshot;
    return cachedOrderSnapshot;
  } catch {
    cachedOrderSnapshot = null;
    return null;
  }
}

export function saveOrderSnapshot(order: OrderSnapshot): void {
  if (typeof window === "undefined") {
    return;
  }

  const serializedOrder = JSON.stringify(order);

  cachedOrderRawValue = serializedOrder;
  cachedOrderSnapshot = order;
  window.sessionStorage.setItem(LAST_ORDER_STORAGE_KEY, serializedOrder);
}

export function buildOrderSnapshot(
  lines: CartLine[],
  shipping: CheckoutForm,
): OrderSnapshot {
  const items: OrderItem[] = resolveCartLines(lines).map((line) => ({
    lineId: line.lineId,
    productId: line.product.id,
    name: line.product.name,
    collectionLabel: line.product.collectionLabel,
    priceCents: line.product.priceCents,
    imageSrc: line.product.imageSrc,
  }));

  const subtotalCents = items.reduce(
    (subtotal, item) => subtotal + item.priceCents,
    0,
  );

  return {
    orderId: createOrderId(),
    items,
    shipping,
    subtotalCents,
    createdAt: new Date().toISOString(),
  };
}
