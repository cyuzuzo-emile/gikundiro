import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Image } from 'lucide-react';
import { newsAPI } from '../../services/api';

const empty = { title: '', category: 'General', content: '' };
const API_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(empty);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchNews(); }, []);

  const fetchNews = async () => {
    try { const res = await newsAPI.getAll(); setNews(res.data); }
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
      fd.append('title', formData.title);
      fd.append('category', formData.category);
      fd.append('content', formData.content);
      if (imageFile) fd.append('image', imageFile);

      if (formData.id) { await newsAPI.update(formData.id, fd); }
      else { await newsAPI.create(fd); }

      fetchNews(); setShowModal(false); setFormData(empty);
      setImageFile(null); setImagePreview(null);
    } catch (e) { alert(e.response?.data?.message || 'Error saving article'); }
  };

  const handleEdit = (item) => {
    setFormData({ ...item });
    setImagePreview(item.image ? `${API_URL}${item.image}` : null);
    setImageFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article?')) return;
    try { await newsAPI.delete(id); fetchNews(); }
    catch (e) { alert('Error deleting article'); }
  };

  const filtered = news.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">Manage <span className="text-accent">News</span></h1>
          <p className="text-gray-400 mt-2">Create, edit, and publish news articles</p>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type="text" placeholder="Search news..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-10" />
            </div>
            <button onClick={() => { setFormData(empty); setImageFile(null); setImagePreview(null); setShowModal(true); }} className="btn-primary flex items-center">
              <Plus className="w-5 h-5 mr-2" /> Add Article
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
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Title</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Category</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Date</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filtered.map((item) => (
                      <tr key={item.id} className="hover:bg-surface-light transition-colors">
                        <td className="px-6 py-4">
                          {item.image
                            ? <img src={`${API_URL}${item.image}`} alt={item.title} className="w-16 h-12 object-cover rounded" />
                            : <div className="w-16 h-12 bg-surface-light rounded flex items-center justify-center"><Image className="w-5 h-5 text-gray-500" /></div>
                          }
                        </td>
                        <td className="px-6 py-4 text-white font-medium">{item.title}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-full">{item.category}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{new Date(item.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-center">
                          <button onClick={() => handleEdit(item)} className="text-secondary hover:text-accent mr-3"><Edit className="w-5 h-5" /></button>
                          <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400"><Trash2 className="w-5 h-5" /></button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500">No articles found</td></tr>}
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
          <div className="relative bg-surface rounded-xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X className="w-6 h-6" /></button>
            <h2 className="text-2xl font-heading font-bold text-white mb-6">{formData.id ? 'Edit Article' : 'Add New Article'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field">
                  <option>Announcement</option>
                  <option>Match Report</option>
                  <option>Transfer</option>
                  <option>General</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Content</label>
                <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="input-field resize-none" rows="6" required></textarea>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Featured Image</label>
                <div
                  onClick={() => document.getElementById('newsImageInput').click()}
                  className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center cursor-pointer hover:border-secondary transition-colors"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded" />
                  ) : (
                    <div className="py-4">
                      <Image className="w-10 h-10 mx-auto text-gray-500 mb-2" />
                      <p className="text-gray-400 text-sm">Click to upload image</p>
                    </div>
                  )}
                </div>
                <input id="newsImageInput" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>
              <button type="submit" className="btn-primary w-full">{formData.id ? 'Update Article' : 'Publish Article'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;
