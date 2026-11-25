import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiColumns, FiTrash2, FiChevronUp, FiChevronDown, FiArrowRight } from 'react-icons/fi';
import {
  selectCompareItems,
  removeFromCompare,
  clearCompare,
  toggleCompareBar,
} from '../../store/compareSlice';
import { formatPrice } from '../../utils/helpers';

const ComparisonBar = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCompareItems);
  const isOpen = useSelector((state) => state.compare?.isOpen ?? true);

  if (!items || items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-3 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto">
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl overflow-hidden backdrop-blur-md bg-opacity-95 dark:bg-opacity-95">
          {/* Header Bar */}
          <div className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800/80 border-b border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
                <FiColumns className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold text-gray-900 dark:text-white">
                Compare Products ({items.length}/4)
              </span>
              <span className="text-[11px] text-gray-500 hidden sm:inline">
                Add up to 4 items to compare specs side by side
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch(clearCompare())}
                className="text-xs text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors"
                title="Clear all comparison items"
              >
                <FiTrash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear All</span>
              </button>

              <button
                onClick={() => dispatch(toggleCompareBar())}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label="Toggle compare dock"
              >
                {isOpen ? <FiChevronDown className="w-4 h-4" /> : <FiChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Collapsible Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-3"
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* Item Slots */}
                  <div className="grid grid-cols-4 gap-2.5 w-full sm:w-auto flex-1 max-w-2xl">
                    {[0, 1, 2, 3].map((index) => {
                      const item = items[index];
                      if (item) {
                        return (
                          <div
                            key={item.id}
                            className="relative flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 group"
                          >
                            <img
                              src={item.image || item.images?.[0]}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-lg flex-shrink-0 bg-white"
                            />
                            <div className="min-w-0 flex-1 hidden md:block">
                              <p className="text-xs font-medium text-gray-900 dark:text-gray-100 truncate">
                                {item.name}
                              </p>
                              <p className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                                {formatPrice(item.price)}
                              </p>
                            </div>
                            <button
                              onClick={() => dispatch(removeFromCompare(item.id))}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs shadow-md opacity-80 group-hover:opacity-100 transition-opacity"
                              title="Remove item"
                            >
                              <FiX className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      }
                      return (
                        <div
                          key={`empty-${index}`}
                          className="border border-dashed border-gray-200 dark:border-gray-700/80 rounded-xl p-2 flex items-center justify-center text-[11px] text-gray-400 text-center min-h-[52px]"
                        >
                          + Slot {index + 1}
                        </div>
                      );
                    })}
                  </div>

                  {/* Compare CTA */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <Link
                      to="/compare"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all hover:shadow-lg"
                    >
                      <span>Compare ({items.length})</span>
                      <FiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ComparisonBar;
