"use client";

import { useEffect, useRef, useState } from "react";
import type { Category } from "@/lib/types";

const categoryTitles: Record<Category, string> = {
  all: "All products",
  "t-shirt": "T-shirts",
  pants: "Pants",
  sweatshirt: "Sweatshirts",
};

const filterOptions = ["New Arrivals", "Best Sellers", "Studio Picks"] as const;
const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Newest",
] as const;

function ToolbarSelect({
  defaultValue,
  label,
  options,
  testId,
}: {
  defaultValue: string;
  label: string;
  options: readonly string[];
  testId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
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
          {selectedValue}
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
        className={`absolute right-0 top-[calc(100%+0.75rem)] z-20 min-w-[240px] rounded-[1.5rem] border border-[var(--border)] bg-white p-2 shadow-[var(--shadow-soft)] transition-all duration-200 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        }`}
        role="menu"
      >
        {options.map((option) => {
          const isSelected = option === selectedValue;

          return (
            <button
              aria-checked={isSelected}
              className={`flex w-full rounded-[1rem] px-4 py-3 text-left text-[0.9375rem] transition-colors ${
                isSelected
                  ? "font-semibold text-[var(--ink)]"
                  : "text-[var(--muted)] hover:bg-[var(--panel)] hover:text-[var(--ink)]"
              }`}
              key={option}
              onClick={() => {
                setSelectedValue(option);
                setIsOpen(false);
              }}
              role="menuitemradio"
              type="button"
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function CatalogToolbar({
  resultCount,
  selectedCategory,
}: {
  resultCount: number;
  selectedCategory: Category;
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
          defaultValue="New Arrivals"
          label="Filter"
          options={filterOptions}
          testId="toolbar-filter"
        />
        <ToolbarSelect
          defaultValue="Featured"
          label="Sort"
          options={sortOptions}
          testId="toolbar-sort"
        />
        <span className="text-[var(--muted)]">{resultCount} pieces</span>
      </div>
    </div>
  );
}
