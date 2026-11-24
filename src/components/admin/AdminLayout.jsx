import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  FiGrid,
  FiPackage,
  FiShoppingBag,
  FiUsers,
  FiTag,
  FiArrowLeft,
  FiSun,
  FiMoon,
  FiLogOut,
} from 'react-icons/fi';
import { toggleDarkMode } from '../../store/uiSlice';
import { logout } from '../../store/authSlice';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: FiGrid, end: true },
    { to: '/admin/products', label: 'Products', icon: FiPackage },
    { to: '/admin/orders', label: 'Orders', icon: FiShoppingBag },
    { to: '/admin/customers', label: 'Customers', icon: FiUsers },
    { to: '/admin/coupons', label: 'Coupons & Promo', icon: FiTag },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row antialiased">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center text-white font-black text-sm">
              L
            </div>
            <span className="font-display font-extrabold text-lg text-gray-900 dark:text-white">
              Admin<span className="text-primary-600">Portal</span>
            </span>
          </Link>
          <Link to="/" className="text-xs text-gray-400 hover:text-primary-600 flex items-center gap-1" title="Back to storefront">
            <FiArrowLeft /> Store
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 font-bold flex items-center justify-center text-xs">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                {user?.name || 'Administrator'}
              </p>
              <p className="text-[10px] text-gray-400 truncate">Super Admin</p>
            </div>
          </div>
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            title="Toggle theme"
          >
            {darkMode ? <FiSun className="text-amber-400" /> : <FiMoon />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
