import React from 'react';
import { useSelector } from 'react-redux';
import { FiCheck, FiTruck } from 'react-icons/fi';

const ShippingForm = ({ data, onChange, onNext }) => {
  const addresses = useSelector((state) => state.auth.addresses || []);

  const handleSavedAddressClick = (addr) => {
    onChange({
      ...data,
      firstName: addr.name.split(' ')[0] || '',
      lastName: addr.name.split(' ').slice(1).join(' ') || '',
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country,
      phone: addr.phone,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Saved Addresses Shortcut */}
      {addresses.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">
            Use a Saved Address
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                onClick={() => handleSavedAddressClick(addr)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  data.street === addr.street
                    ? 'border-primary-600 bg-primary-50/50 dark:bg-primary-950/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-gray-900 dark:text-white">
                    {addr.name}
                  </span>
                  {data.street === addr.street && (
                    <FiCheck className="text-primary-600" />
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {addr.street}, {addr.city}, {addr.state} {addr.zip}
                </p>
                <p className="text-xs text-gray-400 mt-1">{addr.phone}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manual Input Fields */}
      <div className="space-y-4">
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">
          Delivery Address Details
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              First Name *
            </label>
            <input
              type="text"
              required
              value={data.firstName || ''}
              onChange={(e) => onChange({ ...data, firstName: e.target.value })}
              className="input-field text-sm"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              required
              value={data.lastName || ''}
              onChange={(e) => onChange({ ...data, lastName: e.target.value })}
              className="input-field text-sm"
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={data.email || ''}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              className="input-field text-sm"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={data.phone || ''}
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
              className="input-field text-sm"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Street Address *
          </label>
          <input
            type="text"
            required
            value={data.street || ''}
            onChange={(e) => onChange({ ...data, street: e.target.value })}
            className="input-field text-sm"
            placeholder="123 Market Street, Apt 4B"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              City *
            </label>
            <input
              type="text"
              required
              value={data.city || ''}
              onChange={(e) => onChange({ ...data, city: e.target.value })}
              className="input-field text-sm"
              placeholder="San Francisco"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              State / Province *
            </label>
            <input
              type="text"
              required
              value={data.state || ''}
              onChange={(e) => onChange({ ...data, state: e.target.value })}
              className="input-field text-sm"
              placeholder="CA"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Postal / ZIP Code *
            </label>
            <input
              type="text"
              required
              value={data.zip || ''}
              onChange={(e) => onChange({ ...data, zip: e.target.value })}
              className="input-field text-sm"
              placeholder="94103"
            />
          </div>
        </div>
      </div>

      {/* Shipping Method Selection */}
      <div className="border-t border-gray-100 dark:border-gray-700 pt-6 space-y-3">
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">
          Shipping Method
        </h4>
        <div className="space-y-2">
          {[
            { id: 'standard', name: 'Standard Delivery (3-5 business days)', price: 'FREE' },
            { id: 'express', name: 'Express Courier (1-2 business days)', price: '$9.99' },
            { id: 'overnight', name: 'Priority Overnight (Next Morning)', price: '$19.99' },
          ].map((method) => (
            <label
              key={method.id}
              className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-colors ${
                (data.shippingMethod || 'standard') === method.id
                  ? 'border-primary-600 bg-primary-50/40 dark:bg-primary-950/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="shippingMethod"
                  value={method.id}
                  checked={(data.shippingMethod || 'standard') === method.id}
                  onChange={() => onChange({ ...data, shippingMethod: method.id })}
                  className="text-primary-600"
                />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {method.name}
                </span>
              </div>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {method.price}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Continue CTA */}
      <div className="pt-4">
        <button
          type="submit"
          className="btn-primary w-full py-3.5 font-bold text-sm shadow-lg shadow-primary-500/20"
        >
          Continue to Payment
        </button>
      </div>
    </form>
  );
};

export default ShippingForm;
