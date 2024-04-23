// pages/index.tsx
import React from 'react';
import useFavoritesStore from '../store/favoritesStore';
import Link from 'next/link';

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
      <Link href="/addLink">
        <span className="link">Adicionar Novo Link</span>
      </Link>
    </div>
  );
};

export default IndexPage;
