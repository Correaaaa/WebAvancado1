// pages/index.tsx
import React from 'react';
import useFavoritesStore from '../store/favoritesStore';
import Link from 'next/link';
import '../styles/styles.css';
import Footer from '../components/Footer'; 
import Button from '../components/Button'; 
import DeleteAllButton from '../components/DeleteAllButton';

const IndexPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavoritesStore();

  return (
    <div className="container">
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Meus Favoritos</h1>
      <ul className="list">
        {favorites.map((favorite) => (
          <li key={favorite.id} className="list-item">
            <a href={favorite.url} style={{ fontSize: '18px' }}>{favorite.title}</a>
            <button className="btn" onClick={() => removeFavorite(favorite.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <Button href="/addLink">Adicionar Novo Link</Button> {}
      <DeleteAllButton /> {}
      <Footer /> {}
    </div>
  );
};

export default IndexPage;
