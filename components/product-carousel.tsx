"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/lib/types";

const VISIBLE_COUNT = 4;
const ANIMATION_MS = 360;

function ProductCarouselCard({
  product,
}: {
  product: Product;
}) {
  return (
    <article className="group" data-testid="product-card">
      <Link href={`/products/${product.slug}`}>
        <div className="image-panel overflow-hidden rounded-[2rem] p-6 transition-transform duration-200 group-hover:-translate-y-1">
          <Image
            alt={product.alt}
            className="aspect-square h-auto w-full object-contain"
            height={720}
            priority
            src={product.imageSrc}
            width={720}
          />
        </div>

        <div className="mt-6">
          <p className="meta-kicker product-feed-kicker">{product.collectionLabel}</p>
          <div className="mt-3 flex items-start justify-between gap-4">
            <h3 className="product-card-title tracking-[-0.03em]">{product.name}</h3>
            <p className="product-card-price">{formatCurrency(product.priceCents)}</p>
          </div>
          <p className="product-card-description mt-4 text-[var(--muted)]">
            {product.shortDescription}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function ProductCarousel({
  products,
  ariaLabel,
}: {
  products: Product[];
  ariaLabel: string;
}) {
  const cloneCount = Math.min(VISIBLE_COUNT, products.length);
  const loopedProducts = useMemo(() => {
    if (products.length === 0) {
      return [];
    }

    const head = products.slice(0, cloneCount);
    const tail = products.slice(-cloneCount);

    return [...tail, ...products, ...head];
  }, [cloneCount, products]);

  const [currentIndex, setCurrentIndex] = useState(cloneCount);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [pendingDirection, setPendingDirection] =
    useState<"previous" | "next" | null>(null);

  useEffect(() => {
    setCurrentIndex(cloneCount);
    setIsTransitionEnabled(false);

    const frame = window.requestAnimationFrame(() => {
      setIsTransitionEnabled(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [cloneCount, products]);

  useEffect(() => {
    if (!pendingDirection) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setIsTransitionEnabled(false);

      setCurrentIndex((current) => {
        if (pendingDirection === "next" && current >= products.length + cloneCount) {
          return cloneCount;
        }

        if (pendingDirection === "previous" && current < cloneCount) {
          return products.length + cloneCount - 1;
        }

        return current;
      });

      const frame = window.requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
        setPendingDirection(null);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }, ANIMATION_MS);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [cloneCount, pendingDirection, products.length]);

  if (products.length === 0) {
    return null;
  }

  const canLoop = products.length > 1;
  const translatePercent = (currentIndex * 100) / VISIBLE_COUNT;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-end gap-3">
        <button
          aria-label={`Show previous ${ariaLabel.toLowerCase()} products`}
          className="pill-control px-4 py-2.5"
          disabled={!canLoop || pendingDirection !== null}
          onClick={() => {
            if (!canLoop || pendingDirection) {
              return;
            }

            setPendingDirection("previous");
            setCurrentIndex((current) => current - 1);
          }}
          type="button"
        >
          ←
        </button>
        <button
          aria-label={`Show next ${ariaLabel.toLowerCase()} products`}
          className="pill-control px-4 py-2.5"
          disabled={!canLoop || pendingDirection !== null}
          onClick={() => {
            if (!canLoop || pendingDirection) {
              return;
            }

            setPendingDirection("next");
            setCurrentIndex((current) => current + 1);
          }}
          type="button"
        >
          →
        </button>
      </div>

      <div aria-label={ariaLabel} className="overflow-hidden">
        <div
          className={`flex ${isTransitionEnabled ? "transition-transform duration-300 ease-out" : ""}`}
          style={{ transform: `translateX(-${translatePercent}%)` }}
        >
          {loopedProducts.map((product, index) => (
            <div
              className="w-1/4 shrink-0 px-3"
              key={`${product.id}-${index}`}
            >
              <ProductCarouselCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
