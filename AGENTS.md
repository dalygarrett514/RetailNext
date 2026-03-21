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

## Architecture Map

- `app/layout.tsx`: application shell, global layout, and provider wiring
- `app/page.tsx`: homepage entry point and catalog-view switch via `?view=catalog`
- `app/search/page.tsx`: dedicated search results route for `/search?q=...`
- `app/products/[slug]/page.tsx`: product detail route driven by product slug
- `app/checkout/page.tsx`: checkout flow entry point
- `app/order/success/page.tsx`: order confirmation experience
- `app/account/login/page.tsx`: split-screen account login experience
- `components/homepage-discovery.tsx`: editorial homepage storytelling and discovery modules
- `components/catalog-experience.tsx`: catalog browsing, filtering, and sorting experience
- `components/search-results-experience.tsx`: search results, facets, and zero-results recovery UI
- `components/product-detail.tsx`: product detail presentation, merchandising, and add-to-cart UI
- `components/cart-drawer.tsx`: cart drawer interactions, quantity controls, and clear-cart actions
- `components/checkout-form.tsx`: checkout form and payment UI
- `components/site-header.tsx`: global navigation, expandable search, and account/cart entry points
- `components/site-footer.tsx`: global footer links and customer feedback UI
- `providers/cart-provider.tsx`: shared cart state, mutations, and cart drawer coordination
- `lib/products.ts`: source of truth for catalog products, category links, badges, filters, and search helpers
- `lib/cart.ts`: cart calculation and mutation helpers
- `lib/recently-viewed.ts`: recently viewed product persistence and retrieval helpers
- `lib/types.ts`: shared storefront domain types used across routes and components

## State & Data Flow

- `lib/products.ts` is the source of truth for catalog content, merchandising metadata, filters, sorting, and search helpers.
- `lib/types.ts` defines the shared storefront domain types.
- `providers/cart-provider.tsx` owns client-side cart state and exposes shared cart actions through `useCart()`.
- `lib/cart.ts` contains cart business logic and browser persistence, including reducer behavior, subtotal calculation, and order snapshot helpers.
- `lib/recently-viewed.ts` owns recently viewed browser persistence and resolves stored product IDs back to products, so product IDs in `lib/products.ts` should remain stable.
- `app/layout.tsx` wires the provider layer; routes and components should consume shared data/helpers instead of introducing duplicate business logic.

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
