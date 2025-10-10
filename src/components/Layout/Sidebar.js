import React from 'react';
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
  FaTimes
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onToggle }) => {
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
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay d-md-none" 
          onClick={onToggle}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 1040
          }}
        />
      )}
      
      {/* Sidebar */}
      <nav className={`sidebar ${isOpen ? 'show' : ''}`}>
        {/* Header da Sidebar */}
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
          <h4 className="text-white mb-0">
            <FaBook className="me-2" />
            GMBiblioteca
          </h4>
          <button 
            className="btn btn-link text-white d-md-none"
            onClick={onToggle}
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu de Navegação */}
        <div className="sidebar-menu">
          <ul className="nav flex-column">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item">
                {item.submenu ? (
                  // Item com submenu
                  <div className="nav-item-dropdown">
                    <NavLink
                      to={item.path}
                      className="nav-link d-flex align-items-center"
                      activeClassName="active"
                    >
                      <item.icon className="me-2" />
                      {item.label}
                    </NavLink>
                    <ul className="nav flex-column ms-4">
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex} className="nav-item">
                          <NavLink
                            to={subItem.path}
                            className="nav-link nav-link-sub"
                            activeClassName="active"
                          >
                            {subItem.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  // Item simples
                  <NavLink
                    to={item.path}
                    className="nav-link d-flex align-items-center"
                    activeClassName="active"
                    exact={item.exact}
                  >
                    <item.icon className="me-2" />
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer da Sidebar */}
        <div className="sidebar-footer p-3 mt-auto">
          <div className="text-center">
            <small className="text-white-50">
              Sistema de Gestão de Biblioteca
            </small>
            <br />
            <small className="text-white-50">
              © 2024 GMBiblioteca
            </small>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
