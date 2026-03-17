"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Suspense,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { formatCurrency } from "@/lib/format";
import { categoryLinks, searchProducts } from "@/lib/products";
import { useCart } from "@/providers/cart-provider";

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

function HeaderSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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
    return searchProducts(deferredQuery).slice(0, 5);
  }, [deferredQuery]);

  const searchHref = `/search?q=${encodeURIComponent(query.trim())}`;

  const runSearch = () => {
    const nextQuery = query.trim();

    if (!nextQuery) {
      return;
    }

    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(nextQuery)}`);
  };

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
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              runSearch();
            }
          }}
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
              <Link
                className="mt-2 flex items-center justify-between rounded-[1rem] border border-[var(--border)] px-3 py-3 text-sm font-semibold tracking-[-0.01em] text-[var(--ink)] transition-colors hover:bg-[var(--panel)]"
                href={searchHref}
                onClick={() => setIsOpen(false)}
              >
                <span>See all results for “{query.trim()}”</span>
                <span aria-hidden="true" className="text-[var(--muted)]">
                  →
                </span>
              </Link>
            </div>
          ) : (
            <div className="space-y-3 px-3 py-4">
              <p className="text-sm text-[var(--muted)]">
                No close matches yet. Try a product name, category, or collection.
              </p>
              <Link className="pill-control px-4 py-2 text-sm" href={searchHref} onClick={() => setIsOpen(false)}>
                Search for “{query.trim()}”
              </Link>
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
