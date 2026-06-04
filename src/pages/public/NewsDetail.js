import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, ExternalLink } from 'lucide-react';
import { newsAPI } from '../../services/api';

const API_URL = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';

const NewsDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newsAPI.getById(id)
      .then(res => setArticle(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
    </div>
  );

  if (!article) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <p className="text-gray-400 text-xl">Article not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen pt-20 pb-12 bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/news" className="inline-flex items-center text-secondary hover:text-accent mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
        </Link>

        {article.image && (
          <img
            src={`${API_URL}${article.image}`}
            alt={article.title}
            className="w-full h-72 object-cover rounded-xl mb-8"
          />
        )}

        <span className="px-3 py-1 bg-secondary/20 text-secondary text-sm rounded-full">
          {article.category}
        </span>

        <h1 className="text-3xl font-heading font-bold text-white mt-4 mb-3">{article.title}</h1>

        <div className="flex items-center text-gray-400 text-sm mb-8">
          <Calendar className="w-4 h-4 mr-2" />
          {new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </div>

        {article.link ? (
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center btn-primary mb-8"
          >
            Read Full Article <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        ) : (
          <div className="text-gray-300 leading-relaxed whitespace-pre-line">{article.content}</div>
        )}
      </div>
    </div>
  );
};

export default NewsDetail;
