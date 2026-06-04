const express = require('express');
const router = express.Router();
const News = require('../models/News');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/uploads/news');
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
  try { res.json(await News.findAll()); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/latest', async (req, res) => {
  try { res.json(await News.findLatest(parseInt(req.query.limit) || 5)); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await News.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'News not found' });
    res.json(item);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = `/uploads/news/${req.file.filename}`;
    res.status(201).json(await News.create(data));
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const existing = await News.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'News not found' });
    const data = { ...req.body };
    if (req.file) {
      if (existing.image) {
        const old = path.join(__dirname, '../../public', existing.image);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      data.image = `/uploads/news/${req.file.filename}`;
    }
    res.json(await News.update(req.params.id, data));
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await News.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'News not found' });
    await News.delete(req.params.id);
    res.json({ message: 'News deleted successfully' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
