import React from 'react';
import { Calendar, Target, MapPin, Users, Trophy, Award, Star } from 'lucide-react';

const About = () => {
  const history = [
    { year: '1963', title: 'Foundation', description: 'Rayon Sports FC was founded, becoming one of Rwanda\'s most storied clubs' },
    { year: '1970s', title: 'Early Success', description: 'Establishing dominance in Rwandan football with multiple titles' },
    { year: '2000s', title: 'Modern Era', description: 'Rebranding and professionalization of the club' },
    { year: '2020s', title: 'New Chapter', description: 'Continued excellence and youth development' },
  ];

  const management = [
    { name: 'Murenzi Abdarah', position: 'President', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&fit=crop' },
    { name: 'Bizimungu Emmanuel', position: 'Vice President', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    { name: 'Mugisha Robert', position: 'Technical Director', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
    { name: 'Niyonkuru Patrick', position: 'Team Manager', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop' },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6">
              About <span className="gradient-text">Rayon Sports FC</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The pride of Rwandan football, representing excellence, tradition, and the spirit of competition since 1963.
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Our History</h2>
          
          <div className="relative mt-12">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-secondary to-accent"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {history.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                    <div className="bg-surface p-6 rounded-xl">
                      <span className="text-3xl font-heading font-bold text-accent">{item.year}</span>
                      <h3 className="text-xl font-heading font-bold text-white mt-2">{item.title}</h3>
                      <p className="text-gray-400 mt-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-accent rounded-full absolute left-1/2 transform -translate-x-1/2 border-4 border-surface-dark"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">
                To be the most successful and beloved football club in Rwanda and East Africa, 
                developing world-class athletes while inspiring the next generation through 
                excellence, integrity, and community engagement.
              </p>
            </div>
            <div className="card p-8">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To compete at the highest level in African football, develop homegrown talent, 
                foster passionate fan engagement, and contribute to the growth of football in Rwanda 
                through excellence in sportsmanship and professionalism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stadium Info */}
      <section className="py-20 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Our Stadium</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            <div className="relative h-96 rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop" 
                alt="Nyamirambo Stadium" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl font-heading font-bold text-white mb-4">Nyamirambo Stadium</h3>
              <p className="text-gray-400 mb-6">
                Our home ground, located in the heart of Kigali, Nyamirambo Stadium has been 
                the fortress of Rayon Sports FC for decades. With a capacity of 10,000 passionate 
                supporters, it comes alive on match days.
              </p>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <MapPin className="w-5 h-5 text-accent mr-3" />
                  <span>Nyamirambo Sector, Kigali City, Rwanda</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-5 h-5 text-accent mr-3" />
                  <span>Capacity: 10,000</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Calendar className="w-5 h-5 text-accent mr-3" />
                  <span>Opened: 1965</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management Team */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">Club Management</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {management.map((member, index) => (
              <div key={index} className="card text-center p-6">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-heading font-bold text-white">{member.name}</h3>
                <p className="text-secondary mt-1">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-white">Our Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-8 bg-white/10 rounded-xl backdrop-blur-sm">
              <Trophy className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-heading font-bold text-white mb-2">Excellence</h3>
              <p className="text-gray-300">We strive for greatness in everything we do, on and off the pitch.</p>
            </div>
            <div className="text-center p-8 bg-white/10 rounded-xl backdrop-blur-sm">
              <Users className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-heading font-bold text-white mb-2">Unity</h3>
              <p className="text-gray-300">We believe in the power of teamwork and community.</p>
            </div>
            <div className="text-center p-8 bg-white/10 rounded-xl backdrop-blur-sm">
              <Award className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-heading font-bold text-white mb-2">Integrity</h3>
              <p className="text-gray-300">We uphold the highest standards of sportsmanship and ethics.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
