import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isFilterOpen: false,
  quickViewProduct: null,
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      if (state.darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
      if (action.payload) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    toggleFilter: (state) => {
      state.isFilterOpen = !state.isFilterOpen;
    },
    setQuickViewProduct: (state, action) => {
      state.quickViewProduct = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now().toString(),
        ...action.payload,
        read: false,
        timestamp: new Date().toISOString(),
      });
    },
    markNotificationRead: (state, action) => {
      const notif = state.notifications.find((n) => n.id === action.payload);
      if (notif) notif.read = true;
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  toggleDarkMode, setDarkMode, toggleMobileMenu, closeMobileMenu,
  toggleSearch, toggleFilter, setQuickViewProduct,
  addNotification, markNotificationRead, clearNotifications,
} = uiSlice.actions;
export default uiSlice.reducer;
