# RetailNext Storefront

Simple Next.js demo storefront focused on polished product discovery and ecommerce flows.

## Requirements

- Node.js `20.9+`
- npm `10+`

## Library Versions

- `next`: `16.1.6`
- `react`: `19.2.3`
- `react-dom`: `19.2.3`
- `typescript`: `^5`
- `tailwindcss`: `^4`
- `eslint`: `^9`
- `vitest`: `^3.2.4`

## Setup

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Current Experience

- Discovery-led homepage with a remote-image hero banner
- Latest arrivals, recently restocked, and trending product sections
- Dedicated all-products catalog view at `/?view=catalog`
- Category landing views with discovery spotlights
- Personalized recommendations including recently viewed, you may also like, and complete the look
- Expandable header search with live product suggestions and typo forgiveness
- Header account button with a dedicated split-screen login page
- Global footer with placeholder navigation links and customer feedback capture
- Cart quantity controls, clear-cart action, and expedited checkout payment options
- Filterable and sortable product catalog
- Product detail pages with breadcrumbs and freshness badges, cart drawer, checkout, and order confirmation flow

## Notes

- Product stills are loaded from `public/products/`
- The homepage also uses remote editorial imagery from a configured external image host
- Remote image support is configured in `next.config.ts`

## Other Scripts

```bash
npm run lint
npm run test
npm run test:e2e
npm run build
npm run start
```

## CI

GitHub Actions runs the standard storefront checks on every pull request and on pushes to `main`:

- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run build`

# SE-Interview-Starter-App
