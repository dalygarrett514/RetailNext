import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
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
            <h2 className="product-card-title tracking-[-0.03em]">{product.name}</h2>
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
