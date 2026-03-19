import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Eye, Image, Users, ShoppingCart, Home } from 'lucide-react';

const ManageImages = () => {
  const [activeCategory, setActiveCategory] = useState('players');
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState({});

  // Image categories configuration - using storage keys that match the pages
  const imageCategories = {
    players: {
      label: 'Players',
      icon: Users,
      items: [
        { id: 1, storageKey: 'player_image_1', name: 'Kwizera Olivier - Goalkeeper', defaultImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
        { id: 2, storageKey: 'player_image_2', name: 'Niyonkuru Patrick - Defender', defaultImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
        { id: 3, storageKey: 'player_image_3', name: 'Hakizimana Emmanuel - Midfielder', defaultImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
        { id: 4, storageKey: 'player_image_4', name: 'UMUKIZA Obed - Forward', defaultImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop' },
        { id: 5, storageKey: 'player_image_5', name: 'Bizimana Sam - Defender', defaultImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
        { id: 6, storageKey: 'player_image_6', name: 'Ndatimana Gilbert - Midfielder', defaultImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop' },
      ]
    },
    products: {
      label: 'Products',
      icon: ShoppingCart,
      items: [
        { id: 1, storageKey: 'product_1', name: '2024 Home Jersey', defaultImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop' },
        { id: 2, storageKey: 'product_2', name: '2024 Away Jersey', defaultImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=400&fit=crop' },
        { id: 3, storageKey: 'product_3', name: 'Official Scarf', defaultImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop' },
        { id: 4, storageKey: 'product_4', name: 'Club Cap', defaultImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop' },
        { id: 5, storageKey: 'product_5', name: 'Flag Banner', defaultImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=400&h=400&fit=crop' },
        { id: 6, storageKey: 'product_6', name: 'Season Ticket 2024', defaultImage: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=400&fit=crop' },
      ]
    },
    heroes: {
      label: 'Hero/Banner Images',
      icon: Home,
      items: [
        { id: 'hero_home', storageKey: 'hero_home', name: 'Home Page Hero', defaultImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&h=600&fit=crop' },
        { id: 'hero_team', storageKey: 'hero_team', name: 'Team Page Hero', defaultImage: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1920&h=600&fit=crop' },
        { id: 'hero_shop', storageKey: 'hero_shop', name: 'Shop Page Hero', defaultImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=1920&h=600&fit=crop' },
      ]
    }
  };

  // Load all uploaded images from localStorage
  useEffect(() => {
    const loadImages = () => {
      const images = {};
      Object.keys(imageCategories).forEach(category => {
        imageCategories[category].items.forEach(item => {
          const stored = localStorage.getItem(item.storageKey);
          if (stored) images[item.id] = stored;
        });
      });
      setUploadedImages(images);
    };
    loadImages();
  }, []);

  // Refresh images when category changes
  useEffect(() => {
    const images = {};
    Object.keys(imageCategories).forEach(category => {
      imageCategories[category].items.forEach(item => {
        const stored = localStorage.getItem(item.storageKey);
        if (stored) images[item.id] = stored;
      });
    });
    setUploadedImages(images);
  }, [activeCategory]);

  // Handle image upload
  const handleImageUpload = (item, event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result;
      if (typeof base64 === 'string') {
        // Save using the storageKey
        localStorage.setItem(item.storageKey, base64);
        setUploadedImages(prev => ({ ...prev, [item.id]: base64 }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Clear image
  const handleClearImage = (item) => {
    if (window.confirm('Are you sure you want to remove this custom image?')) {
      localStorage.removeItem(item.storageKey);
      setUploadedImages(prev => {
        const newImages = { ...prev };
        delete newImages[item.id];
        return newImages;
      });
    }
  };

  // Get current image (uploaded or default)
  const getCurrentImage = (item) => {
    return uploadedImages[item.id] || item.defaultImage;
  };

  const currentCategory = imageCategories[activeCategory];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">
            Manage <span className="text-accent">Images</span>
          </h1>
          <p className="text-gray-400 mt-2">Upload and manage images across the website</p>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {Object.entries(imageCategories).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                    activeCategory === key
                      ? 'bg-secondary text-white'
                      : 'bg-surface-light text-gray-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCategory.items.map((item) => (
              <div key={item.id} className="card overflow-hidden">
                {/* Image Preview */}
                <div className="relative h-48 bg-surface-light">
                  <img
                    src={getCurrentImage(item)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  {uploadedImages[item.id] && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Custom
                    </div>
                  )}
                </div>

                {/* Item Info */}
                <div className="p-4">
                  <h3 className="font-medium text-white mb-3">{item.name}</h3>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <label className="flex-1 btn-primary flex items-center justify-center cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(item, e)}
                        className="hidden"
                      />
                    </label>
                    {uploadedImages[item.id] && (
                      <>
                        <button
                          onClick={() => setPreviewImage(getCurrentImage(item))}
                          className="p-2 bg-surface-light text-gray-400 hover:text-white rounded-lg"
                          title="Preview"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleClearImage(item)}
                          className="p-2 bg-surface-light text-red-400 hover:text-red-300 rounded-lg"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              Close
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageImages;
