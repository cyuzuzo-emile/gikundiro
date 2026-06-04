const pool = require('../db');
const { sanitizeData } = require('../utils/dateUtils');

const Product = {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    return rows;
  },
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM products WHERE id=?', [id]);
    return rows[0] || null;
  },
  async create({ name, category, price, image, description = '', rating = 0, in_stock = true }) {
    const [result] = await pool.query(
      'INSERT INTO products (name,category,price,image,description,rating,in_stock) VALUES (?,?,?,?,?,?,?)',
      [name, category, price, image||'https://via.placeholder.com/400x400?text=Product', description, rating, in_stock]
    );
    return this.findById(result.insertId);
  },
  async update(id, data) {
    const sanitized = sanitizeData(data);
    const fields = Object.keys(sanitized).map(k => `${k}=?`).join(',');
    if (fields.length === 0) return this.findById(id);
    await pool.query(`UPDATE products SET ${fields} WHERE id=?`, [...Object.values(sanitized), id]);
    return this.findById(id);
  },
  async delete(id) {
    await pool.query('DELETE FROM products WHERE id=?', [id]);
  }
};

module.exports = Product;
