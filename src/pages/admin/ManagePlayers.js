import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Camera } from 'lucide-react';
import { playersAPI } from '../../services/api';

const empty = { name: '', position: '', jersey_number: '', nationality: '', bio: '', goals: 0, assists: 0, appearances: 0, clean_sheets: 0 };
const API_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

const ManagePlayers = () => {
  const [players, setPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(empty);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPlayers(); }, []);

  const fetchPlayers = async () => {
    try { const res = await playersAPI.getAll(); setPlayers(res.data); }
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

      if (formData.id) { await playersAPI.update(formData.id, fd); }
      else { await playersAPI.create(fd); }

      fetchPlayers(); setShowModal(false); setFormData(empty);
      setPhotoFile(null); setPhotoPreview(null);
    } catch (e) { alert(e.response?.data?.message || 'Error saving player'); }
  };

  const handleEdit = (player) => {
    setFormData({ ...player });
    setPhotoPreview(player.photo ? `${API_URL}${player.photo}` : null);
    setPhotoFile(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this player?')) return;
    try { await playersAPI.delete(id); fetchPlayers(); }
    catch (e) { alert('Error deleting player'); }
  };

  const filtered = players.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">Manage <span className="text-accent">Players</span></h1>
          <p className="text-gray-400 mt-2">Add, edit, or remove players from the squad</p>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type="text" placeholder="Search players..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-10" />
            </div>
            <button onClick={() => { setFormData(empty); setPhotoFile(null); setPhotoPreview(null); setShowModal(true); }} className="btn-primary flex items-center">
              <Plus className="w-5 h-5 mr-2" /> Add Player
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
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">#</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Name</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Position</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Nationality</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Apps</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Goals</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filtered.map((player) => (
                      <tr key={player.id} className="hover:bg-surface-light transition-colors">
                        <td className="px-6 py-4">
                          {player.photo
                            ? <img src={`${API_URL}${player.photo}`} alt={player.name} className="w-12 h-12 rounded-full object-cover" />
                            : <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"><Camera className="w-5 h-5 text-white" /></div>
                          }
                        </td>
                        <td className="px-6 py-4">
                          <span className="w-8 h-8 bg-accent text-primary rounded-full flex items-center justify-center font-bold text-sm">{player.jersey_number}</span>
                        </td>
                        <td className="px-6 py-4 text-white font-medium">{player.name}</td>
                        <td className="px-6 py-4 text-gray-400">{player.position}</td>
                        <td className="px-6 py-4 text-gray-400">{player.nationality}</td>
                        <td className="px-6 py-4 text-center text-white">{player.appearances}</td>
                        <td className="px-6 py-4 text-center text-white">{player.goals}</td>
                        <td className="px-6 py-4 text-center">
                          <button onClick={() => handleEdit(player)} className="text-secondary hover:text-accent mr-3"><Edit className="w-5 h-5" /></button>
                          <button onClick={() => handleDelete(player.id)} className="text-red-500 hover:text-red-400"><Trash2 className="w-5 h-5" /></button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && <tr><td colSpan="8" className="px-6 py-12 text-center text-gray-500">No players found</td></tr>}
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
            <h2 className="text-2xl font-heading font-bold text-white mb-6">{formData.id ? 'Edit Player' : 'Add New Player'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Photo Upload */}
              <div className="flex flex-col items-center">
                <label className="block text-gray-400 mb-2">Player Photo</label>
                <div onClick={() => document.getElementById('playerPhotoInput').click()} className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-600 cursor-pointer hover:border-accent transition-colors bg-surface-light flex items-center justify-center">
                  {photoPreview
                    ? <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    : <div className="flex flex-col items-center text-gray-500"><Camera className="w-8 h-8" /><span className="text-xs mt-1">Upload</span></div>
                  }
                </div>
                <input id="playerPhotoInput" type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Position</label>
                  <select value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="input-field" required>
                    <option value="">Select</option>
                    <option>Goalkeeper</option>
                    <option>Defender</option>
                    <option>Midfielder</option>
                    <option>Forward</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Jersey #</label>
                  <input type="number" value={formData.jersey_number} onChange={(e) => setFormData({ ...formData, jersey_number: e.target.value })} className="input-field" required />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Nationality</label>
                <input type="text" value={formData.nationality} onChange={(e) => setFormData({ ...formData, nationality: e.target.value })} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Goals</label>
                  <input type="number" value={formData.goals} onChange={(e) => setFormData({ ...formData, goals: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Appearances</label>
                  <input type="number" value={formData.appearances} onChange={(e) => setFormData({ ...formData, appearances: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Bio</label>
                <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="input-field resize-none" rows="3"></textarea>
              </div>
              <button type="submit" className="btn-primary w-full">{formData.id ? 'Update Player' : 'Add Player'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePlayers;
