// pages/addLink.tsx
import React, { useState } from 'react';
import useFavoritesStore from '../store/favoritesStore';
import '../styles/styles.css';
import Link from 'next/link';

const AddLinkPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { addFavorite } = useFavoritesStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() !== '' && url.trim() !== '') { // Verifica se ambos os campos não estão em branco
      addFavorite({ id: Math.random(), title, url });
      setTitle('');
      setUrl('');
    } else {
      alert('Por favor, preencha todos os campos.'); // Exibe um alerta se algum campo estiver em branco
    }
  };

  return (
    <div className="container">
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Adicionar Link</h1>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
        <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} className="input" />
        <button type="submit" className="btn">Adicionar</button>
      </form>
      <Link href="/">
        <span className="link">Voltar para Meus Favoritos</span>
      </Link>
    </div>
  );
};

export default AddLinkPage;
