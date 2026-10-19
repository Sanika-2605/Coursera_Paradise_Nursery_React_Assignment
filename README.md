# Paradise Nursery 🌿

A responsive plant-shopping application built with React, Vite, and Redux Toolkit. It includes a landing page, product catalog, category filters, a Redux-powered cart, quantity controls, item removal, subtotal calculation, and checkout feedback.

## Features
- Landing page with a call to action and nursery introduction
- Eighteen plant products: six each across three categories
- Add-to-cart buttons disable after a product has been added
- Cart badge and subtotal update from Redux state
- Increase/decrease quantity and remove items
- Cart empty state and continue-shopping navigation
- Responsive layout for desktop, tablet, and mobile

## Tech stack
- React 18
- Vite
- Redux Toolkit and React Redux
- Lucide React icons
- CSS

## Run locally
Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```

## Main source files
- `src/App.jsx` — page-level navigation and application layout
- `src/App.css` — styling
- `src/components/AboutUs.jsx` — about page content
- `src/components/ProductList.jsx` — product catalog and add-to-cart controls
- `src/components/CartItem.jsx` — cart rows, quantity controls, and checkout summary
- `src/features/cart/CartSlice.jsx` — Redux cart state and reducers
- `src/app/store.js` — Redux store setup
- `src/data/products.js` — product catalog data

## GitHub submission
Create a public GitHub repository named `paradise-nursery`, upload the contents of this folder, and then copy each file's URL from GitHub. A file URL should look like:

`https://github.com/YOUR-USERNAME/paradise-nursery/blob/main/README.md`

Use the same pattern for the remaining rubric files:
- `src/components/AboutUs.jsx`
- `src/App.css`
- `src/App.jsx`
- `src/features/cart/CartSlice.jsx`
- `src/components/ProductList.jsx`
- `src/components/CartItem.jsx`

Replace `YOUR-USERNAME` with your GitHub username. These URLs are examples until you actually publish the repository.
