import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/mockData';

const CategoryGrid = () => {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="section-title">Shop by Category</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Browse our hand-picked selections across top categories
          </p>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-bold text-primary-600 dark:text-primary-400 hover:underline"
        >
          View All Categories →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-900 shadow-sm hover:shadow-xl transition-all"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover opacity-75 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-2xl mb-1 block">{cat.icon}</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-primary-300 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-gray-300">{cat.count} Items</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
