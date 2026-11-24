import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FiCheckCircle, FiPackage, FiTruck, FiArrowRight, FiFileText } from 'react-icons/fi';
import { formatPrice, formatDate } from '../../utils/helpers';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const latestOrder = useSelector((state) => state.orders.currentOrder || state.orders.orders[0]);

  const order = latestOrder || {
    id: `ORD-${Date.now()}`,
    date: new Date().toISOString(),
    items: [],
    total: 299.00,
    trackingNumber: 'TRK-9876543210',
    shippingAddress: { name: 'Valued Customer', street: '123 Market St', city: 'San Francisco', state: 'CA', zip: '94103' },
  };

  return (
    <>
      <Helmet>
        <title>Order Confirmed #{order.id} — LuxeCart</title>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        {/* Animated Celebration Icon */}
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 mx-auto flex items-center justify-center mb-6 shadow-inner animate-bounce">
          <FiCheckCircle size={44} />
        </div>

        <span className="badge badge-success text-xs font-bold uppercase tracking-wider mb-2">
          Order Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-gray-900 dark:text-white mb-2">
          Thank you for your purchase!
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          We've received your order and sent a confirmation receipt to your email address.
        </p>

        {/* Order Details Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 text-left mb-8 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between pb-4 border-b border-gray-200 dark:border-gray-700 gap-2">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Order Number</p>
              <p className="text-sm font-extrabold text-primary-600 font-mono mt-0.5">
                {order.id}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Date Placed</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-0.5">
                {formatDate(order.date)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Total Amount</p>
              <p className="text-sm font-extrabold text-gray-900 dark:text-white mt-0.5">
                {formatPrice(order.total)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-gray-400 font-bold uppercase mb-1">Shipping Destination</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200">
                {order.shippingAddress?.name || `${order.shippingAddress?.firstName} ${order.shippingAddress?.lastName}`}
              </p>
              <p className="text-gray-500">{order.shippingAddress?.street}</p>
              <p className="text-gray-500">
                {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}
              </p>
            </div>

            <div>
              <p className="text-gray-400 font-bold uppercase mb-1">Estimated Delivery</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                <FiTruck className="text-primary-600" /> In 2 to 4 business days
              </p>
              {order.trackingNumber && (
                <p className="text-gray-500 font-mono text-[11px] mt-1">
                  Tracking Code: {order.trackingNumber}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/orders"
            className="btn-secondary text-xs py-3 px-6 flex items-center gap-2 w-full sm:w-auto justify-center font-bold"
          >
            <FiFileText /> View Order Status
          </Link>
          <Link
            to="/products"
            className="btn-primary text-xs py-3 px-8 flex items-center gap-2 w-full sm:w-auto justify-center font-bold shadow-lg shadow-primary-500/25"
          >
            <span>Continue Shopping</span>
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderConfirmationPage;
