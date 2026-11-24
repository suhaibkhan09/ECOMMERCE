import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiPlus, FiTrash2, FiEdit2, FiCheck, FiMapPin } from 'react-icons/fi';
import Modal from '../common/Modal';
import { addAddress, removeAddress, setDefaultAddress } from '../../store/authSlice';
import toast from 'react-hot-toast';

const AddressBook = () => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.auth.addresses || []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddr, setNewAddr] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: '',
    isDefault: false,
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.name || !newAddr.street || !newAddr.city) {
      toast.error('Please fill required fields');
      return;
    }
    dispatch(addAddress({ ...newAddr, id: `addr-${Date.now()}` }));
    toast.success('Address added successfully!');
    setIsModalOpen(false);
    setNewAddr({
      name: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      country: 'US',
      phone: '',
      isDefault: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
            Saved Addresses
          </h3>
          <p className="text-xs text-gray-400">Manage delivery locations for quick checkout</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary text-xs py-2 px-3.5 flex items-center gap-1.5"
        >
          <FiPlus /> Add Address
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              addr.isDefault
                ? 'border-primary-500 bg-primary-50/20 dark:bg-primary-950/20 shadow-sm'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1.5">
                  <FiMapPin className="text-primary-600" /> {addr.name}
                </span>
                {addr.isDefault && (
                  <span className="badge badge-primary text-[10px]">Default</span>
                )}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {addr.street}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {addr.city}, {addr.state} {addr.zip}
              </p>
              <p className="text-xs text-gray-400 mt-2">{addr.phone}</p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100 dark:border-gray-700 text-xs">
              {!addr.isDefault ? (
                <button
                  onClick={() => {
                    dispatch(setDefaultAddress(addr.id));
                    toast.success('Set as default address');
                  }}
                  className="text-primary-600 hover:underline font-semibold"
                >
                  Set as Default
                </button>
              ) : (
                <span className="text-gray-400 italic">Primary address</span>
              )}

              <button
                onClick={() => {
                  dispatch(removeAddress(addr.id));
                  toast.success('Address removed');
                }}
                className="text-red-500 hover:text-red-700 p-1"
                title="Delete"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Delivery Address"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Contact / Location Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Home or John Doe"
              value={newAddr.name}
              onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })}
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Street Address *
            </label>
            <input
              type="text"
              required
              placeholder="123 Main St, Apt 4"
              value={newAddr.street}
              onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
              className="input-field text-sm"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                City *
              </label>
              <input
                type="text"
                required
                value={newAddr.city}
                onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                State *
              </label>
              <input
                type="text"
                required
                value={newAddr.state}
                onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                className="input-field text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                ZIP Code *
              </label>
              <input
                type="text"
                required
                value={newAddr.zip}
                onChange={(e) => setNewAddr({ ...newAddr, zip: e.target.value })}
                className="input-field text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={newAddr.phone}
              onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
              className="input-field text-sm"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300 pt-1">
            <input
              type="checkbox"
              checked={newAddr.isDefault}
              onChange={(e) => setNewAddr({ ...newAddr, isDefault: e.target.checked })}
              className="w-4 h-4 text-primary-600 rounded"
            />
            <span>Set as default address</span>
          </label>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="btn-secondary text-xs py-2 px-4"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs py-2 px-5 font-bold">
              Save Address
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddressBook;
