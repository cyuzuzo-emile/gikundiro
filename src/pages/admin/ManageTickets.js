import React, { useState } from 'react';
import { Search, DollarSign, Ticket, CheckCircle, XCircle } from 'lucide-react';

const ManageTickets = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [tickets, setTickets] = useState([
    { id: 1, match: 'Rayon vs Amazulu', fan: 'John Doe', seat: 'A12', price: 5000, status: 'valid', date: '2024-03-10' },
    { id: 2, match: 'Rayon vs Amazulu', fan: 'Jane Smith', seat: 'B05', price: 5000, status: 'used', date: '2024-03-10' },
    { id: 3, match: 'Rayon vs Police', fan: 'Mike Johnson', seat: 'C01', price: 3000, status: 'valid', date: '2024-03-09' },
    { id: 4, match: 'Rayon vs APRA', fan: 'Sarah Williams', seat: 'D08', price: 4000, status: 'cancelled', date: '2024-03-08' },
  ]);

  const stats = {
    totalRevenue: tickets.reduce((sum, t) => sum + t.price, 0),
    ticketsSold: tickets.length,
    validTickets: tickets.filter(t => t.status === 'valid').length,
    usedTickets: tickets.filter(t => t.status === 'used').length,
  };

  const handleValidate = (id) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id && ticket.status === 'valid' 
        ? { ...ticket, status: 'used' } 
        : ticket
    ));
  };

  const filteredTickets = tickets.filter(ticket => 
    ticket.fan.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ticket.match.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">
            Manage <span className="text-accent">Tickets</span>
          </h1>
          <p className="text-gray-400 mt-2">Monitor ticket sales and validate tickets</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-green-500" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm">Total Revenue</h3>
              <p className="text-2xl font-heading font-bold text-white mt-1">RWF {stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <Ticket className="w-7 h-7 text-blue-500" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm">Tickets Sold</h3>
              <p className="text-2xl font-heading font-bold text-white mt-1">{stats.ticketsSold}</p>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-7 h-7 text-yellow-500" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm">Valid Tickets</h3>
              <p className="text-2xl font-heading font-bold text-white mt-1">{stats.validTickets}</p>
            </div>
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-purple-500/20 rounded-full flex items-center justify-center">
                  <XCircle className="w-7 h-7 text-purple-500" />
                </div>
              </div>
              <h3 className="text-gray-400 text-sm">Used Tickets</h3>
              <p className="text-2xl font-heading font-bold text-white mt-1">{stats.usedTickets}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-light">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Match</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Fan</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Seat</th>
                    <th className="px-6 py-4 text-center text-gray-400 font-medium">Price</th>
                    <th className="px-6 py-4 text-center text-gray-400 font-medium">Status</th>
                    <th className="px-6 py-4 text-center text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-surface-light transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{ticket.match}</td>
                      <td className="px-6 py-4 text-gray-400">{ticket.fan}</td>
                      <td className="px-6 py-4 text-gray-400">{ticket.seat}</td>
                      <td className="px-6 py-4 text-center text-white">RWF {ticket.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          ticket.status === 'valid' ? 'bg-green-500/20 text-green-400' :
                          ticket.status === 'used' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {ticket.status === 'valid' && (
                          <button 
                            onClick={() => handleValidate(ticket.id)}
                            className="px-3 py-1 bg-secondary text-white text-sm rounded-lg hover:bg-secondary-light transition-colors"
                          >
                            Validate
                          </button>
                        )}
                        {ticket.status === 'used' && (
                          <span className="text-gray-500 text-sm">Validated</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageTickets;
