import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiMail, FiCheckCircle, FiArrowLeft } from 'react-icons/fi';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password — LuxeCart</title>
      </Helmet>

      <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 text-center">
          {submitted ? (
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/40 text-green-600 dark:text-green-400 mx-auto flex items-center justify-center">
                <FiCheckCircle size={32} />
              </div>
              <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
                Check your inbox
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto leading-relaxed">
                If an account exists for <span className="font-semibold text-gray-800 dark:text-gray-200">{email}</span>, we've sent instructions on how to reset your password.
              </p>
              <div className="pt-4">
                <Link
                  to="/login"
                  className="btn-primary inline-flex items-center gap-2 text-xs py-2.5 px-6 font-bold"
                >
                  <FiArrowLeft /> Return to Sign In
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white mb-2">
                  Forgot your password?
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Enter your registered email address and we'll send you a secure recovery link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="input-field text-sm pl-10"
                    />
                    <FiMail className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary py-3 font-bold text-sm shadow-md"
                >
                  Send Reset Link
                </button>
              </form>

              <div className="pt-2">
                <Link
                  to="/login"
                  className="text-xs text-primary-600 font-semibold hover:underline inline-flex items-center gap-1.5"
                >
                  <FiArrowLeft /> Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
