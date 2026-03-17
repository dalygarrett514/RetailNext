import Link from "next/link";
import { categoryLinks } from "@/lib/products";
import type { Category } from "@/lib/types";

export function CatalogSidebar({
  selectedCategory,
}: {
  selectedCategory: Category;
}) {
  return (
    <aside className="space-y-6">
      <div className="text-center">
        <p className="meta-kicker">Shop Categories</p>
      </div>
      <nav
        aria-label="Product categories"
        className="mx-auto flex max-w-[880px] flex-nowrap items-center justify-center gap-3 overflow-x-auto px-1 pb-1 text-[0.95rem] whitespace-nowrap"
      >
        {categoryLinks.map((category) => {
          const href =
            category.value === "all" ? "/?view=catalog" : `/?category=${category.value}`;
          const isActive = selectedCategory === category.value;

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={`pill-control shrink-0 px-4 py-2.5 transition-colors ${isActive ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--surface-solid)]" : "text-[var(--ink)]/90 hover:text-[var(--accent)]"}`}
              href={href}
              key={category.value}
            >
              {category.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
