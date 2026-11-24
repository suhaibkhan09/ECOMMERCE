import React from 'react';
import { useSelector } from 'react-redux';
import { FiCheck, FiTruck, FiCreditCard, FiEdit } from 'react-icons/fi';
import { selectCartItems, selectCartTotal } from '../../store/cartSlice';
import { formatPrice } from '../../utils/helpers';

const OrderReview = ({ shippingData, paymentData, onBack, onPlaceOrder, isSubmitting }) => {
  const items = useSelector(selectCartItems);
  const { subtotal, shipping, tax, discount, total } = useSelector(selectCartTotal);

  return (
    <div className="space-y-6">
      {/* Shipping Summary */}
      <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm flex items-start justify-between">
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 flex items-center justify-center shrink-0 mt-0.5">
            <FiTruck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
              Shipping Information
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {shippingData.firstName} {shippingData.lastName} • {shippingData.phone}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {shippingData.street}, {shippingData.city}, {shippingData.state} {shippingData.zip}
            </p>
            <p className="text-xs text-primary-600 font-semibold mt-1 capitalize">
              Method: {shippingData.shippingMethod || 'Standard'} Delivery
            </p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="text-xs text-primary-600 font-semibold hover:underline flex items-center gap-1"
        >
          <FiEdit /> Edit
        </button>
      </div>

      {/* Payment Summary */}
      <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm flex items-start justify-between">
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-full bg-green-50 dark:bg-green-950/40 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
            <FiCreditCard className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-1">
              Payment Method
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {paymentData.paymentMethod === 'card'
                ? `Credit Card (ending in ${paymentData.cardNumber?.slice(-4) || '4242'})`
                : `${paymentData.paymentMethod?.toUpperCase()} Checkout`}
            </p>
            <p className="text-xs text-gray-400">Billing matches shipping address</p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="text-xs text-primary-600 font-semibold hover:underline flex items-center gap-1"
        >
          <FiEdit /> Edit
        </button>
      </div>

      {/* Items Preview */}
      <div className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
        <h4 className="font-bold text-sm text-gray-900 dark:text-white">
          Order Items ({items.length})
        </h4>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {items.map((item) => (
            <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="py-3 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold text-xs text-gray-900 dark:text-white truncate">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    Qty: {item.quantity} {item.selectedColor && `• ${item.selectedColor}`}
                  </p>
                </div>
              </div>
              <span className="font-bold text-xs text-gray-900 dark:text-white">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-2">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="btn-secondary w-1/3 py-3 font-semibold text-sm"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={isSubmitting}
          className="btn-primary flex-1 py-3.5 font-bold text-sm shadow-xl shadow-primary-500/25 flex items-center justify-center gap-2"
        >
          {isSubmitting ? 'Processing Order...' : `Place Order • ${formatPrice(total)}`}
        </button>
      </div>
    </div>
  );
};

export default OrderReview;
