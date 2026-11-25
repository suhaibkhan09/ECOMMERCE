import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import CartDrawer from '../cart/CartDrawer';
import QuickViewModal from '../product/QuickViewModal';
import ThemeCustomizerModal from '../theme/ThemeCustomizerModal';
import { selectThemePreferences } from '../../store/themeSlice';

const Layout = () => {
  const { pathname } = useLocation();
  const { darkMode } = useSelector((state) => state.ui);
  const theme = useSelector(selectThemePreferences);

  // Sync theme, contrast, and font scaling to <html>
  useEffect(() => {
    const root = document.documentElement;
    let isDark = darkMode;
    if (theme?.mode === 'dark') isDark = true;
    else if (theme?.mode === 'light') isDark = false;
    else if (theme?.mode === 'system') {
      isDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    }

    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (theme?.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (theme?.fontSize === 'lg') {
      root.style.fontSize = '17px';
    } else if (theme?.fontSize === 'sm') {
      root.style.fontSize = '15px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [darkMode, theme]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased selection:bg-primary-500 selection:text-white transition-colors duration-200">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileMenu />
      <CartDrawer />
      <QuickViewModal />
      <ThemeCustomizerModal />
    </div>
  );
};

export default Layout;
