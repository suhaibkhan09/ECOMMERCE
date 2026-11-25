import { createSlice } from '@reduxjs/toolkit';

const MAX_COMPARE_ITEMS = 4;

const initialState = {
  items: [],
  isOpen: true,
  highlightDifferences: false,
};

const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);
      if (!exists && state.items.length < MAX_COMPARE_ITEMS) {
        state.items.push(product);
        state.isOpen = true;
      }
    },
    removeFromCompare: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    clearCompare: (state) => {
      state.items = [];
    },
    toggleCompareBar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setHighlightDifferences: (state, action) => {
      state.highlightDifferences = action.payload;
    },
  },
});

export const {
  addToCompare,
  removeFromCompare,
  clearCompare,
  toggleCompareBar,
  setHighlightDifferences,
} = compareSlice.actions;

export const selectCompareItems = (state) => state.compare?.items || [];
export const selectIsInCompare = (state, productId) =>
  state.compare?.items?.some((item) => item.id === productId) || false;

export default compareSlice.reducer;
