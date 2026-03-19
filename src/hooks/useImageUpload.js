import { useState, useCallback } from 'react';

// Custom hook for managing image uploads with localStorage persistence
export const useImageUpload = (storageKey, defaultImage = null) => {
  // Load initial image from localStorage or use default
  const [image, setImage] = useState(() => {
    if (storageKey) {
      const stored = localStorage.getItem(storageKey);
      if (stored) return stored;
    }
    return defaultImage;
  });

  // Handle file selection and convert to base64
  const handleImageUpload = useCallback((event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result;
      if (typeof base64 === 'string') {
        setImage(base64);
        if (storageKey) {
          localStorage.setItem(storageKey, base64);
        }
      }
    };
    reader.readAsDataURL(file);
  }, [storageKey]);

  // Clear the stored image
  const clearImage = useCallback(() => {
    setImage(defaultImage);
    if (storageKey) {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey, defaultImage]);

  return { image, handleImageUpload, clearImage, setImage };
};

export default useImageUpload;
