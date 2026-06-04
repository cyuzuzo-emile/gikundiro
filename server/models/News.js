const pool = require('../db');
const { sanitizeData } = require('../utils/dateUtils');

const News = {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM news ORDER BY created_at DESC');
    return rows;
  },
  async findLatest(limit = 5) {
    const [rows] = await pool.query('SELECT * FROM news ORDER BY created_at DESC LIMIT ?', [limit]);
    return rows;
  },
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM news WHERE id=?', [id]);
    return rows[0] || null;
  },
  async create({ title, content, category = 'General', image, author_id, link }) {
    const [result] = await pool.query(
      'INSERT INTO news (title,content,category,image,author_id,link) VALUES (?,?,?,?,?,?)',
      [title, content, category, image||null, author_id||null, link||null]
    );
    return this.findById(result.insertId);
  },
  async update(id, data) {
    const sanitized = sanitizeData(data);
    const fields = Object.keys(sanitized).map(k => `${k}=?`).join(',');
    if (fields.length === 0) return this.findById(id);
    await pool.query(`UPDATE news SET ${fields} WHERE id=?`, [...Object.values(sanitized), id]);
    return this.findById(id);
  },
  async delete(id) {
    await pool.query('DELETE FROM news WHERE id=?', [id]);
  }
};

module.exports = News;
