import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaBook, 
  FaUser, 
  FaBuilding, 
  FaTags, 
  FaUsers, 
  FaExchangeAlt,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onToggle }) => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menuKey) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const menuItems = [
    {
      path: '/dashboard',
      icon: FaHome,
      label: 'Dashboard',
      exact: true
    },
    {
      path: '/livros',
      icon: FaBook,
      label: 'Livros',
      submenu: [
        { path: '/livros', label: 'Listar Livros' },
        { path: '/livros/cadastrar', label: 'Cadastrar Livro' }
      ]
    },
    {
      path: '/autores',
      icon: FaUser,
      label: 'Autores',
      submenu: [
        { path: '/autores', label: 'Listar Autores' },
        { path: '/autores/cadastrar', label: 'Cadastrar Autor' }
      ]
    },
    {
      path: '/editoras',
      icon: FaBuilding,
      label: 'Editoras',
      submenu: [
        { path: '/editoras', label: 'Listar Editoras' },
        { path: '/editoras/cadastrar', label: 'Cadastrar Editora' }
      ]
    },
    {
      path: '/generos',
      icon: FaTags,
      label: 'Gêneros',
      submenu: [
        { path: '/generos', label: 'Listar Gêneros' },
        { path: '/generos/cadastrar', label: 'Cadastrar Gênero' }
      ]
    },
    {
      path: '/utentes',
      icon: FaUsers,
      label: 'Utentes',
      submenu: [
        { path: '/utentes', label: 'Listar Utentes' },
        { path: '/utentes/cadastrar', label: 'Cadastrar Utente' }
      ]
    },
    {
      path: '/emprestimos',
      icon: FaExchangeAlt,
      label: 'Empréstimos'
    },
    {
      path: '/codigo-postal',
      icon: FaMapMarkerAlt,
      label: 'Código Postal',
      submenu: [
        { path: '/codigo-postal', label: 'Listar Códigos' },
        { path: '/codigo-postal/cadastrar', label: 'Cadastrar Código' }
      ]
    }
  ];

  return (
    <>
      {/* Navegação horizontal simplificada */}
      <nav className="horizontal-nav" aria-label="Navegação principal">
        <div className="nav-section">
          <NavLink to="/dashboard" className="nav-item">
            🏠 Inicial
          </NavLink>
          <NavLink to="/livros" className="nav-item">
            📖 Livros
          </NavLink>
          <NavLink to="/emprestimos" className="nav-item">
            📋 Empréstimos
          </NavLink>
        </div>
        
        <div className="nav-divider"></div>
        
        <div className="nav-section">
          <NavLink to="/autores/cadastrar" className="nav-item">
            👤 Autor
          </NavLink>
          <NavLink to="/editoras/cadastrar" className="nav-item">
            🏢 Editora
          </NavLink>
          <NavLink to="/generos/cadastrar" className="nav-item">
            🏷️ Gênero
          </NavLink>
          <NavLink to="/codigo-postal/cadastrar" className="nav-item">
            📍 CEP
          </NavLink>
          <NavLink to="/utentes/cadastrar" className="nav-item">
            👥 Utente
          </NavLink>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
