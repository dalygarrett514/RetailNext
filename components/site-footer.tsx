"use client";

import { useState } from "react";

const footerColumns = [
  {
    heading: "Shop",
    links: ["New arrivals", "Best sellers", "Gift cards"],
  },
  {
    heading: "Support",
    links: ["Help center", "Shipping", "Returns"],
  },
  {
    heading: "About",
    links: ["Our story", "Sustainability", "Careers"],
  },
];

export function SiteFooter() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const trimmedFeedback = feedback.trim();

  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[var(--panel)]/55">
      <div className="mx-auto grid w-full max-w-[1600px] gap-12 px-5 py-14 md:px-8 xl:grid-cols-[1.2fr_0.8fr] xl:px-16">
        <div className="grid gap-10 md:grid-cols-3">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <p className="meta-kicker">{column.heading}</p>
              <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                {column.links.map((link) => (
                  <li key={link}>
                    <a className="transition-colors hover:text-[var(--ink)]" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="surface-panel p-6 md:p-8">
          <p className="meta-kicker">Customer Feedback</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
            Tell us how shopping felt today
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">
            Share what worked well or what could feel better next time.
          </p>

          <label className="mt-6 block">
            <span className="sr-only">Feedback</span>
            <textarea
              className="min-h-[120px] w-full rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-solid)] px-4 py-3 text-sm outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
              onChange={(event) => {
                setFeedback(event.target.value);
                setSubmitted(false);
              }}
              placeholder="Share what worked well or what felt frustrating."
              value={feedback}
            />
          </label>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <button
              className="pill-control primary-pill px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              disabled={!trimmedFeedback}
              onClick={() => {
                setSubmitted(true);
                setFeedback("");
              }}
              type="button"
            >
              Send feedback
            </button>

            {submitted ? (
              <p className="text-sm text-[var(--muted)]">
                Thanks. Your feedback has been received.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
