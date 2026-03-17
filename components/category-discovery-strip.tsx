"use client";

import Image from "next/image";
import Link from "next/link";
import type { Category, DiscoveryTag, Product } from "@/lib/types";

const discoveryContent: Record<
  DiscoveryTag,
  {
    eyebrow: string;
    title: string;
    description: string;
  }
> = {
  "latest-arrivals": {
    eyebrow: "Latest Arrivals",
    title: "Fresh styles to shop first",
    description: "Discover just-landed pieces ready for your next look.",
  },
  "recently-restocked": {
    eyebrow: "Recently Restocked",
    title: "Back in stock before they are gone again",
    description: "Your favorites are back and ready to shop again.",
  },
  "trending-now": {
    eyebrow: "Trending Now",
    title: "The styles everyone is reaching for",
    description: "Shop the standout pieces everyone wants right now.",
  },
};

const tagOrder: DiscoveryTag[] = [
  "latest-arrivals",
  "recently-restocked",
  "trending-now",
];

function formatCategory(category: Category) {
  if (category === "t-shirt") {
    return "T-shirts";
  }

  if (category === "pants") {
    return "Pants";
  }

  if (category === "sweatshirt") {
    return "Sweatshirts";
  }

  return "All products";
}

export function CategoryDiscoveryStrip({
  category,
  products,
}: {
  category: Category;
  products: Product[];
}) {
  const featuredRows = tagOrder
    .map((tag) => ({
      tag,
      products: products.filter((product) => product.discoveryTags.includes(tag)).slice(0, 1),
    }))
    .filter((row) => row.products.length > 0);

  if (featuredRows.length === 0) {
    return null;
  }

  return (
    <section className="surface-panel overflow-hidden p-6 md:p-8">
      <div className="flex flex-col gap-4">
        <div className="max-w-2xl space-y-3">
          <p className="meta-kicker">Category Discovery</p>
          <h2 className="font-display text-3xl tracking-[-0.05em] md:text-4xl">
            Explore the best of {formatCategory(category).toLowerCase()} in one place.
          </h2>
          <p className="max-w-xl text-[15px] leading-7 text-[var(--muted)]">
            Start with what is new, back in stock, and trending now, then keep browsing
            the full collection below.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 xl:grid-cols-3">
        {featuredRows.map(({ tag, products: taggedProducts }) => {
          const content = discoveryContent[tag];

          return (
            <article
              key={tag}
              className="rounded-[1.75rem] border border-[var(--border)] bg-[rgba(255,255,255,0.82)] p-5"
            >
              <p className="meta-kicker">{content.eyebrow}</p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                {content.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                {content.description}
              </p>

              <div className="mt-6 space-y-3">
                {taggedProducts.map((product) => (
                  <Link
                    key={product.id}
                    className="flex items-center justify-between gap-4 rounded-[1.25rem] bg-[var(--surface-solid)] px-4 py-3 transition-transform duration-200 hover:-translate-y-0.5"
                    href={`/products/${product.slug}`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="image-panel h-16 w-16 shrink-0 overflow-hidden rounded-[1rem] p-2">
                        <Image
                          alt={product.alt}
                          className="h-full w-full object-contain"
                          height={80}
                          src={product.imageSrc}
                          width={80}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold tracking-[-0.02em]">
                          {product.name}
                        </p>
                        <p className="mt-1 truncate text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
                          {product.collectionLabel}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-[var(--muted)]">Shop</span>
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
