import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FiCheck,
  FiShoppingBag,
  FiHeart,
  FiTruck,
  FiShield,
  FiShare2,
  FiCheckCircle,
} from 'react-icons/fi';
import Rating from '../common/Rating';
import PriceDisplay from '../common/PriceDisplay';
import QuantitySelector from '../common/QuantitySelector';
import { addToCart, toggleCartDrawer } from '../../store/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '../../store/wishlistSlice';
import toast from 'react-hot-toast';

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const isInWishlist = useSelector(selectIsInWishlist(product.id));

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
        selectedColor,
        selectedSize,
      })
    );
    toast.success(`Added ${product.name} to your cart!`);
    dispatch(toggleCartDrawer(true));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Brand & Title */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Link
            to={`/products?brand=${product.brand}`}
            className="text-xs uppercase font-extrabold tracking-widest text-primary-600 hover:underline"
          >
            {product.brand}
          </Link>
          <button
            onClick={handleShare}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full"
            title="Share"
          >
            <FiShare2 className="w-4 h-4" />
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 dark:text-white mb-3">
          {product.name}
        </h1>

        <div className="flex items-center gap-4 flex-wrap">
          <Rating rating={product.rating} count={product.reviewCount} size="md" />
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <span className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
            <FiCheckCircle /> {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
          </span>
          <span className="text-gray-300 dark:text-gray-700">|</span>
          <span className="text-xs text-gray-400">SKU: {product.id}</span>
        </div>
      </div>

      {/* Price */}
      <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
        <PriceDisplay
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          size="lg"
        />
        {product.price >= 100 && (
          <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
            Eligible for Free Express Shipping at checkout.
          </p>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        {product.description}
      </p>

      {/* Colors */}
      {product.colors?.length > 0 && (
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2.5">
            Color: <span className="text-gray-900 dark:text-white font-semibold">{selectedColor}</span>
          </span>
          <div className="flex items-center gap-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center shadow-sm ${
                  selectedColor === color.name
                    ? 'border-primary-600 ring-4 ring-primary-500/20 scale-110'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedColor === color.name && (
                  <FiCheck className={`w-4 h-4 ${color.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product.sizes?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Select Size: <span className="text-gray-900 dark:text-white font-semibold">{selectedSize}</span>
            </span>
            <button className="text-xs text-primary-600 hover:underline">Size Guide</button>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  selectedSize === size
                    ? 'bg-primary-600 text-white border-primary-600 shadow-md'
                    : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Features Checklist */}
      {product.features?.length > 0 && (
        <div className="border-t border-gray-100 dark:border-gray-800 pt-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
            Key Features
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-300">
            {product.features.map((feat, i) => (
              <li key={i} className="flex items-center gap-2">
                <FiCheck className="text-green-500 shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cart & Quantity Controls */}
      <div className="border-t border-gray-100 dark:border-gray-800 pt-6 space-y-4">
        <div className="flex items-center gap-4">
          <QuantitySelector
            value={quantity}
            onChange={setQuantity}
            max={product.stock || 99}
          />
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex-1 btn-primary py-3.5 flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-primary-500/20"
          >
            <FiShoppingBag /> Add to Cart
          </button>
          <button
            onClick={() => dispatch(toggleWishlist(product.id))}
            className={`p-3.5 rounded-xl border transition-colors ${
              isInWishlist
                ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-500'
                : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title="Wishlist"
          >
            <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Benefits Strip */}
        <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/40">
            <FiTruck className="text-primary-600 w-4 h-4" />
            <span>Fast delivery in 2-4 business days</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800/40">
            <FiShield className="text-primary-600 w-4 h-4" />
            <span>Authentic item with 2-year warranty</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
