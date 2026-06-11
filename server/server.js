const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const initDB = require('./initDB');
// server.js - Ongera CORS configuration nk'iyi
const cors = require('cors');

// Yemera frontend yawe
app.use(cors({
  origin: ['https://rayon-sport.onrender.com', 'https://gikundiro.onrender.com', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

dotenv.config();
const app = express();

// ✅ CORS Configuration - YEMERA FRONTEND YAWE
const allowedOrigins = [
  'https://rayon-sport.onrender.com',
  'https://rayon-sports-frontend.onrender.com',
  'http://localhost:3000',
  'http://localhost:3001'
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(null, true); // Iyi ukurikije ibyo ushaka - niba ushaka kwemera byose
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};

// Cyangwa uramutse ushaka kwemera byose (development)
const corsOptionsSimple = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Koresha CORS mbere y'andi middleware
app.use(cors(corsOptionsSimple)); // Cyangwa corsOptions
app.options('*', cors(corsOptionsSimple)); // Handle preflight requests

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Init DB
initDB().catch(err => console.error('DB init error:', err.message));

// API Routes
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`✅ CORS enabled for origins:`, allowedOrigins);
});