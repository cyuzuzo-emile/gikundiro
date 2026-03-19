import React, { useRef } from 'react';
import { Camera, X } from 'lucide-react';

const ImageUpload = ({ 
  image, 
  onImageChange, 
  onClear, 
  size = 'md',
  rounded = true,
  className = '' 
}) => {
  const fileInputRef = useRef(null);

  // Size classes
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  // Icon size
  const iconSize = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onClear?.();
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div 
        onClick={handleClick}
        className={`
          ${sizeClasses[size]} 
          ${rounded ? 'rounded-full' : 'rounded-lg'}
          overflow-hidden border-2 border-dashed border-gray-600 
          cursor-pointer hover:border-accent transition-colors
          bg-surface-light flex items-center justify-center
        `}
      >
        {image ? (
          <img 
            src={image} 
            alt="Upload" 
            className={`w-full h-full object-cover ${rounded ? 'rounded-full' : 'rounded-lg'}`}
          />
        ) : (
          <div className="text-gray-500 flex flex-col items-center">
            <Camera className={iconSize[size]} />
            <span className="text-xs mt-1">Upload</span>
          </div>
        )}
      </div>
      
      {/* Camera/Upload button overlay */}
      <button
        onClick={handleClick}
        className={`
          absolute bottom-0 right-0 
          ${size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8'}
          bg-accent rounded-full flex items-center justify-center 
          text-primary hover:bg-accent-light transition-colors
          ${rounded ? 'rounded-full' : 'rounded-lg'}
        `}
      >
        <Camera className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      </button>

      {/* Clear button (only when image exists) */}
      {image && onClear && (
        <button
          onClick={handleClear}
          className={`
            absolute top-0 right-0 
            ${size === 'sm' ? 'w-5 h-5' : 'w-6 h-6'}
            bg-red-500 rounded-full flex items-center justify-center
            text-white hover:bg-red-600 transition-colors
          `}
        >
          <X className={size === 'sm' ? 'w-3 h-3' : 'w-3 h-3'} />
        </button>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
