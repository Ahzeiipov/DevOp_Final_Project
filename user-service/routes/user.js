const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const u = new User(req.body);
  await u.save();
  res.status(201).json(u);
});

router.get('/:id', async (req, res) => {
  const u = await User.findById(req.params.id);
  if (!u) return res.status(404).send('Not found');
  res.json(u);
});

module.exports = router;
