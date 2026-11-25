import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleCustomizerModal } from '../../store/themeSlice';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiCheckCircle,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiLock,
  FiSliders,
} from 'react-icons/fi';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcPaypal,
  FaCcApplePay,
} from 'react-icons/fa';

const Footer = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 border-t border-gray-800">
      {/* Guarantees / Value Proposition Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/40">
            <div className="w-12 h-12 rounded-lg bg-primary-600/20 text-primary-400 flex items-center justify-center shrink-0">
              <FiTruck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Free Express Shipping</h4>
              <p className="text-xs text-gray-400 mt-0.5">On all orders over $100</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/40">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
              <FiShield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">2-Year Warranty</h4>
              <p className="text-xs text-gray-400 mt-0.5">100% genuine guaranteed</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/40">
            <div className="w-12 h-12 rounded-lg bg-accent-500/20 text-accent-400 flex items-center justify-center shrink-0">
              <FiRefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">30-Day Free Returns</h4>
              <p className="text-xs text-gray-400 mt-0.5">Hassle-free return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/40">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <FiLock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Secure Checkout</h4>
              <p className="text-xs text-gray-400 mt-0.5">256-bit SSL encryption</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Bio */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-accent-500 flex items-center justify-center text-white font-black text-xl shadow-md">
                L
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                Luxe<span className="text-primary-500">Cart</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              Discover a curated collection of world-class products. We bring together modern design, exceptional quality, and an unforgettable shopping experience.
            </p>
            <div className="flex items-center space-x-3 text-gray-400">
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-colors" aria-label="Facebook">
                <FaFacebookF size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors" aria-label="Twitter">
                <FaTwitter size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors" aria-label="Instagram">
                <FaInstagram size={14} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors" aria-label="YouTube">
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wider uppercase mb-5 font-display">
              Shop
            </h5>
            <ul className="space-y-3 text-sm">
              <li><Link to="/products" className="hover:text-primary-400 transition-colors">All Products</Link></li>
              <li><Link to="/products?featured=true" className="hover:text-primary-400 transition-colors">Featured Collection</Link></li>
              <li><Link to="/products?new=true" className="hover:text-primary-400 transition-colors">New Arrivals</Link></li>
              <li><Link to="/products?sale=true" className="hover:text-primary-400 transition-colors">Special Offers</Link></li>
              <li><Link to="/category/electronics" className="hover:text-primary-400 transition-colors">Electronics</Link></li>
              <li><Link to="/category/clothing" className="hover:text-primary-400 transition-colors">Fashion & Apparel</Link></li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wider uppercase mb-5 font-display">
              Support
            </h5>
            <ul className="space-y-3 text-sm">
              <li><Link to="/orders" className="hover:text-primary-400 transition-colors">Track Your Order</Link></li>
              <li><Link to="/account" className="hover:text-primary-400 transition-colors">Your Account</Link></li>
              <li><Link to="/wishlist" className="hover:text-primary-400 transition-colors">Saved Wishlist</Link></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Shipping Rates & Policies</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Returns & Replacements</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Help Center & FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h5 className="text-white font-bold text-sm tracking-wider uppercase mb-5 font-display">
              Newsletter
            </h5>
            <p className="text-xs text-gray-400 mb-4 leading-relaxed">
              Subscribe to get exclusive early access to secret sales, product drops, and discount codes.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-900/30 text-green-400 border border-green-800 text-xs">
                <FiCheckCircle className="w-5 h-5 shrink-0" />
                <span>You're in! Check your inbox for your 10% coupon.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-primary py-2.5 text-xs flex items-center justify-center gap-2 font-semibold"
                >
                  <FiSend /> Subscribe Now
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-8 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <p>© {new Date().getFullYear()} LuxeCart Inc. All rights reserved.</p>
            <button
              onClick={() => dispatch(toggleCustomizerModal(true))}
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-colors font-medium border-l border-gray-800 pl-4"
            >
              <FiSliders className="w-3.5 h-3.5" />
              <span>Theme & Accessibility</span>
            </button>
          </div>
          <div className="flex items-center space-x-4 text-2xl text-gray-400">
            <FaCcVisa className="hover:text-white transition-colors" title="Visa" />
            <FaCcMastercard className="hover:text-white transition-colors" title="Mastercard" />
            <FaCcAmex className="hover:text-white transition-colors" title="American Express" />
            <FaCcPaypal className="hover:text-white transition-colors" title="PayPal" />
            <FaCcApplePay className="hover:text-white transition-colors" title="Apple Pay" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
