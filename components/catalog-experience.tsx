"use client";

import { useMemo, useState } from "react";
import { CategoryDiscoveryStrip } from "@/components/category-discovery-strip";
import { CatalogToolbar } from "@/components/catalog-toolbar";
import { ProductGrid } from "@/components/product-grid";
import { RecommendationSection } from "@/components/recommendation-section";
import { getRecommendedProductsForCategory, sortProducts } from "@/lib/products";
import type { Category, Product, ProductFilter, ProductSort } from "@/lib/types";

export function CatalogExperience({
  selectedCategory,
  visibleProducts,
}: {
  selectedCategory: Category;
  visibleProducts: Product[];
}) {
  const [selectedFilter, setSelectedFilter] =
    useState<ProductFilter>("all");
  const [selectedSort, setSelectedSort] = useState<ProductSort>("featured");

  const filteredProducts = useMemo(() => {
    const matchingProducts =
      selectedFilter === "all"
        ? visibleProducts
        : visibleProducts.filter((product) =>
            product.merchandisingTags.includes(selectedFilter),
          );

    return sortProducts(matchingProducts, selectedSort);
  }, [selectedFilter, selectedSort, visibleProducts]);

  const recommendedProducts =
    selectedCategory === "all"
      ? []
      : getRecommendedProductsForCategory(selectedCategory);

  return (
    <div className="page-shell !pt-[50px]">
      <div className="space-y-12">
        <section className="space-y-12">
          {selectedCategory !== "all" ? (
            <CategoryDiscoveryStrip
              category={selectedCategory}
              products={visibleProducts}
            />
          ) : null}
          <CatalogToolbar
            onFilterChange={setSelectedFilter}
            onSortChange={setSelectedSort}
            resultCount={filteredProducts.length}
            selectedFilter={selectedFilter}
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
          />
          <ProductGrid products={filteredProducts} />
          {selectedCategory !== "all" ? (
            <RecommendationSection
              description="You might also like these complementary styles picked to round out your lineup."
              eyebrow="You May Also Like"
              products={recommendedProducts}
              title="More styles worth a look"
            />
          ) : null}
        </section>
      </div>
    </div>
  );
}
