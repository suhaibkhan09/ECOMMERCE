import { createSlice } from '@reduxjs/toolkit';

export const ACCENT_PALETTES = {
  amber: {
    name: 'Luxe Gold',
    primary: '#d97706',
    hover: '#b45309',
    light: '#fef3c7',
    badge: 'bg-amber-100 text-amber-800',
    swatch: 'bg-amber-500',
  },
  blue: {
    name: 'Sapphire Blue',
    primary: '#2563eb',
    hover: '#1d4ed8',
    light: '#dbeafe',
    badge: 'bg-blue-100 text-blue-800',
    swatch: 'bg-blue-600',
  },
  emerald: {
    name: 'Emerald Luxe',
    primary: '#059669',
    hover: '#047857',
    light: '#d1fae5',
    badge: 'bg-emerald-100 text-emerald-800',
    swatch: 'bg-emerald-600',
  },
  purple: {
    name: 'Royal Amethyst',
    primary: '#7c3aed',
    hover: '#6d28d9',
    light: '#ede9fe',
    badge: 'bg-purple-100 text-purple-800',
    swatch: 'bg-purple-600',
  },
  rose: {
    name: 'Rose Radiance',
    primary: '#e11d48',
    hover: '#be123c',
    light: '#ffe4e6',
    badge: 'bg-rose-100 text-rose-800',
    swatch: 'bg-rose-600',
  },
};

const getInitialThemePrefs = () => {
  try {
    const saved = localStorage.getItem('luxecart_theme_prefs');
    if (saved) return JSON.parse(saved);
  } catch {
    // fallback
  }
  return {
    mode: 'system', // 'light' | 'dark' | 'system'
    accent: 'amber',
    fontSize: 'md', // 'sm' | 'md' | 'lg'
    highContrast: false,
    reducedMotion: false,
  };
};

const initialState = {
  ...getInitialThemePrefs(),
  isCustomizerOpen: false,
};

const applyThemeToDOM = (state) => {
  try {
    const root = document.documentElement;

    // Dark Mode
    let isDark = false;
    if (state.mode === 'dark') isDark = true;
    else if (state.mode === 'light') isDark = false;
    else if (state.mode === 'system') {
      isDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    }

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Font Scaling
    root.setAttribute('data-font-size', state.fontSize);
    if (state.fontSize === 'lg') {
      root.style.fontSize = '17px';
    } else if (state.fontSize === 'sm') {
      root.style.fontSize = '15px';
    } else {
      root.style.fontSize = '16px';
    }

    // High Contrast
    if (state.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Accent Palette Custom Property
    const palette = ACCENT_PALETTES[state.accent] || ACCENT_PALETTES.amber;
    root.style.setProperty('--primary-color', palette.primary);
    root.setAttribute('data-accent', state.accent);

    localStorage.setItem(
      'luxecart_theme_prefs',
      JSON.stringify({
        mode: state.mode,
        accent: state.accent,
        fontSize: state.fontSize,
        highContrast: state.highContrast,
        reducedMotion: state.reducedMotion,
      })
    );
  } catch {
    // ignore
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.mode = action.payload;
      applyThemeToDOM(state);
    },
    setAccentColor: (state, action) => {
      state.accent = action.payload;
      applyThemeToDOM(state);
    },
    setFontSize: (state, action) => {
      state.fontSize = action.payload;
      applyThemeToDOM(state);
    },
    toggleHighContrast: (state) => {
      state.highContrast = !state.highContrast;
      applyThemeToDOM(state);
    },
    toggleReducedMotion: (state) => {
      state.reducedMotion = !state.reducedMotion;
      applyThemeToDOM(state);
    },
    toggleCustomizerModal: (state, action) => {
      state.isCustomizerOpen =
        action.payload !== undefined ? action.payload : !state.isCustomizerOpen;
    },
    resetThemePreferences: (state) => {
      state.mode = 'system';
      state.accent = 'amber';
      state.fontSize = 'md';
      state.highContrast = false;
      state.reducedMotion = false;
      applyThemeToDOM(state);
    },
  },
});

export const {
  setThemeMode,
  setAccentColor,
  setFontSize,
  toggleHighContrast,
  toggleReducedMotion,
  toggleCustomizerModal,
  resetThemePreferences,
} = themeSlice.actions;

export const selectThemePreferences = (state) => state.theme || initialState;

export default themeSlice.reducer;
