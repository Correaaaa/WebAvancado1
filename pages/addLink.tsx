// pages/addLink.tsx
import React, { useState } from 'react';
import useFavoritesStore from '../store/favoritesStore';
import Link from 'next/link';
import '../styles/styles.css';
import Footer from '../components/Footer'; // Importando o componente Footer
import Button from '../components/Button'; // Importando o componente Button
import DeleteAllButton from '../components/DeleteAllButton'; // Importando o componente DeleteAllButton

const AddLinkPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { addFavorite } = useFavoritesStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() !== '' && url.trim() !== '') {
      addFavorite({ id: Math.random(), title, url });
      setTitle('');
      setUrl('');
    } else {
      alert('Por favor, preencha todos os campos.');
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
      <Button href="/">Voltar para Meus Favoritos</Button> {}
      <DeleteAllButton /> {}
      <Footer /> {}
    </div>
  );
};

export default AddLinkPage;


