// server/models/Order.js
const mongoose = require('mongoose');

// Sub-schema ya items (embedded document)
const orderItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', default: null },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, default: null },
}, { _id: true });

// Order schema
const orderSchema = new mongoose.Schema({
  order_number: { type: String, required: true, unique: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  customer_name: { type: String, required: true },
  customer_email: { type: String, required: true },
  customer_phone: { type: String, required: true },
  subtotal: { type: Number, required: true },
  payment_method: {
    type: String,
    enum: ['cash', 'card', 'mobile_money'],
    required: true
  },
  payment_status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shipping_street: { type: String, default: null },
  shipping_city: { type: String, default: null },
  shipping_province: { type: String, default: null },
  shipping_country: { type: String, default: 'Rwanda' },
  notes: { type: String, default: null },
  items: [orderItemSchema],  // ← embedded items!
}, { timestamps: true });

const OrderModel = mongoose.model('Order', orderSchema);

const Order = {
  async findAll() {
    // items ziri embedded — ntikenera JOIN
    return await OrderModel.find().sort({ created_at: -1 });
  },

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await OrderModel.findById(id);
  },

  async findByUser(user_id) {
    if (!mongoose.Types.ObjectId.isValid(user_id)) return [];
    return await OrderModel.find({ user_id }).sort({ created_at: -1 });
  },

  async create({ customer, items, subtotal, paymentMethod, shippingAddress, notes, userId }) {
    const order_number = `RAYON-${Date.now()}`;

    // Hindura items kuba embedded documents
    const embeddedItems = (items || []).map(item => ({
      product_id: item.productId || null,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image || null,
    }));

    const order = await OrderModel.create({
      order_number,
      user_id: userId || null,
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      subtotal,
      payment_method: paymentMethod,
      shipping_street: shippingAddress?.street || null,
      shipping_city: shippingAddress?.city || null,
      shipping_province: shippingAddress?.province || null,
      shipping_country: shippingAddress?.country || 'Rwanda',
      notes: notes || null,
      items: embeddedItems,
    });

    return order;
  },

  async updateStatus(id, status) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await OrderModel.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true }
    );
  },

  async updatePayment(id, paymentStatus) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await OrderModel.findByIdAndUpdate(
      id,
      { $set: { payment_status: paymentStatus } },
      { new: true, runValidators: true }
    );
  },
};

module.exports = Order;