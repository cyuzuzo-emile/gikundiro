const pool = require('../db');
const { sanitizeData } = require('../utils/dateUtils');

const Staff = {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM staff ORDER BY id ASC');
    return rows;
  },
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM staff WHERE id=?', [id]);
    return rows[0] || null;
  },
  async create(data) {
    const { name, position, photo, bio } = data;
    const [result] = await pool.query(
      'INSERT INTO staff (name,position,photo,bio) VALUES (?,?,?,?)',
      [name, position, photo||null, bio||null]
    );
    return this.findById(result.insertId);
  },
  async update(id, data) {
    const sanitized = sanitizeData(data, ['id', 'created_at', 'updated_at']);
    const cleaned = Object.fromEntries(
      Object.entries(sanitized).map(([k, v]) => [k, v === '' ? null : v])
    );
    const fields = Object.keys(cleaned).map(k => `${k}=?`).join(',');
    if (fields.length === 0) return this.findById(id);
    await pool.query(`UPDATE staff SET ${fields} WHERE id=?`, [...Object.values(cleaned), id]);
    return this.findById(id);
  },
  async delete(id) {
    await pool.query('DELETE FROM staff WHERE id=?', [id]);
  }
};

module.exports = Staff;
