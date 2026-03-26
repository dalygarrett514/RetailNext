# RetailNext

RetailNext is a simple ecommerce storefront built with Next.js, React, and TypeScript.

The app is intended to feel like a polished online shop experience with:

- a discovery-led homepage with editorial product storytelling
- a product catalog
- personalized recommendation rails across home, category, and product pages
- expandable header search with live product suggestions
- a dedicated search results page with facets and zero-results recovery
- an account button in the header with a dedicated split-screen login page
- global footer with placeholder links and customer feedback UI
- cart quantity controls, clear-cart support, and expedited checkout payment choices
- category filtering and sorting
- product detail pages with breadcrumbs and merchandising badges
- a cart drawer
- a checkout flow
- an order confirmation page

## Project Structure

- `app/`: routes, layout, and global styles
- `components/`: storefront UI components
- `lib/`: product data, cart helpers, formatting, and shared types
- `providers/`: React context providers
- `public/`: static assets such as product images and the logo

## Notes

- Product images are loaded from `public/products/`
- The header logo is loaded from `public/retailnext-logo.png`
- The homepage can use remote editorial imagery when configured in `next.config.ts`
- The full catalog view is available at `/?view=catalog`
- Search results are available at `/search?q=...`
- Styling is primarily controlled through `app/globals.css`

## Working Rules

- Product data lives in `lib/products.ts`; keep catalog, discovery, and search behavior aligned with that source of truth.
- Cart behavior is client-side and managed through `providers/cart-provider.tsx` and helpers in `lib/cart.ts`.
- Prefer updating shared logic in `lib/` instead of reimplementing filtering, sorting, formatting, or search behavior inside components.
- Use server components by default and add `"use client"` only when state, effects, event handlers, or browser APIs are required.
- Preserve URL-driven state and entry points that already exist, including `/?view=catalog` and `/search?q=...`.
- Keep styling consistent with the existing polished, editorial storefront experience and avoid introducing generic UI patterns.
- When behavior changes, update the closest unit tests in `components/` or `lib/`; run `npm run test` for behavior changes and `npm run test:e2e` for route-level flows such as search, cart, checkout, or login.
- When adding new routes, flows, assets, or important implementation conventions, update both `README.md` and `AGENTS.md`.

## Commands

- `npm run dev`: start the local dev server
- `npm run lint`: run ESLint
- `npm run build`: create a production build
- `npm run test`: run the test suite
- `npm run test:e2e`: run the Playwright end-to-end suite

## CI

- GitHub Actions runs `npm run lint`, `npm run test`, `npm run test:e2e`, and `npm run build` on pull requests and pushes to `main`

## Feature Workflow

1. Update the relevant route, component, or data file.
2. Keep styling and assets consistent with the existing storefront.
3. Update `README.md` and `AGENTS.md` when new features, flows, or important project behavior are added.
4. Run `npm run test` if behavior changed.
5. Run `npm run test:e2e` when end-to-end flows change.
6. Run `npm run build` before finishing.
7. Tag Codex for code review on every pull request.
