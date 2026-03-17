import { CatalogExperience } from "@/components/catalog-experience";
import { HomepageDiscovery } from "@/components/homepage-discovery";
import { getProductsByCategory, getProductsByDiscoveryTag } from "@/lib/products";
import type { Category } from "@/lib/types";

type HomePageProps = {
  searchParams?: Promise<{
    category?: string | string[];
    view?: string | string[];
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
  const selectedView = Array.isArray(params.view) ? params.view[0] : params.view;
  const visibleProducts = getProductsByCategory(selectedCategory);

  if (selectedCategory === "all" && selectedView !== "catalog") {
    return (
      <HomepageDiscovery
        latestArrivals={getProductsByDiscoveryTag("latest-arrivals")}
        recentlyRestocked={getProductsByDiscoveryTag("recently-restocked")}
        trendingProducts={getProductsByDiscoveryTag("trending-now")}
      />
    );
  }

  return (
    <CatalogExperience
      selectedCategory={selectedCategory}
      visibleProducts={visibleProducts}
    />
  );
}
