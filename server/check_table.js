require('dotenv').config();
const pool = require('./db');

const checkTable = async () => {
  try {
    const [rows] = await pool.query('DESCRIBE news;');
    console.table(rows);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    pool.end();
  }
};

checkTable();