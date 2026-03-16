"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { OrderSummary } from "@/components/order-summary";
import {
  buildOrderSnapshot,
  DEFAULT_CHECKOUT_FORM,
  saveOrderSnapshot,
} from "@/lib/cart";
import { useCart } from "@/providers/cart-provider";
import type { CheckoutForm as CheckoutFormFields } from "@/lib/types";

const fields: Array<{
  key: keyof CheckoutFormFields;
  label: string;
  gridClassName?: string;
}> = [
  { key: "fullName", label: "Full name", gridClassName: "md:col-span-2" },
  { key: "address", label: "Address", gridClassName: "md:col-span-2" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "zipCode", label: "ZIP code" },
];

export function CheckoutForm() {
  const router = useRouter();
  const { clearCart, lineItems, lines, subtotalCents } = useCart();
  const [form, setForm] = useState(DEFAULT_CHECKOUT_FORM);

  function updateField<K extends keyof CheckoutFormFields>(
    key: K,
    value: CheckoutFormFields[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (lines.length === 0) {
      return;
    }

    const order = buildOrderSnapshot(lines, form);
    saveOrderSnapshot(order);
    clearCart();
    startTransition(() => {
      router.push("/order/success");
    });
  }

  return (
    <div className="space-y-10 pt-14 md:pt-20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-5xl leading-none tracking-[-0.05em] md:text-6xl">
            Checkout
          </h1>
        </div>

        <Link
          className="text-base text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--ink)] hover:underline"
          href="/"
        >
          Continue shopping
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.6fr)_390px]">
        <form className="space-y-10" id="checkout-form" onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-3">
            {fields.map((field) => (
              <label
                className={`block ${field.gridClassName ?? ""}`}
                key={field.key}
              >
                <span className="mb-3 block text-base">{field.label}</span>
                <input
                  className="w-full rounded-[1.2rem] border border-[var(--border)] bg-[var(--surface-solid)] px-5 py-4 outline-none transition-colors focus:border-[var(--accent)]"
                  name={field.key}
                  onChange={(event) => updateField(field.key, event.target.value)}
                  required
                  value={form[field.key]}
                />
              </label>
            ))}
          </div>
        </form>

        <OrderSummary
          checkoutDisabled={lines.length === 0}
          checkoutFormId="checkout-form"
          items={lineItems.map((line) => ({
            lineId: line.lineId,
            collectionLabel: line.product.collectionLabel,
            imageSrc: line.product.imageSrc,
            name: line.product.name,
            priceCents: line.product.priceCents,
          }))}
          subtotalCents={subtotalCents}
        />
      </div>
    </div>
  );
}
