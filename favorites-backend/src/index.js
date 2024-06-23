const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

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

// Endpoint para retornar o número total de favoritos
app.get('/count', async (req, res) => {
    try {
        const count = await Favorito.countDocuments();
        res.json({ count });
    } catch (error) {
        console.error('Erro ao contar favoritos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Endpoint para retornar favoritos cuja URL contém uma string
app.get('/search/url/:url', async (req, res) => {
    const { url } = req.params;
    try {
        const favoritos = await Favorito.find({ url: { $regex: url, $options: 'i' } });
        res.json(favoritos);
    } catch (error) {
        console.error('Erro ao buscar favoritos por URL:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Endpoint retornar favoritos cujo título contém uma string
app.get('/search/titulo/:titulo', async (req, res) => {
    const { titulo } = req.params;
    try {
        const favoritos = await Favorito.find({ titulo: { $regex: titulo, $options: 'i' } });
        res.json(favoritos);
    } catch (error) {
        console.error('Erro ao buscar favoritos por título:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
