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

- App Router entry points live in `app/`, with `app/layout.tsx` wrapping every route in `CartProvider` and rendering the shared header, footer, and cart drawer shell.
- The home route in `app/page.tsx` switches between the editorial homepage and catalog mode based on search params, so homepage and catalog changes often meet there first.
- Search is routed through `app/search/page.tsx`, while the interactive search experience, facets, and zero-results recovery live in `components/search-results-experience.tsx`.
- Product records are defined in `lib/products.ts`; category links, merchandising filters, sort options, badge labels, and recommendation/search helpers are all derived from that same module.
- Shared domain types live in `lib/types.ts`. Extend those types before adding new product attributes or cart/order fields so helpers and UI stay aligned.
- Cart state is centralized in `providers/cart-provider.tsx`, with reducer logic, subtotal math, checkout snapshot building, and browser storage helpers in `lib/cart.ts`.
- Cart and recently viewed data persist in browser storage. Cart lines are saved in `localStorage`, the last order snapshot is saved in `sessionStorage`, and recently viewed products are managed in `lib/recently-viewed.ts`.
- Product detail is a client component in `components/product-detail.tsx`; it records recently viewed products, reads recommendation helpers from `lib/products.ts`, and sends add-to-cart actions through the cart provider.
- Checkout is routed through `app/checkout/page.tsx` and primarily implemented in `components/checkout-form.tsx`. The order confirmation page reads the saved mock order snapshot from storage in `app/order/success/page.tsx`.
- Styling is mostly centralized in `app/globals.css`, with components relying on the shared design tokens and utility classes defined there. Prefer extending those patterns over introducing one-off visual systems.

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
