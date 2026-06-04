import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import { playersAPI, staffAPI } from '../../services/api';

const API_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

const Team = () => {
  const [filter, setFilter] = useState('all');
  const [players, setPlayers] = useState([]);
  const [coachingStaff, setCoachingStaff] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playersRes, staffRes] = await Promise.all([
          playersAPI.getAll(),
          staffAPI.getAll()
        ]);
        setPlayers(playersRes.data || []);
        setCoachingStaff(staffRes.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const positions = ['all', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward'];

  const filteredPlayers = filter === 'all' ? players : players.filter(p => p.position === filter);

  const getPositionColor = (position) => {
    switch (position) {
      case 'Goalkeeper': return 'bg-yellow-500';
      case 'Defender': return 'bg-blue-500';
      case 'Midfielder': return 'bg-green-500';
      case 'Forward': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-surface">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&h=600&fit=crop" 
            alt="Team" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4">
            Our <span className="gradient-text">Team</span>
          </h1>
          <p className="text-xl text-gray-400">Meet the players who represent Rayon Sports FC</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-surface-dark sticky top-20 z-30 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-gray-400">Filter by position:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {positions.map((position) => (
                <button
                  key={position}
                  onClick={() => setFilter(position)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === position
                      ? 'bg-secondary text-white'
                      : 'bg-surface text-gray-400 hover:bg-surface-light'
                  }`}
                >
                  {position === 'all' ? 'All' : position}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Players Grid */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlayers.map((player) => (
              <div key={player.id} className="card group">
                <div className="relative h-72 overflow-hidden">
                  <img 
                    src={player.photo ? `${API_URL}${player.photo}` : 'https://via.placeholder.com/400x400?text=Player'} 
                    alt={player.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x400?text=Player'; }}
                  />
                  <div className={`absolute top-4 right-4 w-10 h-10 ${getPositionColor(player.position)} rounded-full flex items-center justify-center text-white font-bold`}>
                    {player.jersey_number}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-heading font-bold text-white text-center">{player.name}</h3>
                  <div className="flex justify-center mt-2">
                    <span className={`text-center text-sm font-medium ${getPositionColor(player.position)} text-white py-1 px-3 rounded-full`}>
                      {player.position}
                    </span>
                  </div>
                  <div className="flex items-center justify-center mt-3 text-gray-400 text-sm">
                    <span className="mr-1">🇷🇼</span> {player.nationality}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-800">
                    <div className="text-center">
                      <span className="text-lg font-bold text-white">{player.appearances}</span>
                      <p className="text-xs text-gray-500">Appearances</p>
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-bold text-white">{player.position === 'Goalkeeper' ? player.clean_sheets : player.goals}</span>
                      <p className="text-xs text-gray-500">{player.position === 'Goalkeeper' ? 'Clean Sheets' : 'Goals'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching Staff */}
      <section className="py-20 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Coaching Staff</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {coachingStaff.map((staff) => (
              <div key={staff.id} className="card text-center p-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={staff.photo ? `${API_URL}${staff.photo}` : 'https://via.placeholder.com/400x400?text=Staff'} 
                    alt={staff.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400?text=Staff';
                    }}
                  />
                </div>
                <h3 className="text-xl font-heading font-bold text-white">{staff.name}</h3>
                <p className="text-secondary mt-1">{staff.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
