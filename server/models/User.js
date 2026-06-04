const pool = require('../db');
const bcrypt = require('bcryptjs');

const User = {
  async findAll() {
    const [rows] = await pool.query('SELECT id,name,email,phone,role,avatar,is_blocked,created_at FROM users');
    return rows;
  },
  async findById(id) {
    const [rows] = await pool.query('SELECT id,name,email,phone,role,avatar,is_blocked,created_at FROM users WHERE id=?', [id]);
    return rows[0] || null;
  },
  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email=?', [email]);
    return rows[0] || null;
  },
  async create({ name, email, password, phone, role = 'fan' }) {
    const hashed = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (name,email,password,phone,role) VALUES (?,?,?,?,?)',
      [name, email, hashed, phone || null, role]
    );
    return { id: result.insertId, name, email, role };
  },
  async update(id, data) {
    const allowed = ['name', 'email', 'phone', 'is_blocked'];
    const fields = Object.keys(data).filter(k => allowed.includes(k));
    if (fields.length === 0) return this.findById(id);
    const values = fields.map(k => data[k]);
    await pool.query(`UPDATE users SET ${fields.map(f => `${f}=?`).join(',')} WHERE id=?`, [...values, id]);
    return this.findById(id);
  },
  async updateBlock(id, is_blocked) {
    await pool.query('UPDATE users SET is_blocked=? WHERE id=?', [is_blocked, id]);
  },
  async delete(id) {
    await pool.query('DELETE FROM users WHERE id=?', [id]);
  },
  async comparePassword(plain, hashed) {
    return bcrypt.compare(plain, hashed);
  }
};

module.exports = User;
