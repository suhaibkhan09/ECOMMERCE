import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FiEye, FiCheck, FiTruck, FiClock } from 'react-icons/fi';
import { updateOrderStatus } from '../../store/orderSlice';
import { formatPrice, formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const OrdersManagement = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders || []);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? orders
    : orders.filter((o) => o.status === filter);

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(
      updateOrderStatus({
        orderId,
        status: newStatus,
        description: `Status updated to ${newStatus} by admin`,
      })
    );
    toast.success(`Order #${orderId} marked as ${newStatus}`);
  };

  return (
    <>
      <Helmet>
        <title>Manage Orders — Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
              Customer Orders
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Fulfill customer purchases and manage delivery status
            </p>
          </div>

          <div className="flex gap-2">
            {['all', 'processing', 'shipped', 'delivered'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors ${
                  filter === s
                    ? 'bg-primary-600 text-white'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 uppercase font-bold text-gray-400">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Items</th>
                <th className="py-3.5 px-4">Total</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="py-3 px-4 font-bold font-mono text-primary-600">
                    {order.id}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                    {order.shippingAddress?.name || `${order.shippingAddress?.firstName} ${order.shippingAddress?.lastName}` || 'Valued Customer'}
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {formatDate(order.date)}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {order.items?.length || 1} items
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">
                    {formatPrice(order.total)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`badge capitalize font-bold text-[10px] ${
                        order.status === 'delivered'
                          ? 'badge-success'
                          : order.status === 'shipped'
                          ? 'badge-primary'
                          : 'badge-warning'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-[11px] font-semibold text-gray-700 dark:text-gray-300"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OrdersManagement;
