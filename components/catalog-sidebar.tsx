import Link from "next/link";
import { categoryLinks } from "@/lib/products";
import type { Category } from "@/lib/types";

export function CatalogSidebar({
  selectedCategory,
}: {
  selectedCategory: Category;
}) {
  return (
    <aside className="space-y-0 xl:space-y-8">
      <div className="hidden xl:block">
        <p className="spring-drop-title leading-none tracking-[-0.03em]">
          Spring drop
        </p>
      </div>

      <nav
        aria-label="Product categories"
        className="-mx-1 flex flex-nowrap items-center gap-8 overflow-x-auto px-1 pb-1 text-[1rem] leading-none whitespace-nowrap xl:mx-0 xl:flex-col xl:items-start xl:gap-3 xl:overflow-visible xl:px-0 xl:pb-0 xl:text-base"
      >
        {categoryLinks.map((category) => {
          const href =
            category.value === "all" ? "/" : `/?category=${category.value}`;
          const isActive = selectedCategory === category.value;

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={`shrink-0 transition-colors ${isActive ? "font-semibold" : "text-[var(--ink)]/90 hover:text-[var(--ink)]"}`}
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
