import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiSearch, FiMail, FiCalendar, FiShoppingBag } from 'react-icons/fi';
import { formatPrice } from '../../utils/helpers';

const CustomersPage = () => {
  const [search, setSearch] = useState('');

  const mockCustomers = [
    { id: 'c-1', name: 'Suhaib Khan', email: 'suhaib.uber@gmail.com', totalOrders: 5, spent: 4850.00, joined: '2024-01-15' },
    { id: 'c-2', name: 'Sarah Miller', email: 'sarah.m@example.com', totalOrders: 3, spent: 1290.50, joined: '2024-02-10' },
    { id: 'c-3', name: 'James Wilson', email: 'j.wilson@example.com', totalOrders: 8, spent: 6320.00, joined: '2023-11-20' },
    { id: 'c-4', name: 'Emily Davis', email: 'emily.d@example.com', totalOrders: 2, spent: 420.00, joined: '2024-03-01' },
    { id: 'c-5', name: 'Michael Chen', email: 'mchen@example.com', totalOrders: 6, spent: 3410.20, joined: '2024-01-28' },
    { id: 'c-6', name: 'Olivia Taylor', email: 'olivia.t@example.com', totalOrders: 4, spent: 2190.00, joined: '2024-02-14' },
  ];

  const filtered = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Customer Directory — Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
            Customer Directory
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Registered accounts, lifetime customer spend, and engagement
          </p>
        </div>

        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by customer name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field text-xs pl-9"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 uppercase font-bold text-gray-400">
              <tr>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Total Orders</th>
                <th className="py-3.5 px-4">Lifetime Spend</th>
                <th className="py-3.5 px-4 text-right">Member Since</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.map((cust) => (
                <tr key={cust.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-950/50 text-primary-600 font-bold flex items-center justify-center text-xs">
                      {cust.name[0]}
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {cust.name}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {cust.email}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">
                    {cust.totalOrders} orders
                  </td>
                  <td className="py-3 px-4 font-bold text-green-600 dark:text-green-400">
                    {formatPrice(cust.spent)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-400">
                    {cust.joined}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CustomersPage;
