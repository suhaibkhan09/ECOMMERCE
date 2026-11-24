import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiCheck, FiShoppingBag, FiHeart, FiExternalLink } from 'react-icons/fi';
import Modal from '../common/Modal';
import Rating from '../common/Rating';
import PriceDisplay from '../common/PriceDisplay';
import QuantitySelector from '../common/QuantitySelector';
import { setQuickViewProduct } from '../../store/uiSlice';
import { addToCart, toggleCartDrawer } from '../../store/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '../../store/wishlistSlice';
import toast from 'react-hot-toast';

const QuickViewModal = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.ui.quickViewProduct);
  const isInWishlist = useSelector(selectIsInWishlist(product?.id));

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const activeColor = selectedColor || product.colors?.[0]?.name || null;
  const activeSize = selectedSize || product.sizes?.[0] || null;

  const handleClose = () => {
    dispatch(setQuickViewProduct(null));
    setSelectedColor(null);
    setSelectedSize(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
        selectedColor: activeColor,
        selectedSize: activeSize,
      })
    );
    toast.success(`Added ${product.name} to cart!`);
    handleClose();
    dispatch(toggleCartDrawer(true));
  };

  return (
    <Modal isOpen={!!product} onClose={handleClose} size="xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div className="relative rounded-xl overflow-hidden bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-80 sm:h-96 object-cover"
          />
          {product.discount > 0 && (
            <span className="absolute top-4 left-4 badge badge-danger text-xs font-bold px-3 py-1">
              -{product.discount}% OFF
            </span>
          )}
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase font-bold tracking-wider text-primary-600 mb-1">
              {product.brand}
            </p>
            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <Rating rating={product.rating} count={product.reviewCount} />
              <span className="text-xs text-gray-400">•</span>
              <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-500'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            <div className="mb-4">
              <PriceDisplay
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                size="lg"
              />
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-6">
              {product.description}
            </p>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mb-4">
                <span className="text-xs font-bold uppercase text-gray-500 block mb-2">
                  Color: <span className="text-gray-900 dark:text-white">{activeColor}</span>
                </span>
                <div className="flex items-center gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                        activeColor === color.name
                          ? 'border-primary-600 ring-2 ring-primary-500/30 scale-110'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {activeColor === color.name && (
                        <FiCheck className={`w-3.5 h-3.5 ${color.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-6">
                <span className="text-xs font-bold uppercase text-gray-500 block mb-2">
                  Size: <span className="text-gray-900 dark:text-white">{activeSize}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        activeSize === size
                          ? 'bg-primary-600 text-white border-primary-600'
                          : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-4 mb-4">
              <QuantitySelector
                value={quantity}
                onChange={setQuantity}
                max={product.stock || 99}
              />
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 text-sm"
              >
                <FiShoppingBag /> Add to Cart
              </button>
              <button
                onClick={() => dispatch(toggleWishlist(product.id))}
                className={`p-3 rounded-xl border transition-colors ${
                  isInWishlist
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-500'
                    : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                title="Save to Wishlist"
              >
                <FiHeart className={isInWishlist ? 'fill-current' : ''} />
              </button>
            </div>

            <Link
              to={`/products/${product.slug}`}
              onClick={handleClose}
              className="text-xs text-primary-600 dark:text-primary-400 font-semibold flex items-center justify-center gap-1 hover:underline text-center"
            >
              <span>View full product specifications</span>
              <FiExternalLink />
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuickViewModal;
