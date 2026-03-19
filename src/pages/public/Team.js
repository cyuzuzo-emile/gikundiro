import React, { useState, useEffect } from 'react';
import { Filter, User } from 'lucide-react';

// Default player images from local folder
const defaultPlayerImages = {
  1: '/images/olivie.jpeg',
  2: '/images/fall.jpeg',
  3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  4: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  5: '/images/basane.jpeg',
  6: '/images/kevin.jpg',
  7: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  8: '/images/murer.jpeg',
  9: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  10: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  11: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  12: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
};

// Get player image from localStorage or use default
const getPlayerImage = (playerId, fallbackImage) => {
  const stored = localStorage.getItem(`player_image_${playerId}`);
  return stored || defaultPlayerImages[playerId] || fallbackImage;
};

const Team = () => {
  const [filter, setFilter] = useState('all');
  const [playerImages, setPlayerImages] = useState({});

  // Load player images from localStorage on mount
  useEffect(() => {
    const images = {};
    players.forEach(player => {
      const stored = localStorage.getItem(`player_image_${player.id}`);
      if (stored) images[player.id] = stored;
    });
    setPlayerImages(images);
  }, []);

  // Refresh images when filter changes (to show newly uploaded images)
  useEffect(() => {
    const images = {};
    players.forEach(player => {
      const stored = localStorage.getItem(`player_image_${player.id}`);
      if (stored) images[player.id] = stored;
    });
    setPlayerImages(images);
  }, [filter]);

  const players = [
    { id: 1, name: 'Kwizera olivier', position: 'Goalkeeper', number: 1, nationality: 'Rwanda', dob: '1995-03-15', image: '/images/olivie.jpeg', stats: { appearances: 120, cleanSheets: 45 } },
    { id: 2, name: 'FALL NGAGNE', position: 'Forward', number: 4, nationality: 'Rwanda', dob: '1997-06-22', image: '/images/fall.jpeg', stats: { appearances: 98, goals: 5 } },
    { id: 3, name: 'Hakizimana Emmanuel', position: 'Midfielder', number: 8, nationality: 'Rwanda', dob: '1998-01-10', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', stats: { appearances: 85, goals: 12 } },
    { id: 4, name: 'UMUKIZA Obed', position: 'Defender', number: 10, nationality: 'Rwanda', dob: '1996-08-25', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop', stats: { appearances: 110, goals: 45 } },
    { id: 5, name: 'BASANE', position: 'Defender', number: 3, nationality: 'Rwanda', dob: '1999-04-18', image: '/images/basane.jpeg', stats: { appearances: 76, goals: 3 } },
    { id: 6, name: 'KEVIN', position: 'Midfielder', number: 6, nationality: 'Rwanda', dob: '1997-11-30', image: '/images/kevin.jpg', stats: { appearances: 92, goals: 8 } },
    { id: 7, name: 'emely bayisnge', position: 'Forward', number: 11, nationality: 'Rwanda', dob: '2000-02-14', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop', stats: { appearances: 45, goals: 15 } },
    { id: 8, name: 'Ntawunguka Jean', position: 'Goalkeeper', number: 22, nationality: 'Rwanda', dob: '2001-07-08', image: '/images/murer.jpeg', stats: { appearances: 25, cleanSheets: 10 } },
    { id: 9, name: 'Rwasa Bienvenue', position: 'Defender', number: 5, nationality: 'Rwanda', dob: '1998-12-03', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', stats: { appearances: 88, goals: 2 } },
    { id: 10, name: 'Habarugira Oscar', position: 'Midfielder', number: 7, nationality: 'Rwanda', dob: '1999-09-20', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop', stats: { appearances: 70, goals: 10 } },
    { id: 11, name: 'Habineza Emmanuel', position: 'Forward', number: 9, nationality: 'Rwanda', dob: '1996-05-12', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop', stats: { appearances: 95, goals: 32 } },
    { id: 12, name: 'Mutesasira John', position: 'Defender', number: 2, nationality: 'Rwanda', dob: '2000-01-25', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop', stats: { appearances: 55, goals: 1 } },
  ];

  const coachingStaff = [
    { name: 'Mucyo Jean Pierre', position: 'Head Coach', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
    { name: 'Bizimungu Alexis', position: 'Assistant Coach', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { name: 'Niyonkuru Jean', position: 'Goalkeeping Coach', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
    { name: 'Murekatete Aline', position: 'Team Doctor', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' },
  ];

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
                    src={playerImages[player.id] || player.image} 
                    alt={player.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x400?text=Player';
                    }}
                  />
                  <div className={`absolute top-4 right-4 w-10 h-10 ${getPositionColor(player.position)} rounded-full flex items-center justify-center text-white font-bold`}>
                    {player.number}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-heading font-bold text-white text-center">{player.name}</h3>
                  <p className={`text-center text-sm font-medium mt-1 ${getPositionColor(player.position)} text-white py-1 px-3 rounded-full inline-block`}>
                    {player.position}
                  </p>
                  <div className="flex items-center justify-center mt-3 text-gray-400 text-sm">
                    <span className="mr-1">🇷🇼</span> {player.nationality}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-gray-800">
                    <div className="text-center">
                      <span className="text-lg font-bold text-white">{player.stats.appearances}</span>
                      <p className="text-xs text-gray-500">Appearances</p>
                    </div>
                    <div className="text-center">
                      <span className="text-lg font-bold text-white">{player.stats.goals || player.stats.cleanSheets || 0}</span>
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
            {coachingStaff.map((staff, index) => (
              <div key={index} className="card text-center p-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={staff.image} 
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
