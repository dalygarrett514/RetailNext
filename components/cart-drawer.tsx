"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency, formatItemCount } from "@/lib/format";
import { useCart } from "@/providers/cart-provider";

export function CartDrawer() {
  const {
    clearCart,
    closeCart,
    isOpen,
    itemCount,
    lineItems,
    removeLine,
    subtotalCents,
    updateQuantity,
  } = useCart();

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-50 transition ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <button
        aria-label="Close cart overlay"
        className={`absolute inset-0 bg-black/8 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeCart}
        type="button"
      />

      <aside
        aria-label="Cart drawer"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[425px] flex-col border-l border-[var(--border)] bg-[var(--surface-solid)] px-6 py-6 shadow-[var(--shadow-soft)] transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="meta-kicker">Cart</p>
            <p className="mt-3 text-2xl">{formatItemCount(itemCount)}</p>
          </div>

          <button className="pill-control" onClick={closeCart} type="button">
            Close
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto pr-1">
          {lineItems.length === 0 ? (
            <div className="surface-panel p-6">
              <p className="text-lg">Your cart is empty.</p>
            </div>
          ) : (
            lineItems.map((line) => (
              <div
                className="surface-card flex items-start gap-4 rounded-[1.5rem] p-4"
                key={line.lineId}
              >
                <div className="image-panel overflow-hidden rounded-[1.25rem]">
                  <Image
                    alt={line.product.alt}
                    height={96}
                    priority
                    src={line.product.imageSrc}
                    width={96}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="meta-kicker">{line.product.collectionLabel}</p>
                  <div className="mt-2 flex items-start justify-between gap-4">
                    <p className="text-lg leading-tight">{line.product.name}</p>
                    <p className="text-base">
                      {formatCurrency(line.product.priceCents * line.quantity)}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 rounded-full border border-[var(--border)] px-2 py-1">
                      <button
                        aria-label={`Decrease quantity of ${line.product.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors hover:bg-[var(--panel)]"
                        onClick={() => updateQuantity(line.lineId, line.quantity - 1)}
                        type="button"
                      >
                        -
                      </button>
                      <span className="min-w-6 text-center text-sm font-medium">
                        {line.quantity}
                      </span>
                      <button
                        aria-label={`Increase quantity of ${line.product.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors hover:bg-[var(--panel)]"
                        onClick={() => updateQuantity(line.lineId, line.quantity + 1)}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="mt-4 text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                    onClick={() => removeLine(line.lineId)}
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 border-t border-[var(--border)] pt-6">
          <div className="mb-6 flex items-center justify-between text-lg">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotalCents)}</span>
          </div>

          <div className="mb-4">
            <button
              className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
              onClick={clearCart}
              type="button"
            >
              Clear cart
            </button>
          </div>

          <Link
            className="pill-control primary-pill flex w-full"
            href="/checkout"
            onClick={closeCart}
          >
            Checkout
          </Link>
        </div>
      </aside>
    </div>
  );
}
