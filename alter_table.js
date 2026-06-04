const pool = require('./server/db');

const alterTable = async () => {
  try {
    await pool.query('ALTER TABLE news ADD COLUMN video VARCHAR(255) NULL AFTER image;');
    console.log('Video column added successfully');
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log('Video column already exists');
    } else {
      console.error('Error altering table:', err);
    }
  } finally {
    pool.end();
  }
};

alterTable();