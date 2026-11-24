import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiPackage, FiTruck, FiMapPin, FiRepeat } from 'react-icons/fi';
import OrderTimeline from '../components/account/OrderTimeline';
import Breadcrumb from '../components/common/Breadcrumb';
import { selectOrderById } from '../store/orderSlice';
import { addToCart, toggleCartDrawer } from '../store/cartSlice';
import { formatPrice, formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const order = useSelector(selectOrderById(orderId)) || useSelector((state) => state.orders.orders[0]);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold">Order not found</h2>
        <Link to="/orders" className="btn-primary mt-4 inline-block">
          Return to Orders
        </Link>
      </div>
    );
  }

  const handleReorder = () => {
    order.items?.forEach((item) => {
      dispatch(
        addToCart({
          product: { ...item, images: [item.image] },
          quantity: item.quantity,
          selectedColor: null,
          selectedSize: null,
        })
      );
    });
    toast.success('Items added to cart!');
    dispatch(toggleCartDrawer(true));
  };

  return (
    <>
      <Helmet>
        <title>Order {order.id} — LuxeCart</title>
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Breadcrumb
          items={[
            { label: 'Orders', path: '/orders' },
            { label: order.id },
          ]}
        />

        {/* Header Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black font-display text-gray-900 dark:text-white">
                {order.id}
              </h1>
              <span className="badge badge-primary text-xs capitalize font-bold">
                {order.status}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Ordered on {formatDate(order.date)} • Payment via {order.paymentMethod}
            </p>
          </div>

          <button
            onClick={handleReorder}
            className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2 font-bold shadow-md"
          >
            <FiRepeat /> Buy Again (Reorder)
          </button>
        </div>

        {/* Live Timeline Tracker */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-gray-900 dark:text-white flex items-center gap-2">
              <FiTruck className="text-primary-600" /> Package Tracking
            </h3>
            {order.trackingNumber && (
              <span className="text-xs font-mono font-bold text-primary-600">
                {order.trackingNumber}
              </span>
            )}
          </div>
          <div className="pt-2">
            <OrderTimeline timeline={order.timeline || []} />
          </div>
        </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Shipping Address */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Delivery Address
            </h4>
            <p className="font-bold text-sm text-gray-900 dark:text-white">
              {order.shippingAddress?.name || 'Customer'}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
              {order.shippingAddress?.street}
            </p>
            <p className="text-xs text-gray-500">
              {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zip}
            </p>
          </div>

          {/* Payment Breakdown */}
          <div className="md:col-span-2 p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm space-y-2 text-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
              Payment Summary
            </h4>
            <div className="flex justify-between text-gray-500">
              <span>Items Subtotal</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {formatPrice(order.subtotal || order.total * 0.9)}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping & Handling</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {order.shipping === 0 ? 'FREE' : formatPrice(order.shipping || 0)}
              </span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Estimated Tax</span>
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {formatPrice(order.tax || order.total * 0.08)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>Discount Applied</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-2 flex justify-between font-bold text-sm text-gray-900 dark:text-white">
              <span>Grand Total</span>
              <span className="text-primary-600">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Ordered Items Table */}
        <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
          <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-4">
            Items in this Shipment
          </h4>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {order.items?.map((item, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div>
                    <h5 className="font-bold text-sm text-gray-900 dark:text-white">
                      {item.name}
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-extrabold text-sm text-gray-900 dark:text-white">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailPage;
