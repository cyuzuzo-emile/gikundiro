const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/', async (req, res) => {
  try { res.status(201).json(await Order.create(req.body)); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/', async (req, res) => {
  try { res.json(await Order.findAll()); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/my-orders', async (req, res) => {
  try { res.json(await Order.findByUser(req.headers['x-user-id'])); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put('/:id/status', async (req, res) => {
  try {
    const order = await Order.updateStatus(req.params.id, req.body.status);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put('/:id/payment', async (req, res) => {
  try {
    const order = await Order.updatePayment(req.params.id, req.body.paymentStatus);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
