import Image from "next/image";
import { formatCurrency } from "@/lib/format";

type SummaryItem = {
  lineId: string;
  collectionLabel: string;
  imageSrc: string;
  name: string;
  priceCents: number;
};

export function OrderSummary({
  checkoutDisabled = false,
  checkoutFormId,
  items,
  subtotalCents,
}: {
  checkoutDisabled?: boolean;
  checkoutFormId?: string;
  items: SummaryItem[];
  subtotalCents: number;
}) {
  return (
    <div className="surface-panel flex h-full flex-col p-6 md:p-7">
      <p className="meta-kicker">Order summary</p>
      <div className="mt-6 space-y-4">
        {items.length === 0 ? (
          <div className="rounded-[1.5rem] bg-white p-5">
            <p className="text-lg">Cart is empty</p>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
              Add a product to see the mock order summary.
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div className="rounded-[1.5rem] bg-white p-5" key={item.lineId}>
              <div className="flex items-start gap-4">
                <div className="overflow-hidden rounded-[1.15rem] bg-[var(--panel)]">
                  <Image
                    alt={item.name}
                    className="h-20 w-20 object-contain"
                    height={80}
                    src={item.imageSrc}
                    width={80}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-base leading-tight">{item.name}</p>
                    <p className="text-base">{formatCurrency(item.priceCents)}</p>
                  </div>
                  <p className="mt-3 text-sm text-[var(--muted)]">
                    {item.collectionLabel}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 space-y-6 pt-2">
        <div className="flex items-center justify-between text-xl">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotalCents)}</span>
        </div>

        {checkoutFormId ? (
          <button
            className="pill-control primary-pill flex w-full disabled:cursor-not-allowed disabled:opacity-60"
            disabled={checkoutDisabled}
            form={checkoutFormId}
            type="submit"
          >
            Complete purchase
          </button>
        ) : null}
      </div>
    </div>
  );
}
