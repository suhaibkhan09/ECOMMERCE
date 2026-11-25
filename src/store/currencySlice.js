import { createSlice } from '@reduxjs/toolkit';

export const SUPPORTED_CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0, flag: '🇺🇸', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, flag: '🇪🇺', locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79, flag: '🇬🇧', locale: 'en-GB' },
  JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 155.2, flag: '🇯🇵', locale: 'ja-JP' },
  CAD: { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', rate: 1.36, flag: '🇨🇦', locale: 'en-CA' },
  AUD: { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar', rate: 1.52, flag: '🇦🇺', locale: 'en-AU' },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.4, flag: '🇮🇳', locale: 'en-IN' },
};

const getInitialCurrency = () => {
  try {
    const saved = localStorage.getItem('luxecart_currency');
    if (saved && SUPPORTED_CURRENCIES[saved]) {
      return saved;
    }
  } catch {
    // ignore
  }
  return 'USD';
};

const initialState = {
  currentCurrency: getInitialCurrency(),
  currencies: SUPPORTED_CURRENCIES,
  lastUpdated: new Date().toISOString(),
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      const code = action.payload;
      if (state.currencies[code]) {
        state.currentCurrency = code;
        try {
          localStorage.setItem('luxecart_currency', code);
        } catch {
          // ignore
        }
      }
    },
    updateRates: (state, action) => {
      state.currencies = { ...state.currencies, ...action.payload };
      state.lastUpdated = new Date().toISOString();
    },
  },
});

export const { setCurrency, updateRates } = currencySlice.actions;

export const selectCurrentCurrencyInfo = (state) => {
  const current = state.currency?.currentCurrency || 'USD';
  return state.currency?.currencies?.[current] || SUPPORTED_CURRENCIES.USD;
};

export const selectFormattedPrice = (state, amountInUSD) => {
  const info = selectCurrentCurrencyInfo(state);
  const converted = amountInUSD * info.rate;
  if (info.code === 'JPY') {
    return `${info.symbol}${Math.round(converted).toLocaleString()}`;
  }
  return `${info.symbol}${converted.toFixed(2)}`;
};

export default currencySlice.reducer;
