import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FiSearch,
  FiHeart,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiSun,
  FiMoon,
  FiChevronDown,
  FiLogOut,
  FiPackage,
  FiSettings,
} from 'react-icons/fi';
import { selectCartItemCount, toggleCartDrawer } from '../../store/cartSlice';
import { selectWishlistCount } from '../../store/wishlistSlice';
import { toggleDarkMode, toggleMobileMenu } from '../../store/uiSlice';
import { logout } from '../../store/authSlice';
import { categories } from '../../data/mockData';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const cartCount = useSelector(selectCartItemCount);
  const wishlistCount = useSelector(selectWishlistCount);
  const { darkMode } = useSelector((state) => state.ui);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setUserMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-colors">
      {/* Top Banner Bar */}
      <div className="bg-gradient-to-r from-primary-700 via-primary-600 to-accent-600 text-white text-xs font-medium py-1.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:block">🌟 Free Express Shipping on Orders Over $100</div>
          <div className="mx-auto sm:mx-0">
            Use code <span className="underline font-bold">WELCOME10</span> for 10% off your first order!
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/orders" className="hover:underline">Track Order</Link>
            <span>|</span>
            <Link to="/products" className="hover:underline">Help & FAQs</Link>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              <FiMenu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                L
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white">
                Luxe<span className="text-primary-600">Cart</span>
              </span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-gray-900 transition-all text-gray-900 dark:text-white"
              />
              <FiSearch className="absolute left-4 top-3.5 text-gray-400 w-4 h-4" />
            </form>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => dispatch(toggleDarkMode())}
              className="p-2.5 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <FiSun className="w-5 h-5 text-amber-400" /> : <FiMoon className="w-5 h-5" />}
            </button>

            {/* Mobile Search Icon */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2.5 text-gray-600 dark:text-gray-300 hover:text-primary-600 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2.5 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Wishlist"
            >
              <FiHeart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger Button */}
            <button
              onClick={() => dispatch(toggleCartDrawer(true))}
              className="relative p-2.5 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Shopping Cart"
            >
              <FiShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* User Account Dropdown */}
            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 font-bold flex items-center justify-center text-xs">
                      {user?.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <FiChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50 animate-slide-down">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <FiUser className="w-4 h-4 text-primary-500" /> My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      >
                        <FiPackage className="w-4 h-4 text-accent-500" /> My Orders
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary-600 font-semibold hover:bg-primary-50 dark:hover:bg-primary-950/30"
                        >
                          <FiSettings className="w-4 h-4" /> Admin Dashboard
                        </Link>
                      )}
                      <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <FiLogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="btn-primary text-xs sm:text-sm py-2 px-4 flex items-center gap-1.5"
                >
                  <FiUser className="w-4 h-4" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Input Drawer */}
        {searchOpen && (
          <div className="md:hidden pb-4 px-2">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <FiSearch className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
            </form>
          </div>
        )}

        {/* Navigation Categories Strip (Desktop) */}
        <nav className="hidden lg:flex items-center justify-between border-t border-gray-100 dark:border-gray-800/80 py-3 text-sm font-medium">
          <div className="flex items-center space-x-6">
            <Link
              to="/products"
              className="text-gray-800 dark:text-gray-200 hover:text-primary-600 font-semibold"
            >
              All Products
            </Link>
            {categories.slice(0, 6).map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/products?sale=true"
              className="text-red-600 dark:text-red-400 hover:underline font-bold flex items-center gap-1"
            >
              🔥 Hot Deals
            </Link>
            <Link
              to="/products?new=true"
              className="text-primary-600 hover:underline font-bold"
            >
              ✨ New In
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
