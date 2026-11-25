import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiBell,
  FiPackage,
  FiTag,
  FiHeart,
  FiShield,
  FiCheck,
  FiTrash2,
  FiExternalLink,
  FiPlusCircle,
} from 'react-icons/fi';
import {
  selectNotifications,
  selectIsNotificationDrawerOpen,
  toggleDrawer,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAllNotifications,
  addNotification,
} from '../../store/notificationSlice';
import { formatRelativeTime } from '../../utils/helpers';
import toast from 'react-hot-toast';

const NotificationDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notifications = useSelector(selectNotifications);
  const isOpen = useSelector(selectIsNotificationDrawerOpen);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'order', 'promo', 'system'

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'order') return n.type === 'order';
    if (activeTab === 'promo') return n.type === 'promo';
    if (activeTab === 'system') return n.type === 'system' || n.type === 'wishlist';
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type) => {
    switch (type) {
      case 'order':
        return <FiPackage className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'promo':
        return <FiTag className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      case 'wishlist':
        return <FiHeart className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      default:
        return <FiShield className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'order':
        return 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50';
      case 'promo':
        return 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/50';
      case 'wishlist':
        return 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/50';
      default:
        return 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/50';
    }
  };

  const handleActionClick = (link, notifId) => {
    dispatch(markAsRead(notifId));
    dispatch(toggleDrawer(false));
    if (link) {
      navigate(link);
    }
  };

  const handleSendSimulatedAlert = () => {
    const alerts = [
      {
        type: 'order',
        title: 'Package Out For Delivery',
        message: 'Your courier has arrived in your local delivery area. Driver arriving shortly!',
        link: '/orders',
      },
      {
        type: 'promo',
        title: 'Limited Flash Voucher',
        message: 'Claim 15% off cart totals over $150 with code SPRING15.',
        link: '/products',
      },
      {
        type: 'wishlist',
        title: 'Price Drop Alert!',
        message: 'A saved item in your Wishlist dropped by $25 today.',
        link: '/wishlist',
      },
    ];
    const picked = alerts[Math.floor(Math.random() * alerts.length)];
    dispatch(addNotification(picked));
    toast.success('Simulated notification triggered!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(toggleDrawer(false))}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col border-l border-gray-100 dark:border-gray-800"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <FiBell className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      Notifications
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-500 text-white">
                          {unreadCount} new
                        </span>
                      )}
                    </h2>
                    <p className="text-xs text-gray-400">Store alerts & activity feed</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSendSimulatedAlert}
                    className="p-1.5 text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    title="Simulate incoming notification"
                  >
                    <FiPlusCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => dispatch(toggleDrawer(false))}
                    className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100 dark:border-gray-800 px-4 pt-2 gap-2 text-xs font-medium">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'order', label: 'Orders' },
                  { key: 'promo', label: 'Offers' },
                  { key: 'system', label: 'Account' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`pb-2.5 px-2 border-b-2 transition-colors ${
                      activeTab === tab.key
                        ? 'border-amber-500 text-amber-600 dark:text-amber-400 font-semibold'
                        : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Quick Actions Bar */}
              {notifications.length > 0 && (
                <div className="px-4 py-2 bg-gray-50 dark:bg-gray-850 flex items-center justify-between text-xs text-gray-500 border-b border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => dispatch(markAllAsRead())}
                    className="hover:text-amber-600 flex items-center gap-1 transition-colors font-medium"
                  >
                    <FiCheck className="w-3.5 h-3.5" /> Mark all read
                  </button>
                  <button
                    onClick={() => dispatch(clearAllNotifications())}
                    className="hover:text-red-500 flex items-center gap-1 transition-colors font-medium"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" /> Clear all
                  </button>
                </div>
              )}

              {/* Notification List */}
              <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/80 p-2">
                {filteredNotifications.length === 0 ? (
                  <div className="py-20 text-center px-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center mx-auto mb-3">
                      <FiBell className="w-8 h-8 stroke-1" />
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      No notifications yet
                    </p>
                    <p className="text-xs text-gray-400 max-w-xs mx-auto mt-1">
                      You're all caught up! When orders update or promotions drop, you'll see them here.
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3.5 rounded-xl transition-colors relative group my-1 ${
                        !n.read
                          ? 'bg-amber-50/40 dark:bg-amber-950/20'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-850'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 border ${getIconBg(
                            n.type
                          )}`}
                        >
                          {getIcon(n.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4
                              className={`text-xs font-semibold truncate ${
                                !n.read
                                  ? 'text-gray-900 dark:text-white font-bold'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {n.title}
                            </h4>
                            <span className="text-[10px] text-gray-400 flex-shrink-0">
                              {formatRelativeTime(n.timestamp)}
                            </span>
                          </div>

                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                            {n.message}
                          </p>

                          {/* Action Button & Unread indicator */}
                          <div className="flex items-center justify-between mt-2.5">
                            {n.link ? (
                              <button
                                onClick={() => handleActionClick(n.link, n.id)}
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline"
                              >
                                <span>View details</span>
                                <FiExternalLink className="w-3 h-3" />
                              </button>
                            ) : (
                              <div />
                            )}

                            {!n.read && (
                              <span className="w-2 h-2 rounded-full bg-amber-500" title="Unread" />
                            )}
                          </div>
                        </div>

                        {/* Delete button on hover */}
                        <button
                          onClick={() => dispatch(removeNotification(n.id))}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-gray-400 hover:text-red-500"
                          title="Dismiss"
                        >
                          <FiX className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-850 flex items-center justify-between text-xs text-gray-500">
                <span>LuxeCart Real-Time Alerts</span>
                <button
                  onClick={() => {
                    dispatch(toggleDrawer(false));
                    navigate('/account');
                  }}
                  className="text-amber-600 dark:text-amber-400 hover:underline font-medium"
                >
                  Notification Settings
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NotificationDrawer;
