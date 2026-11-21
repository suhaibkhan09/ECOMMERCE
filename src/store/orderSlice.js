import { createSlice } from '@reduxjs/toolkit';
import { mockOrders } from '../data/mockData';

const initialState = {
  orders: mockOrders,
  currentOrder: null,
  isLoading: false,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const order = {
        id: `ORD-${Date.now()}`,
        date: new Date().toISOString(),
        status: 'placed',
        ...action.payload,
        timeline: [
          { status: 'placed', date: new Date().toISOString(), description: 'Order placed successfully' },
        ],
      };
      state.orders.unshift(order);
      state.currentOrder = order;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status, description } = action.payload;
      const order = state.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = status;
        order.timeline.push({ status, date: new Date().toISOString(), description });
      }
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = state.orders.find((o) => o.id === action.payload) || null;
    },
  },
});

export const selectOrderById = (orderId) => (state) => state.orders.orders.find((o) => o.id === orderId);
export const { placeOrder, updateOrderStatus, setCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
