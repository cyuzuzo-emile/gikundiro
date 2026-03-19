import React, { useState } from 'react';
import { Ticket, Calendar, MapPin, QrCode, Check, X } from 'lucide-react';

const TicketBooking = () => {
  const [activeTab, setActiveTab] = useState('book');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const upcomingMatches = [
    { id: 1, opponent: 'Amazulu FC', date: '2024-03-15', time: '15:00', venue: 'Nyamirambo Stadium', price: 5000, available: 150 },
    { id: 2, opponent: 'Police FC', date: '2024-03-22', time: '18:00', venue: 'Amahoro Stadium', price: 3000, available: 200 },
    { id: 3, opponent: 'APRA FC', date: '2024-03-29', time: '15:00', venue: 'Nyamirambo Stadium', price: 4000, available: 180 },
  ];

  const myTickets = [
    { id: 1, match: 'Rayon FC vs Bugesera FC', date: '2024-03-01', seat: 'A12', status: 'used', qrCode: 'QR123' },
    { id: 2, match: 'Rayon FC vs Amazulu FC', date: '2024-03-15', seat: 'B05', status: 'valid', qrCode: 'QR456' },
  ];

  const seatSections = ['A', 'B', 'C', 'D'];
  const seatNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleSeatSelect = (section, number) => {
    const seatId = `${section}${number}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else {
      if (selectedSeats.length < 5) {
        setSelectedSeats([...selectedSeats, seatId]);
      } else {
        alert('Maximum 5 tickets per booking');
      }
    }
  };

  const handleBooking = () => {
    if (!selectedMatch || selectedSeats.length === 0) {
      alert('Please select a match and seats');
      return;
    }
    setBookingSuccess(true);
    setSelectedMatch(null);
    setSelectedSeats([]);
  };

  const total = selectedMatch ? selectedMatch.price * selectedSeats.length : 0;

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">
            Ticket <span className="text-accent">Booking</span>
          </h1>
          <p className="text-gray-400 mt-2">Book your match tickets and get instant access</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-surface-dark border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('book')}
              className={`py-4 px-2 font-medium transition-colors relative ${
                activeTab === 'book' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <Ticket className="w-5 h-5 mr-2" />
                Book Tickets
              </div>
              {activeTab === 'book' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('my-tickets')}
              className={`py-4 px-2 font-medium transition-colors relative ${
                activeTab === 'my-tickets' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <QrCode className="w-5 h-5 mr-2" />
                My Tickets
              </div>
              {activeTab === 'my-tickets' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Book Tickets Tab */}
      {activeTab === 'book' && (
        <section className="py-8 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {bookingSuccess && (
              <div className="bg-green-500/10 border border-green-500 text-green-500 px-6 py-4 rounded-lg mb-8 flex items-center">
                <Check className="w-6 h-6 mr-3" />
                <div>
                  <p className="font-bold">Booking Successful!</p>
                  <p className="text-sm">Your tickets have been sent to your email.</p>
                </div>
                <button onClick={() => setBookingSuccess(false)} className="ml-auto">
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Match Selection */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-heading font-bold text-white mb-6">Select a Match</h2>
                <div className="space-y-4">
                  {upcomingMatches.map((match) => (
                    <div 
                      key={match.id}
                      className={`card p-6 cursor-pointer transition-all ${
                        selectedMatch?.id === match.id ? 'ring-2 ring-accent' : ''
                      }`}
                      onClick={() => { setSelectedMatch(match); setSelectedSeats([]); }}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🔵</span>
                          </div>
                          <div>
                            <h3 className="font-heading font-bold text-white text-lg">vs {match.opponent}</h3>
                            <div className="flex items-center text-gray-400 text-sm mt-1">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {match.time}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 text-right">
                          <p className="text-accent font-bold text-xl">RWF {match.price.toLocaleString()}</p>
                          <p className="text-gray-400 text-sm">{match.available} seats available</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Seat Selection */}
                {selectedMatch && (
                  <div className="mt-8">
                    <h2 className="text-xl font-heading font-bold text-white mb-6">Select Seats</h2>
                    <div className="card p-6">
                      <div className="mb-6">
                        <div className="bg-surface-light p-4 rounded-lg mb-4">
                          <p className="text-gray-400 text-center mb-2">Pitch</p>
                        </div>
                        <div className="grid grid-cols-10 gap-2">
                          {seatSections.map((section) => 
                            seatNumbers.map((number) => (
                              <button
                                key={`${section}${number}`}
                                onClick={() => handleSeatSelect(section, number)}
                                className={`p-2 rounded text-sm font-medium transition-all ${
                                  selectedSeats.includes(`${section}${number}`)
                                    ? 'bg-accent text-primary'
                                    : 'bg-surface-light text-gray-400 hover:bg-surface'
                                }`}
                              >
                                {section}{number}
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">Maximum 5 seats per booking</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Booking Summary */}
              <div>
                <div className="card p-6 sticky top-32">
                  <h3 className="text-lg font-heading font-bold text-white mb-4">Booking Summary</h3>
                  {selectedMatch ? (
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Match</span>
                        <span className="text-white">vs {selectedMatch.opponent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Date</span>
                        <span className="text-white">{new Date(selectedMatch.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Venue</span>
                        <span className="text-white">{selectedMatch.venue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Seats</span>
                        <span className="text-white">{selectedSeats.join(', ') || 'None selected'}</span>
                      </div>
                      <div className="border-t border-gray-800 pt-4">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Price per seat</span>
                          <span className="text-white">RWF {selectedMatch.price.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-xl font-bold text-white">Total</span>
                          <span className="text-xl font-bold text-accent">RWF {total.toLocaleString()}</span>
                        </div>
                      </div>
                      <button 
                        onClick={handleBooking}
                        disabled={selectedSeats.length === 0}
                        className="btn-primary w-full mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-400">Select a match to see booking summary</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* My Tickets Tab */}
      {activeTab === 'my-tickets' && (
        <section className="py-8 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-heading font-bold text-white mb-6">My Tickets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myTickets.map((ticket) => (
                <div key={ticket.id} className="card overflow-hidden">
                  <div className="bg-gradient-to-r from-primary to-secondary p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold">Match Ticket</span>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        ticket.status === 'valid' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                      }`}>
                        {ticket.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading font-bold text-white text-lg mb-4">{ticket.match}</h3>
                    <div className="space-y-2 text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(ticket.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="flex items-center">
                        <Ticket className="w-4 h-4 mr-2" />
                        Seat: {ticket.seat}
                      </div>
                      <div className="flex items-center">
                        <QrCode className="w-4 h-4 mr-2" />
                        Code: {ticket.qrCode}
                      </div>
                    </div>
                    {ticket.status === 'valid' && (
                      <button className="btn-primary w-full mt-4">
                        View QR Code
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default TicketBooking;
