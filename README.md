# LuxeCart 🛒

A full-featured, modern e-commerce application built with React, Redux Toolkit, Tailwind CSS, and Framer Motion.

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog** — Browse 50+ products across 8 categories with grid/list views
- **Advanced Search** — Real-time search with autocomplete suggestions and search history
- **Smart Filters** — Filter by category, price range, brand, rating, color, and availability
- **Sorting** — Sort by price, popularity, rating, newest, and name
- **Product Details** — Image gallery with zoom, size/color variants, and related products
- **Quick View** — Preview products without leaving the listing page

### 🛒 Cart & Checkout
- **Shopping Cart** — Add, remove, update quantities with real-time price calculation
- **Cart Drawer** — Slide-out cart accessible from anywhere
- **Coupon System** — Apply discount codes with validation
- **Multi-step Checkout** — Shipping → Payment → Review → Confirmation
- **Multiple Payment Methods** — Credit card, PayPal, Apple Pay, Google Pay UI
- **Address Management** — Save and manage multiple shipping addresses
- **Order Summary** — Detailed breakdown with tax, shipping, and discounts

### 👤 User Account
- **Authentication** — Login, Register, Forgot Password with form validation
- **User Profile** — Edit personal info, avatar, and preferences
- **Order History** — Track all orders with status timeline
- **Order Tracking** — Real-time order status with animated progress
- **Wishlist** — Save products for later with move-to-cart
- **Recently Viewed** — Auto-tracked browsing history
- **Address Book** — Manage multiple delivery addresses
- **Notification Preferences** — Email and push notification settings

### 📊 Admin Dashboard
- **Dashboard Overview** — Revenue, orders, customers, and product stats
- **Sales Analytics** — Interactive charts with Recharts (line, bar, pie, area)
- **Product Management** — CRUD operations with image upload and variants
- **Order Management** — View, update status, and process refunds
- **Customer Management** — View customer list with search and filters
- **Inventory Alerts** — Low stock warnings and reorder notifications
- **Coupon Management** — Create and manage discount codes
- **Reports** — Export sales and inventory reports

### 🎨 UI/UX
- **Responsive Design** — Mobile-first, works on all screen sizes
- **Dark/Light Mode** — Toggle with system preference detection
- **Animations** — Smooth page transitions and micro-interactions (Framer Motion)
- **Skeleton Loading** — Beautiful loading states for all data
- **Toast Notifications** — Success, error, and info messages
- **Breadcrumbs** — Navigation trail on all pages
- **Infinite Scroll** — Load more products as you scroll
- **Image Lazy Loading** — Performance-optimized image loading

### ⚡ Technical
- **State Management** — Redux Toolkit with slices for cart, auth, products, orders, wishlist
- **Client-side Routing** — React Router v7 with protected routes
- **LocalStorage Persistence** — Cart, wishlist, and auth persist across sessions
- **Mock Data** — 50+ realistic products with images, reviews, and variants
- **SEO Ready** — React Helmet for meta tags
- **Performance** — Code splitting, lazy loading, and optimized re-renders

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | UI Framework |
| Redux Toolkit | State Management |
| React Router v7 | Routing |
| Tailwind CSS 3 | Styling |
| Framer Motion | Animations |
| Recharts | Charts & Analytics |
| React Icons | Icon Library |
| React Hot Toast | Notifications |
| Vite | Build Tool |

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/          # Buttons, inputs, modals, etc.
│   ├── layout/          # Header, footer, sidebar
│   ├── product/         # Product cards, gallery, reviews
│   ├── cart/            # Cart items, summary, drawer
│   ├── checkout/        # Checkout steps
│   ├── auth/            # Login, register forms
│   ├── account/         # Profile, orders, addresses
│   ├── admin/           # Dashboard, management panels
│   └── home/            # Hero, featured, deals
├── pages/               # Route page components
├── store/               # Redux store and slices
├── data/                # Mock data and constants
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── styles/              # Global styles
└── assets/              # Static assets
```

## 📄 License

MIT License — feel free to use this for learning or as a starter template.
