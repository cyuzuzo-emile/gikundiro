const pool = require('../db');
const { sanitizeData } = require('../utils/dateUtils');

const Match = {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM matches ORDER BY date ASC');
    return rows;
  },
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM matches WHERE id=?', [id]);
    return rows[0] || null;
  },
  async findUpcoming() {
    const [rows] = await pool.query('SELECT * FROM matches WHERE date >= NOW() ORDER BY date ASC');
    return rows;
  },
  async findPast() {
    const [rows] = await pool.query('SELECT * FROM matches WHERE date < NOW() ORDER BY date DESC');
    return rows;
  },
  async create(data) {
    const toMySQL = (v) => {
      if (!v) return null;
      // If already in YYYY-MM-DD format, append time directly
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return `${v} 00:00:00`;
      return new Date(v).toISOString().slice(0, 19).replace('T', ' ');
    };
    const { date, time, opponent, opponent_logo, rayon_logo, venue, competition, home_or_away='Home', home_score, away_score, status='Scheduled', ticket_price=5000, available_tickets=500 } = data;
    const [result] = await pool.query(
      'INSERT INTO matches (date,time,opponent,opponent_logo,rayon_logo,venue,competition,home_or_away,home_score,away_score,status,ticket_price,available_tickets) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [toMySQL(date), time||null, opponent, opponent_logo||null, rayon_logo||null, venue, competition, home_or_away, home_score||null, away_score||null, status, ticket_price, available_tickets]
    );
    return this.findById(result.insertId);
  },
  async update(id, data) {
    const toMySQL = (v) => {
      if (!v) return null;
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return `${v} 00:00:00`;
      return new Date(v).toISOString().slice(0, 19).replace('T', ' ');
    };
    const sanitized = sanitizeData(data, ['id', 'created_at', 'updated_at']);
    const cleaned = Object.fromEntries(
      Object.entries(sanitized).map(([k, v]) => {
        if (k === 'date' && v) return [k, toMySQL(v)];
        if (v === '') return [k, null];
        return [k, v];
      })
    );
    const fields = Object.keys(cleaned).map(k => `${k}=?`).join(',');
    if (fields.length === 0) return this.findById(id);
    await pool.query(`UPDATE matches SET ${fields} WHERE id=?`, [...Object.values(cleaned), id]);
    return this.findById(id);
  },
  async delete(id) {
    await pool.query('DELETE FROM matches WHERE id=?', [id]);
  }
};

module.exports = Match;
