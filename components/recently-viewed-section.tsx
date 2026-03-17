"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductCarousel } from "@/components/product-carousel";
import { categoryLinks } from "@/lib/products";
import { loadRecentlyViewedProducts } from "@/lib/recently-viewed";
import type { Category, Product } from "@/lib/types";

function getSuggestedCategories(products: Product[]): Exclude<Category, "all">[] {
  const seen = new Set<Exclude<Category, "all">>();
  const categories = products
    .map((product) => product.category)
    .filter((category): category is Exclude<Category, "all"> => {
      if (seen.has(category)) {
        return false;
      }

      seen.add(category);
      return true;
    });

  return categories.slice(0, 3);
}

export function RecentlyViewedSection() {
  const [products] = useState<Product[]>(() => loadRecentlyViewedProducts());

  if (products.length === 0) {
    return null;
  }

  const suggestedCategories = getSuggestedCategories(products);

  return (
    <section className="border-t border-[var(--border)] pt-12 md:pt-16">
      <div className="space-y-8">
        <div className="max-w-2xl space-y-3">
          <p className="meta-kicker">Recently Viewed</p>
          <h2 className="font-display text-3xl tracking-[-0.05em] md:text-4xl">
            Pick up where you left off
          </h2>
          <p className="max-w-xl text-[15px] leading-7 text-[var(--muted)]">
            Revisit the styles you explored and keep shopping from where your last visit ended.
          </p>
        </div>

        <ProductCarousel ariaLabel="Recently Viewed" products={products} />

        {suggestedCategories.length > 0 ? (
          <div className="surface-panel flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="max-w-xl space-y-2">
              <p className="meta-kicker">Suggested Categories</p>
              <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                Keep exploring categories that match your browsing
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {suggestedCategories.map((category) => {
                const match = categoryLinks.find((link) => link.value === category);

                if (!match) {
                  return null;
                }

                return (
                  <Link
                    className="pill-control px-4 py-2.5"
                    href={`/?category=${category}`}
                    key={category}
                  >
                    {match.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
