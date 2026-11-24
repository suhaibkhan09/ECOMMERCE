import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import { setSearchQuery, clearFilters } from '../store/productSlice';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const query = searchParams.get('q') || '';

  const { filteredItems, viewMode } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(setSearchQuery(query));
  }, [query, dispatch]);

  return (
    <>
      <Helmet>
        <title>Search results for "{query}" — LuxeCart</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Search', path: '/products' },
            { label: `"${query}"` },
          ]}
        />

        <div className="mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-3xl font-extrabold font-display text-gray-900 dark:text-white">
            Search Results
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Found <span className="font-semibold text-gray-900 dark:text-white">{filteredItems.length}</span> items matching "{query}"
          </p>
        </div>

        <div className="flex gap-8 items-start">
          <aside className="hidden lg:block w-72 shrink-0 sticky top-28">
            <ProductFilters />
          </aside>

          <div className="flex-1 min-w-0">
            {filteredItems.length === 0 ? (
              <EmptyState
                title="No items found"
                description={`We couldn't find any products matching "${query}". Check your spelling or try broader terms.`}
                actionLabel="View All Products"
                actionLink="/products"
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

export default SearchPage;
