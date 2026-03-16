import { CatalogSidebar } from "@/components/catalog-sidebar";
import { CatalogToolbar } from "@/components/catalog-toolbar";
import { ProductGrid } from "@/components/product-grid";
import type { Category, Product } from "@/lib/types";

export function CatalogExperience({
  selectedCategory,
  visibleProducts,
  totalProductCount,
}: {
  selectedCategory: Category;
  visibleProducts: Product[];
  totalProductCount: number;
}) {
  return (
    <div className="page-shell !pt-[50px]">
      <div className="grid gap-14 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-[4.5rem]">
        <CatalogSidebar selectedCategory={selectedCategory} />

        <section className="space-y-12">
          <CatalogToolbar
            resultCount={totalProductCount}
            selectedCategory={selectedCategory}
          />
          <ProductGrid products={visibleProducts} />
        </section>
      </div>
    </div>
  );
}
