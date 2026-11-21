import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  addresses: [
    {
      id: 'addr-1',
      name: 'John Doe',
      street: '123 Main Street',
      city: 'San Francisco',
      state: 'CA',
      zip: '94102',
      country: 'US',
      phone: '+1 (555) 123-4567',
      isDefault: true,
    },
    {
      id: 'addr-2',
      name: 'John Doe',
      street: '456 Oak Avenue, Apt 12B',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'US',
      phone: '+1 (555) 987-6543',
      isDefault: false,
    },
  ],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    register: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    updateProfile: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    addAddress: (state, action) => {
      if (action.payload.isDefault) {
        state.addresses.forEach((a) => (a.isDefault = false));
      }
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action) => {
      const index = state.addresses.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        if (action.payload.isDefault) {
          state.addresses.forEach((a) => (a.isDefault = false));
        }
        state.addresses[index] = action.payload;
      }
    },
    removeAddress: (state, action) => {
      state.addresses = state.addresses.filter((a) => a.id !== action.payload);
    },
    setDefaultAddress: (state, action) => {
      state.addresses.forEach((a) => {
        a.isDefault = a.id === action.payload;
      });
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginStart, loginSuccess, loginFailure, logout, register,
  updateProfile, addAddress, updateAddress, removeAddress, setDefaultAddress, clearError,
} = authSlice.actions;
export default authSlice.reducer;
