"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { RecommendationSection } from "@/components/recommendation-section";
import { formatCurrency } from "@/lib/format";
import { getCompleteTheLookProducts } from "@/lib/products";
import { saveRecentlyViewedProduct } from "@/lib/recently-viewed";
import { useCart } from "@/providers/cart-provider";
import type { Product, ProductBadge } from "@/lib/types";

const badgeLabels: Record<ProductBadge, string> = {
  "just-added": "Just Added",
  "updated-this-week": "Updated This Week",
  "low-stock": "Low Stock",
  "back-in-stock": "Back in Stock",
};

function formatCategoryLabel(category: Product["category"]) {
  if (category === "t-shirt") {
    return "T-shirts";
  }

  if (category === "pants") {
    return "Pants";
  }

  return "Sweatshirts";
}

export function ProductDetail({ product }: { product: Product }) {
  const { addProduct } = useCart();

  useEffect(() => {
    saveRecentlyViewedProduct(product.id);
  }, [product.id]);

  const completeTheLookProducts = getCompleteTheLookProducts(product);

  return (
    <div className="space-y-10 md:space-y-12">
      <nav aria-label="Breadcrumb" className="mb-3">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--muted)]">
          <li>
            <Link className="transition-colors hover:text-[var(--ink)]" href="/">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              className="transition-colors hover:text-[var(--ink)]"
              href={`/?category=${product.category}`}
            >
              {formatCategoryLabel(product.category)}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[var(--ink)]">
            {product.name}
          </li>
        </ol>
      </nav>

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
              <div className="mt-4 flex flex-wrap gap-2">
                {product.productBadges.map((badge) => (
                  <span
                    className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--panel)] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[var(--ink)]"
                    key={badge}
                  >
                    {badgeLabels[badge]}
                  </span>
                ))}
              </div>
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

      <RecommendationSection
        description="Pair it with complementary pieces to build an easy, ready-to-wear look."
        eyebrow="Complete the Look"
        products={completeTheLookProducts}
        title="Style it with these picks"
      />
    </div>
  );
}
