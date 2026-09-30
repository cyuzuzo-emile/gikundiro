// server/models/Player.js
const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: {
    type: String,
    enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
    required: true
  },
  jersey_number: { type: Number, required: true, unique: true },
  nationality: { type: String, required: true },
  date_of_birth: { type: Date, default: null },
  photo: { type: String, default: null },
  bio: { type: String, default: null },
  goals: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  appearances: { type: Number, default: 0 },
  clean_sheets: { type: Number, default: 0 },
}, { timestamps: true });

const PlayerModel = mongoose.model('Player', playerSchema);

// Helper yo guhindura date
const toDate = (v) => {
  if (!v) return null;
  if (v instanceof Date) return v;
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return new Date(`${v}T00:00:00Z`);
  return new Date(v);
};

const Player = {
  async findAll() {
    return await PlayerModel.find().sort({ jersey_number: 1 });
  },

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await PlayerModel.findById(id);
  },

  async create(data) {
    const {
      name,
      position,
      jersey_number,
      nationality,
      date_of_birth,
      photo,
      bio,
      goals = 0,
      assists = 0,
      appearances = 0,
      clean_sheets = 0,
    } = data;

    const player = await PlayerModel.create({
      name,
      position,
      jersey_number,
      nationality,
      date_of_birth: toDate(date_of_birth),
      photo: photo || null,
      bio: bio || null,
      goals,
      assists,
      appearances,
      clean_sheets,
    });

    return player;
  },

  async update(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    const cleaned = { ...data };

    // Hindura date
    if (cleaned.date_of_birth) cleaned.date_of_birth = toDate(cleaned.date_of_birth);

    // Kuraho fields zitari kuri schema
    delete cleaned.id;
    delete cleaned._id;
    delete cleaned.created_at;
    delete cleaned.updated_at;

    // Hindura empty strings kuba null
    Object.keys(cleaned).forEach(k => {
      if (cleaned[k] === '') cleaned[k] = null;
    });

    const player = await PlayerModel.findByIdAndUpdate(
      id,
      { $set: cleaned },
      { new: true, runValidators: true }
    );
    return player;
  },

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await PlayerModel.findByIdAndDelete(id);
  },
};

module.exports = Player;