import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

const RelatedProducts = ({ currentProductId, category }) => {
  const allProducts = useSelector((state) => state.products.items);

  const related = allProducts
    .filter((p) => p.category === category && p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="border-t border-gray-100 dark:border-gray-800 pt-12 mt-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
            You Might Also Like
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Hand-picked recommendations based on your current view
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {related.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
