# RetailNext

RetailNext is a simple ecommerce storefront built with Next.js, React, and TypeScript.

The app is intended to feel like a polished online shop experience with:

- a product catalog
- category filtering and sorting
- product detail pages
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
- Styling is primarily controlled through `app/globals.css`

## Commands

- `npm run dev`: start the local dev server
- `npm run build`: create a production build
- `npm run test`: run the test suite

## Feature Workflow

1. Update the relevant route, component, or data file.
2. Keep styling and assets consistent with the existing storefront.
3. Update `README.md` and `AGENTS.md` when new features, flows, or important project behavior are added.
4. Run `npm run test` if behavior changed.
5. Run `npm run build` before finishing.
