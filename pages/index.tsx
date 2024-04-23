// pages/index.tsx
import React from 'react';
import useFavoritesStore from '../store/favoritesStore';
import Link from 'next/link';

const IndexPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavoritesStore();

  return (
    <div>
      <h1>Meus Favoritos</h1>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <a href={favorite.url}>{favorite.title}</a>
            <button onClick={() => removeFavorite(favorite.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <Link href="/addLink">
        <span>Adicionar Novo Link</span>
      </Link>
    </div>
  );
};

export default IndexPage;
