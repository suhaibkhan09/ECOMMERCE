import React from 'react';
import { FiCheck, FiPackage, FiTruck, FiHome, FiClock } from 'react-icons/fi';
import { formatDate } from '../../utils/helpers';

const OrderTimeline = ({ timeline = [] }) => {
  const getIcon = (status) => {
    switch (status) {
      case 'placed':
        return FiClock;
      case 'confirmed':
      case 'processing':
        return FiPackage;
      case 'shipped':
      case 'in-transit':
        return FiTruck;
      case 'delivered':
        return FiHome;
      default:
        return FiCheck;
    }
  };

  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
      {timeline.map((item, idx) => {
        const Icon = getIcon(item.status);
        const isLatest = idx === timeline.length - 1;

        return (
          <div key={idx} className="relative flex items-start gap-4 group">
            <div
              className={`absolute -left-6 top-1 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors shadow-sm ${
                isLatest
                  ? 'bg-primary-600 text-white ring-4 ring-primary-500/20'
                  : 'bg-green-500 text-white'
              }`}
            >
              <Icon size={12} />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h5 className="font-bold text-sm text-gray-900 dark:text-white capitalize">
                  {item.status.replace('-', ' ')}
                </h5>
                <span className="text-xs text-gray-400">
                  {formatDate(item.date)}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
