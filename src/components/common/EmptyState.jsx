import React from 'react';
import { Link } from 'react-router-dom';
import { FiPackage } from 'react-icons/fi';

const EmptyState = ({
  icon: Icon = FiPackage,
  title = 'No items found',
  description = 'Try adjusting your filters or check back later.',
  actionLabel,
  actionLink,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-primary-50 dark:bg-primary-950/40 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10" />
      </div>
      <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6 text-sm">
        {description}
      </p>
      {actionLabel && (actionLink ? (
        <Link to={actionLink} className="btn-primary">
          {actionLabel}
        </Link>
      ) : onAction ? (
        <button onClick={onAction} className="btn-primary">
          {actionLabel}
        </button>
      ) : null)}
    </div>
  );
};

export default EmptyState;
