import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentCurrencyInfo } from '../../store/currencySlice';

const PriceDisplay = ({ price, originalPrice, discount, size = 'md' }) => {
  const currencyInfo = useSelector(selectCurrentCurrencyInfo);

  const formatWithCurrency = (amountInUSD) => {
    if (amountInUSD === undefined || amountInUSD === null || isNaN(amountInUSD)) {
      return '$0.00';
    }
    const rate = currencyInfo?.rate ?? 1.0;
    const symbol = currencyInfo?.symbol ?? '$';
    const code = currencyInfo?.code ?? 'USD';
    const converted = amountInUSD * rate;

    if (code === 'JPY') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };

  const sizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-lg font-bold',
    lg: 'text-2xl font-bold md:text-3xl',
  };

  const hasDiscount = discount > 0 || (originalPrice && originalPrice > price);

  return (
    <div className="flex items-center flex-wrap gap-2">
      <span className={`${sizeClasses[size]} text-gray-900 dark:text-white`}>
        {formatWithCurrency(price)}
      </span>
      {hasDiscount && (
        <>
          <span className="text-sm text-gray-400 line-through">
            {formatWithCurrency(originalPrice || price * (1 + (discount || 0) / 100))}
          </span>
          <span className="badge badge-danger">
            -{discount || Math.round(((originalPrice - price) / originalPrice) * 100)}%
          </span>
        </>
      )}
    </div>
  );
};

export default PriceDisplay;
