const pool = require('../db');

const Order = {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM orders ORDER BY created_at DESC');
    for (const order of rows) order.items = await this._getItems(order.id);
    return rows;
  },
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM orders WHERE id=?', [id]);
    if (!rows[0]) return null;
    rows[0].items = await this._getItems(id);
    return rows[0];
  },
  async findByUser(user_id) {
    const [rows] = await pool.query('SELECT * FROM orders WHERE user_id=? ORDER BY created_at DESC', [user_id]);
    for (const order of rows) order.items = await this._getItems(order.id);
    return rows;
  },
  async _getItems(order_id) {
    const [items] = await pool.query('SELECT * FROM order_items WHERE order_id=?', [order_id]);
    return items;
  },
  async create({ customer, items, subtotal, paymentMethod, shippingAddress, notes, userId }) {
    const order_number = `RAYON-${Date.now()}`;
    const [result] = await pool.query(
      `INSERT INTO orders (order_number,user_id,customer_name,customer_email,customer_phone,subtotal,payment_method,shipping_street,shipping_city,shipping_province,shipping_country,notes)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [order_number, userId||null, customer.name, customer.email, customer.phone, subtotal, paymentMethod,
       shippingAddress?.street||null, shippingAddress?.city||null, shippingAddress?.province||null,
       shippingAddress?.country||'Rwanda', notes||null]
    );
    const order_id = result.insertId;
    for (const item of (items || [])) {
      await pool.query(
        'INSERT INTO order_items (order_id,product_id,name,price,quantity,image) VALUES (?,?,?,?,?,?)',
        [order_id, item.productId||null, item.name, item.price, item.quantity, item.image||null]
      );
    }
    return this.findById(order_id);
  },
  async updateStatus(id, status) {
    await pool.query('UPDATE orders SET status=? WHERE id=?', [status, id]);
    return this.findById(id);
  },
  async updatePayment(id, paymentStatus) {
    await pool.query('UPDATE orders SET payment_status=? WHERE id=?', [paymentStatus, id]);
    return this.findById(id);
  }
};

module.exports = Order;
