import React, { useState } from 'react';
import { Image, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [selectedImage, setSelectedImage] = useState(null);

  const photos = [
    { id: 1, src: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop', alt: 'Match Day' },
    { id: 2, src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=600&fit=crop', alt: 'Training' },
    { id: 3, src: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=600&fit=crop', alt: 'Celebration' },
    { id: 4, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop', alt: 'Players' },
    { id: 5, src: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=600&fit=crop', alt: 'Stadium' },
    { id: 6, src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop', alt: 'Fans' },
    { id: 7, src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop', alt: 'Trophy' },
    { id: 8, src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop', alt: 'Team' },
  ];

  const videos = [
    { id: 1, title: 'Match Highlights: Rayon 3-1 Bugesera', thumbnail: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=400&fit=crop', duration: '4:32', views: '12K' },
    { id: 2, title: 'Player Interviews: Jacques Mugisha', thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop', duration: '8:15', views: '5.2K' },
    { id: 3, title: 'Training Session Highlights', thumbnail: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=400&fit=crop', duration: '6:45', views: '3.8K' },
    { id: 4, title: 'Club Documentary: Our Journey', thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop', duration: '15:20', views: '8.9K' },
    { id: 5, title: 'Fans Chant Compilation', thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=400&fit=crop', duration: '3:10', views: '6.5K' },
    { id: 6, title: 'Goal of the Month: February', thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=400&fit=crop', duration: '2:45', views: '9.1K' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-surface">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1920&h=600&fit=crop" 
            alt="Gallery" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4">
            Media <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-xl text-gray-400">Photos and videos from Rayon Sports FC</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-surface-dark sticky top-20 z-30 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('photos')}
              className={`py-4 px-2 font-medium transition-colors relative ${
                activeTab === 'photos' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <Image className="w-5 h-5 mr-2" />
                Photos
              </div>
              {activeTab === 'photos' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`py-4 px-2 font-medium transition-colors relative ${
                activeTab === 'videos' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Videos
              </div>
              {activeTab === 'videos' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Photos Grid */}
      {activeTab === 'photos' && (
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div 
                  key={photo.id} 
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => setSelectedImage(photo)}
                >
                  <img 
                    src={photo.src} 
                    alt={photo.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Image className="w-12 h-12 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos Grid */}
      {activeTab === 'videos' && (
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div key={video.id} className="card group overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-primary ml-1" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-heading font-bold text-white mb-2 group-hover:text-accent transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{video.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-white hover:text-accent transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <button className="absolute left-4 p-2 text-white hover:text-accent transition-colors">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage.src} 
            alt={selectedImage.alt} 
            className="max-w-4xl max-h-[90vh] object-contain"
          />
          <button className="absolute right-4 p-2 text-white hover:text-accent transition-colors">
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-4 text-white">
            <p className="text-lg font-medium">{selectedImage.alt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
