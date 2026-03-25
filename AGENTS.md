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

## Architecture Notes

- Routing is App Router based: `app/page.tsx` switches between the editorial homepage and catalog view from query params, `app/search/page.tsx` owns search results, and `app/products/[slug]/page.tsx` resolves product detail pages by slug.
- `app/layout.tsx` is the global shell. It mounts `SiteHeader`, `SiteFooter`, `CartDrawer`, and wraps the app in `CartProvider`, so cart state is available across every route.
- The product catalog source of truth lives in `lib/products.ts`. Product records, category links, merchandising filters, badge labels, search normalization, and catalog/search helper functions should stay centralized there.
- Product detail pages resolve records by slug, while cart and recently viewed flows resolve products by `id`. Keep both `id` and `slug` stable when editing catalog data.
- Cart state is managed client-side in `providers/cart-provider.tsx` with a reducer from `lib/cart.ts`. Persistence uses `localStorage` under `retailnext-cart-lines`, and the order confirmation snapshot uses `sessionStorage` under `retailnext-last-order`.
- Cart reducer behavior in `lib/cart.ts` is the source of truth for add/update/remove/clear actions. Quantity changes, subtotal calculation, and order snapshot generation should be implemented there rather than duplicated in components.
- Recently viewed state is managed separately in `lib/recently-viewed.ts`. It stores product ids in `localStorage`, caps history at 8 items, and broadcasts updates with a window event so recommendation UI can refresh without a full reload.
- Recommendation rails are presentation components over catalog data, not a separate service. Homepage rails are assembled from discovery tags in `lib/products.ts`, and product-page recently viewed suggestions are derived from `lib/recently-viewed.ts`.
- Styling is primarily global and utility-driven through `app/globals.css`; shared storefront components should preserve existing layout, spacing, and merchandising patterns rather than introducing isolated styling systems.

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
