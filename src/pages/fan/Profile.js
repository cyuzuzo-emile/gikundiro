import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Camera, Save, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useImageUpload } from '../../hooks/useImageUpload';

const FanProfile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  
  // Image upload hook for profile picture
  const { image: avatarImage, handleImageUpload: handleAvatarUpload, clearImage: clearAvatar } = useImageUpload(
    'user_avatar',
    user?.avatar || 'https://via.placeholder.com/200x200?text=User'
  );
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUser(profileData);
    alert('Profile updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-accent">
                <img 
                  src={avatarImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-primary cursor-pointer hover:bg-accent-light transition-colors">
                <Camera className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </label>
            </div>
            <div className="mt-4 md:mt-0 md:ml-6">
              <h1 className="text-3xl font-heading font-bold text-white">{user?.name}</h1>
              <p className="text-gray-400">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 bg-secondary text-white text-sm rounded-full">
                {user?.role?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-8 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex space-x-4 mb-8 border-b border-gray-800">
            <button
              onClick={() => setActiveTab('profile')}
              className={`pb-4 px-2 font-medium transition-colors relative ${
                activeTab === 'profile' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile
              </div>
              {activeTab === 'profile' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`pb-4 px-2 font-medium transition-colors relative ${
                activeTab === 'password' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <Lock className="w-5 h-5 mr-2" />
                Password
              </div>
              {activeTab === 'password' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
              )}
            </button>
          </div>

          {/* Profile Form */}
          {activeTab === 'profile' && (
            <div className="card p-8">
              <h2 className="text-xl font-heading font-bold text-white mb-6">Edit Profile</h2>
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-400 mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-400 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-gray-400 mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="tel"
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="input-field pl-10"
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary flex items-center">
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* Password Form */}
          {activeTab === 'password' && (
            <div className="card p-8">
              <h2 className="text-xl font-heading font-bold text-white mb-6">Change Password</h2>
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-gray-400 mb-2">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="input-field pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-gray-400 mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-400 mb-2">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="password"
                      id="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn-primary flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Update Password
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FanProfile;
