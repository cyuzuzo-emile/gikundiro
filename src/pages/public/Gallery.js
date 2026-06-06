import React, { useState, useEffect } from 'react';
import { Image, Play, X, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { playersAPI } from '../../services/api';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [players, setPlayers] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

  const galleryPhotos = [
    { id: 1, src: `${API_URL}/uploads/gallery/olivie.jpeg`, alt: 'Olivie' },
    { id: 2, src: `${API_URL}/uploads/gallery/fall.jpeg`, alt: 'Fall' },
    { id: 3, src: `${API_URL}/uploads/gallery/basane.jpeg`, alt: 'Basane' },
    { id: 4, src: `${API_URL}/uploads/gallery/murer.jpeg`, alt: 'Murer' },
    { id: 5, src: `${API_URL}/uploads/gallery/kevin.jpg`, alt: 'Kevin' },
    { id: 6, src: `${API_URL}/uploads/gallery/ray.jpg`, alt: 'Rayon Sports FC' },
    { id: 7, src: `${API_URL}/uploads/gallery/rayon.jpg`, alt: 'Rayon FC' },
  ];

  useEffect(() => {
    playersAPI.getAll()
      .then(res => {
        const data = res.data || [];
        setPlayers(data);
        // build player photo list for lightbox
        const playerPhotos = data
          .filter(p => p.photo)
          .map((p, i) => ({
            id: `p-${p.id}`,
            src: p.photo.startsWith('http') ? p.photo : `${API_URL}${p.photo}`,
            alt: `${p.name} - ${p.position}`,
            name: p.name,
            position: p.position,
            number: p.jersey_number,
          }));
        setAllPhotos(playerPhotos);
      })
      .catch(e => console.error(e));
  }, [API_URL]);

  const openImage = (photo, index, photoList) => {
    setSelectedImage({ ...photo, list: photoList });
    setSelectedIndex(index);
  };

  const prevImage = () => {
    const list = selectedImage.list;
    const newIndex = (selectedIndex - 1 + list.length) % list.length;
    setSelectedImage({ ...list[newIndex], list });
    setSelectedIndex(newIndex);
  };

  const nextImage = () => {
    const list = selectedImage.list;
    const newIndex = (selectedIndex + 1) % list.length;
    setSelectedImage({ ...list[newIndex], list });
    setSelectedIndex(newIndex);
  };

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
            {[
              { id: 'photos', label: 'Photos', icon: Image },
              { id: 'players', label: 'Players', icon: Users },
              { id: 'videos', label: 'Videos', icon: Play },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`py-4 px-2 font-medium transition-colors relative ${
                  activeTab === id ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-2" />
                  {label}
                </div>
                {activeTab === id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photos Grid */}
      {activeTab === 'photos' && (
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => openImage(photo, index, galleryPhotos)}
                >
                  <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Image className="w-12 h-12 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Players Photos Grid */}
      {activeTab === 'players' && (
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {allPhotos.length === 0 ? (
              <div className="text-center py-20">
                <Users className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                <p className="text-gray-400">No player photos available yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                    onClick={() => openImage(photo, index, allPhotos)}
                  >
                    <img src={photo.src} alt={photo.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                      <span className="text-accent font-bold text-xl">#{photo.number}</span>
                      <span className="text-white font-heading font-bold text-sm mt-1">{photo.name}</span>
                      <span className="text-gray-300 text-xs">{photo.position}</span>
                    </div>
                    {/* Player name badge */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <p className="text-white font-bold text-sm">{photo.name}</p>
                      <p className="text-accent text-xs">{photo.position}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
          <button onClick={() => setSelectedImage(null)} className="absolute top-4 right-4 p-2 text-white hover:text-accent transition-colors">
            <X className="w-8 h-8" />
          </button>
          <button onClick={prevImage} className="absolute left-4 p-2 text-white hover:text-accent transition-colors">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <img src={selectedImage.src} alt={selectedImage.alt} className="max-w-4xl max-h-[90vh] object-contain" />
          <button onClick={nextImage} className="absolute right-4 p-2 text-white hover:text-accent transition-colors">
            <ChevronRight className="w-8 h-8" />
          </button>
          <div className="absolute bottom-4 text-center text-white">
            <p className="text-lg font-bold">{selectedImage.name || selectedImage.alt}</p>
            {selectedImage.position && <p className="text-accent text-sm">{selectedImage.position}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
