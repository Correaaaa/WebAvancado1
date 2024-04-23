// components/DeleteAllButton.tsx
import React, { useState } from 'react';
import useFavoritesStore from '../store/favoritesStore';

const DeleteAllButton: React.FC = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { removeAllFavorites } = useFavoritesStore();

  const handleDeleteAll = () => {
    if (confirm('Tem certeza de que deseja excluir todos os favoritos?')) {
      removeAllFavorites();
    }
  };

  return (
    <>
      {confirmDelete ? (
        <button className="btn btn-danger" onClick={handleDeleteAll}>Confirmar Excluir Todos</button>
      ) : (
        <button className="btn btn-danger" onClick={() => setConfirmDelete(true)}>Excluir Todos</button>
      )}
    </>
  );
};

export default DeleteAllButton;
