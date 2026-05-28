import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Trophy, ArrowRight, Clock, MapPin, ChevronRight, Mail } from 'lucide-react';
import { playersAPI, matchesAPI, newsAPI } from '../../services/api';

const Home = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [featuredPlayers, setFeaturedPlayers] = useState([]);
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
     const fetchData = async () => {
       try {
         const [matchesRes, playersRes, newsRes] = await Promise.all([
           matchesAPI.getAll(),
           playersAPI.getAll(),
           newsAPI.getAll()
         ]);
         const matches = matchesRes.data || [];
         setUpcomingMatches(matches.filter(m => new Date(m.date) >= new Date()).slice(0, 3));
         setFeaturedPlayers((playersRes.data || []).slice(0, 4));
         setLatestNews((newsRes.data || []).slice(0, 3));
       } catch (error) {
         console.error('Error fetching data:', error);
       }
     };
     fetchData();
   }, []);

  const achievements = [
    { title: 'Rwanda Premier League', count: 4, year: '2010, 2012, 2019, 2023' },
    { title: 'Rwanda Cup', count: 5, year: '2009, 2011, 2013, 2017, 2022' },
    { title: 'Rwanda Super Cup', count: 3, year: '2012, 2019, 2023' },
    { title: 'CECAFA Cup', count: 2, year: '2016, 2018' },
  ];

  const sponsors = [
    { name: 'Rwanda Energy Group', logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=60&fit=crop' },
    { name: 'Bank of Kigali', logo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=60&fit=crop' },
    { name: 'Rwanda Air', logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=60&fit=crop' },
    { name: 'Tigo', logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=60&fit=crop' },
    { name: 'Coca Cola', logo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=60&fit=crop' },
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${newsletterEmail}!`);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-surface-dark to-secondary/30">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        {/* Background Image */}
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&h=1080&fit=crop" 
            alt="Stadium" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="animate-fade-in">
            {/* Logo */}
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-white shadow-2xl">
              <img 
                src="/rayon.jpg" 
                alt="Rayon Sports FC Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl md:text-2xl font-body text-accent mb-4 tracking-widest uppercase">Established 1963</h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6">
              RAYON <span className="gradient-text">SPORTS</span> FC
            </h1>
            <p className="text-xl md:text-2xl font-body text-gray-300 mb-9">
              Pride of Rwanda, Glory in Africa
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/shop" className="btn-accent text-lg px-8 py-4">
                Buy Tickets
              </Link>
              <Link to="/register" className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary">
                Join Fan Club
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-20 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="section-title text-left">Latest News</h2>
              <p className="text-gray-400 mt-2">Stay updated with the latest from the club</p>
            </div>
            <Link to="/news" className="btn-outline hidden md:flex items-center">
              View All <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((news) => (
              <article key={news.id} className="card group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-secondary text-white text-sm rounded-full">
                      {news.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-gray-400 text-sm mb-3">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(news.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-accent transition-colors">
                    {news.title}
                  </h3>
                  <Link to={`/news/${news.id}`} className="inline-flex items-center text-secondary hover:text-accent transition-colors">
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/news" className="btn-outline">
              View All News <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Matches Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Upcoming Matches</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="card bg-surface-light p-6">
                <div className="text-center mb-4">
                  <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                    {match.competition}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🔵</span>
                    </div>
                    <h3 className="font-heading font-bold text-white">Rayon FC</h3>
                    <span className="text-sm text-gray-400">Home</span>
                  </div>
                  <div className="px-4 text-center">
                    <span className="text-3xl font-heading font-bold text-accent">VS</span>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="w-16 h-16 mx-auto mb-2 bg-secondary/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🟢</span>
                    </div>
                    <h3 className="font-heading font-bold text-white">{match.opponent}</h3>
                    <span className="text-sm text-gray-400">Away</span>
                  </div>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex items-center justify-center space-x-6 text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(match.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {match.time}
                    </div>
                  </div>
                  <div className="flex items-center justify-center mt-2 text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    {match.venue}
                  </div>
                </div>
                <Link to={`/matches`} className="btn-primary w-full mt-4 text-center">
                  Book Tickets
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/matches" className="btn-outline">
              View Full Schedule <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Players Section */}
      <section className="py-20 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Featured Players</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {featuredPlayers.map((player) => (
              <div key={player.id} className="card group">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={player.image} 
                    alt={player.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="absolute top-4 right-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center text-primary font-heading font-bold text-xl">
                      {player.number}
                    </span>
                    <h3 className="text-2xl font-heading font-bold text-white">{player.name}</h3>
                    <p className="text-gray-300">{player.position}</p>
                    <p className="text-gray-400 text-sm flex items-center mt-1">
                      <span className="mr-1">🇷🇼</span> {player.nationality}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/team" className="btn-outline">
              View Full Squad <ChevronRight className="w-5 h-5 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-white">Our Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 bg-white/10 rounded-xl backdrop-blur-sm">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-4xl font-heading font-bold text-accent mb-2">{achievement.count}</h3>
                <p className="text-white font-medium mb-1">{achievement.title}</p>
                <p className="text-gray-300 text-sm">{achievement.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Our Sponsors</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-12">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="flex items-center justify-center p-6 bg-surface-light rounded-xl hover:bg-white/5 transition-colors">
                <img src={sponsor.logo} alt={sponsor.name} className="h-12 grayscale hover:grayscale-0 transition-all" />
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 mt-8">
            Interested in sponsoring Rayon Sports FC? <Link to="/contact" className="text-secondary hover:text-accent">Contact us</Link>
          </p>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-surface-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Mail className="w-16 h-16 mx-auto mb-6 text-accent" />
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-400 mb-8">
            Get the latest news, match updates, and exclusive content delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="input-field flex-1"
            />
            <button type="submit" className="btn-accent whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
