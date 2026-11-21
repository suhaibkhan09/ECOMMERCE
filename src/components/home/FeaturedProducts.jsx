import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../product/ProductCard';

const FeaturedProducts = ({ title = 'Featured Products', subtitle, products = [] }) => {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="section-title">{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-bold text-primary-600 dark:text-primary-400 hover:underline"
        >
          Explore All →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
