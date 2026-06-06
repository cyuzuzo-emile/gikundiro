import React, { useState } from 'react';
import { Save, Plus, Trash2, Trophy, Users, Globe, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const ManageClub = () => {
  const [activeTab, setActiveTab] = useState('info');
  const [saved, setSaved] = useState(false);

  const [clubInfo, setClubInfo] = useState({
    name: 'Rayon Sports FC',
    founded: '1963',
    nickname: 'The Blues',
    stadium: 'Amahoro National Stadium',
    capacity: '45,000',
    city: 'Kigali',
    country: 'Rwanda',
    league: 'Rwanda Premier League',
    phone: '+250 7xx xxx xxx',
    email: 'info@rayonsports.rw',
    website: 'www.rayonsports.rw',
    address: 'Kigali, Rwanda',
    description: 'Rayon Sports FC is one of the most successful football clubs in Rwanda, founded in 1963.',
  });

  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Rwanda Premier League', count: 4, years: '2010, 2012, 2019, 2023' },
    { id: 2, title: 'Rwanda Cup', count: 5, years: '2009, 2011, 2013, 2017, 2022' },
    { id: 3, title: 'Rwanda Super Cup', count: 3, years: '2012, 2019, 2023' },
    { id: 4, title: 'CECAFA Cup', count: 2, years: '2016, 2018' },
  ]);

  const [sponsors, setSponsors] = useState([
    { id: 1, name: 'Rwanda Energy Group', logo: '', tier: 'Main' },
    { id: 2, name: 'Bank of Kigali', logo: '', tier: 'Gold' },
    { id: 3, name: 'Rwanda Air', logo: '', tier: 'Silver' },
  ]);

  const [social, setSocial] = useState({
    facebook: 'https://facebook.com/rayonsports',
    twitter: 'https://twitter.com/rayonsports',
    instagram: 'https://instagram.com/rayonsports',
    youtube: 'https://youtube.com/rayonsports',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addAchievement = () => {
    setAchievements([...achievements, { id: Date.now(), title: '', count: 0, years: '' }]);
  };

  const updateAchievement = (id, field, value) => {
    setAchievements(achievements.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const removeAchievement = (id) => {
    setAchievements(achievements.filter(a => a.id !== id));
  };

  const addSponsor = () => {
    setSponsors([...sponsors, { id: Date.now(), name: '', logo: '', tier: 'Silver' }]);
  };

  const updateSponsor = (id, field, value) => {
    setSponsors(sponsors.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSponsor = (id) => {
    setSponsors(sponsors.filter(s => s.id !== id));
  };

  const tabs = [
    { id: 'info', label: 'Club Info', icon: Users },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'sponsors', label: 'Sponsors', icon: Globe },
    { id: 'social', label: 'Social Media', icon: Globe },
  ];

  return (
    <div className="min-h-screen pt-20 pb-12">
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Manage <span className="text-accent">Club</span></h1>
            <p className="text-gray-400 mt-2">Update club information, achievements, sponsors and social media</p>
          </div>
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <Save className="w-5 h-5" />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </section>

      <section className="py-8 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id ? 'bg-primary text-white' : 'bg-surface-light text-gray-400 hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Club Info Tab */}
          {activeTab === 'info' && (
            <div className="card p-6 space-y-6">
              <h2 className="text-xl font-heading font-bold text-white">Club Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2">Club Name</label>
                  <input value={clubInfo.name} onChange={e => setClubInfo({ ...clubInfo, name: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Founded Year</label>
                  <input value={clubInfo.founded} onChange={e => setClubInfo({ ...clubInfo, founded: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Nickname</label>
                  <input value={clubInfo.nickname} onChange={e => setClubInfo({ ...clubInfo, nickname: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">League</label>
                  <input value={clubInfo.league} onChange={e => setClubInfo({ ...clubInfo, league: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Stadium</label>
                  <input value={clubInfo.stadium} onChange={e => setClubInfo({ ...clubInfo, stadium: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Capacity</label>
                  <input value={clubInfo.capacity} onChange={e => setClubInfo({ ...clubInfo, capacity: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">City</label>
                  <input value={clubInfo.city} onChange={e => setClubInfo({ ...clubInfo, city: e.target.value })} className="input-field" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2">Country</label>
                  <input value={clubInfo.country} onChange={e => setClubInfo({ ...clubInfo, country: e.target.value })} className="input-field" />
                </div>
              </div>

              <h3 className="text-lg font-heading font-bold text-white border-t border-gray-700 pt-4">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input value={clubInfo.phone} onChange={e => setClubInfo({ ...clubInfo, phone: e.target.value })} className="input-field pl-10" placeholder="Phone" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input value={clubInfo.email} onChange={e => setClubInfo({ ...clubInfo, email: e.target.value })} className="input-field pl-10" placeholder="Email" />
                </div>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input value={clubInfo.website} onChange={e => setClubInfo({ ...clubInfo, website: e.target.value })} className="input-field pl-10" placeholder="Website" />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input value={clubInfo.address} onChange={e => setClubInfo({ ...clubInfo, address: e.target.value })} className="input-field pl-10" placeholder="Address" />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2">Club Description</label>
                <textarea value={clubInfo.description} onChange={e => setClubInfo({ ...clubInfo, description: e.target.value })} className="input-field resize-none" rows="4" />
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold text-white">Achievements</h2>
                <button onClick={addAchievement} className="btn-primary flex items-center gap-2 text-sm">
                  <Plus className="w-4 h-4" /> Add Achievement
                </button>
              </div>

              {achievements.map((a) => (
                <div key={a.id} className="card p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Title</label>
                      <input value={a.title} onChange={e => updateAchievement(a.id, 'title', e.target.value)} className="input-field" placeholder="e.g. Rwanda Premier League" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Count</label>
                      <input type="number" value={a.count} onChange={e => updateAchievement(a.id, 'count', e.target.value)} className="input-field" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Years Won</label>
                      <input value={a.years} onChange={e => updateAchievement(a.id, 'years', e.target.value)} className="input-field" placeholder="e.g. 2010, 2012, 2019" />
                    </div>
                  </div>
                  <button onClick={() => removeAchievement(a.id)} className="mt-3 text-red-500 hover:text-red-400 flex items-center gap-1 text-sm">
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Sponsors Tab */}
          {activeTab === 'sponsors' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold text-white">Sponsors</h2>
                <button onClick={addSponsor} className="btn-primary flex items-center gap-2 text-sm">
                  <Plus className="w-4 h-4" /> Add Sponsor
                </button>
              </div>

              {sponsors.map((s) => (
                <div key={s.id} className="card p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Sponsor Name</label>
                      <input value={s.name} onChange={e => updateSponsor(s.id, 'name', e.target.value)} className="input-field" placeholder="Company name" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Logo URL</label>
                      <input value={s.logo} onChange={e => updateSponsor(s.id, 'logo', e.target.value)} className="input-field" placeholder="https://..." />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm mb-1">Tier</label>
                      <select value={s.tier} onChange={e => updateSponsor(s.id, 'tier', e.target.value)} className="input-field">
                        <option>Main</option>
                        <option>Gold</option>
                        <option>Silver</option>
                        <option>Bronze</option>
                      </select>
                    </div>
                  </div>
                  <button onClick={() => removeSponsor(s.id)} className="mt-3 text-red-500 hover:text-red-400 flex items-center gap-1 text-sm">
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <div className="card p-6 space-y-4">
              <h2 className="text-xl font-heading font-bold text-white">Social Media Links</h2>

              <div>
                <label className="block text-gray-400 mb-2 flex items-center gap-2"><Facebook className="w-4 h-4 text-blue-500" /> Facebook</label>
                <input value={social.facebook} onChange={e => setSocial({ ...social, facebook: e.target.value })} className="input-field" placeholder="https://facebook.com/..." />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 flex items-center gap-2"><Twitter className="w-4 h-4 text-sky-400" /> Twitter / X</label>
                <input value={social.twitter} onChange={e => setSocial({ ...social, twitter: e.target.value })} className="input-field" placeholder="https://twitter.com/..." />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 flex items-center gap-2"><Instagram className="w-4 h-4 text-pink-500" /> Instagram</label>
                <input value={social.instagram} onChange={e => setSocial({ ...social, instagram: e.target.value })} className="input-field" placeholder="https://instagram.com/..." />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 flex items-center gap-2"><Youtube className="w-4 h-4 text-red-500" /> YouTube</label>
                <input value={social.youtube} onChange={e => setSocial({ ...social, youtube: e.target.value })} className="input-field" placeholder="https://youtube.com/..." />
              </div>
            </div>
          )}

          {/* Save Button Bottom */}
          <div className="mt-6 flex justify-end">
            <button onClick={handleSave} className={`btn-primary flex items-center gap-2 ${saved ? 'bg-green-600' : ''}`}>
              <Save className="w-5 h-5" />
              {saved ? '✓ Saved Successfully!' : 'Save Changes'}
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ManageClub;
