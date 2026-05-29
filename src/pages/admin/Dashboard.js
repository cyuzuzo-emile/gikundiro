import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, FileText, Calendar, ArrowRight, Package } from 'lucide-react';
import { usersAPI, playersAPI, matchesAPI, newsAPI, ordersAPI, ticketsAPI } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ fans: 0, players: 0, news: 0, orders: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentFans, setRecentFans] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [users, players, news, orders, matches] = await Promise.all([
          usersAPI.getAll(),
          playersAPI.getAll(),
          newsAPI.getAll(),
          ordersAPI.getAll(),
          matchesAPI.getUpcoming(),
        ]);
        setStats({
          fans: users.data.length,
          players: players.data.length,
          news: news.data.length,
          orders: orders.data.length,
        });
        setRecentOrders(orders.data.slice(0, 3));
        setRecentFans(users.data.slice(0, 3));
        setUpcomingMatches(matches.data.slice(0, 3));
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const statCards = [
    { title: 'Total Fans', value: stats.fans, icon: Users, color: 'bg-blue-500', link: '/admin/fans' },
    { title: 'Total Players', value: stats.players, icon: Users, color: 'bg-orange-500', link: '/admin/players' },
    { title: 'News Articles', value: stats.news, icon: FileText, color: 'bg-purple-500', link: '/admin/news' },
    { title: 'Total Orders', value: stats.orders, icon: Package, color: 'bg-green-500', link: '/admin/orders' },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">Admin <span className="text-accent">Dashboard</span></h1>
          <p className="text-gray-400 mt-2">Manage your club's website and operations</p>
        </div>
      </section>

      <section className="py-8 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat) => (
              <Link key={stat.title} to={stat.link} className="card p-6 hover:bg-surface-light transition-colors">
                <div className={`w-14 h-14 ${stat.color} rounded-full flex items-center justify-center mb-4`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-gray-400 text-sm">{stat.title}</h3>
                <p className="text-2xl font-heading font-bold text-white mt-1">{stat.value}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Recent Orders */}
            <div className="card">
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-heading font-bold text-white">Recent Orders</h2>
                <Link to="/admin/orders" className="text-secondary hover:text-accent text-sm flex items-center">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </div>
              <div className="divide-y divide-gray-800">
                {recentOrders.length === 0 && <p className="p-4 text-gray-500 text-sm">No orders yet</p>}
                {recentOrders.map((order) => (
                  <div key={order.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-white">{order.customer_name}</h4>
                        <p className="text-gray-400 text-sm">{order.order_number}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        order.status === 'delivered' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Fans */}
            <div className="card">
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-heading font-bold text-white">New Fan Registrations</h2>
                <Link to="/admin/fans" className="text-secondary hover:text-accent text-sm flex items-center">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </div>
              <div className="divide-y divide-gray-800">
                {recentFans.length === 0 && <p className="p-4 text-gray-500 text-sm">No fans yet</p>}
                {recentFans.map((fan) => (
                  <div key={fan.id} className="p-4">
                    <h4 className="font-medium text-white">{fan.name}</h4>
                    <p className="text-gray-400 text-sm">{fan.email}</p>
                    <p className="text-gray-500 text-xs mt-1">{new Date(fan.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Matches */}
            <div className="card">
              <div className="p-6 border-b border-gray-800 flex items-center justify-between">
                <h2 className="text-lg font-heading font-bold text-white">Upcoming Matches</h2>
                <Link to="/admin/matches" className="text-secondary hover:text-accent text-sm flex items-center">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </div>
              <div className="divide-y divide-gray-800">
                {upcomingMatches.length === 0 && <p className="p-4 text-gray-500 text-sm">No upcoming matches</p>}
                {upcomingMatches.map((match) => (
                  <div key={match.id} className="p-4">
                    <h4 className="font-medium text-white">vs {match.opponent}</h4>
                    <div className="flex items-center text-gray-400 text-sm mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(match.date).toLocaleDateString()}
                    </div>
                    <p className="text-gray-500 text-xs mt-1">{match.venue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-heading font-bold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Manage Players', to: '/admin/players', icon: Users },
                { label: 'Manage Matches', to: '/admin/matches', icon: Calendar },
                { label: 'Manage News', to: '/admin/news', icon: FileText },
                { label: 'Manage Orders', to: '/admin/orders', icon: Package },
              ].map(({ label, to, icon: Icon }) => (
                <Link key={to} to={to} className="card p-4 hover:bg-surface-light transition-colors text-center">
                  <Icon className="w-8 h-8 mx-auto text-secondary mb-2" />
                  <span className="text-white">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
