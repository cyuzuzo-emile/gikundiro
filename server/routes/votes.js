const express = require('express');
const router = express.Router();
const pool = require('../db');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch { res.status(401).json({ message: 'Invalid token' }); }
};

// Get current period string: "2025-W23" or "2025-06"
function getPeriod(type) {
  const now = new Date();
  if (type === 'month') return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const start = new Date(now.getFullYear(), 0, 1);
  const week = Math.ceil(((now - start) / 86400000 + start.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${String(week).padStart(2, '0')}`;
}

// GET /api/votes/results?type=week|month  — public
router.get('/results', async (req, res) => {
  const type = req.query.type === 'month' ? 'month' : 'week';
  const period = getPeriod(type);
  try {
    const [rows] = await pool.query(
      `SELECT p.id, p.name, p.position, p.photo, p.jersey_number,
              COUNT(v.id) AS vote_count
       FROM players p
       LEFT JOIN player_votes v ON v.player_id = p.id AND v.vote_type = ? AND v.period = ?
       GROUP BY p.id ORDER BY vote_count DESC`,
      [type, period]
    );
    res.json({ period, type, players: rows });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// GET /api/votes/my?type=week|month  — fan: check if already voted
router.get('/my', auth, async (req, res) => {
  const type = req.query.type === 'month' ? 'month' : 'week';
  const period = getPeriod(type);
  try {
    const [rows] = await pool.query(
      'SELECT player_id FROM player_votes WHERE user_id=? AND vote_type=? AND period=?',
      [req.user.id, type, period]
    );
    res.json({ voted: rows.length > 0, player_id: rows[0]?.player_id || null });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

// POST /api/votes  — fan: cast vote
router.post('/', auth, async (req, res) => {
  const { player_id, type } = req.body;
  if (!player_id || !['week', 'month'].includes(type))
    return res.status(400).json({ message: 'player_id and type (week|month) required' });
  const period = getPeriod(type);
  try {
    await pool.query(
      'INSERT INTO player_votes (user_id, player_id, vote_type, period) VALUES (?,?,?,?)',
      [req.user.id, player_id, type, period]
    );
    res.json({ message: 'Vote cast successfully' });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY')
      return res.status(409).json({ message: 'You already voted this ' + type });
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
