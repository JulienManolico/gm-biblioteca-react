import React, { useState } from 'react';
import { FaBars, FaSearch, FaBell, FaUser, FaCog, FaBook } from 'react-icons/fa';

const TopNavbar = ({ onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implementar busca global
      console.log('Buscar:', searchQuery);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="navbar-brand" href="/">
          📚 GMBiblioteca
        </a>
        
        <div className="navbar-content">
          {/* Barra de busca */}
          <form className="navbar-search" onSubmit={handleSearch}>
            <input 
              type="search" 
              placeholder="Buscar livros..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
