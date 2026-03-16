"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { loadOrderSnapshot } from "@/lib/cart";
import { formatCurrency } from "@/lib/format";

function subscribeToOrderSnapshot() {
  return () => undefined;
}

export default function OrderSuccessPage() {
  const order = useSyncExternalStore(
    subscribeToOrderSnapshot,
    loadOrderSnapshot,
    () => null,
  );

  if (!order) {
    return (
      <div className="page-shell pt-14 md:pt-20">
        <div className="mx-auto max-w-[650px]">
          <div className="surface-panel p-7 md:p-8">
          <p className="meta-kicker">Order confirmed</p>
          <h1 className="font-display mt-4 text-[2.5rem] leading-[0.95] tracking-[-0.05em] md:text-[3rem]">
            No recent mock order.
          </h1>
          <p className="mt-5 text-[0.9375rem] leading-7 text-[var(--muted)]">
            Complete the checkout flow to populate this confirmation view.
          </p>
          <Link className="pill-control mt-8" href="/">
            Return to catalog
          </Link>
        </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell pt-14 md:pt-20">
      <div className="mx-auto max-w-[650px] space-y-6">
        <div>
          <p className="meta-kicker">Order confirmed</p>
          <h1 className="font-display mt-4 text-[2.75rem] leading-[0.95] tracking-[-0.05em] md:text-[3.25rem]">
            Purchase complete.
          </h1>
          <p className="mt-5 text-[0.9375rem] leading-7 text-[var(--muted)]">
            Order {order.orderId} is queued for the demo confirmation flow.
          </p>
        </div>

        <div className="surface-panel p-6">
          <p className="meta-kicker">Shipping to</p>
          <div className="mt-4 space-y-2.5 text-[0.9375rem] leading-7">
            <p>{order.shipping.fullName}</p>
            <p>{order.shipping.address}</p>
            <p>
              {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
            </p>
          </div>
        </div>

        <div className="surface-panel p-6">
          <p className="meta-kicker">Order details</p>
          <dl className="mt-4 grid gap-3 text-[0.9375rem] leading-7 md:grid-cols-[1fr_auto] md:items-center">
            <dt className="text-[var(--muted)]">Order ID</dt>
            <dd>{order.orderId}</dd>
            <dt className="text-[var(--muted)]">Items</dt>
            <dd>{order.items.length} items</dd>
            <dt className="text-[var(--muted)]">Subtotal</dt>
            <dd>{formatCurrency(order.subtotalCents)}</dd>
          </dl>
        </div>

        <section className="space-y-4">
          <h2 className="text-[1.125rem] tracking-[-0.03em]">What&apos;s in the order</h2>
          <p className="text-[0.9375rem] leading-7 text-[var(--muted)]">
            Everything is shown in a single review column.
          </p>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div className="rounded-[1.5rem] bg-[var(--panel)] p-5" key={item.lineId}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-base leading-tight">{item.name}</p>
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {item.collectionLabel}
                    </p>
                  </div>
                  <p className="text-base">{formatCurrency(item.priceCents)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
