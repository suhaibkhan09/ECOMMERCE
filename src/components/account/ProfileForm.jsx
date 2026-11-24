import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiSave, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { updateProfile } from '../../store/authSlice';
import toast from 'react-hot-toast';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+1 (555) 234-5678',
    birthday: user?.birthday || '1995-06-15',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
    toast.success('Profile details updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-5 pb-6 border-b border-gray-100 dark:border-gray-700">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary-600 to-accent-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
          {formData.name ? formData.name[0].toUpperCase() : 'U'}
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">
            {formData.name || 'User Profile'}
          </h3>
          <p className="text-xs text-gray-400">Personal details & contact preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field text-sm pl-10"
            />
            <FiMail className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-field text-sm pl-10"
            />
            <FiPhone className="absolute left-3.5 top-3 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Birthday
          </label>
          <input
            type="date"
            value={formData.birthday}
            onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
            className="input-field text-sm"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="btn-primary text-xs py-2.5 px-6 flex items-center gap-2 font-bold shadow-md"
        >
          <FiSave /> Save Profile Changes
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
