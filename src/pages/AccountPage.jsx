import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FiUser, FiMapPin, FiPackage, FiHeart, FiSettings } from 'react-icons/fi';
import ProfileForm from '../components/account/ProfileForm';
import AddressBook from '../components/account/AddressBook';
import Breadcrumb from '../components/common/Breadcrumb';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const user = useSelector((state) => state.auth.user);

  const tabs = [
    { id: 'profile', label: 'My Profile', icon: FiUser },
    { id: 'addresses', label: 'Address Book', icon: FiMapPin },
  ];

  return (
    <>
      <Helmet>
        <title>My Account — LuxeCart</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Account' }]} />

        <div className="mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
          <h1 className="text-3xl font-extrabold font-display text-gray-900 dark:text-white">
            Account Settings
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage your personal details, shipping addresses, and account security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Navigation Sidebar Tabs */}
          <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-3 shadow-sm space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                    active
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div className="md:col-span-3 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-6 sm:p-10 shadow-sm">
            {activeTab === 'profile' && <ProfileForm />}
            {activeTab === 'addresses' && <AddressBook />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
