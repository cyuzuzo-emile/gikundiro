// server/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: {
    type: String,
    default: 'https://via.placeholder.com/400x400?text=Product'
  },
  description: { type: String, default: '' },
  rating: { type: Number, default: 0, min: 0, max: 5 },
  in_stock: { type: Boolean, default: true },
}, { timestamps: true });

const ProductModel = mongoose.model('Product', productSchema);

const Product = {
  async findAll() {
    return await ProductModel.find().sort({ created_at: -1 });
  },

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await ProductModel.findById(id);
  },

  async create({ name, category, price, image, description = '', rating = 0, in_stock = true }) {
    const product = await ProductModel.create({
      name,
      category,
      price,
      image: image || 'https://via.placeholder.com/400x400?text=Product',
      description,
      rating,
      in_stock,
    });
    return product;
  },

  async update(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;

    const cleaned = { ...data };

    // Kuraho fields zitari kuri schema
    delete cleaned.id;
    delete cleaned._id;
    delete cleaned.created_at;
    delete cleaned.updated_at;

    // Hindura types
    if (cleaned.price !== undefined) cleaned.price = parseInt(cleaned.price, 10);
    if (cleaned.rating !== undefined) cleaned.rating = parseFloat(cleaned.rating);
    if (cleaned.in_stock !== undefined) {
      if (typeof cleaned.in_stock === 'string') {
        cleaned.in_stock = cleaned.in_stock === 'true' || cleaned.in_stock === '1';
      }
    }

    // Hindura empty strings kuba null
    Object.keys(cleaned).forEach(k => {
      if (cleaned[k] === '') cleaned[k] = null;
    });

    const product = await ProductModel.findByIdAndUpdate(
      id,
      { $set: cleaned },
      { new: true, runValidators: true }
    );
    return product;
  },

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await ProductModel.findByIdAndDelete(id);
  },
};

module.exports = Product;