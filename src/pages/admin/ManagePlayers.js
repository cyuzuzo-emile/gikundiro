import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, X, Camera } from 'lucide-react';
import { useImageUpload } from '../../hooks/useImageUpload';

const ManagePlayers = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [players, setPlayers] = useState([
    { id: 1, name: 'Mugisha Jacques', position: 'Forward', number: 10, nationality: 'Rwanda', goals: 12, appearances: 18 },
    { id: 2, name: 'Hakizimana Emmanuel', position: 'Midfielder', number: 8, nationality: 'Rwanda', goals: 5, appearances: 17 },
    { id: 3, name: 'Niyonkuru Patrick', position: 'Defender', number: 4, nationality: 'Rwanda', goals: 2, appearances: 16 },
    { id: 4, name: 'Mukanzi Claude', position: 'Goalkeeper', number: 1, nationality: 'Rwanda', cleanSheets: 8, appearances: 15 },
    { id: 5, name: 'Bizimana Sam', position: 'Defender', number: 3, nationality: 'Rwanda', goals: 1, appearances: 14 },
  ]);

  const [formData, setFormData] = useState({
    name: '', position: '', number: '', nationality: '', goals: 0, appearances: 0, image: ''
  });

  // Image upload for player photo
  const { image: playerImage, handleImageUpload: handleImageChange, clearImage: clearPlayerImage } = useImageUpload(
    `player_image_${formData.id || 'new'}`
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const playerData = { ...formData, image: playerImage || formData.image };
    if (formData.id) {
      setPlayers(players.map(p => p.id === formData.id ? { ...p, ...playerData } : p));
    } else {
      setPlayers([...players, { ...playerData, id: Date.now() }]);
    }
    setShowModal(false);
    setFormData({ name: '', position: '', number: '', nationality: '', goals: 0, appearances: 0, image: '' });
    clearPlayerImage();
  };

  const handleEdit = (player) => {
    setFormData(player);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  const filteredPlayers = players.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">
            Manage <span className="text-accent">Players</span>
          </h1>
          <p className="text-gray-400 mt-2">Add, edit, or remove players from the squad</p>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Actions Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <button onClick={() => { setFormData({ name: '', position: '', number: '', nationality: '', goals: 0, appearances: 0 }); setShowModal(true); }} className="btn-primary flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add Player
            </button>
          </div>

          {/* Players Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-light">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Number</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Name</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Position</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Nationality</th>
                    <th className="px-6 py-4 text-center text-gray-400 font-medium">Appearances</th>
                    <th className="px-6 py-4 text-center text-gray-400 font-medium">Goals</th>
                    <th className="px-6 py-4 text-center text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredPlayers.map((player) => (
                    <tr key={player.id} className="hover:bg-surface-light transition-colors">
                      <td className="px-6 py-4">
                        <span className="w-8 h-8 bg-accent text-primary rounded-full flex items-center justify-center font-bold">
                          {player.number}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white font-medium">{player.name}</td>
                      <td className="px-6 py-4 text-gray-400">{player.position}</td>
                      <td className="px-6 py-4 text-gray-400">{player.nationality}</td>
                      <td className="px-6 py-4 text-center text-white">{player.appearances}</td>
                      <td className="px-6 py-4 text-center text-white">{player.goals || player.cleanSheets || 0}</td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handleEdit(player)} className="text-secondary hover:text-accent mr-3">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(player.id)} className="text-red-500 hover:text-red-400">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowModal(false)}></div>
          <div className="relative bg-surface rounded-xl p-8 w-full max-w-md">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-heading font-bold text-white mb-6">
              {formData.id ? 'Edit Player' : 'Add New Player'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Player Image Upload */}
              <div className="flex flex-col items-center mb-4">
                <label className="block text-gray-400 mb-2">Player Photo</label>
                <div className="relative">
                  <div 
                    onClick={() => document.getElementById('playerImageInput').click()}
                    className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-600 cursor-pointer hover:border-accent transition-colors bg-surface-light flex items-center justify-center"
                  >
                    {playerImage || formData.image ? (
                      <img 
                        src={playerImage || formData.image} 
                        alt="Player" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="text-gray-500 flex flex-col items-center">
                        <Camera className="w-10 h-10" />
                        <span className="text-xs mt-1">Upload Photo</span>
                      </div>
                    )}
                  </div>
                  <input
                    id="playerImageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2">Player Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Position</label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Goalkeeper">Goalkeeper</option>
                    <option value="Defender">Defender</option>
                    <option value="Midfielder">Midfielder</option>
                    <option value="Forward">Forward</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Jersey Number</label>
                  <input
                    type="number"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Nationality</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Goals/Appearances</label>
                  <input
                    type="number"
                    value={formData.goals}
                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full">
                {formData.id ? 'Update Player' : 'Add Player'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePlayers;
