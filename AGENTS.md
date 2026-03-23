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

## Architecture

- `app/layout.tsx` defines the global app shell and wraps all routes with `CartProvider`.
- Shared chrome is global: `SiteHeader`, `SiteFooter`, and `CartDrawer` are mounted in `app/layout.tsx`.
- `app/page.tsx` switches between the editorial homepage and catalog mode based on the `view` and `category` query params.
- Route flows live in `app/search/page.tsx`, `app/products/[slug]/page.tsx`, `app/checkout/page.tsx`, `app/order/success/page.tsx`, and `app/account/login/page.tsx`.
- `lib/products.ts` is the source of truth for product data, catalog filters, search scoring, and recommendation helpers; shared domain types live in `lib/types.ts`.
- Cart state is client-side in `providers/cart-provider.tsx`, with reducer and persistence helpers in `lib/cart.ts`.
- Header search UI lives in `components/site-header.tsx`; matching and ranking logic lives in `lib/products.ts`.
- Styling is primarily centralized in `app/globals.css`; prefer updating shared tokens and global patterns there before adding one-off styling in individual components.

## Notes

- Product images are loaded from `public/products/`
- The header logo is loaded from `public/retailnext-logo.png`
- The homepage can use remote editorial imagery when configured in `next.config.ts`
- The full catalog view is available at `/?view=catalog`
- Search results are available at `/search?q=...`
- Styling is primarily controlled through `app/globals.css`

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
