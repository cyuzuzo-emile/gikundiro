import React, { useState } from 'react';
import { Search, Ban, CheckCircle, Send, User } from 'lucide-react';

const ManageFans = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const [fans, setFans] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+250 788 123 456', joinedDate: '2024-01-15', status: 'active', ticketsBought: 5 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+250 788 789 012', joinedDate: '2024-02-20', status: 'active', ticketsBought: 3 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+250 788 345 678', joinedDate: '2024-03-01', status: 'blocked', ticketsBought: 0 },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+250 788 901 234', joinedDate: '2024-03-05', status: 'active', ticketsBought: 1 },
  ]);

  const handleToggleBlock = (id) => {
    setFans(fans.map(fan => 
      fan.id === id ? { ...fan, status: fan.status === 'active' ? 'blocked' : 'active' } : fan
    ));
  };

  const filteredFans = fans.filter(fan => 
    fan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fan.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">
            Manage <span className="text-accent">Fans</span>
          </h1>
          <p className="text-gray-400 mt-2">View and manage registered fan accounts</p>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search fans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <button className="btn-outline flex items-center">
              <Send className="w-5 h-5 mr-2" />
              Send Notification
            </button>
          </div>

          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-surface-light">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Fan</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Email</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Phone</th>
                    <th className="px-6 py-4 text-center text-gray-400 font-medium">Tickets</th>
                    <th className="px-6 py-4 text-left text-gray-400 font-medium">Joined</th>
                    <th className="px-6 py-4 text-center text-gray-400 font-medium">Status</th>
                    <th className="px-6 py-4 text-center text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredFans.map((fan) => (
                    <tr key={fan.id} className="hover:bg-surface-light transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-white font-medium">{fan.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{fan.email}</td>
                      <td className="px-6 py-4 text-gray-400">{fan.phone}</td>
                      <td className="px-6 py-4 text-center text-white">{fan.ticketsBought}</td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(fan.joinedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          fan.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {fan.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => handleToggleBlock(fan.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            fan.status === 'active' 
                              ? 'text-red-500 hover:bg-red-500/10' 
                              : 'text-green-500 hover:bg-green-500/10'
                          }`}
                        >
                          {fan.status === 'active' ? <Ban className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
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
    </div>
  );
};

export default ManageFans;
