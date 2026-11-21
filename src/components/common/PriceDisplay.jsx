import React from 'react';
import { formatPrice } from '../../utils/helpers';

const PriceDisplay = ({ price, originalPrice, discount, size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-sm font-semibold',
    md: 'text-lg font-bold',
    lg: 'text-2xl font-bold md:text-3xl',
  };

  const hasDiscount = discount > 0 || (originalPrice && originalPrice > price);

  return (
    <div className="flex items-center flex-wrap gap-2">
      <span className={`${sizeClasses[size]} text-gray-900 dark:text-white`}>
        {formatPrice(price)}
      </span>
      {hasDiscount && (
        <>
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(originalPrice || price * (1 + discount / 100))}
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
