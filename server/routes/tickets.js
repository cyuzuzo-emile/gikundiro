const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

router.get('/', async (req, res) => {
  try { res.json(await Ticket.findAll()); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/user/:userId', async (req, res) => {
  try { res.json(await Ticket.findByUser(req.params.userId)); }
  catch (e) { res.status(500).json({ message: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.post('/', async (req, res) => {
  try { res.status(201).json(await Ticket.create(req.body)); }
  catch (e) { res.status(400).json({ message: e.message }); }
});

router.put('/:id/validate', async (req, res) => {
  try {
    const ticket = await Ticket.update(req.params.id, { status: 'Used' });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (e) { res.status(500).json({ message: e.message }); }
});

router.put('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.update(req.params.id, req.body);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json(ticket);
  } catch (e) { res.status(400).json({ message: e.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    await Ticket.delete(req.params.id);
    res.json({ message: 'Ticket deleted successfully' });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;
