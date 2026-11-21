import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiHeart, FiEye, FiShoppingBag } from 'react-icons/fi';
import Rating from '../common/Rating';
import PriceDisplay from '../common/PriceDisplay';
import { addToCart, toggleCartDrawer } from '../../store/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '../../store/wishlistSlice';
import { setQuickViewProduct } from '../../store/uiSlice';
import toast from 'react-hot-toast';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const dispatch = useDispatch();
  const isInWishlist = useSelector(selectIsInWishlist(product.id));

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        product,
        quantity: 1,
        selectedColor: product.colors?.[0]?.name || null,
        selectedSize: product.sizes?.[0] || null,
      })
    );
    toast.success(`Added ${product.name} to cart!`);
    dispatch(toggleCartDrawer(true));
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product.id));
    if (!isInWishlist) {
      toast.success('Added to wishlist!');
    } else {
      toast('Removed from wishlist');
    }
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setQuickViewProduct(product));
  };

  if (viewMode === 'list') {
    return (
      <div className="card-hover p-4 flex flex-col sm:flex-row gap-6 items-center">
        {/* Thumbnail */}
        <Link to={`/products/${product.slug}`} className="relative w-full sm:w-48 h-48 rounded-xl overflow-hidden shrink-0 bg-gray-50 dark:bg-gray-900 group">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.discount > 0 && (
            <span className="absolute top-2 left-2 badge badge-danger text-xs font-bold">
              -{product.discount}%
            </span>
          )}
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase text-primary-600 tracking-wider">
              {product.brand}
            </span>
            {product.isNew && <span className="badge badge-primary text-[10px]">NEW</span>}
            {product.isBestSeller && <span className="badge badge-warning text-[10px]">BESTSELLER</span>}
          </div>

          <Link to={`/products/${product.slug}`}>
            <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white hover:text-primary-600 transition-colors mb-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
            {product.description}
          </p>

          <div className="mb-3">
            <Rating rating={product.rating} count={product.reviewCount} />
          </div>

          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            size="md"
          />
        </div>

        {/* Actions */}
        <div className="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0 justify-end">
          <button
            onClick={handleAddToCart}
            className="btn-primary text-xs py-2.5 px-4 flex-1 sm:flex-initial flex items-center justify-center gap-1.5"
          >
            <FiShoppingBag /> Add to Cart
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleQuickView}
              className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              title="Quick view"
            >
              <FiEye />
            </button>
            <button
              onClick={handleToggleWishlist}
              className={`p-2.5 rounded-lg border transition-colors ${
                isInWishlist
                  ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-950/20'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="Wishlist"
            >
              <FiHeart className={isInWishlist ? 'fill-current' : ''} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid view (Default)
  return (
    <div className="card-hover group flex flex-col justify-between">
      <div>
        {/* Image Container with Badges & Hover Actions */}
        <div className="relative aspect-square w-full overflow-hidden bg-gray-50 dark:bg-gray-900">
          <Link to={`/products/${product.slug}`}>
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
            {product.discount > 0 && (
              <span className="badge badge-danger text-[11px] font-bold shadow-sm">
                -{product.discount}%
              </span>
            )}
            {product.isNew && (
              <span className="badge badge-primary text-[10px] font-bold shadow-sm">
                NEW
              </span>
            )}
            {product.isBestSeller && (
              <span className="badge badge-warning text-[10px] font-bold shadow-sm">
                HOT
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 z-10 p-2.5 rounded-full shadow-md backdrop-blur-md transition-all duration-200 ${
              isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 hover:text-red-500'
            }`}
            aria-label="Wishlist"
          >
            <FiHeart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </button>

          {/* Quick View Button (Shows on Hover) */}
          <button
            onClick={handleQuickView}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-10 px-4 py-2 rounded-full bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white shadow-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-primary-600 hover:text-white backdrop-blur-md"
          >
            <FiEye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Content Details */}
        <div className="p-4">
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="font-bold uppercase tracking-wider text-primary-600">
              {product.brand}
            </span>
            <span className="capitalize">{product.category}</span>
          </div>

          <Link to={`/products/${product.slug}`} className="block">
            <h3 className="font-display font-semibold text-sm text-gray-900 dark:text-white hover:text-primary-600 transition-colors line-clamp-1 mb-1.5">
              {product.name}
            </h3>
          </Link>

          <div className="mb-2.5">
            <Rating rating={product.rating} count={product.reviewCount} />
          </div>

          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            size="sm"
          />
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-4 pb-4 pt-1">
        <button
          onClick={handleAddToCart}
          className="w-full btn-secondary text-xs py-2 flex items-center justify-center gap-1.5 hover:bg-primary-600 hover:text-white hover:border-primary-600 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all"
        >
          <FiShoppingBag className="w-3.5 h-3.5" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
