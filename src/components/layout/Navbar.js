import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Moon, Sun, User, LogOut, Trophy, Calendar, Users, Newspaper, Image, ShoppingBag, Mail, Home, Info, Target, MapPin, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowUserMenu(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Team', path: '/team', icon: Users },
    { name: 'Matches', path: '/matches', icon: Calendar },
    { name: 'News', path: '/news', icon: Newspaper },
    { name: 'Gallery', path: '/gallery', icon: Image },
    { name: 'Shop', path: '/shop', icon: ShoppingBag },
    { name: 'Contact', path: '/contact', icon: Mail },
  ];

  const fanLinks = [
    { name: 'Dashboard', path: '/fan/dashboard', icon: Home },
    { name: 'My Tickets', path: '/fan/tickets', icon: Ticket },
    { name: 'Community', path: '/fan/community', icon: Users },
    { name: 'Profile', path: '/fan/profile', icon: User },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
    { name: 'Players', path: '/admin/players', icon: Users },
    { name: 'Matches', path: '/admin/matches', icon: Calendar },
    { name: 'News', path: '/admin/news', icon: Newspaper },
    { name: 'Fans', path: '/admin/fans', icon: Users },
    { name: 'Tickets', path: '/admin/tickets', icon: Ticket },
    { name: 'Orders', path: '/admin/orders', icon: Package },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg border-b border-gray-200' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-white">
              <img 
                src="/rayon.jpg" 
                alt="Rayon Sports FC Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-heading font-bold text-primary">RAYON</span>
              <span className="text-xl font-heading font-bold text-secondary block -mt-1">SPORTS FC</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search */}
            {showSearch ? (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-48 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:border-primary"
                  autoFocus
                />
                <button type="button" onClick={() => setShowSearch(false)} className="absolute right-2 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </form>
            ) : (
              <button onClick={() => setShowSearch(true)} className="p-2 text-gray-700 hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 text-gray-700 hover:text-primary transition-colors">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary-light transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="font-medium">{user?.name?.split(' ')[0]}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                    <div className="p-3 border-b border-gray-200">
                      <p className="text-gray-900 font-medium">{user?.name}</p>
                      <p className="text-gray-500 text-sm">{user?.email}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                        user?.role === 'admin' ? 'bg-primary text-white' : 'bg-secondary text-white'
                      }`}>
                        {user?.role?.toUpperCase()}
                      </span>
                    </div>
                    <div className="py-2">
                      {isAdmin ? (
                        adminLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary"
                          >
                            <link.icon className="w-5 h-5" />
                            <span>{link.name}</span>
                          </Link>
                        ))
                      ) : (
                        fanLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-primary"
                          >
                            <link.icon className="w-5 h-5" />
                            <span>{link.name}</span>
                          </Link>
                        ))
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-2 text-red-600 hover:bg-gray-100"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="btn-outline text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Join Fan Club
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                  location.pathname === link.path
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            ))}
            
            {isAuthenticated && (
              <>
                <div className="border-t border-gray-200 my-4"></div>
                {isAdmin ? (
                  adminLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                      <link.icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </Link>
                  ))
                ) : (
                  fanLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100"
                    >
                      <link.icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </Link>
                  ))
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-gray-100"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            )}

            {!isAuthenticated && (
              <div className="flex space-x-3 pt-4">
                <Link to="/login" className="btn-outline flex-1 text-center text-sm">
                  Login
                </Link>
                <Link to="/register" className="btn-primary flex-1 text-center text-sm">
                  Join Fan Club
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Ticket icon - define inline since it's not imported
const Ticket = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2" />
    <path d="M13 17v2" />
    <path d="M13 11v2" />
  </svg>
);

export default Navbar;
