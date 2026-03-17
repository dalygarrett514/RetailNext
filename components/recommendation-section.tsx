"use client";

import { ProductCarousel } from "@/components/product-carousel";
import type { Product } from "@/lib/types";

export function RecommendationSection({
  eyebrow,
  title,
  description,
  products,
}: {
  eyebrow: string;
  title: string;
  description: string;
  products: Product[];
}) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-[var(--border)] pt-12 md:pt-16">
      <div className="space-y-6">
      <div className="max-w-2xl space-y-3">
        <p className="meta-kicker">{eyebrow}</p>
        <h2 className="font-display text-3xl tracking-[-0.05em] md:text-4xl">
          {title}
        </h2>
        <p className="max-w-xl text-[15px] leading-7 text-[var(--muted)]">
          {description}
        </p>
      </div>
      <ProductCarousel ariaLabel={eyebrow} products={products} />
      </div>
    </section>
  );
}
