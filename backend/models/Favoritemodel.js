const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  mealId: { type: String, required: true },
  name: String,
  image: String,
});

module.exports = mongoose.model('Favorite', favoriteSchema);
