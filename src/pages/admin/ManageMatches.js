import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X, Calendar } from 'lucide-react';
import { matchesAPI } from '../../services/api';

const empty = { opponent: '', date: '', time: '', venue: '', competition: '', home_or_away: 'Home', status: 'Scheduled', home_score: '', away_score: '' };

const ManageMatches = () => {
  const [matches, setMatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(empty);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchMatches(); }, []);

  const fetchMatches = async () => {
    try { const res = await matchesAPI.getAll(); setMatches(res.data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) { await matchesAPI.update(formData.id, formData); }
      else { await matchesAPI.create(formData); }
      fetchMatches(); setShowModal(false); setFormData(empty);
    } catch (e) { alert(e.response?.data?.message || 'Error saving match'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this match?')) return;
    try { await matchesAPI.delete(id); fetchMatches(); }
    catch (e) { alert('Error deleting match'); }
  };

  const filtered = matches.filter(m => m.opponent.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">Manage <span className="text-accent">Matches</span></h1>
          <p className="text-gray-400 mt-2">Create and manage match schedules</p>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type="text" placeholder="Search matches..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-10" />
            </div>
            <button onClick={() => { setFormData(empty); setShowModal(true); }} className="btn-primary flex items-center">
              <Plus className="w-5 h-5 mr-2" /> Add Match
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
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Date</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Opponent</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Venue</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Competition</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Result</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Status</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filtered.map((match) => (
                      <tr key={match.id} className="hover:bg-surface-light transition-colors">
                        <td className="px-6 py-4 text-white">
                          <div className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-gray-400" />{new Date(match.date).toLocaleDateString()}</div>
                        </td>
                        <td className="px-6 py-4 text-white font-medium">{match.home_or_away === 'Home' ? '🔵' : '🟢'} {match.opponent}</td>
                        <td className="px-6 py-4 text-gray-400">{match.venue}</td>
                        <td className="px-6 py-4 text-gray-400">{match.competition}</td>
                        <td className="px-6 py-4 text-center">
                          {match.status === 'Completed' ? <span className="text-white font-bold">{match.home_score} - {match.away_score}</span> : <span className="text-gray-500">-</span>}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-1 text-xs rounded-full ${match.status === 'Completed' ? 'bg-gray-500/20 text-gray-400' : match.status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{match.status}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button onClick={() => { setFormData({ ...match, date: match.date?.split('T')[0] }); setShowModal(true); }} className="text-secondary hover:text-accent mr-3"><Edit className="w-5 h-5" /></button>
                          <button onClick={() => handleDelete(match.id)} className="text-red-500 hover:text-red-400"><Trash2 className="w-5 h-5" /></button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && <tr><td colSpan="7" className="px-6 py-12 text-center text-gray-500">No matches found</td></tr>}
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
            <h2 className="text-2xl font-heading font-bold text-white mb-6">{formData.id ? 'Edit Match' : 'Add New Match'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Opponent</label>
                <input type="text" value={formData.opponent} onChange={(e) => setFormData({ ...formData, opponent: e.target.value })} className="input-field" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Date</label>
                  <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="input-field" required />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Time</label>
                  <input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="input-field" />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Venue</label>
                <input type="text" value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} className="input-field" required />
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Competition</label>
                <select value={formData.competition} onChange={(e) => setFormData({ ...formData, competition: e.target.value })} className="input-field" required>
                  <option value="">Select</option>
                  <option>Premier League</option>
                  <option>Rwanda Cup</option>
                  <option>CECAFA Cup</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Home/Away</label>
                  <select value={formData.home_or_away} onChange={(e) => setFormData({ ...formData, home_or_away: e.target.value })} className="input-field">
                    <option>Home</option>
                    <option>Away</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="input-field">
                    <option>Scheduled</option>
                    <option>Live</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              {formData.status === 'Completed' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-2">Home Score</label>
                    <input type="number" value={formData.home_score} onChange={(e) => setFormData({ ...formData, home_score: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2">Away Score</label>
                    <input type="number" value={formData.away_score} onChange={(e) => setFormData({ ...formData, away_score: e.target.value })} className="input-field" />
                  </div>
                </div>
              )}
              <button type="submit" className="btn-primary w-full">{formData.id ? 'Update Match' : 'Add Match'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMatches;
