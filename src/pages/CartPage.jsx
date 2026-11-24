import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FiShoppingBag, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import { selectCartItems, clearCart } from '../store/cartSlice';
import toast from 'react-hot-toast';

const CartPage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to empty your entire cart?')) {
      dispatch(clearCart());
      toast.success('Shopping cart cleared');
    }
  };

  return (
    <>
      <Helmet>
        <title>Shopping Cart ({items.length}) — LuxeCart</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Shopping Cart' }]} />

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h1 className="text-3xl font-extrabold font-display text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              You have <span className="font-semibold text-gray-900 dark:text-white">{items.length}</span> items in your cart
            </p>
          </div>

          {items.length > 0 && (
            <button
              onClick={handleClearCart}
              className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1.5 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <FiTrash2 /> Empty Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <EmptyState
            icon={FiShoppingBag}
            title="Your shopping cart is empty"
            description="Looks like you haven't added anything yet. Explore our curated selection of top trending products!"
            actionLabel="Discover Products"
            actionLink="/products"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                  item={item}
                />
              ))}

              <div className="pt-4 flex justify-between items-center">
                <Link
                  to="/products"
                  className="text-xs font-semibold text-primary-600 hover:underline flex items-center gap-1.5"
                >
                  <FiArrowLeft /> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Cart Summary Card */}
            <div className="lg:col-span-1 sticky top-28">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
