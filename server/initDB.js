const pool = require('./db');

const initDB = async () => {
  const conn = await pool.getConnection();
  try {
    await conn.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        role ENUM('fan','admin') DEFAULT 'fan',
        avatar VARCHAR(255),
        is_blocked BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS players (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position ENUM('Goalkeeper','Defender','Midfielder','Forward') NOT NULL,
        jersey_number INT NOT NULL UNIQUE,
        nationality VARCHAR(100) NOT NULL,
        date_of_birth DATE,
        photo VARCHAR(255),
        bio TEXT,
        goals INT DEFAULT 0,
        assists INT DEFAULT 0,
        appearances INT DEFAULT 0,
        clean_sheets INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS matches (
        id INT AUTO_INCREMENT PRIMARY KEY,
        date DATETIME NOT NULL,
        time VARCHAR(20),
        opponent VARCHAR(255) NOT NULL,
        opponent_logo VARCHAR(255),
        rayon_logo VARCHAR(255),
        venue VARCHAR(255) NOT NULL,
        competition VARCHAR(255) NOT NULL,
        home_or_away ENUM('Home','Away') DEFAULT 'Home',
        home_score INT,
        away_score INT,
        status ENUM('Scheduled','Live','Completed') DEFAULT 'Scheduled',
        ticket_price INT DEFAULT 5000,
        available_tickets INT DEFAULT 500,
        live_stream_url VARCHAR(512),
        highlights_video_url VARCHAR(512),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Add rayon_logo column if it doesn't exist
    await conn.query(`
      ALTER TABLE matches ADD COLUMN IF NOT EXISTS rayon_logo VARCHAR(255)
    `).catch(() => {});

    await conn.query(`
      CREATE TABLE IF NOT EXISTS news (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        category ENUM('Announcement','Match Report','Transfer','General') DEFAULT 'General',
        image VARCHAR(255),
        link VARCHAR(512),
        author_id INT,
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        match_id INT NOT NULL,
        seat_number VARCHAR(50) NOT NULL,
        price INT NOT NULL,
        qr_code VARCHAR(255),
        status ENUM('Valid','Used','Cancelled') DEFAULT 'Valid',
        booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (match_id) REFERENCES matches(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        price INT NOT NULL,
        image VARCHAR(255) DEFAULT 'https://via.placeholder.com/400x400?text=Product',
        description TEXT,
        rating DECIMAL(3,1) DEFAULT 0,
        in_stock BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_number VARCHAR(100) NOT NULL UNIQUE,
        user_id INT,
        customer_name VARCHAR(255) NOT NULL,
        customer_email VARCHAR(255) NOT NULL,
        customer_phone VARCHAR(50) NOT NULL,
        subtotal INT NOT NULL,
        payment_method ENUM('cash','card','mobile_money') NOT NULL,
        payment_status ENUM('pending','paid','failed') DEFAULT 'pending',
        status ENUM('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
        shipping_street VARCHAR(255),
        shipping_city VARCHAR(100),
        shipping_province VARCHAR(100),
        shipping_country VARCHAR(100) DEFAULT 'Rwanda',
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT,
        name VARCHAR(255),
        price INT,
        quantity INT,
        image VARCHAR(255),
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS staff (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        photo VARCHAR(255),
        bio TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS player_votes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        player_id INT NOT NULL,
        vote_type ENUM('week','month') NOT NULL,
        period VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE KEY unique_vote (user_id, vote_type, period),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
      )
    `);

    console.log('MySQL tables initialized');
  } finally {
    conn.release();
  }
};

module.exports = initDB;
