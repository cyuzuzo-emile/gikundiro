// server/models/Staff.js
const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  photo: { type: String, default: null },
  bio: { type: String, default: null },
}, { timestamps: true });

const StaffModel = mongoose.model('Staff', staffSchema);

const Staff = {
  async findAll() {
    return await StaffModel.find().sort({ created_at: 1 });
  },

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await StaffModel.findById(id);
  },

  async create(data) {
    const { name, position, photo, bio } = data;

    const staff = await StaffModel.create({
      name,
      position,
      photo: photo || null,
      bio: bio || null,
    });

    return staff;
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

    const staff = await StaffModel.findByIdAndUpdate(
      id,
      { $set: cleaned },
      { new: true, runValidators: true }
    );
    return staff;
  },

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await StaffModel.findByIdAndDelete(id);
  },
};

module.exports = Staff;