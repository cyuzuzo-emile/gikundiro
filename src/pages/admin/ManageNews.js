import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, X, Image } from 'lucide-react';

const ManageNews = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [news, setNews] = useState([
    { id: 1, title: 'Rayon Sports Clinch Historic Victory', category: 'Match Report', date: '2024-03-08', author: 'Admin' },
    { id: 2, title: 'New Signing: Welcome to the Club', category: 'Transfer', date: '2024-03-05', author: 'Admin' },
    { id: 3, title: 'Match Day Preview: Rayon vs Amazulu', category: 'Announcement', date: '2024-03-02', author: 'Admin' },
    { id: 4, title: 'Player of the Month: Jacques Mugisha', category: 'Announcement', date: '2024-02-25', author: 'Admin' },
  ]);

  const [formData, setFormData] = useState({
    title: '', category: 'Announcement', content: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setNews(news.map(n => n.id === formData.id ? { ...n, ...formData, date: new Date().toISOString().split('T')[0] } : n));
    } else {
      setNews([{ ...formData, id: Date.now(), date: new Date().toISOString().split('T')[0], author: 'Admin' }, ...news]);
    }
    setShowModal(false);
    setFormData({ title: '', category: 'Announcement', content: '' });
  };

  const handleEdit = (item) => {
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setNews(news.filter(n => n.id !== id));
    }
  };

  const filteredNews = news.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">
            Manage <span className="text-accent">News</span>
          </h1>
          <p className="text-gray-400 mt-2">Create, edit, and publish news articles</p>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <button onClick={() => { setFormData({ title: '', category: 'Announcement', content: '' }); setShowModal(true); }} className="btn-primary flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add Article
            </button>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-light">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Title</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Category</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Date</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Author</th>
                    <th className="px-6 py-4 text-center text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredNews.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-light transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{item.title}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-full">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="px-6 py-4 text-gray-400">{item.author}</td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handleEdit(item)} className="text-secondary hover:text-accent mr-3">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-surface rounded-xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-heading font-bold text-white mb-6">
              {formData.id ? 'Edit Article' : 'Add New Article'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="input-field"
                >
                  <option value="Announcement">Announcement</option>
                  <option value="Match Report">Match Report</option>
                  <option value="Transfer">Transfer</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Content</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="input-field resize-none"
                  rows="8"
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Featured Image</label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-secondary transition-colors">
                  <Image className="w-10 h-10 mx-auto text-gray-500 mb-2" />
                  <p className="text-gray-400">Click to upload image</p>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full">
                {formData.id ? 'Update Article' : 'Publish Article'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;
