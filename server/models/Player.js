const pool = require('../db');
const { sanitizeData } = require('../utils/dateUtils');

const Player = {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM players ORDER BY jersey_number ASC');
    return rows;
  },
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM players WHERE id=?', [id]);
    return rows[0] || null;
  },
  async create(data) {
    const { name, position, jersey_number, nationality, date_of_birth, photo, bio, goals=0, assists=0, appearances=0, clean_sheets=0 } = data;
    const [result] = await pool.query(
      'INSERT INTO players (name,position,jersey_number,nationality,date_of_birth,photo,bio,goals,assists,appearances,clean_sheets) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
      [name, position, jersey_number, nationality, date_of_birth||null, photo||null, bio||null, goals, assists, appearances, clean_sheets]
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
    await pool.query(`UPDATE players SET ${fields} WHERE id=?`, [...Object.values(cleaned), id]);
    return this.findById(id);
  },
  async delete(id) {
    await pool.query('DELETE FROM players WHERE id=?', [id]);
  }
};

module.exports = Player;
