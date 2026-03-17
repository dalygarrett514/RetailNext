import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="surface-panel p-8">
        <p className="text-lg">No products are available in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3" data-testid="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
