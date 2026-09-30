// server/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phone: { type: String, default: null },
  role: { type: String, enum: ['fan', 'admin'], default: 'fan' },
  avatar: { type: String, default: null },
  is_blocked: { type: Boolean, default: false },
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

// Helper: kuraho password muri output
const withoutPassword = (user) => {
  if (!user) return null;
  const obj = user.toObject ? user.toObject() : user;
  delete obj.password;
  return obj;
};

const User = {
  async findAll() {
    return await UserModel.find()
      .select('-password')  // ← kuraho password
      .sort({ created_at: -1 });
  },

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await UserModel.findById(id).select('-password');
  },

  // Iyi ikoreshwa na login — igomba kubona password
  async findByEmail(email) {
    return await UserModel.findOne({ email: email.toLowerCase() });
  },

  async create({ name, email, password, phone, role = 'fan' }) {
    const hashed = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      phone: phone || null,
      role,
    });

    // Subiza nta password
    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  },

  async update(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    // Allowed fields gusa
    const allowed = ['name', 'email', 'phone', 'is_blocked'];
    const cleaned = {};

    allowed.forEach(k => {
      if (data[k] !== undefined) {
        if (data[k] === '') {
          cleaned[k] = null;
        } else if (k === 'email') {
          cleaned[k] = String(data[k]).toLowerCase();
        } else {
          cleaned[k] = data[k];
        }
      }
    });

    if (Object.keys(cleaned).length === 0) return this.findById(id);

    await UserModel.findByIdAndUpdate(
      id,
      { $set: cleaned },
      { new: true, runValidators: true }
    );

    return this.findById(id);
  },

  async updateBlock(id, is_blocked) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await UserModel.findByIdAndUpdate(
      id,
      { $set: { is_blocked } },
      { new: true }
    );
  },

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await UserModel.findByIdAndDelete(id);
  },

  async comparePassword(plain, hashed) {
    return bcrypt.compare(plain, hashed);
  },
};

module.exports = User;