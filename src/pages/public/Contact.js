import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-surface">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&h=600&fit=crop" 
            alt="Contact" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-xl text-gray-400">Get in touch with Rayon Sports FC</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="card p-8">
              <h2 className="text-2xl font-heading font-bold text-white mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-400 mb-2">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-400 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-400 mb-2">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="tickets">Ticket Information</option>
                    <option value="sponsorship">Sponsorship</option>
                    <option value="media">Media & Press</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-400 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="input-field resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="card p-6">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white mb-2">Address</h3>
                  <p className="text-gray-400">
                    Nyamirambo Sector<br />
                    Kigali City, Rwanda<br />
                    East Africa
                  </p>
                </div>
                <div className="card p-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white mb-2">Phone</h3>
                  <p className="text-gray-400">
                    +250 788 123 456<br />
                    +250 788 789 012<br />
                    +250 788 345 678
                  </p>
                </div>
                <div className="card p-6">
                  <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white mb-2">Email</h3>
                  <p className="text-gray-400">
                    info@rayonsportsfc.rw<br />
                    tickets@rayonsportsfc.rw<br />
                    media@rayonsportsfc.rw
                  </p>
                </div>
                <div className="card p-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-white mb-2">Office Hours</h3>
                  <p className="text-gray-400">
                    Mon - Fri: 8:00 AM - 6:00 PM<br />
                    Sat: 9:00 AM - 4:00 PM<br />
                    Sun: Closed
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="card overflow-hidden">
                <div className="h-64 bg-surface-light flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Nyamirambo Stadium</p>
                    <p className="text-gray-500">Kigali, Rwanda</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card p-6">
                <div className="flex items-center mb-4">
                  <MessageSquare className="w-6 h-6 text-accent mr-2" />
                  <h3 className="text-lg font-heading font-bold text-white">Social Media</h3>
                </div>
                <p className="text-gray-400 mb-4">Follow us on social media for the latest updates</p>
                <div className="flex space-x-4">
                  {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="px-4 py-2 bg-surface-light rounded-lg text-gray-400 hover:bg-secondary hover:text-white transition-colors"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
