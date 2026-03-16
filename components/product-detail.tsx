"use client";

import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/providers/cart-provider";
import type { Product } from "@/lib/types";

export function ProductDetail({ product }: { product: Product }) {
  const { addProduct } = useCart();

  return (
    <div className="space-y-10 md:space-y-12">
      <Link
        className="mb-3 inline-flex pb-[10px] text-sm text-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--ink)] hover:underline"
        href="/"
      >
        Back to catalog
      </Link>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)] xl:gap-12">
        <div className="image-panel overflow-hidden rounded-[2.5rem] p-8 lg:p-12">
          <Image
            alt={product.alt}
            className="aspect-square h-auto w-full object-contain"
            height={1100}
            priority
            src={product.imageSrc}
            width={1100}
          />
        </div>

        <div className="flex flex-col justify-between gap-8 xl:py-14">
          <div className="space-y-8">
            <div>
              <p className="meta-kicker product-feed-kicker">{product.collectionLabel}</p>
              <h1 className="mt-4 text-[1.125rem] font-medium leading-[1.2] tracking-[-0.03em] md:text-[1.25rem]">
                {product.name}
              </h1>
            </div>

            <p className="product-card-description max-w-xl text-[var(--muted)]">
              {product.shortDescription}
            </p>

            <div className="grid gap-7 md:grid-cols-2">
              <div>
                <p className="meta-kicker product-feed-kicker">Fit</p>
                <p className="mt-3 text-sm leading-7 md:text-base">{product.fit}</p>
              </div>
              <div>
                <p className="meta-kicker product-feed-kicker">Material</p>
                <p className="mt-3 text-sm leading-7 md:text-base">{product.material}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[1.125rem] font-medium leading-none tracking-[-0.03em] md:text-[1.25rem]">
              {formatCurrency(product.priceCents)}
            </p>
            <button
              className="pill-control primary-pill add-to-cart-pill px-6 py-3 text-sm"
              onClick={() => addProduct(product.id)}
              type="button"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
