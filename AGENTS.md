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

- The app uses the Next.js App Router, with route files in `app/` composing reusable storefront components from `components/`.
- The homepage route in `app/page.tsx` switches between the editorial discovery experience and the catalog experience based on search params.
- Product catalog data, search helpers, sorting, filtering, and merchandising metadata are centralized in `lib/products.ts`.
- Shared domain types such as products, cart lines, checkout data, and order snapshots are defined in `lib/types.ts` and should stay in sync with catalog changes.
- Cart state is owned by `providers/cart-provider.tsx`, which hydrates from local storage on the client and persists cart changes after hydration.
- Cart calculations and reducer logic live in `lib/cart.ts`; prefer updating those helpers instead of duplicating cart business logic inside components.
- Route-specific experiences are split across dedicated routes for search, product detail, checkout, account login, and order confirmation under `app/`.
- Styling is primarily controlled through `app/globals.css`, with components expected to follow the existing storefront visual language instead of introducing a new pattern per page.

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
