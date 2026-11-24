import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiTrash2, FiHeart } from 'react-icons/fi';
import QuantitySelector from '../common/QuantitySelector';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import { toggleWishlist } from '../../store/wishlistSlice';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(
      removeFromCart({
        id: item.id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })
    );
    toast.success('Item removed from cart');
  };

  const handleMoveToWishlist = () => {
    dispatch(toggleWishlist(item.id));
    dispatch(
      removeFromCart({
        id: item.id,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
      })
    );
    toast.success('Moved to wishlist!');
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      {/* Product Image & Info */}
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <Link
          to={`/products/${item.slug}`}
          className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 shrink-0"
        >
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </Link>

        <div className="min-w-0">
          <p className="text-xs uppercase font-bold tracking-wider text-primary-600 mb-0.5">
            {item.brand}
          </p>
          <Link
            to={`/products/${item.slug}`}
            className="text-base font-bold font-display text-gray-900 dark:text-white hover:text-primary-600 transition-colors block truncate"
          >
            {item.name}
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
            {item.selectedSize && <span>• Size: {item.selectedSize}</span>}
          </div>
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mt-2">
            {formatPrice(item.price)} each
          </p>
        </div>
      </div>

      {/* Quantity & Controls */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
        <QuantitySelector
          value={item.quantity}
          onChange={(qty) =>
            dispatch(
              updateQuantity({
                id: item.id,
                selectedColor: item.selectedColor,
                selectedSize: item.selectedSize,
                quantity: qty,
              })
            )
          }
          max={item.stock || 99}
        />

        <div className="text-right w-24">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMoveToWishlist}
            className="p-2 text-gray-400 hover:text-accent-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Move to Wishlist"
          >
            <FiHeart className="w-5 h-5" />
          </button>
          <button
            onClick={handleRemove}
            className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            title="Remove item"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
