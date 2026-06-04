import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { isDark } = useTheme();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Team', path: '/team' },
    { name: 'Matches', path: '/matches' },
    { name: 'News', path: '/news' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact', path: '/contact' },
  ];

  const competitions = [
    { name: 'Premier League', path: '/matches' },
    { name: 'Cup Competitions', path: '/matches' },
    { name: 'African Champions League', path: '/matches' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Youtube, href: '#', name: 'YouTube' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
  ];

  return (
    <footer className={isDark ? 'bg-[var(--bg-surface)]' : 'bg-[var(--primary)]'}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md">
                <img
                  src="/rayon.jpg"
                  alt="Rayon Sports FC Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className={`text-xl font-heading font-bold ${isDark ? 'text-white' : 'text-white'}`}>RAYON</span>
                <span className={`text-xl font-heading font-bold block -mt-1 ${isDark ? 'text-[var(--accent)]' : 'text-white/80'}`}>SPORTS FC</span>
              </div>
            </div>
            <p className={`mb-4 ${isDark ? 'text-[var(--text-secondary)]' : 'text-blue-200'}`}>
              Pride of Rwanda, Glory in Africa. The official home of Rayon Sports Football Club.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-[var(--bg-surface-light)] text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--bg-surface-light)]' : 'bg-white/10 text-white hover:bg-white hover:text-[var(--primary)]'}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-lg font-heading font-bold mb-4 ${isDark ? 'text-white' : 'text-white'}`}>Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={`transition-colors ${isDark ? 'text-[var(--text-secondary)] hover:text-[var(--accent)]' : 'text-blue-200 hover:text-white'}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Competitions */}
          <div>
            <h3 className={`text-lg font-heading font-bold mb-4 ${isDark ? 'text-white' : 'text-white'}`}>Competitions</h3>
            <ul className="space-y-2">
              {competitions.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={`transition-colors ${isDark ? 'text-[var(--text-secondary)] hover:text-[var(--accent)]' : 'text-blue-200 hover:text-white'}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`text-lg font-heading font-bold mb-4 ${isDark ? 'text-white' : 'text-white'}`}>Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isDark ? 'text-[var(--text-secondary)]' : 'text-white'}`} />
                <span className={isDark ? 'text-[var(--text-secondary)]' : 'text-blue-200'}>
                  Nyamirambo Stadium<br />
                  Kigali, Rwanda
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-[var(--text-secondary)]' : 'text-white'}`} />
                <span className={isDark ? 'text-[var(--text-secondary)]' : 'text-blue-200'}>+250 788 123 456</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-[var(--text-secondary)]' : 'text-white'}`} />
                <span className={isDark ? 'text-[var(--text-secondary)]' : 'text-blue-200'}>info@rayonsportsfc.rw</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className={isDark ? 'bg-[var(--bg-surface-dark)] border-t border-[var(--bg-input-border)]' : 'bg-blue-900/50 border-t border-blue-800'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className={`text-xl font-heading font-bold ${isDark ? 'text-white' : 'text-white'}`}>Subscribe to Our Newsletter</h3>
              <p className={isDark ? 'text-[var(--text-secondary)]' : 'text-blue-200'}>Get the latest news and updates directly to your inbox</p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 md:w-64 rounded-l-lg px-4 py-3 focus:outline-none focus:border-white ${isDark ? 'bg-[var(--bg-surface-light)] border border-[var(--bg-input-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)]' : 'bg-white border border-gray-300 text-gray-800 placeholder-gray-400'}`}
              />
              <button type="submit" className={`font-bold py-3 px-6 rounded-r-lg transition-colors ${isDark ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-light)]' : 'bg-white text-[var(--primary)] hover:bg-blue-50'}`}>
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={isDark ? 'border-t border-[var(--bg-input-border)]' : 'border-t border-gray-800'}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className={`text-sm ${isDark ? 'text-[var(--text-muted)]' : 'text-gray-500'}`}>
              © {currentYear} Rayon Sports FC. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className={`transition-colors ${isDark ? 'text-[var(--text-muted)] hover:text-[var(--accent)]' : 'text-gray-500 hover:text-white'}`}>Privacy Policy</a>
              <a href="#" className={`transition-colors ${isDark ? 'text-[var(--text-muted)] hover:text-[var(--accent)]' : 'text-gray-500 hover:text-white'}`}>Terms of Service</a>
              <a href="#" className={`transition-colors ${isDark ? 'text-[var(--text-muted)] hover:text-[var(--accent)]' : 'text-gray-500 hover:text-white'}`}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
