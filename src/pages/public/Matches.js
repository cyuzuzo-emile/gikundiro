import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, ChevronRight, Trophy, TrendingUp } from 'lucide-react';
import { matchesAPI, playersAPI } from '../../services/api';

const Matches = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [matchesRes, playersRes] = await Promise.all([
          matchesAPI.getAll(),
          playersAPI.getAll()
        ]);
        const matches = matchesRes.data || [];
        setUpcomingMatches(matches.filter(m => new Date(m.date) >= new Date()).slice(0, 10));
        setPastMatches(matches.filter(m => new Date(m.date) < new Date()).slice(0, 10));
        setPlayerStats((playersRes.data || []).map(p => ({
          name: p.name,
          position: p.position,
          goals: p.goals || 0,
          assists: p.assists || 0,
          appearances: p.appearances || 0
        })).sort((a, b) => b.goals - a.goals).slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-surface">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=1920&h=600&fit=crop" 
            alt="Matches" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4">
            Match <span className="gradient-text">Schedule</span>
          </h1>
          <p className="text-xl text-gray-400">Follow Rayon Sports FC throughout the season</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-surface-dark sticky top-20 z-30 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`py-4 px-2 font-medium transition-colors relative ${
                activeTab === 'upcoming' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Upcoming Matches
              {activeTab === 'upcoming' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`py-4 px-2 font-medium transition-colors relative ${
                activeTab === 'past' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Past Results
              {activeTab === 'past' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-4 px-2 font-medium transition-colors relative ${
                activeTab === 'stats' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              Statistics
              {activeTab === 'stats' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      {activeTab === 'upcoming' && (
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              {upcomingMatches.map((match) => (
                <div key={match.id} className="card bg-surface-light p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-4">
                        <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                          {match.competition}
                        </span>
                        <span className={`ml-2 px-3 py-1 text-sm rounded-full ${match.home ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {match.home ? 'Home' : 'Away'}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between lg:justify-start lg:space-x-12">
                        <div className="text-center lg:text-left">
                          <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto lg:mx-0 bg-primary/20 rounded-full flex items-center justify-center overflow-hidden">
                            {match.rayon_logo ? (
                              <img src={match.rayon_logo} alt="Rayon FC" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                            ) : (
                              <img src="/rayon.jpg" alt="Rayon FC" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                            )}
                            <span className="text-2xl lg:text-3xl hidden items-center justify-center w-full h-full">🔵</span>
                          </div>
                          <h3 className="mt-2 text-lg font-heading font-bold text-white">Rayon FC</h3>
                        </div>
                        
                        <div className="text-center px-4">
                          <span className="text-lg text-gray-400">VS</span>
                        </div>
                        
                        <div className="text-center lg:text-left">
                          <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto lg:mx-0 bg-secondary/20 rounded-full flex items-center justify-center overflow-hidden">
                            {match.opponent_logo ? (
                              <img src={match.opponent_logo} alt={match.opponent} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                            ) : null}
                            <span className={`text-2xl lg:text-3xl items-center justify-center w-full h-full ${match.opponent_logo ? 'hidden' : 'flex'}`}>🟢</span>
                          </div>
                          <h3 className="mt-2 text-lg font-heading font-bold text-white">{match.opponent}</h3>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 lg:mt-0 lg:ml-8">
                      <div className="flex flex-col space-y-2 text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-2" />
                          <span>{new Date(match.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 mr-2" />
                          <span>{match.time}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-2" />
                          <span>{match.venue}</span>
                        </div>
                        <div className="flex items-center">
                          <Trophy className="w-5 h-5 mr-2" />
                          <span>RWF {match.ticketPrice.toLocaleString()}</span>
                        </div>
                      </div>
                      <button className="btn-primary w-full mt-4">
                        Book Tickets
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Results */}
      {activeTab === 'past' && (
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              {pastMatches.map((match) => (
                <div key={match.id} className="card bg-surface-light p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-4">
                            <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                              {match.competition}
                            </span>
                            <div className="flex items-center text-gray-400">
                              <Calendar className="w-4 h-4 mr-2" />
                              {new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4 lg:mt-0">
                          <div className="flex items-center space-x-8">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/20 flex items-center justify-center">
                                {match.rayon_logo ? (
                                  <img src={match.rayon_logo} alt="Rayon FC" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                ) : (
                                  <img src="/rayon.jpg" alt="Rayon FC" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                )}
                                <span className="text-lg hidden items-center justify-center w-full h-full">🔵</span>
                              </div>
                              <span className="text-xl font-heading font-bold text-white">Rayon FC</span>
                            </div>
                            <div className="bg-surface px-4 py-2 rounded-lg">
                              <span className="text-2xl font-heading font-bold text-accent">
                                {match.homeScore} - {match.awayScore}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary/20 flex items-center justify-center">
                                {match.opponent_logo ? (
                                  <img src={match.opponent_logo} alt={match.opponent} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                                ) : null}
                                <span className={`text-lg items-center justify-center w-full h-full ${match.opponent_logo ? 'hidden' : 'flex'}`}>🟢</span>
                              </div>
                              <span className="text-xl font-heading font-bold text-white">{match.opponent}</span>
                            </div>
                          </div>
                        </div>
                    
                    <div className="mt-4 lg:mt-0 lg:ml-4">
                      <button className="btn-outline text-sm">
                        Match Report <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Player Statistics */}
      {activeTab === 'stats' && (
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card bg-surface-light overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-xl font-heading font-bold text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-accent" />
                  Top Scorers & Assists
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Player</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Position</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Goals</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Assists</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Appearances</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {playerStats.map((player, index) => (
                      <tr key={index} className="hover:bg-surface transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="w-8 h-8 bg-accent text-primary rounded-full flex items-center justify-center font-bold mr-3">
                              {index + 1}
                            </span>
                            <span className="text-white font-medium">{player.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{player.position}</td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-white font-bold">{player.goals}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-white font-bold">{player.assists}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-white font-bold">{player.appearances}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Matches;
