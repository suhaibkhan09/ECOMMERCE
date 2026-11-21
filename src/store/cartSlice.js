import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  coupon: null,
  couponDiscount: 0,
  isCartDrawerOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, selectedColor, selectedSize } = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === product.id && item.selectedColor === selectedColor && item.selectedSize === selectedSize
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.images[0],
          slug: product.slug,
          brand: product.brand,
          selectedColor,
          selectedSize,
          quantity,
          stock: product.stock,
        });
      }
    },
    removeFromCart: (state, action) => {
      const { id, selectedColor, selectedSize } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
      );
    },
    updateQuantity: (state, action) => {
      const { id, selectedColor, selectedSize, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.id === id && i.selectedColor === selectedColor && i.selectedSize === selectedSize
      );
      if (item) {
        item.quantity = Math.max(1, Math.min(quantity, item.stock));
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      state.couponDiscount = 0;
    },
    applyCoupon: (state, action) => {
      state.coupon = action.payload.code;
      state.couponDiscount = action.payload.discount;
    },
    removeCoupon: (state) => {
      state.coupon = null;
      state.couponDiscount = 0;
    },
    toggleCartDrawer: (state, action) => {
      state.isCartDrawerOpen = action.payload ?? !state.isCartDrawerOpen;
    },
  },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartTotal = (state) => {
  const subtotal = selectCartSubtotal(state);
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const discount = state.cart.couponDiscount;
  return { subtotal, shipping, tax, discount, total: subtotal + shipping + tax - discount };
};

export const { addToCart, removeFromCart, updateQuantity, clearCart, applyCoupon, removeCoupon, toggleCartDrawer } = cartSlice.actions;
export default cartSlice.reducer;
