// server/models/Match.js
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: String,
  opponent: { type: String, required: true },
  opponent_logo: String,
  rayon_logo: String,
  venue: { type: String, required: true },
  competition: { type: String, required: true },
  home_or_away: { type: String, enum: ['Home', 'Away'], default: 'Home' },
  home_score: { type: Number, default: null },
  away_score: { type: Number, default: null },
  status: {
    type: String,
    enum: ['Scheduled', 'Live', 'Completed'],
    default: 'Scheduled'
  },
  ticket_price: { type: Number, default: 5000 },
  available_tickets: { type: Number, default: 500 },
  live_stream_url: { type: String, default: null },
  highlights_video_url: { type: String, default: null },
}, { timestamps: true });

const MatchModel = mongoose.model('Match', matchSchema);

// Kora helper yo guhindura date (MongoDB ikoresha Date object, atari string)
const toDate = (v) => {
  if (!v) return null;
  if (v instanceof Date) return v;
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return new Date(`${v}T00:00:00Z`);
  return new Date(v);
};

const Match = {
  async findAll() {
    return await MatchModel.find().sort({ date: 1 });
  },

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await MatchModel.findById(id);
  },

  async findUpcoming() {
    return await MatchModel.find({ date: { $gte: new Date() } }).sort({ date: 1 });
  },

  async findPast() {
    return await MatchModel.find({ date: { $lt: new Date() } }).sort({ date: -1 });
  },

  async create(data) {
    const cleaned = { ...data };
    
    // Hindura date
    if (cleaned.date) cleaned.date = toDate(cleaned.date);
    
    // Kuraho fields zitari kuri schema
    delete cleaned.id;
    delete cleaned._id;
    delete cleaned.created_at;
    delete cleaned.updated_at;

    // Hindura empty strings kuba null
    Object.keys(cleaned).forEach(k => {
      if (cleaned[k] === '') cleaned[k] = null;
    });

    const match = await MatchModel.create(cleaned);
    return match;
  },

  async update(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    const cleaned = { ...data };
    
    // Hindura date
    if (cleaned.date) cleaned.date = toDate(cleaned.date);

    // Kuraho fields zitari kuri schema
    delete cleaned.id;
    delete cleaned._id;
    delete cleaned.created_at;
    delete cleaned.updated_at;

    // Hindura empty strings kuba null
    Object.keys(cleaned).forEach(k => {
      if (cleaned[k] === '') cleaned[k] = null;
    });

    const match = await MatchModel.findByIdAndUpdate(
      id,
      { $set: cleaned },
      { new: true, runValidators: true }
    );
    return match;
  },

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await MatchModel.findByIdAndDelete(id);
  },
};

module.exports = Match;