import { createSlice } from '@reduxjs/toolkit';
import { products as allProducts } from '../data/mockData';

const initialState = {
  items: allProducts,
  filteredItems: allProducts,
  selectedCategory: null,
  searchQuery: '',
  searchHistory: [],
  sortBy: 'featured',
  filters: {
    categories: [],
    brands: [],
    priceRange: [0, 5000],
    rating: 0,
    colors: [],
    inStock: false,
    onSale: false,
    isNew: false,
  },
  viewMode: 'grid', // 'grid' | 'list'
  currentPage: 1,
  itemsPerPage: 12,
  recentlyViewed: [],
  compareList: [],
};

const applyFilters = (items, filters, sortBy, searchQuery) => {
  let filtered = [...items];

  // Search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  // Category
  if (filters.categories.length > 0) {
    filtered = filtered.filter((p) => filters.categories.includes(p.category));
  }

  // Brand
  if (filters.brands.length > 0) {
    filtered = filtered.filter((p) => filters.brands.includes(p.brand));
  }

  // Price range
  filtered = filtered.filter(
    (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  );

  // Rating
  if (filters.rating > 0) {
    filtered = filtered.filter((p) => p.rating >= filters.rating);
  }

  // Colors
  if (filters.colors.length > 0) {
    filtered = filtered.filter((p) =>
      p.colors?.some((c) => filters.colors.includes(c.name))
    );
  }

  // In stock
  if (filters.inStock) {
    filtered = filtered.filter((p) => p.stock > 0);
  }

  // On sale
  if (filters.onSale) {
    filtered = filtered.filter((p) => p.discount > 0);
  }

  // New
  if (filters.isNew) {
    filtered = filtered.filter((p) => p.isNew);
  }

  // Sort
  switch (sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'name-az':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-za':
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'popular':
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case 'discount':
      filtered.sort((a, b) => b.discount - a.discount);
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
  }

  return filtered;
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy, action.payload);
    },
    addToSearchHistory: (state, action) => {
      const history = state.searchHistory.filter((h) => h !== action.payload);
      history.unshift(action.payload);
      state.searchHistory = history.slice(0, 10);
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filters.categories = action.payload ? [action.payload] : [];
      state.currentPage = 1;
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy, state.searchQuery);
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy, state.searchQuery);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1;
      state.filteredItems = applyFilters(state.items, state.filters, state.sortBy, state.searchQuery);
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.selectedCategory = null;
      state.searchQuery = '';
      state.sortBy = 'featured';
      state.currentPage = 1;
      state.filteredItems = applyFilters(state.items, initialState.filters, 'featured', '');
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    addToRecentlyViewed: (state, action) => {
      const id = action.payload;
      state.recentlyViewed = [id, ...state.recentlyViewed.filter((i) => i !== id)].slice(0, 20);
    },
    toggleCompare: (state, action) => {
      const id = action.payload;
      if (state.compareList.includes(id)) {
        state.compareList = state.compareList.filter((i) => i !== id);
      } else if (state.compareList.length < 4) {
        state.compareList.push(id);
      }
    },
    clearCompare: (state) => {
      state.compareList = [];
    },
  },
});

export const {
  setSearchQuery, addToSearchHistory, clearSearchHistory,
  setCategory, setSortBy, setFilters, clearFilters,
  setViewMode, setCurrentPage,
  addToRecentlyViewed, toggleCompare, clearCompare,
} = productSlice.actions;
export default productSlice.reducer;
