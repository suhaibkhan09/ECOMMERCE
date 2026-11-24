import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiTag, FiCheck, FiX } from 'react-icons/fi';
import { applyCoupon, removeCoupon, selectCartSubtotal } from '../../store/cartSlice';
import { coupons } from '../../data/mockData';
import { validateCoupon, formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

const CouponInput = () => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const subtotal = useSelector(selectCartSubtotal);
  const appliedCoupon = useSelector((state) => state.cart.coupon);
  const couponDiscount = useSelector((state) => state.cart.couponDiscount);

  const handleApply = (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    const result = validateCoupon(code.trim(), subtotal, coupons);
    if (result.valid) {
      dispatch(applyCoupon({ code: code.toUpperCase(), discount: result.discount }));
      toast.success(`Coupon applied: ${result.message}!`);
      setCode('');
    } else {
      toast.error(result.message);
    }
  };

  const handleRemove = () => {
    dispatch(removeCoupon());
    toast('Coupon removed');
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-xs">
        <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
          <FiTag className="w-4 h-4" />
          <span className="font-bold">{appliedCoupon}</span>
          <span>(-{formatPrice(couponDiscount)})</span>
        </div>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 p-1 font-semibold"
          title="Remove coupon"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleApply} className="flex gap-2">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Promo code (try WELCOME10)"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs text-gray-900 dark:text-white uppercase font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <FiTag className="absolute left-3 top-3 text-gray-400 w-3.5 h-3.5" />
      </div>
      <button
        type="submit"
        className="btn-secondary text-xs py-2.5 px-4 font-bold"
      >
        Apply
      </button>
    </form>
  );
};

export default CouponInput;
