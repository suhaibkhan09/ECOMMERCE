import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import authReducer from './authSlice';
import productReducer from './productSlice';
import wishlistReducer from './wishlistSlice';
import uiReducer from './uiSlice';
import orderReducer from './orderSlice';
import themeReducer from './themeSlice';

// Load persisted state from localStorage
const loadState = () => {
  try {
    const cart = localStorage.getItem('luxecart_cart');
    const auth = localStorage.getItem('luxecart_auth');
    const wishlist = localStorage.getItem('luxecart_wishlist');
    const ui = localStorage.getItem('luxecart_ui');
    return {
      ...(cart ? { cart: JSON.parse(cart) } : {}),
      ...(auth ? { auth: JSON.parse(auth) } : {}),
      ...(wishlist ? { wishlist: JSON.parse(wishlist) } : {}),
      ...(ui ? { ui: JSON.parse(ui) } : {}),
    };
  } catch {
    return {};
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    localStorage.setItem('luxecart_cart', JSON.stringify(state.cart));
    localStorage.setItem('luxecart_auth', JSON.stringify({ user: state.auth.user, isAuthenticated: state.auth.isAuthenticated }));
    localStorage.setItem('luxecart_wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('luxecart_ui', JSON.stringify({ darkMode: state.ui.darkMode }));
  } catch { /* ignore */ }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    products: productReducer,
    wishlist: wishlistReducer,
    ui: uiReducer,
    orders: orderReducer,
    theme: themeReducer,
  },
  preloadedState: loadState(),
});

// Persist to localStorage on every change (debounced)
let saveTimeout;
store.subscribe(() => {
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => saveState(store.getState()), 300);
});
