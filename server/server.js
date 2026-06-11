const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const initDB = require('./initDB');

dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || true
    : true,
  credentials: true
};

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://rayon-sport.onrender.com', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Init DB
initDB().catch(err => console.error('DB init error:', err.message));

// ✅ STEP 1: API Routes (izi zigomba gutangira mbere)
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

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Rayon Sports FC API is running' });
});

// ✅ STEP 2: Serve React build (iki gikorwa nyuma y'API)
if (process.env.NODE_ENV === 'production') {
  const fs = require('fs');
  const buildPathsToTry = [
    path.join(__dirname, '../client/build'),
    path.join(__dirname, '../../client/build'),
  ];

  const buildDir = buildPathsToTry.find(p => fs.existsSync(path.join(p, 'index.html')));

  if (!buildDir) {
    console.warn('⚠️ React build not found. API routes will work but frontend won\'t.');
  }

  // Serve static files from React build
  app.use(express.static(buildDir || buildPathsToTry[0]));
  
  // ✅ Iyi app.get('*') igomba kuza nyuma y'API routes
  app.get('*', (req, res) => {
    const finalBuildDir = buildPathsToTry.find(p => fs.existsSync(path.join(p, 'index.html')));
    if (!finalBuildDir) {
      return res.status(500).send('React build not found');
    }
    res.sendFile(path.join(finalBuildDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(` API available at http://localhost:${PORT}/api/health`);
  console.log(`🌐 Open http://localhost:${PORT} in your browser`);
});