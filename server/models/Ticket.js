const pool = require('../db');
const { sanitizeData } = require('../utils/dateUtils');

const Ticket = {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM tickets ORDER BY created_at DESC');
    return rows;
  },
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM tickets WHERE id=?', [id]);
    return rows[0] || null;
  },
  async findByUser(user_id) {
    const [rows] = await pool.query('SELECT * FROM tickets WHERE user_id=? ORDER BY created_at DESC', [user_id]);
    return rows;
  },
  async create({ user_id, match_id, seat_number, price, qr_code, status = 'Valid' }) {
    const [result] = await pool.query(
      'INSERT INTO tickets (user_id,match_id,seat_number,price,qr_code,status) VALUES (?,?,?,?,?,?)',
      [user_id, match_id, seat_number, price, qr_code||null, status]
    );
    return this.findById(result.insertId);
  },
  async update(id, data) {
    const sanitized = sanitizeData(data);
    const fields = Object.keys(sanitized).map(k => `${k}=?`).join(',');
    if (fields.length === 0) return this.findById(id);
    await pool.query(`UPDATE tickets SET ${fields} WHERE id=?`, [...Object.values(sanitized), id]);
    return this.findById(id);
  },
  async delete(id) {
    await pool.query('DELETE FROM tickets WHERE id=?', [id]);
  }
};

module.exports = Ticket;
