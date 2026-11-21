import React from 'react';
import { FiStar } from 'react-icons/fi';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { getStarArray } from '../../utils/helpers';

const Rating = ({ rating = 0, count, size = 'sm', showCount = true }) => {
  const { full, half, empty } = getStarArray(rating);

  const starSizes = {
    sm: 14,
    md: 18,
    lg: 22,
  };

  const iconSize = starSizes[size] || 14;

  return (
    <div className="inline-flex items-center gap-1.5" title={`${rating} out of 5 stars`}>
      <div className="flex items-center text-amber-400">
        {[...Array(full)].map((_, i) => (
          <FaStar key={`full-${i}`} size={iconSize} />
        ))}
        {half === 1 && <FaStarHalfAlt size={iconSize} />}
        {[...Array(empty)].map((_, i) => (
          <FiStar key={`empty-${i}`} size={iconSize} className="text-gray-300 dark:text-gray-600" />
        ))}
      </div>
      {showCount && (
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {rating.toFixed(1)} {count !== undefined && `(${count.toLocaleString()})`}
        </span>
      )}
    </div>
  );
};

export default Rating;
