import React from 'react';
import { FiCreditCard, FiLock, FiShield } from 'react-icons/fi';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa';

const PaymentForm = ({ data, onChange, onNext, onBack }) => {
  const method = data.paymentMethod || 'card';

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Payment Method Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'card', name: 'Credit Card', icon: FiCreditCard },
          { id: 'paypal', name: 'PayPal', icon: FaPaypal },
          { id: 'apple', name: 'Apple Pay', icon: FaApplePay },
          { id: 'google', name: 'Google Pay', icon: FaGooglePay },
        ].map((item) => {
          const Icon = item.icon;
          const active = method === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange({ ...data, paymentMethod: item.id })}
              className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                active
                  ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/20 text-primary-600 font-bold'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Credit Card Form */}
      {method === 'card' && (
        <div className="space-y-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Card Information
            </span>
            <div className="flex gap-2 text-xl text-gray-400">
              <FaCcVisa className="hover:text-blue-500" />
              <FaCcMastercard className="hover:text-red-500" />
              <FaCcAmex className="hover:text-blue-400" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Cardholder Name *
            </label>
            <input
              type="text"
              required
              value={data.cardName || ''}
              onChange={(e) => onChange({ ...data, cardName: e.target.value })}
              className="input-field text-sm"
              placeholder="JOHN DOE"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Card Number *
            </label>
            <input
              type="text"
              required
              maxLength="19"
              value={data.cardNumber || ''}
              onChange={(e) => {
                const val = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                onChange({ ...data, cardNumber: formatted });
              }}
              className="input-field text-sm font-mono"
              placeholder="4242 •••• •••• 4242"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                Expiration (MM/YY) *
              </label>
              <input
                type="text"
                required
                maxLength="5"
                value={data.cardExpiry || ''}
                onChange={(e) => onChange({ ...data, cardExpiry: e.target.value })}
                className="input-field text-sm font-mono"
                placeholder="12/28"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                CVV / CVC *
              </label>
              <input
                type="password"
                required
                maxLength="4"
                value={data.cardCvv || ''}
                onChange={(e) => onChange({ ...data, cardCvv: e.target.value })}
                className="input-field text-sm font-mono"
                placeholder="•••"
              />
            </div>
          </div>
        </div>
      )}

      {method !== 'card' && (
        <div className="p-8 text-center bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-800">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            You will be redirected to complete payment with {method.toUpperCase()} securely.
          </p>
          <span className="text-xs text-gray-400">
            No payment will be collected until you review on the next screen.
          </span>
        </div>
      )}

      {/* Security Guarantee */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <FiLock className="text-primary-600" />
        <span>Your payment information is encrypted and never stored on our servers.</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          className="btn-secondary w-1/3 py-3 font-semibold text-sm"
        >
          Back
        </button>
        <button
          type="submit"
          className="btn-primary flex-1 py-3 font-bold text-sm shadow-lg shadow-primary-500/20"
        >
          Review Order
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
