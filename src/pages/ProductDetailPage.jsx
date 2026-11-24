import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import ImageGallery from '../components/product/ImageGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductReviews from '../components/product/ProductReviews';
import RelatedProducts from '../components/product/RelatedProducts';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import { addToRecentlyViewed } from '../store/productSlice';

const ProductDetailPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.items);

  const product = allProducts.find((p) => p.slug === slug || p.id === slug);

  useEffect(() => {
    if (product) {
      dispatch(addToRecentlyViewed(product.id));
    }
  }, [product, dispatch]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          title="Product not found"
          description="The product you are looking for may have been retired or moved."
          actionLabel="Browse All Products"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} — LuxeCart</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Products', path: '/products' },
            { label: product.category, path: `/category/${product.category}` },
            { label: product.name },
          ]}
        />

        {/* Product Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-4 items-start">
          <ImageGallery images={product.images} />
          <ProductInfo product={product} />
        </div>

        {/* Customer Reviews */}
        <ProductReviews
          productId={product.id}
          initialRating={product.rating}
          initialReviewCount={product.reviewCount}
        />

        {/* Related Suggestions */}
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
        />
      </div>
    </>
  );
};

export default ProductDetailPage;
