const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const initDB = require('./initDB');

dotenv.config();
const app = express();

// CORS
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Init DB
initDB().catch(err => console.error('DB init error:', err.message));

// ✅ API Routes - IZI GOMBA KUBANZA
app.use('/api/auth', require('./routes/auth'));
app.use('/api/players', require('./routes/players'));
app.use('/api/staff', require('./routes/staff'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/news', require('./routes/news'));
app.use('/api/tickets', require('./routes/tickets'));
app.use('/api/users', require('./routes/users'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/shop', require('./routes/shop'));
app.use('/api/votes', require('./routes/votes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Rayon Sports FC API is running' });
});

// ✅ SERVE FRONTEND - IZI GOMBA NYUMA YA API
if (process.env.NODE_ENV === 'production') {
  // Build path - mu root (ahabereye src na public)
  const buildPath = path.join(__dirname, '..', 'build');
  
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
    console.log(`✅ Serving frontend from: ${buildPath}`);
  } else {
    console.error(`❌ Build not found at: ${buildPath}`);
    console.log('Run: npm run build first!');
    app.get('/', (req, res) => {
      res.json({ message: 'API is running. Build frontend first!' });
    });
  }
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend: http://localhost:${PORT}`);
});