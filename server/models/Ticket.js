// server/models/Ticket.js
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  match_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Match', required: true },
  seat_number: { type: String, required: true },
  price: { type: Number, required: true },
  qr_code: { type: String, default: null },
  status: {
    type: String,
    enum: ['Valid', 'Used', 'Cancelled'],
    default: 'Valid'
  },
  booked_at: { type: Date, default: Date.now },
}, { timestamps: true });

const TicketModel = mongoose.model('Ticket', ticketSchema);

const Ticket = {
  async findAll() {
    return await TicketModel.find()
      .populate('user_id', 'name email')
      .populate('match_id', 'opponent date venue')
      .sort({ created_at: -1 });
  },

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await TicketModel.findById(id)
      .populate('user_id', 'name email')
      .populate('match_id', 'opponent date venue');
  },

  async findByUser(user_id) {
    if (!mongoose.Types.ObjectId.isValid(user_id)) return [];
    return await TicketModel.find({ user_id })
      .populate('match_id', 'opponent date venue')
      .sort({ created_at: -1 });
  },

  async create({ user_id, match_id, seat_number, price, qr_code, status = 'Valid' }) {
    const ticket = await TicketModel.create({
      user_id,
      match_id,
      seat_number,
      price,
      qr_code: qr_code || null,
      status,
    });
    return await this.findById(ticket._id);
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

    const ticket = await TicketModel.findByIdAndUpdate(
      id,
      { $set: cleaned },
      { new: true, runValidators: true }
    );
    return ticket;
  },

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await TicketModel.findByIdAndDelete(id);
  },
};

module.exports = Ticket;