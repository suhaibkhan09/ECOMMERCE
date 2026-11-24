import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiAlertTriangle } from 'react-icons/fi';
import Modal from '../../components/common/Modal';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

const ProductsManagement = () => {
  const initialProducts = useSelector((state) => state.products.items);
  const [productList, setProductList] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    category: 'electronics',
    price: '',
    stock: 50,
  });

  const filtered = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Delete this product from catalog?')) {
      setProductList(productList.filter((p) => p.id !== id));
      toast.success('Product deleted');
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const item = {
      id: `prod-${Date.now()}`,
      slug: newProduct.name.toLowerCase().replace(/\s+/g, '-'),
      images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600'],
      rating: 5.0,
      reviewCount: 0,
      description: 'Newly added store product.',
      discount: 0,
      ...newProduct,
      price: Number(newProduct.price),
    };
    setProductList([item, ...productList]);
    toast.success('Product added to catalog!');
    setIsModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Manage Products — Admin</title>
      </Helmet>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-gray-900 dark:text-white">
              Inventory & Products
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Manage {productList.length} products in your store
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary text-xs py-2.5 px-4 flex items-center gap-2 font-bold"
          >
            <FiPlus /> Add New Product
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search products by title or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field text-xs pl-9"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
        </div>

        {/* Products Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700 uppercase font-bold text-gray-400">
              <tr>
                <th className="py-3.5 px-4">Item</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Stock Level</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filtered.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white max-w-xs truncate">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-gray-400">{product.brand}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 capitalize font-medium text-gray-500">
                    {product.category}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">
                    {formatPrice(product.price)}
                  </td>
                  <td className="py-3 px-4">
                    {product.stock < 15 ? (
                      <span className="badge badge-danger text-[10px] flex items-center gap-1 w-max">
                        <FiAlertTriangle /> Low ({product.stock})
                      </span>
                    ) : (
                      <span className="badge badge-success text-[10px]">
                        {product.stock} units
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded"
                      title="Delete product"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Create Product Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create New Product"
        >
          <form onSubmit={handleCreate} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                className="input-field"
                placeholder="e.g. Wireless Noise Canceling Headphones"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  className="input-field"
                  placeholder="e.g. Bose"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="input-field"
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="shoes">Shoes</option>
                  <option value="accessories">Accessories</option>
                  <option value="home">Home & Living</option>
                  <option value="sports">Sports</option>
                  <option value="beauty">Beauty</option>
                  <option value="books">Books</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="input-field"
                  placeholder="99.99"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Initial Stock Units *
                </label>
                <input
                  type="number"
                  required
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                  className="input-field"
                  placeholder="50"
                />
              </div>
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
                Save Product
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default ProductsManagement;
