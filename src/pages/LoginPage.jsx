import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { loginSuccess } from '../store/authSlice';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const from = location.state?.from?.pathname || '/';

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter your email and password');
      return;
    }

    // Mock Login
    const isAdmin = email.toLowerCase().includes('admin');
    const userPayload = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email,
      role: isAdmin ? 'admin' : 'customer',
      avatar: null,
      joinedAt: new Date().toISOString(),
    };

    dispatch(loginSuccess(userPayload));
    toast.success(`Welcome back, ${userPayload.name}!`);
    navigate(from, { replace: true });
  };

  const handleDemoAdmin = () => {
    setEmail('admin@luxecart.com');
    setPassword('AdminPassword123');
  };

  const handleDemoCustomer = () => {
    setEmail('suhaib.uber@gmail.com');
    setPassword('CustomerPass123');
  };

  return (
    <>
      <Helmet>
        <title>Sign In — LuxeCart</title>
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700">
          <div className="text-center">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white font-black text-xl shadow-md">
                L
              </div>
              <span className="font-display font-black text-2xl text-gray-900 dark:text-white">
                Luxe<span className="text-primary-600">Cart</span>
              </span>
            </Link>
            <h2 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
              Welcome back
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Sign in to manage your orders, wishlist, and profile
            </p>
          </div>

          {/* Quick Demo Logins Banner */}
          <div className="p-3 rounded-xl bg-primary-50 dark:bg-primary-950/30 border border-primary-100 dark:border-primary-900/30 text-xs flex justify-between items-center">
            <span className="text-primary-700 dark:text-primary-300 font-semibold">Demo Accounts:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleDemoCustomer}
                className="px-2 py-1 bg-white dark:bg-gray-800 rounded font-semibold text-primary-600 shadow-xs hover:underline"
              >
                Customer
              </button>
              <button
                type="button"
                onClick={handleDemoAdmin}
                className="px-2 py-1 bg-primary-600 text-white rounded font-semibold shadow-xs hover:bg-primary-700"
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary-600 hover:underline font-semibold"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field text-sm pl-10 pr-10"
                />
                <FiLock className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <span>Remember this device</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-3.5 font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <FiArrowRight />
            </button>
          </form>

          {/* Social Logins */}
          <div className="space-y-4 pt-2">
            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 dark:border-gray-700 w-full" />
              <span className="bg-white dark:bg-gray-800 px-3 text-xs text-gray-400 uppercase font-semibold">
                Or continue with
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleDemoCustomer}
                className="btn-secondary text-xs py-2.5 flex items-center justify-center gap-2"
              >
                <FaGoogle className="text-red-500" /> Google
              </button>
              <button
                type="button"
                onClick={handleDemoCustomer}
                className="btn-secondary text-xs py-2.5 flex items-center justify-center gap-2"
              >
                <FaApple /> Apple
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-2">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-primary-600 font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
