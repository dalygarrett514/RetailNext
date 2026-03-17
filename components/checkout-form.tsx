"use client";

import Image from "next/image";
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

const creditCardFields: ReadonlyArray<{
  key: "cardNumber" | "nameOnCard" | "expirationDate" | "securityCode";
  label: string;
  gridClassName?: string;
}> = [
  { key: "cardNumber", label: "Card number", gridClassName: "md:col-span-2" },
  { key: "nameOnCard", label: "Name on card", gridClassName: "md:col-span-2" },
  { key: "expirationDate", label: "Expiration date" },
  { key: "securityCode", label: "Security code" },
];

const billingFields: ReadonlyArray<{
  key: keyof CheckoutFormFields;
  label: string;
  gridClassName?: string;
}> = [
  { key: "fullName", label: "Billing full name", gridClassName: "md:col-span-2" },
  { key: "address", label: "Billing address", gridClassName: "md:col-span-2" },
  { key: "city", label: "Billing city" },
  { key: "state", label: "Billing state" },
  { key: "zipCode", label: "Billing ZIP code" },
];

function CreditCardIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-8 w-12"
      fill="none"
      viewBox="0 0 48 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        fill="#fff"
        height="24"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
        width="38"
        x="5"
        y="4"
      />
      <path d="M6 11.5H42" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 21H20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

type CreditCardForm = {
  cardNumber: string;
  nameOnCard: string;
  expirationDate: string;
  securityCode: string;
};

type CheckoutErrorState = Partial<Record<keyof CheckoutFormFields, string>>;
type CreditCardErrorState = Partial<Record<keyof CreditCardForm, string>>;

function isBlank(value: string) {
  return value.trim().length === 0;
}

function validateAddressForm(values: CheckoutFormFields, prefix = ""): CheckoutErrorState {
  const errors: CheckoutErrorState = {};

  if (isBlank(values.fullName)) {
    errors.fullName = `${prefix}full name is required.`;
  }

  if (isBlank(values.address)) {
    errors.address = `${prefix}address is required.`;
  }

  if (isBlank(values.city)) {
    errors.city = `${prefix}city is required.`;
  }

  if (!/^[A-Za-z]{2}$/.test(values.state.trim())) {
    errors.state = `${prefix}state must be a 2-letter code.`;
  }

  if (!/^\d{5}(?:-\d{4})?$/.test(values.zipCode.trim())) {
    errors.zipCode = `${prefix}ZIP code must be valid.`;
  }

  return errors;
}

function validateCreditCardForm(values: CreditCardForm): CreditCardErrorState {
  const errors: CreditCardErrorState = {};
  const normalizedCardNumber = values.cardNumber.replace(/\s+/g, "");

  if (!/^\d{13,19}$/.test(normalizedCardNumber)) {
    errors.cardNumber = "Card number must be 13 to 19 digits.";
  }

  if (isBlank(values.nameOnCard)) {
    errors.nameOnCard = "Name on card is required.";
  }

  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(values.expirationDate.trim())) {
    errors.expirationDate = "Expiration date must be in MM/YY format.";
  }

  if (!/^\d{3,4}$/.test(values.securityCode.trim())) {
    errors.securityCode = "Security code must be 3 or 4 digits.";
  }

  return errors;
}

export function CheckoutForm() {
  const router = useRouter();
  const { clearCart, lineItems, lines, subtotalCents } = useCart();
  const [form, setForm] = useState(DEFAULT_CHECKOUT_FORM);
  const [creditCardForm, setCreditCardForm] = useState<CreditCardForm>({
    cardNumber: "",
    nameOnCard: "",
    expirationDate: "",
    securityCode: "",
  });
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [billingForm, setBillingForm] = useState(DEFAULT_CHECKOUT_FORM);
  const [shippingErrors, setShippingErrors] = useState<CheckoutErrorState>({});
  const [creditCardErrors, setCreditCardErrors] = useState<CreditCardErrorState>({});
  const [billingErrors, setBillingErrors] = useState<CheckoutErrorState>({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<"shop-pay" | "paypal" | "apple-pay" | "credit-card">("credit-card");

  function updateField<K extends keyof CheckoutFormFields>(
    key: K,
    value: CheckoutFormFields[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
    setShippingErrors((current) => ({
      ...current,
      [key]: undefined,
    }));
  }

  function updateCreditCardField<
    K extends keyof typeof creditCardForm,
  >(key: K, value: (typeof creditCardForm)[K]) {
    setCreditCardForm((current) => ({
      ...current,
      [key]: value,
    }));
    setCreditCardErrors((current) => ({
      ...current,
      [key]: undefined,
    }));
  }

  function updateBillingField<K extends keyof CheckoutFormFields>(
    key: K,
    value: CheckoutFormFields[K],
  ) {
    setBillingForm((current) => ({
      ...current,
      [key]: value,
    }));
    setBillingErrors((current) => ({
      ...current,
      [key]: undefined,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (lines.length === 0) {
      return;
    }

    if (selectedPaymentMethod === "credit-card") {
      const nextShippingErrors = validateAddressForm(form);
      const nextCreditCardErrors = validateCreditCardForm(creditCardForm);
      const nextBillingErrors = billingSameAsShipping
        ? {}
        : validateAddressForm(billingForm, "Billing ");

      setShippingErrors(nextShippingErrors);
      setCreditCardErrors(nextCreditCardErrors);
      setBillingErrors(nextBillingErrors);

      if (
        Object.keys(nextShippingErrors).length > 0 ||
        Object.keys(nextCreditCardErrors).length > 0 ||
        Object.keys(nextBillingErrors).length > 0
      ) {
        return;
      }
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
        {lines.length === 0 ? (
          <div className="surface-panel flex min-h-[320px] flex-col items-start justify-center p-8 md:p-10">
            <p className="meta-kicker">Checkout</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em]">
              Your cart is empty
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
              Add something to your cart before heading to checkout.
            </p>
            <Link className="pill-control primary-pill mt-6" href="/?view=catalog">
              Shop all products
            </Link>
          </div>
        ) : (
        <form className="space-y-10" id="checkout-form" noValidate onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <p className="meta-kicker">Express Checkout</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                Choose how you want to pay
              </h2>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {[
                {
                  value: "shop-pay",
                  label: "Shop Pay",
                  logoSrc:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Shop_Pay_logo.svg/960px-Shop_Pay_logo.svg.png",
                },
                {
                  value: "paypal",
                  label: "PayPal",
                  logoSrc:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/960px-PayPal.svg.png",
                },
                {
                  value: "apple-pay",
                  label: "Apple Pay",
                  logoSrc:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/1280px-Apple_Pay_logo.svg.png",
                },
                { value: "credit-card", label: "Credit Card", logoSrc: null },
              ].map((option) => {
                const isSelected = selectedPaymentMethod === option.value;

                return (
                  <button
                    className={`rounded-[1.35rem] border px-5 py-4 text-left transition-colors ${
                      isSelected
                        ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                        : "border-[var(--border)] bg-[var(--surface-solid)] hover:border-[var(--accent)]"
                    }`}
                    key={option.value}
                    onClick={() =>
                      setSelectedPaymentMethod(
                        option.value as typeof selectedPaymentMethod,
                      )
                    }
                    type="button"
                  >
                    <div className="flex min-h-8 items-center">
                      {option.logoSrc ? (
                        <Image
                          alt={option.label}
                          className="h-8 w-auto object-contain"
                          height={32}
                          src={option.logoSrc}
                          width={120}
                        />
                      ) : (
                        <div className="flex items-center gap-3">
                          <CreditCardIcon />
                          <span className="text-base font-medium">{option.label}</span>
                        </div>
                      )}
                    </div>
                    <span className="mt-2 block text-sm text-[var(--muted)]">
                      {option.value === "credit-card"
                        ? "Fill in your shipping details and pay securely with card."
                        : `Check out faster with ${option.label}.`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedPaymentMethod === "credit-card" ? (
            <div className="space-y-8">
              <div className="space-y-5">
                <label className="flex items-center justify-between gap-4 rounded-[1.35rem] border border-[var(--border)] bg-[var(--surface-solid)] px-5 py-4">
                  <div>
                    <p className="text-base font-medium">Billing address same as shipping</p>
                    <p className="mt-1 text-sm text-[var(--muted)]">
                      Use your shipping details for card billing.
                    </p>
                  </div>
                  <button
                    aria-label="Billing address same as shipping"
                    aria-pressed={billingSameAsShipping}
                    className={`relative inline-flex h-7 w-12 shrink-0 rounded-full transition-colors ${
                      billingSameAsShipping ? "bg-[var(--accent)]" : "bg-[var(--panel-strong)]"
                    }`}
                    onClick={() => setBillingSameAsShipping((current) => !current)}
                    type="button"
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
                        billingSameAsShipping ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </label>
              </div>

              <div>
                <p className="meta-kicker">Billing & Shipping</p>
                <div className="mt-5 grid gap-6 md:grid-cols-3">
                  {fields.map((field) => (
                    <label
                      className={`block ${field.gridClassName ?? ""}`}
                      key={field.key}
                    >
                      <span className="mb-3 block text-base">{field.label}</span>
                      <input
                        aria-invalid={shippingErrors[field.key] ? "true" : "false"}
                        className={`w-full rounded-[1.2rem] border bg-[var(--surface-solid)] px-5 py-4 outline-none transition-colors focus:border-[var(--accent)] ${
                          shippingErrors[field.key]
                            ? "border-[var(--danger,#c85b47)]"
                            : "border-[var(--border)]"
                        }`}
                        name={field.key}
                        onChange={(event) => updateField(field.key, event.target.value)}
                        value={form[field.key]}
                      />
                      {shippingErrors[field.key] ? (
                        <span className="mt-2 block text-sm text-[var(--danger,#c85b47)]">
                          {shippingErrors[field.key]}
                        </span>
                      ) : null}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="meta-kicker">Card Information</p>
                <div className="mt-5 grid gap-6 md:grid-cols-3">
                  {creditCardFields.map((field) => (
                    <label
                      className={`block ${field.gridClassName ?? ""}`}
                      key={field.key}
                    >
                      <span className="mb-3 block text-base">{field.label}</span>
                      <input
                        aria-invalid={creditCardErrors[field.key] ? "true" : "false"}
                        className={`w-full rounded-[1.2rem] border bg-[var(--surface-solid)] px-5 py-4 outline-none transition-colors focus:border-[var(--accent)] ${
                          creditCardErrors[field.key]
                            ? "border-[var(--danger,#c85b47)]"
                            : "border-[var(--border)]"
                        }`}
                        name={field.key}
                        onChange={(event) =>
                          updateCreditCardField(field.key, event.target.value)
                        }
                        value={creditCardForm[field.key]}
                      />
                      {creditCardErrors[field.key] ? (
                        <span className="mt-2 block text-sm text-[var(--danger,#c85b47)]">
                          {creditCardErrors[field.key]}
                        </span>
                      ) : null}
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                {!billingSameAsShipping ? (
                  <div>
                    <p className="meta-kicker">Billing Address</p>
                    <div className="mt-5 grid gap-6 md:grid-cols-3">
                      {billingFields.map((field) => (
                        <label
                          className={`block ${field.gridClassName ?? ""}`}
                          key={field.key}
                        >
                          <span className="mb-3 block text-base">{field.label}</span>
                          <input
                            aria-invalid={billingErrors[field.key] ? "true" : "false"}
                            className={`w-full rounded-[1.2rem] border bg-[var(--surface-solid)] px-5 py-4 outline-none transition-colors focus:border-[var(--accent)] ${
                              billingErrors[field.key]
                                ? "border-[var(--danger,#c85b47)]"
                                : "border-[var(--border)]"
                            }`}
                            name={`billing-${field.key}`}
                            onChange={(event) =>
                              updateBillingField(field.key, event.target.value)
                            }
                            value={billingForm[field.key]}
                          />
                          {billingErrors[field.key] ? (
                            <span className="mt-2 block text-sm text-[var(--danger,#c85b47)]">
                              {billingErrors[field.key]}
                            </span>
                          ) : null}
                        </label>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </form>
        )}

        <OrderSummary
          checkoutDisabled={lines.length === 0}
          checkoutFormId="checkout-form"
          items={lineItems.map((line) => ({
            lineId: line.lineId,
            collectionLabel: line.product.collectionLabel,
            imageSrc: line.product.imageSrc,
            name: line.product.name,
            priceCents: line.product.priceCents,
            quantity: line.quantity,
          }))}
          subtotalCents={subtotalCents}
        />
      </div>
    </div>
  );
}
