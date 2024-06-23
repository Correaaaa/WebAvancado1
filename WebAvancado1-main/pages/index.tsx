import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import '../styles/styles.css';
import Footer from '../components/Footer';
import Button from '../components/Button';

const IndexPage: React.FC = () => {
  const [favorites, setFavorites] = useState([]);
  const [editModeId, setEditModeId] = useState<number | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedUrl, setUpdatedUrl] = useState('');
  const [searchUrl, setSearchUrl] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [totalFavorites, setTotalFavorites] = useState(0);

  useEffect(() => {
    fetchFavorites();
    fetchTotalFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('http://localhost:5000/');
      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const fetchTotalFavorites = async () => {
    try {
      const response = await fetch('http://localhost:5000/count');
      if (!response.ok) {
        throw new Error('Failed to fetch total favorites');
      }
      const data = await response.json();
      setTotalFavorites(data.count);
    } catch (error) {
      console.error('Error fetching total favorites:', error);
    }
  };

  const searchFavoritesByUrl = async () => {
    try {
      const response = await fetch(`http://localhost:5000/search/url/${searchUrl}`);
      if (!response.ok) {
        throw new Error('Failed to search favorites by URL');
      }
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error searching favorites by URL:', error);
    }
  };

  const searchFavoritesByTitle = async () => {
    try {
      const response = await fetch(`http://localhost:5000/search/titulo/${searchTitle}`);
      if (!response.ok) {
        throw new Error('Failed to search favorites by title');
      }
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error('Error searching favorites by title:', error);
    }
  };

  const handleRemoveFavorite = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete favorite');
      }
      fetchFavorites();
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const handleUpdateFavorite = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ titulo: updatedTitle, url: updatedUrl }),
      });
      if (!response.ok) {
        throw new Error('Failed to update favorite');
      }
      fetchFavorites();
      exitEditMode();
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };

  const enterEditMode = (id: number, title: string, url: string) => {
    setEditModeId(id);
    setUpdatedTitle(title);
    setUpdatedUrl(url);
  };

  const exitEditMode = () => {
    setEditModeId(null);
    setUpdatedTitle('');
    setUpdatedUrl('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(event.target.value);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUrl(event.target.value);
  };

  const handleSearchUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchUrl(event.target.value);
  };

  const handleSearchTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };

  return (
    <div className="container">
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Meus Favoritos</h1>
      <p>Total de favoritos: {totalFavorites}</p>
      <div>
        <input
          type="text"
          value={searchTitle}
          onChange={handleSearchTitleChange}
          placeholder="Buscar por Título"
          className="input"
        />
        <button className="btn" onClick={searchFavoritesByTitle}>
          Buscar
        </button>
      </div>
      <div>
        <input
          type="text"
          value={searchUrl}
          onChange={handleSearchUrlChange}
          placeholder="Buscar por URL"
          className="input"
        />
        <button className="btn" onClick={searchFavoritesByUrl}>
          Buscar
        </button>
      </div>
      <ul className="list">
        {favorites.map((favorite: any) => (
          <li key={favorite._id} className="list-item">
            {editModeId === favorite._id ? (
              <>
                <input
                  type="text"
                  value={updatedTitle}
                  onChange={handleTitleChange}
                  className="input"
                  placeholder="Título"
                />
                <input
                  type="text"
                  value={updatedUrl}
                  onChange={handleUrlChange}
                  className="input"
                  placeholder="URL"
                />
                <button className="btn" onClick={() => handleUpdateFavorite(favorite._id)}>
                  Salvar
                </button>
                <button className="btn" onClick={exitEditMode}>
                  Cancelar
                </button>
              </>
            ) : (
              <>
                <a href={favorite.url} style={{ fontSize: '18px' }}>
                  {favorite.titulo}
                </a>
                <div>
                  <button className="btn" onClick={() => handleRemoveFavorite(favorite._id)}>
                    Remover
                  </button>
                  <button className="btn" onClick={() => enterEditMode(favorite._id, favorite.titulo, favorite.url)}>
                    Editar
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <Button href="/addLink">Adicionar Novo Favorito</Button> 
      <Footer /> 
    </div>
  );
};

export default IndexPage;
