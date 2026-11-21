import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiZap } from 'react-icons/fi';
import ProductCard from '../product/ProductCard';
import { flashDeals, products } from '../../data/mockData';
import { getCountdown } from '../../utils/helpers';

const FlashDeals = () => {
  const [timeLeft, setTimeLeft] = useState(() => getCountdown(flashDeals[0]?.endsAt));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getCountdown(flashDeals[0]?.endsAt));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = flashDeals
    .map((deal) => {
      const p = products.find((prod) => prod.id === deal.productId);
      if (!p) return null;
      return {
        ...p,
        discount: p.discount + deal.extraDiscount,
        price: p.price * (1 - deal.extraDiscount / 100),
      };
    })
    .filter(Boolean);

  return (
    <section className="py-12 my-6 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-accent-500/10 via-primary-500/10 to-transparent border border-accent-500/20">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-500 text-white text-xs font-bold uppercase tracking-wider mb-2">
            <FiZap /> Limited Time Offers
          </div>
          <h2 className="section-title">Flash Deals of the Day</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Grab extra discounts before the timer strikes zero!
          </p>
        </div>

        {/* Countdown Box */}
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2.5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <FiClock className="text-accent-500 w-5 h-5 shrink-0" />
          <div className="flex items-center gap-1.5 font-mono font-bold text-sm text-gray-900 dark:text-white">
            <span className="w-7 h-7 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="w-7 h-7 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span>:</span>
            <span className="w-7 h-7 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-accent-500">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {dealProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};

export default FlashDeals;
