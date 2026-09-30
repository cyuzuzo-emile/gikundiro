// server/db.js
const mongoose = require('mongoose');

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI ntashyizweho muri environment variables');
  }
  
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB yahuze neza');
  } catch (err) {
    console.error('❌ MongoDB connection yanze:', err.message);
    throw err;
  }
}

module.exports = connectDB;