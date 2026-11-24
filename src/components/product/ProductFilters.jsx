import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiFilter, FiX, FiCheck, FiChevronDown, FiStar } from 'react-icons/fi';
import { setFilters, clearFilters } from '../../store/productSlice';
import { categories, brands, colorOptions } from '../../data/mockData';
import { formatPrice } from '../../utils/helpers';

const ProductFilters = ({ isMobile = false, onClose }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);

  const handleCategoryToggle = (categoryId) => {
    const current = filters.categories || [];
    const updated = current.includes(categoryId)
      ? current.filter((c) => c !== categoryId)
      : [...current, categoryId];
    dispatch(setFilters({ categories: updated }));
  };

  const handleBrandToggle = (brandName) => {
    const current = filters.brands || [];
    const updated = current.includes(brandName)
      ? current.filter((b) => b !== brandName)
      : [...current, brandName];
    dispatch(setFilters({ brands: updated }));
  };

  const handleColorToggle = (colorName) => {
    const current = filters.colors || [];
    const updated = current.includes(colorName)
      ? current.filter((c) => c !== colorName)
      : [...current, colorName];
    dispatch(setFilters({ colors: updated }));
  };

  const handlePriceChange = (e) => {
    const max = Number(e.target.value);
    dispatch(setFilters({ priceRange: [filters.priceRange[0], max] }));
  };

  const handleRatingChange = (rating) => {
    dispatch(setFilters({ rating: filters.rating === rating ? 0 : rating }));
  };

  const activeFiltersCount =
    (filters.categories?.length || 0) +
    (filters.brands?.length || 0) +
    (filters.colors?.length || 0) +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.onSale ? 1 : 0) +
    (filters.isNew ? 1 : 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <FiFilter className="text-primary-600" />
          <h3 className="font-display font-bold text-gray-900 dark:text-white">
            Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </h3>
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={() => dispatch(clearFilters())}
            className="text-xs text-red-500 hover:underline font-semibold"
          >
            Clear All
          </button>
        )}
        {isMobile && (
          <button onClick={onClose} className="p-1 text-gray-400">
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Quick Toggles */}
      <div className="space-y-2">
        <label className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>In Stock Only</span>
          <input
            type="checkbox"
            checked={filters.inStock || false}
            onChange={(e) => dispatch(setFilters({ inStock: e.target.checked }))}
            className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>On Sale Only 🔥</span>
          <input
            type="checkbox"
            checked={filters.onSale || false}
            onChange={(e) => dispatch(setFilters({ onSale: e.target.checked }))}
            className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300">
          <span>New Arrivals ✨</span>
          <input
            type="checkbox"
            checked={filters.isNew || false}
            onChange={(e) => dispatch(setFilters({ isNew: e.target.checked }))}
            className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
          />
        </label>
      </div>

      {/* Price Range Slider */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-5">
        <div className="flex items-center justify-between mb-3 text-sm font-semibold text-gray-900 dark:text-white">
          <span>Max Price</span>
          <span className="text-primary-600 font-bold">
            {formatPrice(filters.priceRange?.[1] || 5000)}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="5000"
          step="50"
          value={filters.priceRange?.[1] || 5000}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>$50</span>
          <span>$5,000</span>
        </div>
      </div>

      {/* Categories */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
          Categories
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {categories.map((cat) => {
            const checked = filters.categories?.includes(cat.id);
            return (
              <label
                key={cat.id}
                className="flex items-center justify-between cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleCategoryToggle(cat.id)}
                    className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <span>{cat.name}</span>
                </div>
                <span className="text-xs text-gray-400">{cat.count}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Rating */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
          Minimum Rating
        </h4>
        <div className="space-y-1.5">
          {[4, 3, 2].map((stars) => {
            const selected = filters.rating === stars;
            return (
              <button
                key={stars}
                onClick={() => handleRatingChange(stars)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selected
                    ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-600 font-bold'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(stars)].map((_, i) => (
                    <FiStar key={i} className="fill-current" />
                  ))}
                  <span className="text-gray-700 dark:text-gray-300 ml-1 text-xs">
                    & Up
                  </span>
                </div>
                {selected && <FiCheck className="text-primary-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Swatches */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
          Colors
        </h4>
        <div className="flex flex-wrap gap-2">
          {colorOptions.map((c) => {
            const active = filters.colors?.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => handleColorToggle(c.name)}
                className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                  active
                    ? 'border-primary-600 ring-2 ring-primary-500/30 scale-110'
                    : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              >
                {active && (
                  <FiCheck className={`w-3.5 h-3.5 ${c.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
          Popular Brands
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {brands.slice(0, 10).map((brand) => {
            const checked = filters.brands?.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center gap-2 cursor-pointer text-sm text-gray-700 dark:text-gray-300 hover:text-primary-600"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleBrandToggle(brand)}
                  className="w-4 h-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                />
                <span>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
