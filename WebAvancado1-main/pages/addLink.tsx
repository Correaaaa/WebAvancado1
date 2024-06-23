// pages/addLink.tsx
import React, { useState } from 'react';
import '../styles/styles.css';
import Footer from '../components/Footer';
import Button from '../components/Button';

const AddLinkPage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() !== '' && url.trim() !== '') {
      try {
        const response = await fetch('http://localhost:5000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ titulo: title, url: url }),
        });
        if (!response.ok) {
          throw new Error('Erro ao adicionar favorito');
        }
        setTitle('');
        setUrl('');
        alert('Favorito adicionado com sucesso!');
      } catch (err: any) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert('Erro desconhecido ao adicionar favorito');
        }
      }
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
      <Footer /> {}
    </div>  
  );
};

export default AddLinkPage;
