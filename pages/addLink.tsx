// pages/addLink.tsx
import React, { useState } from 'react';
import useFavoritesStore from '../store/favoritesStore';
import Link from 'next/link';

const AddLinkPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const { addFavorite } = useFavoritesStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addFavorite({ id: Math.random(), title, url });
    setTitle('');
    setUrl('');
  };

  return (
    <div>
      <h1>Adicionar Link</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
        <button type="submit">Adicionar</button>
      </form>
      <Link href="/">
        <span>Voltar para Meus Favoritos</span>
      </Link>
    </div>
  );
};

export default AddLinkPage;
