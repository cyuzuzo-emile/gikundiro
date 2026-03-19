import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Ticket, TrendingUp, FileText, Calendar, ArrowRight, DollarSign, Image } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Total Fans', value: '12,456', change: '+12%', icon: Users, color: 'bg-blue-500' },
    { title: 'Ticket Sales', value: 'RWF 4.2M', change: '+8%', icon: Ticket, color: 'bg-green-500' },
    { title: 'News Articles', value: '156', change: '+5%', icon: FileText, color: 'bg-purple-500' },
    { title: 'Total Players', value: '28', change: '0%', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const recentBookings = [
    { id: 1, fan: 'John Doe', match: 'Rayon vs Amazulu', seats: 'A12, A13', date: '2024-03-10', status: 'confirmed' },
    { id: 2, fan: 'Jane Smith', match: 'Rayon vs Amazulu', seats: 'B05', date: '2024-03-10', status: 'confirmed' },
    { id: 3, fan: 'Mike Johnson', match: 'Rayon vs Police', seats: 'C01', date: '2024-03-09', status: 'pending' },
  ];

  const recentRegistrations = [
    { id: 1, name: 'Alice Wonder', email: 'alice@example.com', date: '2024-03-10' },
    { id: 2, name: 'Bob Builder', email: 'bob@example.com', date: '2024-03-09' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', date: '2024-03-08' },
  ];

  const upcomingMatches = [
    { id: 1, opponent: 'Amazulu FC', date: '2024-03-15', ticketsSold: 450 },
    { id: 2, opponent: 'Police FC', date: '2024-03-22', ticketsSold: 280 },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">
            Admin <span className="text-accent">Dashboard</span>
          </h1>
          <p className="text-gray-400 mt-2">Manage your club's website and operations</p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-8 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 ${stat.color} rounded-full flex items-center justify-center`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-green-500 text-sm">{stat.change}</span>
                </div>
                <h3 className="text-gray-400 text-sm">{stat.title}</h3>
                <p className="text-2xl font-heading font-bold text-white mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Bookings */}
            <div className="card">
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-heading font-bold text-white">Recent Ticket Bookings</h2>
                <Link to="/admin/tickets" className="text-secondary hover:text-accent text-sm flex items-center">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-gray-800">
                {recentBookings.map((booking) => (
                  <div key={booking.id} className="p-4 hover:bg-surface-light transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{booking.fan}</h4>
                        <p className="text-gray-400 text-sm">{booking.match}</p>
                        <p className="text-gray-500 text-xs mt-1">Seats: {booking.seats}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Registrations */}
            <div className="card">
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-heading font-bold text-white">New Fan Registrations</h2>
                <Link to="/admin/fans" className="text-secondary hover:text-accent text-sm flex items-center">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-gray-800">
                {recentRegistrations.map((user) => (
                  <div key={user.id} className="p-4 hover:bg-surface-light transition-colors">
                    <h4 className="font-medium text-white">{user.name}</h4>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                    <p className="text-gray-500 text-xs mt-1">{user.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Matches */}
            <div className="card">
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-heading font-bold text-white">Match Tickets</h2>
                <Link to="/admin/matches" className="text-secondary hover:text-accent text-sm flex items-center">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="divide-y divide-gray-800">
                {upcomingMatches.map((match) => (
                  <div key={match.id} className="p-4 hover:bg-surface-light transition-colors">
                    <h4 className="font-medium text-white">vs {match.opponent}</h4>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {match.date}
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Tickets Sold</span>
                        <span className="text-white">{match.ticketsSold}</span>
                      </div>
                      <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-secondary rounded-full"
                          style={{ width: `${(match.ticketsSold / 500) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-heading font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/admin/players" className="card p-4 hover:bg-surface-light transition-colors text-center">
                <Users className="w-8 h-8 mx-auto text-secondary mb-2" />
                <span className="text-white">Manage Players</span>
              </Link>
              <Link to="/admin/matches" className="card p-4 hover:bg-surface-light transition-colors text-center">
                <Calendar className="w-8 h-8 mx-auto text-secondary mb-2" />
                <span className="text-white">Manage Matches</span>
              </Link>
              <Link to="/admin/news" className="card p-4 hover:bg-surface-light transition-colors text-center">
                <FileText className="w-8 h-8 mx-auto text-secondary mb-2" />
                <span className="text-white">Manage News</span>
              </Link>
              <Link to="/admin/tickets" className="card p-4 hover:bg-surface-light transition-colors text-center">
                <Ticket className="w-8 h-8 mx-auto text-secondary mb-2" />
                <span className="text-white">Manage Tickets</span>
              </Link>
              <Link to="/admin/images" className="card p-4 hover:bg-surface-light transition-colors text-center">
                <Image className="w-8 h-8 mx-auto text-secondary mb-2" />
                <span className="text-white">Manage Images</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
