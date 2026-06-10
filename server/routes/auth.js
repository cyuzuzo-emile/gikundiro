const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = process.env.JWT_SECRET || 'rayonsportssecret';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findByEmail(email);
    if (existing) return res.status(400).json({ message: 'User already exists' });
    const user = await User.create({ name, email, password, role });
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Debug-friendly guard: prevents bcrypt from throwing confusing 500s
    if (!user.password) {
      console.error('Auth login error: user.password is missing for user id:', user.id);
      return res.status(500).json({ message: 'Password hash not found for user' });
    }

    const match = await User.comparePassword(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Auth login error:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      // mysql2/promise errors often store details on `code` / `sqlMessage`
      code: error?.code,
      sqlMessage: error?.sqlMessage,
      sql: error?.sql,
    });
    res.status(500).json({
      message: error?.message || 'Login failed',
      code: error?.code,
    });
  }
});




router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});
module.exports = router;

