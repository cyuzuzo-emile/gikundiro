import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Camera } from 'lucide-react';
import { staffAPI } from '../../services/api';

const empty = { name: '', position: '', bio: '' };
const API_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

const ManageStaff = () => {
  const [staff, setStaff] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(empty);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStaff(); }, []);

  const fetchStaff = async () => {
    try { const res = await staffAPI.getAll(); setStaff(res.data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => { if (k !== 'id' && k !== 'photo' && v !== null && v !== undefined) fd.append(k, v); });
      if (photoFile) fd.append('photo', photoFile);

      if (formData.id) { await staffAPI.update(formData.id, fd); }
      else { await staffAPI.create(fd); }

      fetchStaff(); setShowModal(false); setFormData(empty);
      setPhotoFile(null); setPhotoPreview(null);
    } catch (e) { alert(e.response?.data?.message || 'Error saving staff'); }
  };

  const handleEdit = (staffMember) => {
    setFormData({ ...staffMember });
    setPhotoPreview(staffMember.photo ? `${API_URL}${staffMember.photo}` : null);
    setPhotoFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this staff member?')) return;
    try { await staffAPI.delete(id); fetchStaff(); }
    catch (e) { alert('Error deleting staff'); }
  };

  const filtered = staff.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">Manage <span className="text-accent">Coaching Staff</span></h1>
          <p className="text-gray-400 mt-2">Add, edit, or remove coaching staff members</p>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type="text" placeholder="Search staff..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-10" />
            </div>
            <button onClick={() => { setFormData(empty); setPhotoFile(null); setPhotoPreview(null); setShowModal(true); }} className="btn-primary flex items-center">
              <Plus className="w-5 h-5 mr-2" /> Add Staff
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
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Photo</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Name</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Position</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filtered.map((s) => (
                      <tr key={s.id} className="hover:bg-surface-light transition-colors">
                        <td className="px-6 py-4">
                          {s.photo
                            ? <img src={`${API_URL}${s.photo}`} alt={s.name} className="w-12 h-12 rounded-full object-cover" />
                            : <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"><Camera className="w-5 h-5 text-white" /></div>
                          }
                        </td>
                        <td className="px-6 py-4 text-white font-medium">{s.name}</td>
                        <td className="px-6 py-4 text-gray-400">{s.position}</td>
                        <td className="px-6 py-4 text-center">
                          <button onClick={() => handleEdit(s)} className="text-secondary hover:text-accent mr-3"><Edit className="w-5 h-5" /></button>
                          <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-400"><Trash2 className="w-5 h-5" /></button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-500">No staff found</td></tr>}
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
            <h2 className="text-2xl font-heading font-bold text-white mb-6">{formData.id ? 'Edit Staff' : 'Add New Staff'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="flex flex-col items-center">
                <label className="block text-gray-400 mb-2">Photo</label>
                <div onClick={() => document.getElementById('staffPhotoInput').click()} className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-600 cursor-pointer hover:border-accent transition-colors bg-surface-light flex items-center justify-center">
                  {photoPreview
                    ? <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    : <div className="flex flex-col items-center text-gray-500"><Camera className="w-8 h-8" /><span className="text-xs mt-1">Upload</span></div>
                  }
                </div>
                <input id="staffPhotoInput" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Position</label>
                <input type="text" value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="input-field" required placeholder="e.g. Head Coach, Assistant Coach, Goalkeeping Coach, Team Doctor" />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Bio</label>
                <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="input-field resize-none" rows="3" placeholder="Brief bio..."></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">{formData.id ? 'Update Staff' : 'Add Staff'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStaff;
