"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductGrid } from "@/components/product-grid";
import { RecommendationSection } from "@/components/recommendation-section";
import {
  categoryLinks,
  getProductsByDiscoveryTag,
  getSearchRecoverySuggestions,
  merchandisingFilterOptions,
  productBadgeLabels,
  productSortOptions,
  searchProducts,
  sortProducts,
} from "@/lib/products";
import type { Category, ProductBadge, ProductFilter, ProductSort } from "@/lib/types";

function toggleValue<T extends string>(values: T[], value: T) {
  return values.includes(value)
    ? values.filter((entry) => entry !== value)
    : [...values, value];
}

function SearchFacetSection<T extends string>({
  title,
  options,
  selectedValues,
  onToggle,
}: {
  title: string;
  options: Array<{ count: number; label: string; value: T }>;
  selectedValues: T[];
  onToggle: (value: T) => void;
}) {
  if (options.length === 0) {
    return null;
  }

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
        {title}
      </h2>
      <div className="space-y-2">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);

          return (
            <label
              className={`flex cursor-pointer items-center justify-between rounded-[1.25rem] border px-4 py-3 text-sm transition-colors ${
                isSelected
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--ink)]"
                  : "border-[var(--border)] bg-[var(--surface-solid)] text-[var(--muted)] hover:text-[var(--ink)]"
              }`}
              key={option.value}
            >
              <span className="flex items-center gap-3">
                <input
                  aria-label={option.label}
                  checked={isSelected}
                  className="accent-[var(--accent)]"
                  onChange={() => onToggle(option.value)}
                  type="checkbox"
                />
                <span>{option.label}</span>
              </span>
              <span className="text-xs uppercase tracking-[0.12em]">{option.count}</span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

export function SearchResultsExperience({
  initialQuery,
}: {
  initialQuery: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [selectedSort, setSelectedSort] = useState<ProductSort>("featured");
  const [selectedCategories, setSelectedCategories] = useState<Array<Exclude<Category, "all">>>([]);
  const [selectedFilters, setSelectedFilters] = useState<ProductFilter[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<ProductBadge[]>([]);

  const baseResults = useMemo(() => searchProducts(query), [query]);

  const categoryOptions = useMemo(() => {
    return categoryLinks
      .filter((option): option is { label: string; value: Exclude<Category, "all"> } => option.value !== "all")
      .map((option) => ({
        ...option,
        count: baseResults.filter((product) => product.category === option.value).length,
      }))
      .filter((option) => option.count > 0);
  }, [baseResults]);

  const merchandisingOptions = useMemo(() => {
    return merchandisingFilterOptions
      .filter((option): option is { label: string; value: Exclude<ProductFilter, "all"> } => option.value !== "all")
      .map((option) => ({
        ...option,
        count: baseResults.filter((product) => product.merchandisingTags.includes(option.value)).length,
      }))
      .filter((option) => option.count > 0);
  }, [baseResults]);

  const badgeOptions = useMemo(() => {
    return (Object.entries(productBadgeLabels) as Array<[ProductBadge, string]>)
      .map(([value, label]) => ({
        value,
        label,
        count: baseResults.filter((product) => product.productBadges.includes(value)).length,
      }))
      .filter((option) => option.count > 0);
  }, [baseResults]);

  const filteredResults = useMemo(() => {
    const filtered = baseResults.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesFilter =
        selectedFilters.length === 0 ||
        selectedFilters.some((filterValue) => product.merchandisingTags.includes(filterValue));
      const matchesBadge =
        selectedBadges.length === 0 ||
        selectedBadges.some((badgeValue) => product.productBadges.includes(badgeValue));

      return matchesCategory && matchesFilter && matchesBadge;
    });

    return sortProducts(filtered, selectedSort);
  }, [baseResults, selectedBadges, selectedCategories, selectedFilters, selectedSort]);

  const recoverySuggestions = useMemo(() => getSearchRecoverySuggestions(query), [query]);
  const trendingProducts = useMemo(() => getProductsByDiscoveryTag("trending-now").slice(0, 3), []);

  const hasActiveFacets =
    selectedCategories.length > 0 || selectedFilters.length > 0 || selectedBadges.length > 0;

  const runSearch = (nextQuery: string) => {
    setQuery(nextQuery);
    router.push(`/search?q=${encodeURIComponent(nextQuery.trim())}`);
  };

  const clearFacets = () => {
    setSelectedCategories([]);
    setSelectedFilters([]);
    setSelectedBadges([]);
  };

  const renderActiveFacet = (label: string, onClick: () => void) => (
    <button
      className="pill-control px-4 py-2 text-sm"
      key={label}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );

  return (
    <div className="page-shell !pt-[50px]">
      <div className="space-y-10">
        <section className="surface-panel overflow-hidden p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="space-y-4">
              <p className="meta-kicker">Search</p>
              <div className="space-y-3">
                <h1 className="spring-drop-title text-[2rem] leading-none tracking-[-0.05em] md:text-[2.6rem]">
                  {query.trim() ? `Results for “${query.trim()}”` : "Search the catalog"}
                </h1>
                <p className="max-w-[48rem] text-sm leading-7 text-[var(--muted)] md:text-base">
                  Explore the assortment by product name, collection story, fit notes, or category terms.
                </p>
              </div>
            </div>

            <form
              className="flex flex-col gap-3 md:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                runSearch(query);
              }}
            >
              <input
                aria-label="Search catalog"
                className="min-h-14 flex-1 rounded-full border border-[var(--border)] bg-[var(--surface-solid)] px-5 text-base outline-none transition-colors focus:border-[var(--accent)]"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by product, category, or collection"
                value={query}
              />
              <button className="pill-control primary-pill min-h-14 px-6" type="submit">
                Search
              </button>
            </form>
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[300px_1fr]">
          <aside className="space-y-6">
            <div className="surface-panel p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="meta-kicker">Refine Results</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    Narrow by category, merchandising story, or freshness signals.
                  </p>
                </div>
                {hasActiveFacets ? (
                  <button
                    className="text-sm font-semibold text-[var(--accent)]"
                    onClick={clearFacets}
                    type="button"
                  >
                    Clear all
                  </button>
                ) : null}
              </div>

              <div className="mt-6 space-y-6">
                <SearchFacetSection
                  onToggle={(value) => setSelectedCategories((current) => toggleValue(current, value))}
                  options={categoryOptions}
                  selectedValues={selectedCategories}
                  title="Category"
                />
                <SearchFacetSection
                  onToggle={(value) => setSelectedFilters((current) => toggleValue(current, value))}
                  options={merchandisingOptions}
                  selectedValues={selectedFilters}
                  title="Merchandising"
                />
                <SearchFacetSection
                  onToggle={(value) => setSelectedBadges((current) => toggleValue(current, value))}
                  options={badgeOptions}
                  selectedValues={selectedBadges}
                  title="Status"
                />
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <p className="text-sm text-[var(--muted)]">
                  {filteredResults.length} {filteredResults.length === 1 ? "style" : "styles"}
                  {query.trim() ? ` matched “${query.trim()}”` : " in the catalog"}
                </p>
                {hasActiveFacets ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedCategories.map((category) =>
                      renderActiveFacet(
                        categoryLinks.find((entry) => entry.value === category)?.label ?? category,
                        () => setSelectedCategories((current) => current.filter((entry) => entry !== category)),
                      ),
                    )}
                    {selectedFilters.map((filterValue) =>
                      renderActiveFacet(
                        merchandisingFilterOptions.find((entry) => entry.value === filterValue)?.label ??
                          filterValue,
                        () => setSelectedFilters((current) => current.filter((entry) => entry !== filterValue)),
                      ),
                    )}
                    {selectedBadges.map((badgeValue) =>
                      renderActiveFacet(productBadgeLabels[badgeValue], () =>
                        setSelectedBadges((current) => current.filter((entry) => entry !== badgeValue)),
                      ),
                    )}
                  </div>
                ) : null}
              </div>

              <label className="flex items-center gap-3 text-sm text-[var(--muted)]">
                <span>Sort</span>
                <select
                  aria-label="Sort search results"
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-solid)] px-4 py-3 text-[var(--ink)] outline-none"
                  onChange={(event) => setSelectedSort(event.target.value as ProductSort)}
                  value={selectedSort}
                >
                  {productSortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {filteredResults.length > 0 ? (
              <ProductGrid products={filteredResults} />
            ) : (
              <div className="surface-panel space-y-6 p-8">
                <div className="space-y-3">
                  <p className="meta-kicker">Zero Results Recovery</p>
                  <h2 className="font-display text-3xl tracking-[-0.05em]">
                    {baseResults.length === 0
                      ? `No matches for “${query.trim() || "your search"}” yet`
                      : "The current facets are too narrow"}
                  </h2>
                  <p className="max-w-[42rem] text-sm leading-7 text-[var(--muted)] md:text-base">
                    {baseResults.length === 0
                      ? "Try a broader product name, a category term, or a collection label. You can also jump into one of the recovery searches below."
                      : "Your search found products, but none remain after the selected facets. Clear a few filters to widen the assortment again."}
                  </p>
                </div>

                {baseResults.length === 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {recoverySuggestions.map((suggestion) => (
                      <button
                        className="pill-control px-4 py-2"
                        key={suggestion}
                        onClick={() => runSearch(suggestion)}
                        type="button"
                      >
                        Try “{suggestion}”
                      </button>
                    ))}
                    <Link className="pill-control primary-pill px-4 py-2" href="/?view=catalog">
                      Browse all products
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    <button className="pill-control primary-pill px-4 py-2" onClick={clearFacets} type="button">
                      Clear all facets
                    </button>
                    <button
                      className="pill-control px-4 py-2"
                      onClick={() => {
                        setSelectedBadges([]);
                        setSelectedFilters([]);
                      }}
                      type="button"
                    >
                      Keep category only
                    </button>
                  </div>
                )}
              </div>
            )}

            <RecommendationSection
              description="A quick reset into styles that are currently pulling the strongest engagement across the storefront."
              eyebrow="Need A Reset?"
              products={trendingProducts}
              title="Trending picks worth recovering into"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
