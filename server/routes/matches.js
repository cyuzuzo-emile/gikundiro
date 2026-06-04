const express = require('express');
const router = express.Router();
const Match = require('../models/Match');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/uploads/matches');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    /jpeg|jpg|png|gif/.test(file.mimetype) ? cb(null, true) : cb(new Error('Only image files allowed'));
  }
});

router.get('/', async (req, res) => {
  try { res.json(await Match.findAll()); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/upcoming', async (req, res) => {
  try { res.json(await Match.findUpcoming()); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/past', async (req, res) => {
  try { res.json(await Match.findPast()); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.json(match);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/', upload.fields([{name: 'opponent_logo', maxCount: 1}, {name: 'rayon_logo', maxCount: 1}]), async (req, res) => {
  try {
    const data = { ...req.body };
    const files = req.files || {};
    if (files.opponent_logo) data.opponent_logo = `/uploads/matches/${files.opponent_logo[0].filename}`;
    if (files.rayon_logo) data.rayon_logo = `/uploads/matches/${files.rayon_logo[0].filename}`;
    res.status(201).json(await Match.create(data));
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.put('/:id', upload.fields([{name: 'opponent_logo', maxCount: 1}, {name: 'rayon_logo', maxCount: 1}]), async (req, res) => {
  try {
    const existing = await Match.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Match not found' });
    const data = { ...req.body };
    const files = req.files || {};
    if (files.opponent_logo) {
      if (existing.opponent_logo) {
        const old = path.join(__dirname, '../public', existing.opponent_logo);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      data.opponent_logo = `/uploads/matches/${files.opponent_logo[0].filename}`;
    }
    if (files.rayon_logo) {
      if (existing.rayon_logo) {
        const old = path.join(__dirname, '../public', existing.rayon_logo);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      data.rayon_logo = `/uploads/matches/${files.rayon_logo[0].filename}`;
    }
    res.json(await Match.update(req.params.id, data));
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) return res.status(404).json({ message: 'Match not found' });
    if (match.opponent_logo) {
      const filePath = path.join(__dirname, '../public', match.opponent_logo);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    if (match.rayon_logo) {
      const filePath = path.join(__dirname, '../public', match.rayon_logo);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await Match.delete(req.params.id);
    res.json({ message: 'Match deleted successfully' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
