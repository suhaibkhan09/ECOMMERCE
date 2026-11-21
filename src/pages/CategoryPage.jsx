import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import { setCategory, clearFilters } from '../../store/productSlice';
import { categories } from '../../data/mockData';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const dispatch = useDispatch();

  const { filteredItems, viewMode } = useSelector((state) => state.products);
  const currentCategory = categories.find((c) => c.id === categoryId);

  useEffect(() => {
    dispatch(setCategory(categoryId));
    return () => {
      dispatch(clearFilters());
    };
  }, [categoryId, dispatch]);

  return (
    <>
      <Helmet>
        <title>{currentCategory?.name || 'Category'} — LuxeCart</title>
        <meta
          name="description"
          content={`Shop our full range of ${currentCategory?.name} products at LuxeCart.`}
        />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Categories', path: '/products' },
            { label: currentCategory?.name || categoryId },
          ]}
        />

        {/* Category Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gray-900 h-48 sm:h-64 mb-10 flex items-center shadow-lg">
          {currentCategory?.image && (
            <img
              src={currentCategory.image}
              alt={currentCategory.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          )}
          <div className="relative z-10 p-8 sm:p-12">
            <span className="text-3xl mb-2 block">{currentCategory?.icon}</span>
            <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
              {currentCategory?.name}
            </h1>
            <p className="text-sm text-gray-300 mt-2 max-w-md">
              Explore our curated selection of high-performance {currentCategory?.name.toLowerCase()}.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex gap-8 items-start">
          <aside className="hidden lg:block w-72 shrink-0 sticky top-28">
            <ProductFilters />
          </aside>

          <div className="flex-1 min-w-0">
            {filteredItems.length === 0 ? (
              <EmptyState
                title={`No ${currentCategory?.name || 'items'} match your filters`}
                description="Try clearing your active filters to see all available products in this category."
                actionLabel="Clear Filters"
                onAction={() => dispatch(clearFilters())}
              />
            ) : (
              <ProductGrid products={filteredItems} viewMode={viewMode} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
