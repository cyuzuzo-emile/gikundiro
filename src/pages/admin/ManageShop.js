import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Camera } from 'lucide-react';
import { shopAPI } from '../../services/api';

const empty = { name: '', category: 'Jerseys', price: '', description: '', in_stock: true };
const categories = ['Jerseys', 'Scarves', 'Hats', 'Accessories', 'Tickets'];
const API_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

const ManageShop = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(empty);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try { const res = await shopAPI.getProducts(); setProducts(res.data || []); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (k !== 'id' && k !== 'image' && v !== null && v !== undefined) fd.append(k, v);
      });
      if (imageFile) fd.append('image', imageFile);

      if (formData.id) { await shopAPI.updateProduct(formData.id, fd); }
      else { await shopAPI.createProduct(fd); }

      fetchProducts(); setShowModal(false); setFormData(empty);
      setImageFile(null); setImagePreview(null);
    } catch (e) { alert(e.response?.data?.message || 'Error saving product'); }
  };

  const handleEdit = (product) => {
    setFormData({ ...product });
    setImagePreview(product.image?.startsWith('http') ? product.image : product.image ? `${API_URL}${product.image}` : null);
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try { await shopAPI.deleteProduct(id); fetchProducts(); }
    catch (e) { alert('Error deleting product'); }
  };

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">Manage <span className="text-accent">Shop</span></h1>
          <p className="text-gray-400 mt-2">Add, edit, or remove products from the shop</p>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-10" />
            </div>
            <button onClick={() => { setFormData(empty); setImageFile(null); setImagePreview(null); setShowModal(true); }} className="btn-primary flex items-center gap-2">
              <Plus className="w-5 h-5" /> Add Product
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div></div>
          ) : (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-light">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Image</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Name</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Category</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Price (RWF)</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Stock</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filtered.map((product) => (
                      <tr key={product._id || product.id} className="hover:bg-surface-light transition-colors">
                        <td className="px-6 py-4">
                          {product.image
                            ? <img src={product.image?.startsWith('http') ? product.image : `${API_URL}${product.image}`} alt={product.name} className="w-14 h-14 rounded-lg object-cover" />
                            : <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center"><Camera className="w-5 h-5 text-white" /></div>
                          }
                        </td>
                        <td className="px-6 py-4 text-white font-medium">{product.name}</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-primary/30 text-accent rounded-full text-sm">{product.category}</span></td>
                        <td className="px-6 py-4 text-white font-bold">{Number(product.price).toLocaleString()}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.in_stock ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                            {product.in_stock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button onClick={() => handleEdit(product)} className="text-secondary hover:text-accent mr-3"><Edit className="w-5 h-5" /></button>
                          <button onClick={() => handleDelete(product._id || product.id)} className="text-red-500 hover:text-red-400"><Trash2 className="w-5 h-5" /></button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan="6" className="px-6 py-12 text-center text-gray-500">No products found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-surface rounded-xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-heading font-bold text-white mb-6">{formData.id ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Image Upload */}
              <div className="flex flex-col items-center">
                <label className="block text-gray-400 mb-2">Product Image</label>
                <div onClick={() => document.getElementById('productImageInput').click()} className="w-32 h-32 rounded-xl overflow-hidden border-4 border-gray-600 cursor-pointer hover:border-accent transition-colors bg-surface-light flex items-center justify-center">
                  {imagePreview
                    ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    : <div className="flex flex-col items-center text-gray-500"><Camera className="w-8 h-8" /><span className="text-xs mt-1">Upload</span></div>
                  }
                </div>
                <input id="productImageInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Product Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field">
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Price (RWF)</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="input-field" required />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field resize-none" rows="3" />
              </div>

              <div className="flex items-center gap-3">
                <input type="checkbox" id="inStock" checked={formData.in_stock} onChange={(e) => setFormData({ ...formData, in_stock: e.target.checked })} className="w-5 h-5 accent-primary" />
                <label htmlFor="inStock" className="text-gray-400">In Stock</label>
              </div>

              <button type="submit" className="btn-primary w-full">{formData.id ? 'Update Product' : 'Add Product'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageShop;
