"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Suspense,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { formatCurrency } from "@/lib/format";
import { categoryLinks, products } from "@/lib/products";
import { useCart } from "@/providers/cart-provider";
import type { Product } from "@/lib/types";

function BagIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.333 5.667V4.5a3.667 3.667 0 117.334 0v1.167M3.5 5.667h9l-.583 6.416a1.167 1.167 0 01-1.162 1.084H5.245a1.167 1.167 0 01-1.162-1.084L3.5 5.667z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.167 12.333a5.167 5.167 0 100-10.333 5.167 5.167 0 000 10.333zm6 1.334L11.2 11.7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 8a2.75 2.75 0 100-5.5A2.75 2.75 0 008 8zm-4.5 5.333a4.5 4.5 0 119 0"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function normalizeValue(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function levenshteinDistance(left: string, right: string) {
  const rows = left.length + 1;
  const cols = right.length + 1;
  const matrix = Array.from({ length: rows }, () => Array<number>(cols).fill(0));

  for (let row = 0; row < rows; row += 1) {
    matrix[row][0] = row;
  }

  for (let col = 0; col < cols; col += 1) {
    matrix[0][col] = col;
  }

  for (let row = 1; row < rows; row += 1) {
    for (let col = 1; col < cols; col += 1) {
      const cost = left[row - 1] === right[col - 1] ? 0 : 1;
      matrix[row][col] = Math.min(
        matrix[row - 1][col] + 1,
        matrix[row][col - 1] + 1,
        matrix[row - 1][col - 1] + cost,
      );
    }
  }

  return matrix[left.length][right.length];
}

function isSubsequence(query: string, target: string) {
  let queryIndex = 0;

  for (const character of target) {
    if (character === query[queryIndex]) {
      queryIndex += 1;
    }
  }

  return queryIndex === query.length;
}

function scoreProduct(query: string, product: Product) {
  const normalizedQuery = normalizeValue(query);

  if (!normalizedQuery) {
    return Number.NEGATIVE_INFINITY;
  }

  const haystacks = [
    normalizeValue(product.name),
    normalizeValue(product.collectionLabel),
    normalizeValue(product.category),
  ];

  let bestScore = Number.NEGATIVE_INFINITY;

  for (const haystack of haystacks) {
    if (haystack.includes(normalizedQuery)) {
      bestScore = Math.max(bestScore, 120 - haystack.indexOf(normalizedQuery));
      continue;
    }

    const haystackWords = haystack.split(" ");
    const queryWords = normalizedQuery.split(" ");

    for (const queryWord of queryWords) {
      for (const haystackWord of haystackWords) {
        if (haystackWord.startsWith(queryWord)) {
          bestScore = Math.max(bestScore, 90 - Math.abs(haystackWord.length - queryWord.length));
        } else if (levenshteinDistance(queryWord, haystackWord) <= 2) {
          bestScore = Math.max(bestScore, 70 - levenshteinDistance(queryWord, haystackWord) * 10);
        }
      }
    }

    if (isSubsequence(normalizedQuery.replaceAll(" ", ""), haystack.replaceAll(" ", ""))) {
      bestScore = Math.max(bestScore, 45);
    }
  }

  return bestScore;
}

function HeaderSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
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

  const results = useMemo(() => {
    const normalizedQuery = normalizeValue(deferredQuery);

    if (!normalizedQuery) {
      return [];
    }

    return products
      .map((product) => ({
        product,
        score: scoreProduct(normalizedQuery, product),
      }))
      .filter((entry) => entry.score > Number.NEGATIVE_INFINITY)
      .sort((left, right) => right.score - left.score)
      .slice(0, 5)
      .map((entry) => entry.product);
  }, [deferredQuery]);

  return (
    <div className="relative self-center" ref={containerRef}>
      <div
        className={`flex items-center gap-2 overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface-solid)] transition-all duration-200 ${
          isOpen ? "w-[290px] px-3 py-2 shadow-[0_14px_30px_rgba(1,1,0,0.08)]" : "w-[42px] px-0 py-0"
        }`}
      >
        <button
          aria-label={isOpen ? "Close search" : "Open search"}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--ink)]"
          onClick={() => {
            if (isOpen && !query) {
              setIsOpen(false);
              return;
            }

            setIsOpen(true);
          }}
          type="button"
        >
          <SearchIcon />
        </button>

        <input
          aria-label="Search products"
          className={`min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)] ${
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          ref={inputRef}
          value={query}
        />
      </div>

      {isOpen && query ? (
        <div
          className="absolute right-0 top-[calc(100%+0.75rem)] z-30 w-[290px] rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-solid)] p-2 shadow-[0_18px_40px_rgba(1,1,0,0.1)]"
          data-testid="header-search-results"
        >
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((product) => (
                <Link
                  className="flex items-center justify-between gap-3 rounded-[1rem] px-3 py-3 transition-colors hover:bg-[var(--panel)]"
                  data-testid={`search-result-${product.slug}`}
                  href={`/products/${product.slug}`}
                  key={product.id}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="image-panel h-14 w-14 shrink-0 overflow-hidden rounded-[1rem] p-2">
                      <Image
                        alt={product.alt}
                        className="h-full w-full object-contain"
                        height={80}
                        src={product.imageSrc}
                        width={80}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold tracking-[-0.02em]">
                        {product.name}
                      </p>
                      <p className="mt-1 truncate text-xs uppercase tracking-[0.12em] text-[var(--accent)]">
                        {product.collectionLabel}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm text-[var(--muted)]">
                    {formatCurrency(product.priceCents)}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-3 py-4 text-sm text-[var(--muted)]">
              No close matches yet. Try a product name, category, or collection.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

function HeaderCategoryNav() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const selectedView = searchParams.get("view");

  return (
    <nav
      aria-label="Product categories"
      className="mx-auto hidden max-w-[760px] items-center justify-center gap-3 overflow-x-auto px-3 self-center lg:flex"
    >
      {categoryLinks.map((category) => {
        const href =
          category.value === "all" ? "/?view=catalog" : `/?category=${category.value}`;
        const isActive =
          category.value === "all"
            ? selectedView === "catalog" && !selectedCategory
            : selectedCategory === category.value;

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={`pill-control shrink-0 px-4 py-2 text-[0.95rem] !shadow-none transition-colors ${
              isActive
                ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--surface-solid)]"
                : "text-[var(--ink)]/90 hover:text-[var(--accent)]"
            }`}
            href={href}
            key={category.value}
          >
            {category.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function SiteHeader() {
  const { itemCount, openCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur-[10px] transition-all duration-200 ${
          isScrolled
            ? "shadow-[0_8px_30px_rgba(1,1,0,0.08)]"
            : ""
        }`}
      >
        <div className="mx-auto grid h-28 w-full max-w-[1600px] grid-cols-[auto_1fr_auto] items-center gap-6 px-5 md:px-8 xl:px-16">
          <Link
            aria-label="RetailNext home"
            className="brand-lockup inline-flex items-center self-center !py-0"
            href="/"
          >
            <Image
              alt="RetailNext"
              className="h-auto w-[168px] align-middle md:w-[196px]"
              height={1024}
              priority
              src="/retailnext-logo.png?v=20260316"
              width={1536}
            />
          </Link>
          <Suspense fallback={<div className="hidden lg:block" />}>
            <HeaderCategoryNav />
          </Suspense>

          <div className="flex items-center justify-end gap-3 self-center">
            <HeaderSearch />
            <Link
              aria-label="Account"
              className="pill-control shrink-0 self-center px-3 py-2"
              href="/account/login"
            >
              <AccountIcon />
            </Link>
            <button
              aria-label="Open cart"
              className="pill-control shrink-0 self-center px-4 py-2"
              onClick={openCart}
              type="button"
            >
              <BagIcon />
              <span className="text-base">Cart</span>
              <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 text-sm font-semibold text-[var(--surface-solid)]">
                {itemCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      <div aria-hidden="true" className="h-28" />
    </>
  );
}
