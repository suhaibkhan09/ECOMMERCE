import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiSun,
  FiMoon,
  FiPackage,
  FiLogIn,
  FiLogOut,
  FiSettings,
} from 'react-icons/fi';
import { closeMobileMenu, toggleDarkMode } from '../../store/uiSlice';
import { logout } from '../../store/authSlice';
import { categories } from '../../data/mockData';
import CurrencySelector from '../common/CurrencySelector';

const MobileMenu = () => {
  const dispatch = useDispatch();
  const { isMobileMenuOpen, darkMode } = useSelector((state) => state.ui);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleClose = () => dispatch(closeMobileMenu());

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Content */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-4/5 max-w-sm h-full bg-white dark:bg-gray-900 shadow-2xl flex flex-col z-10 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
              <Link to="/" onClick={handleClose} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white font-black text-lg">
                  L
                </div>
                <span className="font-display font-extrabold text-xl text-gray-900 dark:text-white">
                  Luxe<span className="text-primary-600">Cart</span>
                </span>
              </Link>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full"
                aria-label="Close menu"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            {/* User Profile Card */}
            <div className="p-5 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 font-bold flex items-center justify-center text-lg">
                    {user?.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="truncate">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    Welcome to LuxeCart
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/login"
                      onClick={handleClose}
                      className="btn-primary text-xs py-2 text-center"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={handleClose}
                      className="btn-secondary text-xs py-2 text-center"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Category Navigation Links */}
            <div className="p-5 flex-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Categories
              </h4>
              <div className="space-y-1 mb-6">
                <Link
                  to="/products"
                  onClick={handleClose}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <span>🛍️ All Products</span>
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/category/${cat.id}`}
                    onClick={handleClose}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                    <span className="text-xs text-gray-400">{cat.count}</span>
                  </Link>
                ))}
              </div>

              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                Account & Links
              </h4>
              <div className="space-y-1 text-sm">
                <Link
                  to="/orders"
                  onClick={handleClose}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FiPackage className="text-primary-500" /> My Orders
                </Link>
                <Link
                  to="/wishlist"
                  onClick={handleClose}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FiHeart className="text-accent-500" /> My Wishlist
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={handleClose}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg text-primary-600 font-semibold hover:bg-primary-50 dark:hover:bg-primary-950/30"
                  >
                    <FiSettings /> Admin Dashboard
                  </Link>
                )}
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="p-5 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Currency</span>
                <CurrencySelector compact />
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-gray-50 dark:border-gray-800/60">
                <button
                  onClick={() => dispatch(toggleDarkMode())}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  {darkMode ? (
                    <>
                      <FiSun className="text-amber-400" /> Light Mode
                    </>
                  ) : (
                    <>
                      <FiMoon /> Dark Mode
                    </>
                  )}
                </button>

                {isAuthenticated && (
                  <button
                    onClick={() => {
                      dispatch(logout());
                      handleClose();
                    }}
                    className="flex items-center gap-1.5 text-sm text-red-500 font-medium"
                  >
                    <FiLogOut /> Log out
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
