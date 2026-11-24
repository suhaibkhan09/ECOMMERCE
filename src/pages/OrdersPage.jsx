import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FiPackage, FiArrowRight, FiClock } from 'react-icons/fi';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import { formatPrice, formatDate } from '../utils/helpers';

const OrdersPage = () => {
  const [filter, setFilter] = useState('all');
  const orders = useSelector((state) => state.orders.orders || []);

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter((o) => o.status === filter);

  return (
    <>
      <Helmet>
        <title>Order History — LuxeCart</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Orders' }]} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h1 className="text-3xl font-extrabold font-display text-gray-900 dark:text-white">
              Order History
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Check the status of current shipments and review previous orders
            </p>
          </div>

          {/* Filter Status Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
            {['all', 'processing', 'shipped', 'delivered'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-colors ${
                  filter === s
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={FiPackage}
            title="No orders found"
            description="You don't have any orders under this filter yet. Ready to start shopping?"
            actionLabel="Discover Products"
            actionLink="/products"
          />
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const statusColor =
                order.status === 'delivered'
                  ? 'badge-success'
                  : order.status === 'shipped'
                  ? 'badge-primary'
                  : 'badge-warning';

              return (
                <div
                  key={order.id}
                  className="p-6 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700 gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold font-mono text-sm text-gray-900 dark:text-white">
                        {order.id}
                      </span>
                      <span className={`badge ${statusColor} capitalize font-bold text-[11px]`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span>Placed on {formatDate(order.date)}</span>
                      <span>•</span>
                      <span className="font-bold text-gray-900 dark:text-white text-sm">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* Items Preview Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover border border-gray-100 dark:border-gray-700 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-xs text-gray-900 dark:text-white truncate">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Qty: {item.quantity} • {formatPrice(item.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2 border-t border-gray-100 dark:border-gray-700">
                    <Link
                      to={`/orders/${order.id}`}
                      className="text-xs font-bold text-primary-600 hover:underline flex items-center gap-1"
                    >
                      <span>View Full Order & Tracking Details</span>
                      <FiArrowRight />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersPage;
