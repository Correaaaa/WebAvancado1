// src/routes/favorites.js
const express = require('express');
const { createFavorite } = require('../controllers/favoritesController');

const router = express.Router();

router.post('/', createFavorite);

module.exports = router;
