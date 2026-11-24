import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiHome, FiSearch } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found — LuxeCart</title>
      </Helmet>

      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <span className="text-8xl sm:text-9xl font-black font-display gradient-text select-none">
          404
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 dark:text-white mt-4 mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          The page you're trying to visit doesn't exist, has been removed, or was relocated.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="btn-primary py-3 px-6 flex items-center justify-center gap-2 text-xs font-bold"
          >
            <FiHome /> Back to Homepage
          </Link>
          <Link
            to="/products"
            className="btn-secondary py-3 px-6 flex items-center justify-center gap-2 text-xs font-bold"
          >
            <FiSearch /> Browse All Products
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
