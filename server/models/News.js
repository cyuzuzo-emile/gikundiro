// server/models/News.js
const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  category: {
    type: String,
    enum: ['Announcement', 'Match Report', 'Transfer', 'General'],
    default: 'General'
  },
  image: String,
  author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  link: { type: String, default: null },
  published_at: { type: Date, default: Date.now },
}, { timestamps: true });

const NewsModel = mongoose.model('News', newsSchema);

const News = {
  async findAll() {
    return await NewsModel.find().sort({ created_at: -1 });
  },

  async findLatest(limit = 5) {
    return await NewsModel.find()
      .sort({ created_at: -1 })
      .limit(parseInt(limit));
  },

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await NewsModel.findById(id);
  },

  async create({ title, content, category = 'General', image, author_id, link }) {
    const news = await NewsModel.create({
      title,
      content,
      category,
      image: image || null,
      author_id: author_id || null,
      link: link || null,
    });
    return news;
  },

  async update(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    const cleaned = { ...data };

    // Kuraho fields zitari kuri schema
    delete cleaned.id;
    delete cleaned._id;
    delete cleaned.created_at;
    delete cleaned.updated_at;

    // Hindura empty strings kuba null
    Object.keys(cleaned).forEach(k => {
      if (cleaned[k] === '') cleaned[k] = null;
    });

    const news = await NewsModel.findByIdAndUpdate(
      id,
      { $set: cleaned },
      { new: true, runValidators: true }
    );
    return news;
  },

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await NewsModel.findByIdAndDelete(id);
  },
};

module.exports = News;