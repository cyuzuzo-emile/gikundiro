import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, Moon, Sun, User, LogOut, Calendar, Users, Newspaper, Image, ShoppingBag, Mail, Home, Info, MapPin, Package, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [effectiveDark, setEffectiveDark] = useState(true);

  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setEffectiveDark(isDark);
  }, [isDark]);

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

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

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Settings },
    { name: 'Players', path: '/admin/players', icon: Users },
    { name: 'Staff', path: '/admin/staff', icon: Users },
    { name: 'Matches', path: '/admin/matches', icon: Calendar },
    { name: 'News', path: '/admin/news', icon: Newspaper },
    { name: 'Fans', path: '/admin/fans', icon: Users },
    { name: 'Tickets', path: '/admin/tickets', icon: Calendar },
    { name: 'Orders', path: '/admin/orders', icon: Package },
    { name: 'Shop', path: '/admin/shop', icon: ShoppingBag },
    { name: 'Club', path: '/admin/club', icon: Settings },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${effectiveDark ? 'bg-[var(--bg-surface-dark)]/90 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-md">
              <img
                src="/rayon.jpg"
                alt="Rayon Sports FC Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block">
              <span className={`text-xl font-heading font-bold ${effectiveDark ? 'text-white' : 'text-[var(--primary)]'}`}>RAYON</span>
              <span className={`text-xl font-heading font-bold block -mt-1 ${effectiveDark ? 'text-[var(--accent)]' : 'text-[var(--secondary)]'}`}>SPORTS FC</span>
            </div>
          </Link>

            {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-[var(--primary)] text-white'
                    : effectiveDark
                      ? 'text-white/80 hover:text-[var(--accent)] hover:bg-white/10'
                      : 'text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.name}</span>
              </Link>
              );
            })}
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
                  className={`w-48 border rounded-lg px-4 py-2 focus:outline-none focus:border-[var(--secondary)] ${effectiveDark ? 'bg-[var(--bg-surface-light)] border-[var(--bg-input-border)] text-white placeholder-white/60' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'}`}
                  autoFocus
                />
                <button type="button" onClick={() => setShowSearch(false)} className="absolute right-2 top-1/2 -translate-y-1/2">
                  <X className={`w-4 h-4 ${effectiveDark ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-gray-800'}`} />
                </button>
              </form>
            ) : (
              <button onClick={() => setShowSearch(true)} className={`p-2 transition-colors ${effectiveDark ? 'text-white/80 hover:text-[var(--accent)]' : 'text-gray-600 hover:text-[var(--primary)]'}`}>
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className={`p-2 transition-colors ${effectiveDark ? 'text-white/80 hover:text-[var(--accent)]' : 'text-gray-600 hover:text-[var(--primary)]'}`} title={effectiveDark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {effectiveDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative user-menu-container">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowUserMenu(!showUserMenu); }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${effectiveDark ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary-light)]' : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-light)]'}`}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{user?.name?.split(' ')[0]}</span>
                </button>

                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl overflow-hidden border ${effectiveDark ? 'bg-[var(--bg-surface)] border-[var(--bg-input-border)]' : 'bg-white border-gray-200'}`}>
                    <div className={`p-3 border-b ${effectiveDark ? 'border-[var(--bg-input-border)]' : 'border-gray-200'}`}>
                      <p className={`font-medium ${effectiveDark ? 'text-white' : 'text-gray-900'}`}>{user?.name}</p>
                      <p className={`text-sm ${effectiveDark ? 'text-[var(--text-muted)]' : 'text-gray-500'}`}>{user?.email}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${user?.role === 'admin' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--secondary)] text-white'}`}>
                        {user?.role?.toUpperCase()}
                      </span>
                    </div>
                    <div className={`py-2 ${effectiveDark ? 'bg-[var(--bg-surface)]' : 'bg-white'}`}>
                      {isAdmin ? (
                        adminLinks.map((link) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.path}
                              to={link.path}
                              className={`flex items-center space-x-3 px-4 py-2 transition-colors ${effectiveDark ? 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-light)] hover:text-[var(--accent)]' : 'text-gray-700 hover:bg-gray-100 hover:text-[var(--primary)]'}`}
                            >
                              {Icon && <Icon className="w-5 h-5" />}
                              <span>{link.name}</span>
                            </Link>
                          );
                        })
                      ) : (
                        <>
                          <Link to="/fan/dashboard" className={`flex items-center space-x-3 px-4 py-2 transition-colors ${effectiveDark ? 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-light)] hover:text-[var(--accent)]' : 'text-gray-700 hover:bg-gray-100 hover:text-[var(--primary)]'}`}>
                            <Home className="w-5 h-5" />
                            <span>Dashboard</span>
                          </Link>
                          <Link to="/fan/tickets" className={`flex items-center space-x-3 px-4 py-2 transition-colors ${effectiveDark ? 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-light)] hover:text-[var(--accent)]' : 'text-gray-700 hover:bg-gray-100 hover:text-[var(--primary)]'}`}>
                            <Calendar className="w-5 h-5" />
                            <span>My Tickets</span>
                          </Link>
                          <Link to="/fan/profile" className={`flex items-center space-x-3 px-4 py-2 transition-colors ${effectiveDark ? 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface-light)] hover:text-[var(--accent)]' : 'text-gray-700 hover:bg-gray-100 hover:text-[var(--primary)]'}`}>
                            <User className="w-5 h-5" />
                            <span>Profile</span>
                          </Link>
                        </>
                      )}
                      <button
                        onClick={handleLogout}
                        className={`flex items-center space-x-3 w-full px-4 py-2 transition-colors ${effectiveDark ? 'text-red-400 hover:bg-[var(--bg-surface-light)]' : 'text-red-600 hover:bg-gray-100'}`}
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
                <Link to="/login" className={`btn-outline text-sm ${effectiveDark ? 'border-[var(--secondary)] text-[var(--secondary)] hover:bg-[var(--secondary)] hover:text-white' : ''}`}>
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
            className={`lg:hidden p-2 transition-colors ${effectiveDark ? 'text-white/80 hover:text-white' : 'text-gray-700'}`}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`lg:hidden border-t ${effectiveDark ? 'bg-[var(--bg-surface)] border-[var(--bg-input-border)]' : 'bg-white border-gray-200'}`}>
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'bg-[var(--primary)] text-white'
                    : effectiveDark
                      ? 'text-white/80 hover:bg-[var(--bg-surface-light)] hover:text-[var(--accent)]'
                      : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{link.name}</span>
              </Link>
            ))}

            {isAuthenticated && (
              <>
                <div className={`border-t my-4 ${effectiveDark ? 'border-[var(--bg-input-border)]' : 'border-gray-200'}`}></div>
                {isAdmin ? (
                  adminLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${effectiveDark ? 'text-white/80 hover:bg-[var(--bg-surface-light)] hover:text-[var(--accent)]' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      <span>{link.name}</span>
                    </Link>
                  ))
                ) : (
                  <>
                    <Link to="/fan/dashboard" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${effectiveDark ? 'text-white/80 hover:bg-[var(--bg-surface-light)] hover:text-[var(--accent)]' : 'text-gray-700 hover:bg-gray-100'}`}>
                      <span>Dashboard</span>
                    </Link>
                    <Link to="/fan/tickets" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${effectiveDark ? 'text-white/80 hover:bg-[var(--bg-surface-light)] hover:text-[var(--accent)]' : 'text-gray-700 hover:bg-gray-100'}`}>
                      <span>My Tickets</span>
                    </Link>
                    <Link to="/fan/profile" className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${effectiveDark ? 'text-white/80 hover:bg-[var(--bg-surface-light)] hover:text-[var(--accent)]' : 'text-gray-700 hover:bg-gray-100'}`}>
                      <span>Profile</span>
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors ${effectiveDark ? 'text-red-400 hover:bg-[var(--bg-surface-light)]' : 'text-red-600 hover:bg-gray-100'}`}
                >
                  <span>Logout</span>
                </button>
              </>
            )}

            {!isAuthenticated && (
              <div className={`flex space-x-3 pt-4 border-t ${effectiveDark ? 'border-[var(--bg-input-border)]' : 'border-gray-200'}`}>
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

export default Navbar;
