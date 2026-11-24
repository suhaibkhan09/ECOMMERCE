import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import { register } from '../store/authSlice';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getPasswordStrength();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!agreed) {
      toast.error('Please agree to the Terms of Service to continue');
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      role: 'customer',
      avatar: null,
      joinedAt: new Date().toISOString(),
    };

    dispatch(register(newUser));
    toast.success(`Welcome to LuxeCart, ${name}!`);
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Create Account — LuxeCart</title>
      </Helmet>

      <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
              Create an account
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Join thousands of members enjoying premium shopping perks
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Smith"
                  className="input-field text-sm pl-10"
                />
                <FiUser className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="input-field text-sm pl-10"
                />
                <FiMail className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
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

              {/* Password Strength Indicator Bar */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1 h-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 rounded-full transition-all ${
                          strength >= level
                            ? level === 1
                              ? 'bg-red-500'
                              : level === 2
                              ? 'bg-amber-500'
                              : level === 3
                              ? 'bg-blue-500'
                              : 'bg-green-500'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 block text-right">
                    {strength <= 1 ? 'Weak' : strength <= 3 ? 'Medium' : 'Strong password'}
                  </span>
                </div>
              )}
            </div>

            <label className="flex items-start gap-2 cursor-pointer text-xs text-gray-600 dark:text-gray-400 pt-1">
              <input
                type="checkbox"
                required
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-primary-600 rounded"
              />
              <span>
                I agree to the{' '}
                <a href="#" className="text-primary-600 underline">Terms of Service</a> and{' '}
                <a href="#" className="text-primary-600 underline">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full btn-primary py-3.5 font-bold text-sm shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2"
            >
              <span>Create Account</span>
              <FiArrowRight />
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-bold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
