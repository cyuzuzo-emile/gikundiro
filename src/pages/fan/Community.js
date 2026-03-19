import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, User, Star, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Community = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('discussions');
  const [newPost, setNewPost] = useState('');
  
  const [posts, setPosts] = useState([
    { id: 1, author: 'Mugisha Fan', avatar: null, content: 'What a match! Jacques Mugisha was on fire today! 🔥', likes: 24, comments: 8, time: '2 hours ago' },
    { id: 2, author: 'Rayon Ultra', avatar: null, content: 'Can\'t wait for the derby against Police FC. Who else is going?', likes: 15, comments: 12, time: '5 hours ago' },
    { id: 3, author: 'Kigali Blues', avatar: null, content: 'The defense needs to improve. Too many chances given away.', likes: 8, comments: 5, time: '1 day ago' },
  ]);

  const [playerPoll] = useState({
    question: 'Who was your Player of the Match?',
    options: [
      { name: 'Mugisha Jacques', votes: 145 },
      { name: 'Hakizimana Emmanuel', votes: 89 },
      { name: 'Niyonkuru Patrick', votes: 56 },
    ]
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      setPosts([
        { id: Date.now(), author: user?.name || 'You', avatar: null, content: newPost, likes: 0, comments: 0, time: 'Just now' },
        ...posts
      ]);
      setNewPost('');
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-surface-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-heading font-bold text-white">
            Fan <span className="text-accent">Community</span>
          </h1>
          <p className="text-gray-400 mt-2">Connect with fellow Rayon Sports supporters</p>
        </div>
      </section>

      {/* Tabs */}
      <section className="bg-surface-dark border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('discussions')}
              className={`py-4 px-2 font-medium transition-colors relative ${
                activeTab === 'discussions' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Discussions
              </div>
              {activeTab === 'discussions' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('polls')}
              className={`py-4 px-2 font-medium transition-colors relative ${
                activeTab === 'polls' ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <Star className="w-5 h-5 mr-2" />
                Player of the Match
              </div>
              {activeTab === 'polls' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"></span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Discussions Tab */}
      {activeTab === 'discussions' && (
        <section className="py-8 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Feed */}
              <div className="lg:col-span-2">
                {/* Create Post */}
                <div className="card p-6 mb-6">
                  <form onSubmit={handlePostSubmit}>
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <textarea
                          value={newPost}
                          onChange={(e) => setNewPost(e.target.value)}
                          placeholder="Share your thoughts with the community..."
                          className="w-full bg-surface-light border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-secondary resize-none"
                          rows="3"
                        ></textarea>
                        <div className="flex justify-end mt-3">
                          <button type="submit" className="btn-primary flex items-center">
                            <Send className="w-4 h-4 mr-2" />
                            Post
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Posts */}
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div key={post.id} className="card p-6">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-white">{post.author}</h4>
                              <p className="text-gray-500 text-sm">{post.time}</p>
                            </div>
                          </div>
                          <p className="text-gray-300 mt-3">{post.content}</p>
                          <div className="flex items-center mt-4 space-x-6">
                            <button 
                              onClick={() => handleLike(post.id)}
                              className="flex items-center text-gray-400 hover:text-secondary transition-colors"
                            >
                              <ThumbsUp className="w-5 h-5 mr-2" />
                              {post.likes}
                            </button>
                            <button className="flex items-center text-gray-400 hover:text-white transition-colors">
                              <MessageSquare className="w-5 h-5 mr-2" />
                              {post.comments}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="card p-6">
                  <h3 className="text-lg font-heading font-bold text-white mb-4">Trending Topics</h3>
                  <div className="space-y-3">
                    {['#RayonWin', '#RwandaFootball', '#PlayerOfTheMatch', '#DerbyDay', '#CECAFA'].map((tag) => (
                      <div key={tag} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                        <span className="text-secondary">{tag}</span>
                        <span className="text-gray-500 text-sm">120 posts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Polls Tab */}
      {activeTab === 'polls' && (
        <section className="py-8 bg-surface">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="card p-8">
              <div className="flex items-center mb-6">
                <Star className="w-6 h-6 text-accent mr-2" />
                <h2 className="text-xl font-heading font-bold text-white">Weekly Poll</h2>
              </div>
              
              <p className="text-lg text-gray-300 mb-6">{playerPoll.question}</p>
              
              <div className="space-y-4">
                {playerPoll.options.map((option, index) => (
                  <div key={index} className="relative">
                    <div className="absolute inset-0 bg-surface-light rounded-lg"></div>
                    <div 
                      className="relative bg-surface-light rounded-lg p-4 cursor-pointer hover:bg-surface transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">{option.name}</span>
                        <span className="text-gray-400">{option.votes} votes</span>
                      </div>
                      <div className="mt-2 h-2 bg-surface rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-secondary rounded-full"
                          style={{ width: `${(option.votes / (playerPoll.options.reduce((a, b) => a + b.votes, 0))) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-gray-500 text-sm mt-6 text-center">
                Total votes: {playerPoll.options.reduce((a, b) => a + b.votes, 0)}
              </p>

              <button className="btn-outline w-full mt-6">
                Vote Now
              </button>
            </div>

            {/* Previous Winners */}
            <div className="card p-6 mt-8">
              <h3 className="text-lg font-heading font-bold text-white mb-4">Previous Winners</h3>
              <div className="space-y-4">
                {[
                  { week: 'Week 8', player: 'Mugisha Jacques', votes: '89%' },
                  { week: 'Week 7', player: 'Habineza Emmanuel', votes: '76%' },
                  { week: 'Week 6', player: 'Hakizimana Emmanuel', votes: '82%' },
                ].map((winner, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                    <div>
                      <span className="text-gray-400 text-sm">{winner.week}</span>
                      <p className="text-white font-medium">{winner.player}</p>
                    </div>
                    <span className="text-accent font-bold">{winner.votes}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Community;
