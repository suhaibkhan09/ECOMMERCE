import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiPlus, FiTag, FiTrash2, FiCheck } from 'react-icons/fi';
import Modal from '../../components/common/Modal';
import { coupons as initialCoupons } from '../../data/mockData';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

const CouponsPage = () => {
  const [couponsList, setCouponsList] = useState(initialCoupons);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discount: '',
    type: 'percentage',
    minOrder: 50,
    maxDiscount: 100,
    description: '',
    expiresAt: '2027-12-31',
  });

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;

    const item = {
      ...newCoupon,
      code: newCoupon.code.toUpperCase().trim(),
      discount: Number(newCoupon.discount),
      active: true,
    };

    setCouponsList([item, ...couponsList]);
    toast.success(`Coupon code ${item.code} created!`);
    setIsModalOpen(false);
    setNewCoupon({
      code: '',
      discount: '',
      type: 'percentage',
      minOrder: 50,
      maxDiscount: 100,
      description: '',
      expiresAt: '2027-12-31',
    });
  };

  const handleToggle = (code) => {
    setCouponsList(
      couponsList.map((c) => (c.code === code ? { ...c, active: !c.active } : c))
    );
    toast.success('Coupon status updated');
  };

  const handleDelete = (code) => {
    setCouponsList(couponsList.filter((c) => c.code !== code));
    toast.success('Coupon removed');
  };

  return (
    <>
      <Helmet>
        <title>Manage Coupons & Promo — Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
              Promotions & Coupons
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Create discount rules, promo codes, and minimum cart thresholds
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary text-xs py-2.5 px-4 flex items-center gap-2 font-bold"
          >
            <FiPlus /> Create New Promo Code
          </button>
        </div>

        {/* Coupons Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 uppercase font-bold text-gray-400">
              <tr>
                <th className="py-3.5 px-4">Coupon Code</th>
                <th className="py-3.5 px-4">Benefit</th>
                <th className="py-3.5 px-4">Min Spend</th>
                <th className="py-3.5 px-4">Valid Until</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {couponsList.map((c) => (
                <tr key={c.code} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="py-3 px-4 font-mono font-extrabold text-primary-600 text-sm">
                    {c.code}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800 dark:text-gray-200">
                    {c.type === 'percentage'
                      ? `${c.discount}% OFF (up to ${formatPrice(c.maxDiscount)})`
                      : c.type === 'shipping'
                      ? 'FREE Shipping'
                      : `${formatPrice(c.discount)} Flat Discount`}
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {formatPrice(c.minOrder)}
                  </td>
                  <td className="py-3 px-4 text-gray-400 font-mono text-[11px]">
                    {c.expiresAt}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggle(c.code)}
                      className={`badge cursor-pointer ${
                        c.active ? 'badge-success' : 'badge-danger'
                      }`}
                    >
                      {c.active ? 'Active' : 'Disabled'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(c.code)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded"
                      title="Delete coupon"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create Discount Coupon"
        >
          <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                Coupon Code *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. VIP25"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                className="input-field uppercase font-mono font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Discount Type
                </label>
                <select
                  value={newCoupon.type}
                  onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value })}
                  className="input-field"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="fixed">Fixed Dollar ($)</option>
                  <option value="shipping">Free Shipping</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Discount Value *
                </label>
                <input
                  type="number"
                  required
                  placeholder="20"
                  value={newCoupon.discount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                  className="input-field"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Min Order Spend ($)
                </label>
                <input
                  type="number"
                  value={newCoupon.minOrder}
                  onChange={(e) => setNewCoupon({ ...newCoupon, minOrder: Number(e.target.value) })}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Max Discount Cap ($)
                </label>
                <input
                  type="number"
                  value={newCoupon.maxDiscount}
                  onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscount: Number(e.target.value) })}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                Description / Benefit
              </label>
              <input
                type="text"
                placeholder="e.g. 25% off storewide"
                value={newCoupon.description}
                onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                className="input-field"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn-secondary py-2 px-4"
              >
                Cancel
              </button>
              <button type="submit" className="btn-primary py-2 px-5 font-bold">
                Save Coupon
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default CouponsPage;
