const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favoritemodel');

// Add favorite
router.post('/add', async (req, res) => {
  const { userEmail, mealId, name, image } = req.body;
  console.log('Add favorite request body:', req.body); // <-- log incoming data
  try {
const existing = await Favorite.findOne({ userEmail, mealId });

    if (existing) {
      console.log('Favorite already exists');
      return res.status(400).json({ error: 'Already in favorites' });
    }

    const favorite = new Favorite({ userEmail, mealId, name, image });
    await favorite.save();
    res.status(201).json({ message: 'Added to favorites' });
  } catch (err) {
    console.error('Error saving favorite:', err); // <-- log error here
    res.status(500).json({ error: 'Error adding favorite' });
  }
});


// Get favorites
router.get('/:userEmail', async (req, res) => {
  try {
    const favorites = await Favorite.find({ userEmail: req.params.userEmail });
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching favorites' });
  }
});

// Remove favorite
router.delete('/:userEmail/:mealId', async (req, res) => {
  try {
    await Favorite.deleteOne({ userEmail: req.params.userEmail, mealId: req.params.mealId });
    res.json({ message: 'Removed from favorites' });
  } catch (err) {
    res.status(500).json({ error: 'Error removing favorite' });
  }
});

module.exports = router;
