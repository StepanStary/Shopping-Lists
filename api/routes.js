//routes.js
const express = require('express');
const router = express.Router();

// Vytvoření nového záznamu
router.post('/examples', async (req, res) => {
  try {
    const newExample = new Example(req.body);
    await newExample.save();
    res.status(201).json(newExample);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Získání všech záznamů
router.get('/examples', async (req, res) => {
  try {
    const examples = await Example.find();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/api/data', (req, res) => {
  res.json({ message: 'Your data here'});
});

module.exports = router