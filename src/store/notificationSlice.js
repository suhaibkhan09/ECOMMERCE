import { createSlice } from '@reduxjs/toolkit';

const initialNotifications = [
  {
    id: 'notif-1',
    type: 'order',
    title: 'Order Dispatched!',
    message: 'Your order #ORD-7821 has been shipped via FedEx Express. Estimated arrival in 2 days.',
    link: '/orders',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35m ago
  },
  {
    id: 'notif-2',
    type: 'promo',
    title: 'Private Member Flash Sale: 20% Off',
    message: 'Enjoy 20% off all Italian leather accessories with code LUXE20 at checkout.',
    link: '/products',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2h ago
  },
  {
    id: 'notif-3',
    type: 'wishlist',
    title: 'Back in Stock Alert',
    message: 'Luxe Cashmere Knit Scarf in Emerald Green is back in stock. Limited quantities available.',
    link: '/wishlist',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5h ago
  },
  {
    id: 'notif-4',
    type: 'system',
    title: 'Security Notice',
    message: 'New sign-in detected to your LuxeCart account from macOS Safari.',
    link: '/account',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1d ago
  },
];

const loadInitialNotifications = () => {
  try {
    const saved = localStorage.getItem('luxecart_notifications');
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return initialNotifications;
};

const initialState = {
  notifications: loadInitialNotifications(),
  isDrawerOpen: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    toggleDrawer: (state, action) => {
      state.isDrawerOpen = action.payload !== undefined ? action.payload : !state.isDrawerOpen;
    },
    markAsRead: (state, action) => {
      const id = action.payload;
      const notif = state.notifications.find((n) => n.id === id);
      if (notif) notif.read = true;
      try {
        localStorage.setItem('luxecart_notifications', JSON.stringify(state.notifications));
      } catch { /* ignore */ }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.read = true;
      });
      try {
        localStorage.setItem('luxecart_notifications', JSON.stringify(state.notifications));
      } catch { /* ignore */ }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
      try {
        localStorage.setItem('luxecart_notifications', JSON.stringify(state.notifications));
      } catch { /* ignore */ }
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      try {
        localStorage.setItem('luxecart_notifications', JSON.stringify([]));
      } catch { /* ignore */ }
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: `notif-${Date.now()}`,
        read: false,
        timestamp: new Date().toISOString(),
        ...action.payload,
      });
      try {
        localStorage.setItem('luxecart_notifications', JSON.stringify(state.notifications));
      } catch { /* ignore */ }
    },
  },
});

export const {
  toggleDrawer,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAllNotifications,
  addNotification,
} = notificationSlice.actions;

export const selectNotifications = (state) => state.notification?.notifications || [];
export const selectUnreadNotificationCount = (state) =>
  state.notification?.notifications?.filter((n) => !n.read).length || 0;
export const selectIsNotificationDrawerOpen = (state) =>
  state.notification?.isDrawerOpen || false;

export default notificationSlice.reducer;
