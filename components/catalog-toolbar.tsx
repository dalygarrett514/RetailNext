"use client";

import { useEffect, useRef, useState } from "react";
import type { Category, ProductFilter, ProductSort } from "@/lib/types";

const categoryTitles: Record<Category, string> = {
  all: "All products",
  "t-shirt": "T-shirts",
  pants: "Pants",
  sweatshirt: "Sweatshirts",
};

const filterOptions: Array<{ label: string; value: ProductFilter }> = [
  { label: "All Products", value: "all" },
  { label: "New Arrivals", value: "new-arrivals" },
  { label: "Best Sellers", value: "best-sellers" },
  { label: "Studio Picks", value: "studio-picks" },
];
const sortOptions: Array<{ label: string; value: ProductSort }> = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-low-to-high" },
  { label: "Price: High to Low", value: "price-high-to-low" },
  { label: "Newest", value: "newest" },
];

function ToolbarSelect({
  selectedValue,
  label,
  options,
  onSelect,
  testId,
}: {
  selectedValue: string;
  label: string;
  options: ReadonlyArray<{ label: string; value: string }>;
  onSelect: (value: string) => void;
  testId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="pill-control group px-4 py-2.5"
        data-testid={testId}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        type="button"
      >
        <span>{label}</span>
        <span className="text-[var(--muted)] transition-colors group-hover:text-[var(--ink)]">
          {options.find((option) => option.value === selectedValue)?.label}
        </span>
        <span
          aria-hidden="true"
          className={`text-[var(--muted)] transition-all duration-200 group-hover:text-[var(--ink)] ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>

      <div
        aria-hidden={!isOpen}
        className={`absolute right-0 top-[calc(100%+0.75rem)] z-20 min-w-[240px] rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-solid)] p-2 shadow-[var(--shadow-soft)] transition-all duration-200 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        role="menu"
      >
        {options.map((option) => {
          const isSelected = option.value === selectedValue;

          return (
            <button
              aria-checked={isSelected}
              className={`flex w-full rounded-[1rem] px-4 py-3 text-left text-[0.9375rem] transition-colors ${
                isSelected
                  ? "font-semibold text-[var(--ink)]"
                  : "text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--ink)]"
              }`}
              key={option.value}
              onClick={() => {
                onSelect(option.value);
                setIsOpen(false);
              }}
              role="menuitemradio"
              type="button"
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CatalogToolbar({
  resultCount,
  selectedFilter,
  selectedCategory,
  selectedSort,
  onFilterChange,
  onSortChange,
}: {
  resultCount: number;
  selectedFilter: ProductFilter;
  selectedCategory: Category;
  selectedSort: ProductSort;
  onFilterChange: (value: ProductFilter) => void;
  onSortChange: (value: ProductSort) => void;
}) {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="meta-kicker">Showing</p>
        <h1 className="spring-drop-title mt-3 tracking-[-0.04em]">
          {categoryTitles[selectedCategory]}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-3 text-sm md:text-[0.9375rem]">
        <ToolbarSelect
          onSelect={(value) => onFilterChange(value as ProductFilter)}
          label="Filter"
          options={filterOptions}
          selectedValue={selectedFilter}
          testId="toolbar-filter"
        />
        <ToolbarSelect
          onSelect={(value) => onSortChange(value as ProductSort)}
          label="Sort"
          options={sortOptions}
          selectedValue={selectedSort}
          testId="toolbar-sort"
        />
        <span className="text-[var(--muted)]">{resultCount} pieces</span>
      </div>
    </div>
  );
}
