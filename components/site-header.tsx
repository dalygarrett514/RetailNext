"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? "border-b border-[var(--border)] bg-[var(--surface)] backdrop-blur-[10px]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between gap-4 px-5 md:px-8 xl:px-16">
          <Link className="brand-lockup inline-flex h-full items-center" href="/">
            <Image
              alt="RetailNext logo"
              className="h-24 w-auto"
              height={96}
              priority
              src="/retailnext-logo.png?v=20260316"
              width={96}
            />
          </Link>

          <button
            aria-label="Open cart"
            className="pill-control shrink-0"
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
      </header>

      <div aria-hidden="true" className="h-20" />
    </>
  );
}
