const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/uploads/players');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `player-${Date.now()}${path.extname(file.originalname)}`);
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
  try { res.json(await Player.findAll()); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.json(player);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.photo = `/uploads/players/${req.file.filename}`;
    res.status(201).json(await Player.create(data));
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const existing = await Player.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Player not found' });
    const data = { ...req.body };
    if (req.file) {
      if (existing.photo) {
        const old = path.join(__dirname, '../public', existing.photo);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      data.photo = `/uploads/players/${req.file.filename}`;
    }
    res.json(await Player.update(req.params.id, data));
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: 'Player not found' });
    await Player.delete(req.params.id);
    res.json({ message: 'Player deleted successfully' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
