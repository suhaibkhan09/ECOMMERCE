import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FiHeart, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import { clearWishlist } from '../store/wishlistSlice';
import { addToCart, toggleCartDrawer } from '../store/cartSlice';
import toast from 'react-hot-toast';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistIds = useSelector((state) => state.wishlist.items);
  const allProducts = useSelector((state) => state.products.items);

  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistProducts.forEach((p) => {
      dispatch(
        addToCart({
          product: p,
          quantity: 1,
          selectedColor: p.colors?.[0]?.name || null,
          selectedSize: p.sizes?.[0] || null,
        })
      );
    });
    toast.success('Moved all wishlist items to cart!');
    dispatch(toggleCartDrawer(true));
  };

  return (
    <>
      <Helmet>
        <title>Saved Wishlist ({wishlistProducts.length}) — LuxeCart</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Wishlist' }]} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-8 border-b border-gray-100 dark:border-gray-800 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold font-display text-gray-900 dark:text-white">
              My Saved Wishlist
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              You have <span className="font-semibold text-gray-900 dark:text-white">{wishlistProducts.length}</span> saved favorites
            </p>
          </div>

          {wishlistProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  dispatch(clearWishlist());
                  toast('Wishlist cleared');
                }}
                className="btn-secondary text-xs py-2.5 px-4 flex items-center gap-1.5"
              >
                <FiTrash2 /> Clear All
              </button>
              <button
                onClick={handleMoveAllToCart}
                className="btn-primary text-xs py-2.5 px-5 flex items-center gap-1.5 font-bold shadow-md"
              >
                <FiShoppingBag /> Move All to Cart
              </button>
            </div>
          )}
        </div>

        {wishlistProducts.length === 0 ? (
          <EmptyState
            icon={FiHeart}
            title="Your wishlist is empty"
            description="Save items you love by tapping the heart icon on any product card while browsing."
            actionLabel="Start Exploring"
            actionLink="/products"
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistPage;
