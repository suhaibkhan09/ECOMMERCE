import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTrash2, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import {
  selectCartItems,
  selectCartTotal,
  toggleCartDrawer,
  removeFromCart,
  updateQuantity,
} from '../../store/cartSlice';
import { formatPrice } from '../../utils/helpers';
import QuantitySelector from '../common/QuantitySelector';

const CartDrawer = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const { subtotal, shipping } = useSelector(selectCartTotal);
  const isDrawerOpen = useSelector((state) => state.cart.isCartDrawerOpen);

  const freeShippingThreshold = 100;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountRemaining = Math.max(0, freeShippingThreshold - subtotal);

  const handleClose = () => dispatch(toggleCartDrawer(false));

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col z-10 border-l border-gray-100 dark:border-gray-800"
            >
              {/* Header */}
              <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiShoppingBag className="w-5 h-5 text-primary-600" />
                  <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
                    Your Cart ({items.length})
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="bg-primary-50 dark:bg-primary-950/30 px-5 py-3 border-b border-primary-100/50 dark:border-primary-900/30">
                <div className="flex items-center justify-between text-xs font-medium text-primary-900 dark:text-primary-300 mb-1.5">
                  <span>
                    {amountRemaining === 0 ? (
                      <span className="font-bold text-green-600 dark:text-green-400">
                        🎉 You've unlocked Free Express Shipping!
                      </span>
                    ) : (
                      <span>
                        Add <span className="font-bold">{formatPrice(amountRemaining)}</span> more for Free Shipping
                      </span>
                    )}
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100 dark:divide-gray-800">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 mb-4">
                      <FiShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Your cart is empty
                    </h4>
                    <p className="text-xs text-gray-400 max-w-xs mb-6">
                      Looks like you haven't added anything to your cart yet. Explore our top picks!
                    </p>
                    <Link
                      to="/products"
                      onClick={handleClose}
                      className="btn-primary text-xs py-2.5 px-5"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="py-4 flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-xl border border-gray-100 dark:border-gray-800 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <Link
                            to={`/products/${item.slug}`}
                            onClick={handleClose}
                            className="text-sm font-semibold text-gray-900 dark:text-white hover:text-primary-600 truncate"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => dispatch(removeFromCart({
                              id: item.id,
                              selectedColor: item.selectedColor,
                              selectedSize: item.selectedSize
                            }))}
                            className="text-gray-400 hover:text-red-500 p-1"
                            title="Remove"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                          {item.selectedColor && (
                            <span className="flex items-center gap-1">
                              Color: <span className="text-gray-700 dark:text-gray-300">{item.selectedColor}</span>
                            </span>
                          )}
                          {item.selectedSize && (
                            <span>• Size: <span className="text-gray-700 dark:text-gray-300">{item.selectedSize}</span></span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <QuantitySelector
                            value={item.quantity}
                            size="sm"
                            max={item.stock || 99}
                            onChange={(qty) => dispatch(updateQuantity({
                              id: item.id,
                              selectedColor: item.selectedColor,
                              selectedSize: item.selectedSize,
                              quantity: qty
                            }))}
                          />
                          <span className="font-bold text-sm text-gray-900 dark:text-white">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer */}
              {items.length > 0 && (
                <div className="p-5 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                    <span className="font-bold text-gray-900 dark:text-white text-base">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Link
                      to="/cart"
                      onClick={handleClose}
                      className="btn-secondary text-xs py-3 text-center"
                    >
                      View Cart
                    </Link>
                    <Link
                      to="/checkout"
                      onClick={handleClose}
                      className="btn-primary text-xs py-3 text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Checkout</span>
                      <FiArrowRight />
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
