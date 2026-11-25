import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiGlobe, FiChevronDown, FiCheck } from 'react-icons/fi';
import { setCurrency, selectCurrentCurrencyInfo, SUPPORTED_CURRENCIES } from '../../store/currencySlice';

const CurrencySelector = ({ compact = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const currentCurrency = useSelector(selectCurrentCurrencyInfo);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    dispatch(setCurrency(code));
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
          compact ? 'px-2 py-1' : ''
        }`}
        aria-label="Select Currency"
      >
        <span className="text-sm">{currentCurrency.flag}</span>
        <span className="font-semibold">{currentCurrency.code}</span>
        <span className="text-gray-400">({currentCurrency.symbol})</span>
        <FiChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-52 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-gray-700">
            Select Currency
          </div>
          <div className="max-h-60 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-750">
            {Object.values(SUPPORTED_CURRENCIES).map((curr) => {
              const isSelected = curr.code === currentCurrency.code;
              return (
                <button
                  key={curr.code}
                  type="button"
                  onClick={() => handleSelect(curr.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors hover:bg-amber-50 dark:hover:bg-amber-950/30 ${
                    isSelected ? 'bg-amber-50/70 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 font-semibold' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{curr.flag}</span>
                    <div className="text-left">
                      <div className="font-medium flex items-center gap-1">
                        {curr.code} <span className="text-gray-400 font-normal">({curr.symbol})</span>
                      </div>
                      <div className="text-[10px] text-gray-400 dark:text-gray-500">{curr.name}</div>
                    </div>
                  </div>
                  {isSelected && <FiCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
