import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiTrendingUp,
  FiActivity,
} from 'react-icons/fi';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { analyticsData } from '../../data/mockData';
import { formatPrice } from '../../utils/helpers';

const DashboardPage = () => {
  const stats = [
    {
      title: 'Gross Revenue',
      value: formatPrice(analyticsData.revenue.total),
      change: `+${analyticsData.revenue.change}%`,
      icon: FiDollarSign,
      color: 'text-green-500 bg-green-500/10',
    },
    {
      title: 'Total Orders',
      value: analyticsData.orders.total.toLocaleString(),
      change: '+14.2%',
      icon: FiShoppingBag,
      color: 'text-primary-500 bg-primary-500/10',
    },
    {
      title: 'Active Customers',
      value: analyticsData.customers.total.toLocaleString(),
      change: `+${analyticsData.customers.change}%`,
      icon: FiUsers,
      color: 'text-accent-500 bg-accent-500/10',
    },
    {
      title: 'Pending Fulfillment',
      value: analyticsData.orders.processing.toString(),
      change: 'Active',
      icon: FiPackage,
      color: 'text-amber-500 bg-amber-500/10',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard — LuxeCart</title>
      </Helmet>

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-gray-900 dark:text-white">
            Performance Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real-time analytics, revenue trajectory, and store operations
          </p>
        </div>

        {/* 4 Top KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-black font-display text-gray-900 dark:text-white mt-1">
                    {stat.value}
                  </h3>
                  <span className="text-xs font-bold text-green-500 flex items-center gap-1 mt-1">
                    <FiTrendingUp /> {stat.change} vs last month
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-base text-gray-900 dark:text-white">
                  Monthly Revenue Trajectory
                </h3>
                <p className="text-xs text-gray-400">Gross sales performance over the past 12 months</p>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData.revenue.monthly}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4c6ef5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4c6ef5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="month" stroke="#888" fontSize={11} />
                  <YAxis stroke="#888" fontSize={11} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip
                    formatter={(val) => [formatPrice(val), 'Revenue']}
                    contentStyle={{ backgroundColor: '#1f2937', borderRadius: '12px', border: 'none', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#4c6ef5" strokeWidth={3} fillOpacity={1} fill="url(#revenueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution Bar Chart */}
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
              Sales by Category
            </h3>
            <p className="text-xs text-gray-400 mb-6">Volume share across categories</p>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData.categoryDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis type="number" stroke="#888" fontSize={11} unit="%" />
                  <YAxis dataKey="category" type="category" stroke="#888" fontSize={11} width={80} />
                  <Tooltip
                    formatter={(val) => [`${val}%`, 'Share']}
                    contentStyle={{ backgroundColor: '#1f2937', borderRadius: '12px', border: 'none', color: '#fff' }}
                  />
                  <Bar dataKey="value" fill="#fb8c00" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Lists: Top Selling Products & Store Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Products */}
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <h3 className="font-bold text-base text-gray-900 dark:text-white mb-4">
              Top Selling Products
            </h3>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {analyticsData.topProducts.map((p, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">
                      {p.name}
                    </p>
                    <p className="text-gray-400">{p.sold} units sold</p>
                  </div>
                  <span className="font-extrabold text-sm text-primary-600">
                    {formatPrice(p.revenue)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Activity Stream */}
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <FiActivity className="text-primary-500" />
              <h3 className="font-bold text-base text-gray-900 dark:text-white">
                Live Store Activity
              </h3>
            </div>
            <div className="space-y-4">
              {analyticsData.recentActivity.map((act, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs p-3 rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {act.message}
                  </span>
                  <span className="text-gray-400 font-mono text-[11px] shrink-0 ml-3">
                    {act.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
