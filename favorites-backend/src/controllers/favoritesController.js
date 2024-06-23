// src/controllers/favoritesController.js
const Favorite = require('../models/Favorite');

exports.createFavorite = async (req, res) => {
  const { title, url } = req.body;

  if (!title || !url) {
    return res.status(400).json({ message: 'Título e URL são obrigatórios' });
  }

  try {
    const newFavorite = new Favorite({ title, url });
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao salvar favorito', error: err.message });
  }
};
