import React, { useState, useEffect } from 'react';
import { Search, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { ticketsAPI } from '../../services/api';

const ManageTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchTickets(); }, []);

  const fetchTickets = async () => {
    try { const res = await ticketsAPI.getAll(); setTickets(res.data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleValidate = async (id) => {
    try { await ticketsAPI.validate(id); fetchTickets(); }
    catch (e) { alert('Error validating ticket'); }
  };

  const stats = {
    totalRevenue: tickets.reduce((sum, t) => sum + (t.price || 0), 0),
    total: tickets.length,
    valid: tickets.filter(t => t.status === 'Valid').length,
    used: tickets.filter(t => t.status === 'Used').length,
  };

  const filtered = tickets.filter(t =>
    String(t.user_id).includes(searchQuery) ||
    String(t.match_id).includes(searchQuery) ||
    t.seat_number?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">Manage <span className="text-accent">Tickets</span></h1>
          <p className="text-gray-400 mt-2">Monitor ticket sales and validate tickets</p>
        </div>
      </section>

      <section className="py-8 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Revenue', value: `RWF ${stats.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'bg-green-500/20 text-green-500' },
              { label: 'Tickets Sold', value: stats.total, icon: CheckCircle, color: 'bg-blue-500/20 text-blue-500' },
              { label: 'Valid Tickets', value: stats.valid, icon: CheckCircle, color: 'bg-yellow-500/20 text-yellow-500' },
              { label: 'Used Tickets', value: stats.used, icon: XCircle, color: 'bg-purple-500/20 text-purple-500' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="card p-6">
                <div className={`w-14 h-14 ${color} rounded-full flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-gray-400 text-sm">{label}</h3>
                <p className="text-2xl font-heading font-bold text-white mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input type="text" placeholder="Search tickets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-10" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div></div>
          ) : (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-surface-light">
                    <tr>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Ticket ID</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">User ID</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Match ID</th>
                      <th className="px-6 py-4 text-left text-gray-400 font-medium">Seat</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Price</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Status</th>
                      <th className="px-6 py-4 text-center text-gray-400 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filtered.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-surface-light transition-colors">
                        <td className="px-6 py-4 text-white">#{ticket.id}</td>
                        <td className="px-6 py-4 text-gray-400">{ticket.user_id}</td>
                        <td className="px-6 py-4 text-gray-400">{ticket.match_id}</td>
                        <td className="px-6 py-4 text-gray-400">{ticket.seat_number}</td>
                        <td className="px-6 py-4 text-center text-white">RWF {ticket.price?.toLocaleString()}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-1 text-xs rounded-full ${ticket.status === 'Valid' ? 'bg-green-500/20 text-green-400' : ticket.status === 'Used' ? 'bg-purple-500/20 text-purple-400' : 'bg-red-500/20 text-red-400'}`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {ticket.status === 'Valid' && (
                            <button onClick={() => handleValidate(ticket.id)} className="px-3 py-1 bg-secondary text-white text-sm rounded-lg hover:bg-secondary-light transition-colors">
                              Validate
                            </button>
                          )}
                          {ticket.status === 'Used' && <span className="text-gray-500 text-sm">Validated</span>}
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && <tr><td colSpan="7" className="px-6 py-12 text-center text-gray-500">No tickets found</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ManageTickets;
