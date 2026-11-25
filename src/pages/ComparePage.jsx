import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  FiTrash2,
  FiX,
  FiShoppingCart,
  FiStar,
  FiCheck,
  FiArrowLeft,
  FiPlus,
  FiLayers,
} from 'react-icons/fi';
import {
  selectCompareItems,
  removeFromCompare,
  clearCompare,
  setHighlightDifferences,
} from '../store/compareSlice';
import { addToCart } from '../store/cartSlice';
import { formatPrice } from '../utils/helpers';
import Breadcrumb from '../components/common/Breadcrumb';

const ComparePage = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCompareItems);
  const highlightDifferences = useSelector((state) => state.compare?.highlightDifferences || false);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image || product.images?.[0],
        selectedColor: product.colors?.[0]?.name || 'Standard',
        selectedSize: product.sizes?.[0] || 'Standard',
        quantity: 1,
        stock: product.stock,
      })
    );
  };

  if (!items || items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Compare Products' }]} />
        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm mt-6">
          <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/30 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiLayers className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            No products to compare
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6 text-sm">
            Add up to 4 items from the product catalog or details page to inspect features and specs side by side.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium shadow-md transition-colors text-sm"
          >
            <FiArrowLeft /> Browse Catalog
          </Link>
        </div>
      </div>
    );
  }

  // Row comparison definitions
  const rows = [
    {
      key: 'price',
      label: 'Price',
      render: (p) => (
        <div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {formatPrice(p.price)}
          </span>
          {p.originalPrice && p.originalPrice > p.price && (
            <span className="ml-2 text-xs text-gray-400 line-through">
              {formatPrice(p.originalPrice)}
            </span>
          )}
        </div>
      ),
      getValue: (p) => p.price,
    },
    {
      key: 'rating',
      label: 'Rating & Reviews',
      render: (p) => (
        <div className="flex items-center gap-1.5">
          <div className="flex items-center text-amber-400">
            <FiStar className="fill-current w-4 h-4" />
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {p.rating || 4.5}
          </span>
          <span className="text-xs text-gray-400">({p.reviewsCount || 12} reviews)</span>
        </div>
      ),
      getValue: (p) => p.rating,
    },
    {
      key: 'brand',
      label: 'Brand',
      render: (p) => <span className="text-sm font-medium">{p.brand || 'Luxe Designer'}</span>,
      getValue: (p) => p.brand || 'Luxe Designer',
    },
    {
      key: 'category',
      label: 'Category',
      render: (p) => (
        <span className="inline-block px-2.5 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 capitalize">
          {p.category}
        </span>
      ),
      getValue: (p) => p.category,
    },
    {
      key: 'stock',
      label: 'Availability',
      render: (p) => (
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
            p.stock > 0
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
              : 'bg-red-50 dark:bg-red-950/40 text-red-600'
          }`}
        >
          {p.stock > 0 ? (
            <>
              <FiCheck className="w-3.5 h-3.5" /> In Stock ({p.stock})
            </>
          ) : (
            'Out of Stock'
          )}
        </span>
      ),
      getValue: (p) => (p.stock > 0 ? 'in_stock' : 'out_of_stock'),
    },
    {
      key: 'colors',
      label: 'Color Options',
      render: (p) => (
        <div className="flex items-center gap-1.5 flex-wrap">
          {p.colors && p.colors.length > 0 ? (
            p.colors.map((c, i) => (
              <span
                key={i}
                className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600 shadow-xs"
                style={{ backgroundColor: c.hex || '#000' }}
                title={c.name}
              />
            ))
          ) : (
            <span className="text-xs text-gray-400">Single Color</span>
          )}
        </div>
      ),
      getValue: (p) => p.colors?.length || 0,
    },
    {
      key: 'sizes',
      label: 'Available Sizes',
      render: (p) => (
        <div className="flex items-center gap-1 flex-wrap">
          {p.sizes && p.sizes.length > 0 ? (
            p.sizes.map((s, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[11px] rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {s}
              </span>
            ))
          ) : (
            <span className="text-xs text-gray-400">One Size</span>
          )}
        </div>
      ),
      getValue: (p) => p.sizes?.join(',') || 'none',
    },
    {
      key: 'shipping',
      label: 'Shipping',
      render: (p) => (
        <span className="text-xs text-gray-600 dark:text-gray-300">
          {p.price >= 100 ? 'Free Express Delivery' : 'Standard Delivery ($9.99)'}
        </span>
      ),
      getValue: (p) => (p.price >= 100 ? 'free' : 'standard'),
    },
  ];

  const hasDifferences = (row) => {
    if (items.length < 2) return false;
    const firstVal = row.getValue(items[0]);
    return items.some((item) => row.getValue(item) !== firstVal);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Product Comparison' }]} />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 my-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            Product Comparison
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Comparing {items.length} of 4 items
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {/* Highlight differences toggle */}
          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
            <input
              type="checkbox"
              checked={highlightDifferences}
              onChange={(e) => dispatch(setHighlightDifferences(e.target.checked))}
              className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
            />
            <span>Highlight Differences</span>
          </label>

          <button
            onClick={() => dispatch(clearCompare())}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg border border-red-200 dark:border-red-900/50 transition-colors"
          >
            <FiTrash2 /> Clear All
          </button>
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-850">
              <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-48 min-w-[180px]">
                Features & Specs
              </th>
              {items.map((item) => (
                <th key={item.id} className="p-4 text-left w-64 min-w-[220px] align-top">
                  <div className="relative group flex flex-col h-full">
                    <button
                      onClick={() => dispatch(removeFromCompare(item.id))}
                      className="absolute top-0 right-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove from compare"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                    <Link to={`/products/${item.slug || item.id}`} className="block mb-2">
                      <img
                        src={item.image || item.images?.[0]}
                        alt={item.name}
                        className="w-full h-36 object-cover rounded-xl bg-gray-100 dark:bg-gray-900 border border-gray-100 dark:border-gray-700"
                      />
                    </Link>
                    <Link
                      to={`/products/${item.slug || item.id}`}
                      className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </div>
                </th>
              ))}
              {/* Fill remaining columns up to 4 */}
              {Array.from({ length: 4 - items.length }).map((_, i) => (
                <th key={`empty-${i}`} className="p-4 w-64 min-w-[200px] align-top">
                  <Link
                    to="/products"
                    className="h-44 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:text-amber-600 hover:border-amber-400 dark:hover:border-amber-600 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-850 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <FiPlus className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium">Add Product</span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60 text-sm">
            {rows.map((row) => {
              const diff = hasDifferences(row);
              const highlight = highlightDifferences && diff;

              return (
                <tr
                  key={row.key}
                  className={`transition-colors ${
                    highlight ? 'bg-amber-50/60 dark:bg-amber-950/20' : 'hover:bg-gray-50/50 dark:hover:bg-gray-750/30'
                  }`}
                >
                  <td className="p-4 font-semibold text-gray-900 dark:text-gray-200 text-xs uppercase tracking-wider bg-gray-50/30 dark:bg-gray-800/40">
                    <div className="flex items-center gap-1.5">
                      <span>{row.label}</span>
                      {highlight && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Different values" />
                      )}
                    </div>
                  </td>
                  {items.map((item) => (
                    <td key={item.id} className="p-4 text-gray-700 dark:text-gray-300">
                      {row.render(item)}
                    </td>
                  ))}
                  {Array.from({ length: 4 - items.length }).map((_, i) => (
                    <td key={`empty-td-${i}`} className="p-4 text-gray-300 dark:text-gray-600">
                      —
                    </td>
                  ))}
                </tr>
              );
            })}

            {/* Actions Row */}
            <tr className="bg-gray-50/80 dark:bg-gray-850">
              <td className="p-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">
                Action
              </td>
              {items.map((item) => (
                <td key={item.id} className="p-4">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={item.stock <= 0}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
                  >
                    <FiShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </td>
              ))}
              {Array.from({ length: 4 - items.length }).map((_, i) => (
                <td key={`empty-action-${i}`} className="p-4" />
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparePage;
