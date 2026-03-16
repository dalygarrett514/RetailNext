import { CatalogExperience } from "@/components/catalog-experience";
import { getProductsByCategory } from "@/lib/products";
import type { Category } from "@/lib/types";

type HomePageProps = {
  searchParams?: Promise<{
    category?: string | string[];
  }>;
};

function parseCategory(category: string | string[] | undefined): Category {
  const value = Array.isArray(category) ? category[0] : category;

  if (value === "t-shirt" || value === "pants" || value === "sweatshirt") {
    return value;
  }

  return "all";
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = (await searchParams) ?? {};
  const selectedCategory = parseCategory(params.category);
  const visibleProducts = getProductsByCategory(selectedCategory);

  return (
    <CatalogExperience
      selectedCategory={selectedCategory}
      totalProductCount={visibleProducts.length}
      visibleProducts={visibleProducts}
    />
  );
}
