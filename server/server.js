const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const initDB = require('./initDB');

dotenv.config();

const app = express();

// CORS configuration - allow all origins in development, specific in production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || true
    : true,
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  // Support both common repo layouts:
  // - server/../client/build
  // - ../client/build
  const buildPathsToTry = [
    path.join(__dirname, '../client/build'),
    path.join(__dirname, '../../client/build'),
  ];

  const fs = require('fs');
  const buildDir = buildPathsToTry.find(p => fs.existsSync(path.join(p, 'index.html')));

 

initDB().catch(err => console.error('DB init error:', err.message));


// Routes
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

// Serve React app for all other routes (SPA support)
if (process.env.NODE_ENV === 'production') {
  // Use the same resolved buildDir logic above by attempting the known paths.
  const fs = require('fs');
  const buildPathsToTry = [
    path.join(__dirname, '../client/build'),
    path.join(__dirname, '../../client/build'),
  ];

  const buildDir = buildPathsToTry.find(p => fs.existsSync(path.join(p, 'index.html')));

  a
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser`);
});
