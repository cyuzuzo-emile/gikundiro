import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Ticket, Users, Bell, Star, ChevronRight, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const FanDashboard = () => {
  const { user } = useAuth();

  const upcomingMatches = [
    { id: 1, opponent: 'Amazulu FC', date: '2024-03-15', time: '15:00', venue: 'Nyamirambo Stadium' },
    { id: 2, opponent: 'Police FC', date: '2024-03-22', time: '18:00', venue: 'Amahoro Stadium' },
  ];

  const notifications = [
    { id: 1, title: 'Match Reminder: Rayon vs Amazulu', message: 'The match starts in 2 days', time: '2 hours ago', unread: true },
    { id: 2, title: 'New Merchandise Available', message: 'Check out the new 2024 jersey collection', time: '1 day ago', unread: true },
    { id: 3, title: 'Ticket Confirmed', message: 'Your ticket for the derby match has been confirmed', time: '3 days ago', unread: false },
  ];

  const recentNews = [
    { id: 1, title: 'Rayon Sports Clinch Historic Victory', date: '2024-03-08' },
    { id: 2, title: 'Match Preview: Rayon vs Amazulu', date: '2024-03-12' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold text-white">
                Welcome back, <span className="text-accent">{user?.name?.split(' ')[0]}</span>!
              </h1>
              <p className="text-gray-400 mt-2">Here's what's happening with your favorite club</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link to="/fan/tickets" className="btn-primary">
                <Ticket className="w-5 h-5 mr-2" />
                Book Tickets
              </Link>
              <Link to="/fan/community" className="btn-outline">
                <MessageSquare className="w-5 h-5 mr-2" />
                Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card p-6 flex items-center">
              <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center mr-4">
                <Ticket className="w-7 h-7 text-secondary" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Tickets Booked</p>
                <p className="text-2xl font-heading font-bold text-white">3</p>
              </div>
            </div>
            <div className="card p-6 flex items-center">
              <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                <Star className="w-7 h-7 text-accent" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Favorite Players</p>
                <p className="text-2xl font-heading font-bold text-white">5</p>
              </div>
            </div>
            <div className="card p-6 flex items-center">
              <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Upcoming Matches</p>
                <p className="text-2xl font-heading font-bold text-white">2</p>
              </div>
            </div>
            <div className="card p-6 flex items-center">
              <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
                <Bell className="w-7 h-7 text-red-500" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Notifications</p>
                <p className="text-2xl font-heading font-bold text-white">2</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upcoming Matches */}
            <div className="lg:col-span-2">
              <div className="card">
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                  <h2 className="text-xl font-heading font-bold text-white">Upcoming Matches</h2>
                  <Link to="/matches" className="text-secondary hover:text-accent text-sm flex items-center">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="divide-y divide-gray-800">
                  {upcomingMatches.map((match) => (
                    <div key={match.id} className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-xl">🔵</span>
                        </div>
                        <div>
                          <h3 className="font-heading font-bold text-white">Rayon FC</h3>
                          <p className="text-gray-400 text-sm">vs {match.opponent}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-white font-medium">{new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                          <p className="text-gray-400 text-sm">{match.time}</p>
                        </div>
                        <Link to="/fan/tickets" className="btn-primary text-sm py-2">
                          Book
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent News */}
              <div className="card mt-8">
                <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                  <h2 className="text-xl font-heading font-bold text-white">Latest News</h2>
                  <Link to="/news" className="text-secondary hover:text-accent text-sm flex items-center">
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="divide-y divide-gray-800">
                  {recentNews.map((news) => (
                    <div key={news.id} className="p-6 flex items-center justify-between hover:bg-surface-light transition-colors cursor-pointer">
                      <div>
                        <h3 className="font-medium text-white">{news.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{new Date(news.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <div className="card">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-heading font-bold text-white">Notifications</h2>
                </div>
                <div className="divide-y divide-gray-800">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 ${notification.unread ? 'bg-surface-light' : ''} hover:bg-surface-light transition-colors cursor-pointer`}>
                      <div className="flex items-start">
                        {notification.unread && (
                          <span className="w-2 h-2 bg-accent rounded-full mr-3 mt-2"></span>
                        )}
                        <div>
                          <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                          <p className="text-gray-400 text-sm mt-1">{notification.message}</p>
                          <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="card mt-8">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-heading font-bold text-white">Quick Links</h2>
                </div>
                <div className="p-4 space-y-2">
                  <Link to="/fan/profile" className="flex items-center p-3 bg-surface-light rounded-lg hover:bg-surface transition-colors">
                    <Users className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-300">Edit Profile</span>
                  </Link>
                  <Link to="/fan/community" className="flex items-center p-3 bg-surface-light rounded-lg hover:bg-surface transition-colors">
                    <MessageSquare className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-300">Fan Community</span>
                  </Link>
                  <Link to="/shop" className="flex items-center p-3 bg-surface-light rounded-lg hover:bg-surface transition-colors">
                    <Star className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-300">Official Shop</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FanDashboard;
