import React, { useState } from 'react';
import { Calendar, User, ArrowRight, ChevronRight, Search } from 'lucide-react';

const News = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Announcement', 'Match Report', 'Transfer', 'General'];

  const news = [
    { id: 1, title: 'Rayon Sports Clinch Historic Victory in Dramatic Fashion', category: 'Match Report', date: '2024-03-08', author: 'Sports Desk', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=400&fit=crop', excerpt: 'In an electrifying match at Nyamirambo Stadium, Rayon Sports FC secured a memorable victory...' },
    { id: 2, title: 'New Signing: Welcome to the Club - Emmanuel Hakizimana', category: 'Transfer', date: '2024-03-05', author: 'Transfer News', image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=400&fit=crop', excerpt: 'We are delighted to announce the signing of Emmanuel Hakizimana from rivals...' },
    { id: 3, title: 'Match Day Preview: Rayon Sports vs Amazulu FC', category: 'Announcement', date: '2024-03-02', author: 'Match Preview', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop', excerpt: 'All eyes will be on Nyamirambo Stadium this Saturday as we face Amazulu FC...' },
    { id: 4, title: 'Club Statement: Youth Development Program Expansion', category: 'General', date: '2024-02-28', author: 'Club Official', image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=400&fit=crop', excerpt: 'Rayon Sports FC is proud to announce the expansion of our youth development program...' },
    { id: 5, title: 'Player of the Month: Jacques Mugisha', category: 'Announcement', date: '2024-02-25', author: 'Awards Desk', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop', excerpt: 'Congratulations to Jacques Mugisha for being named Player of the Month...' },
    { id: 6, title: 'Match Report: Rayon Sports 3-1 Bugesera FC', category: 'Match Report', date: '2024-02-20', author: 'Match Reporter', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=400&fit=crop', excerpt: 'A comprehensive victory as Rayon Sports FC dominated proceedings from start to finish...' },
  ];

  const filteredNews = news.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredNews[0];
  const remainingNews = filteredNews.slice(1);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-surface">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=600&fit=crop" 
            alt="News" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4">
            Latest <span className="gradient-text">News</span>
          </h1>
          <p className="text-xl text-gray-400">Stay updated with all the latest from Rayon Sports FC</p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-surface-dark sticky top-20 z-30 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeCategory === category
                      ? 'bg-secondary text-white'
                      : 'bg-surface text-gray-400 hover:bg-surface-light'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-surface border border-gray-700 rounded-lg text-white focus:outline-none focus:border-secondary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length > 0 ? (
            <>
              {/* Featured News */}
              {featuredNews && (
                <div className="mb-12">
                  <article className="card group overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative h-64 lg:h-96">
                        <img 
                          src={featuredNews.image} 
                          alt={featuredNews.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-secondary text-white text-sm rounded-full">
                            {featuredNews.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center text-gray-400 text-sm mb-4">
                          <Calendar className="w-4 h-4 mr-2" />
                          {new Date(featuredNews.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          <User className="w-4 h-4 ml-4 mr-2" />
                          {featuredNews.author}
                        </div>
                        <h2 className="text-2xl lg:text-3xl font-heading font-bold text-white mb-4 group-hover:text-accent transition-colors">
                          {featuredNews.title}
                        </h2>
                        <p className="text-gray-400 mb-6">{featuredNews.excerpt}</p>
                        <button className="inline-flex items-center text-secondary hover:text-accent transition-colors font-medium">
                          Read Full Article <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                      </div>
                    </div>
                  </article>
                </div>
              )}

              {/* Remaining News Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {remainingNews.map((article) => (
                  <article key={article.id} className="card group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-secondary text-white text-sm rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-gray-400 text-sm mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">{article.excerpt}</p>
                      <button className="inline-flex items-center text-secondary hover:text-accent transition-colors text-sm font-medium">
                        Read More <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">No news articles found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
