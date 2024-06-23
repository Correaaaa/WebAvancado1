// src/models/Favorite.js
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
