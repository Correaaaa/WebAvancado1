// components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Meu Aplicativo</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-white">Home</a></li>
            <li><a href="#" className="text-white">Sobre</a></li>
            {/* Adicione mais links conforme necessário */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
