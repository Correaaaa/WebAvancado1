const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Importe o módulo cors

const app = express();
app.use(express.json());
app.use(cors()); // Use o middleware do cors

const PORT = 5000;

mongoose.connect('mongodb+srv://Areas:IL6YXg0jiFj3ijeI@cluster0.oxqwnik.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const Favorito = mongoose.model('Favorito', {
    titulo: String,
    url: String
});

app.get('/', async (req, res) => {
    const favoritos = await Favorito.find();
    res.json(favoritos);
});

app.post('/', async (req, res) => {
    const { titulo, url } = req.body;
    const favorito = new Favorito({ titulo, url });
    await favorito.save();
    res.json(favorito);
});

app.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, url } = req.body;
    
    try {
        const favorito = await Favorito.findByIdAndUpdate(id, { titulo, url }, { new: true });
        if (!favorito) {
            return res.status(404).json({ error: 'Favorito não encontrado' });
        }
        res.json(favorito);
    } catch (error) {
        console.error('Erro ao atualizar favorito:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const favorito = await Favorito.findByIdAndDelete(id);
        if (!favorito) {
            return res.status(404).json({ error: 'Favorito não encontrado' });
        }
        res.json(favorito);
    } catch (error) {
        console.error('Erro ao remover favorito:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
