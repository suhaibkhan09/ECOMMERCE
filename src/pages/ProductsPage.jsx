import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FiGrid, FiList, FiFilter } from 'react-icons/fi';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilters from '../components/product/ProductFilters';
import Breadcrumb from '../components/common/Breadcrumb';
import EmptyState from '../components/common/EmptyState';
import Modal from '../components/common/Modal';
import {
  setViewMode,
  setSortBy,
  setCurrentPage,
  clearFilters,
} from '../../store/productSlice';
import { getPaginationRange } from '../../utils/helpers';

const ProductsPage = () => {
  const dispatch = useDispatch();
  const {
    filteredItems,
    viewMode,
    sortBy,
    currentPage,
    itemsPerPage,
  } = useSelector((state) => state.products);

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination calculations
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
  const paginationRange = getPaginationRange(currentPage, totalPages);

  return (
    <>
      <Helmet>
        <title>All Products — LuxeCart</title>
        <meta name="description" content="Browse our catalog of over 50+ premium products." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Products', path: '/products' }]} />

        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h1 className="text-3xl font-extrabold font-display text-gray-900 dark:text-white">
              Shop Collection
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredItems.length}</span> results
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden btn-secondary text-xs py-2 px-3.5 flex items-center gap-2"
            >
              <FiFilter /> Filters
            </button>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-xs font-semibold text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="featured">Featured Picks</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
              <option value="newest">Newest Arrivals</option>
              <option value="discount">Biggest Discount</option>
              <option value="name-az">Name: A to Z</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-0.5">
              <button
                onClick={() => dispatch(setViewMode('grid'))}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                title="Grid view"
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => dispatch(setViewMode('list'))}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                title="List view"
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Product Grid */}
        <div className="flex gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 sticky top-28">
            <ProductFilters />
          </aside>

          {/* Main Grid Area */}
          <div className="flex-1 min-w-0">
            {paginatedItems.length === 0 ? (
              <EmptyState
                title="No matching products found"
                description="We couldn't find any items matching your active filters. Try resetting your search parameters."
                actionLabel="Clear All Filters"
                onAction={() => dispatch(clearFilters())}
              />
            ) : (
              <>
                <ProductGrid products={paginatedItems} viewMode={viewMode} />

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                    <button
                      onClick={() => dispatch(setCurrentPage(Math.max(1, currentPage - 1)))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Previous
                    </button>

                    {paginationRange.map((page, idx) => (
                      <button
                        key={idx}
                        onClick={() => typeof page === 'number' && dispatch(setCurrentPage(page))}
                        disabled={typeof page !== 'number'}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                          page === currentPage
                            ? 'bg-primary-600 text-white shadow-md'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => dispatch(setCurrentPage(Math.min(totalPages, currentPage + 1)))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Filter Modal */}
        <Modal
          isOpen={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          title="Filter Products"
        >
          <ProductFilters isMobile onClose={() => setMobileFilterOpen(false)} />
        </Modal>
      </div>
    </>
  );
};

export default ProductsPage;
