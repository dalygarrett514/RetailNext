"use client";

import { useMemo, useState } from "react";
import { CatalogSidebar } from "@/components/catalog-sidebar";
import { CatalogToolbar } from "@/components/catalog-toolbar";
import { ProductGrid } from "@/components/product-grid";
import type { Category, Product, ProductFilter, ProductSort } from "@/lib/types";

function sortProducts(products: Product[], sort: ProductSort) {
  const nextProducts = [...products];

  switch (sort) {
    case "price-low-to-high":
      return nextProducts.sort((left, right) => left.priceCents - right.priceCents);
    case "price-high-to-low":
      return nextProducts.sort((left, right) => right.priceCents - left.priceCents);
    case "newest":
      return nextProducts.reverse();
    case "featured":
    default:
      return nextProducts;
  }
}

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

  return (
    <div className="page-shell !pt-[50px]">
      <div className="grid gap-14 xl:grid-cols-[280px_minmax(0,1fr)] xl:gap-[4.5rem]">
        <CatalogSidebar selectedCategory={selectedCategory} />

        <section className="space-y-12">
          <CatalogToolbar
            onFilterChange={setSelectedFilter}
            onSortChange={setSelectedSort}
            resultCount={filteredProducts.length}
            selectedFilter={selectedFilter}
            selectedCategory={selectedCategory}
            selectedSort={selectedSort}
          />
          <ProductGrid products={filteredProducts} />
        </section>
      </div>
    </div>
  );
}
