const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../public/uploads/products');
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

const coerceProductFields = (body) => {
  const data = { ...body };

  if (data.price !== undefined) data.price = parseInt(data.price, 10);
  if (data.rating !== undefined) data.rating = parseFloat(data.rating);

  if (data.in_stock !== undefined) {
    if (typeof data.in_stock === 'string') data.in_stock = data.in_stock === 'true' || data.in_stock === '1';
  }

  return data;
};

const safeUnlink = (relativeImagePath) => {
  try {
    if (!relativeImagePath || typeof relativeImagePath !== 'string') return;
    // stored like: /uploads/products/<file>
    const abs = path.join(__dirname, '../../public', relativeImagePath);
    if (fs.existsSync(abs)) fs.unlinkSync(abs);
  } catch {
    // ignore file delete failures
  }
};

router.get('/products', async (req, res) => {
  try { res.json(await Product.findAll()); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const data = coerceProductFields(req.body);
    if (req.file) data.image = `/uploads/products/${req.file.filename}`;
    res.status(201).json(await Product.create(data));
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const existing = await Product.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Product not found' });

    const data = coerceProductFields(req.body);

    if (req.file) {
      // replace image file if we have one stored
      safeUnlink(existing.image);
      data.image = `/uploads/products/${req.file.filename}`;
    } else if (data.image === undefined) {
      // keep existing image if client didn't upload a new one
      data.image = existing.image;
    }

    const updated = await Product.update(req.params.id, data);
    res.json(updated);
  } catch (e) { res.status(400).json({ message: e.message }); }
});


router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    safeUnlink(product.image);
    await Product.delete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;

