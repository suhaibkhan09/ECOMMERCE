import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiShield, FiLock, FiArrowRight } from 'react-icons/fi';
import { selectCartTotal } from '../../store/cartSlice';
import { formatPrice } from '../../utils/helpers';
import CouponInput from './CouponInput';

const CartSummary = ({ isCheckout = false }) => {
  const { subtotal, shipping, tax, discount, total } = useSelector(selectCartTotal);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm space-y-6">
      <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white pb-3 border-b border-gray-100 dark:border-gray-700">
        Order Summary
      </h3>

      {/* Breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatPrice(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Estimated Shipping</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {shipping === 0 ? <span className="text-green-600 dark:text-green-400">FREE</span> : formatPrice(shipping)}
          </span>
        </div>

        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Estimated Tax</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatPrice(tax)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400 font-semibold">
            <span>Coupon Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="border-t border-gray-100 dark:border-gray-700 pt-3 flex justify-between items-baseline">
          <span className="font-display font-bold text-base text-gray-900 dark:text-white">
            Total
          </span>
          <span className="font-display font-extrabold text-2xl text-primary-600 dark:text-primary-400">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Coupon section */}
      {!isCheckout && (
        <div className="border-t border-gray-100 dark:border-gray-700 pt-5">
          <CouponInput />
        </div>
      )}

      {/* CTA Button */}
      {!isCheckout && (
        <Link
          to="/checkout"
          className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-primary-500/25"
        >
          <span>Proceed to Checkout</span>
          <FiArrowRight />
        </Link>
      )}

      {/* Trust guarantees */}
      <div className="pt-2 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-2 text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <FiLock className="text-primary-500 w-3.5 h-3.5" />
          <span>256-bit SSL encrypted checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <FiShield className="text-primary-500 w-3.5 h-3.5" />
          <span>Money-back satisfaction guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
