const express = require('express');
const router = express.Router();
const Staff = require('../models/Staff');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/uploads/staff');
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `staff-${Date.now()}${path.extname(file.originalname)}`);
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
  try { res.json(await Staff.findAll()); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    res.json(staff);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.photo = `/uploads/staff/${req.file.filename}`;
    const result = await Staff.create(data);
    res.status(201).json(result);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.put('/:id', upload.single('photo'), async (req, res) => {
  try {
    const existing = await Staff.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Staff not found' });
    const data = { ...req.body };
    if (req.file) {
      if (existing.photo) {
        const old = path.join(__dirname, '../public', existing.photo);
        if (fs.existsSync(old)) fs.unlinkSync(old);
      }
      data.photo = `/uploads/staff/${req.file.filename}`;
    }
    const result = await Staff.update(req.params.id, data);
    res.json(result);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) return res.status(404).json({ message: 'Staff not found' });
    if (staff.photo) {
      const filePath = path.join(__dirname, '../public', staff.photo);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    await Staff.delete(req.params.id);
    res.json({ message: 'Staff deleted successfully' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
