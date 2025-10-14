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
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm border-bottom">
      <div className="container-fluid">
        {/* Botão para toggle da sidebar em mobile */}
        <button 
          className="btn btn-link d-md-none me-3"
          onClick={onToggleSidebar}
        >
          <FaBars />
        </button>

        {/* Logo/Brand */}
        <div className="navbar-brand d-none d-md-block">
          <h5 className="mb-0 text-primary">GMBiblioteca</h5>
        </div>

        {/* Barra de Busca */}
        <form className="d-flex flex-grow-1 mx-3" onSubmit={handleSearch}>
          <div className="input-group">
            <span className="input-group-text bg-light border-end-0">
              <FaSearch />
            </span>
            <input
              className="form-control border-start-0"
              type="search"
              placeholder="Buscar livros, autores, editoras..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* Menu do usuário */}
        <div className="navbar-nav ms-auto">
          <div className="nav-item dropdown">
            <button 
              className="btn btn-link nav-link dropdown-toggle d-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <FaBell className="me-2" />
              <span className="badge bg-danger rounded-pill">3</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><h6 className="dropdown-header">Notificações</h6></li>
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: '30px', height: '30px'}}>
                        <FaBook className="text-white" style={{fontSize: '12px'}} />
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <div className="fw-bold">Empréstimo vencido</div>
                      <small className="text-muted">O livro "1984" deve ser devolvido hoje</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <div className="bg-info rounded-circle d-flex align-items-center justify-content-center" style={{width: '30px', height: '30px'}}>
                        <FaUser className="text-white" style={{fontSize: '12px'}} />
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-2">
                      <div className="fw-bold">Novo utente</div>
                      <small className="text-muted">João Silva foi cadastrado</small>
                    </div>
                  </div>
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item text-center" href="#">Ver todas as notificações</a></li>
            </ul>
          </div>

          <div className="nav-item dropdown">
            <button 
              className="btn btn-link nav-link dropdown-toggle d-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: '32px', height: '32px'}}>
                <FaUser className="text-white" style={{fontSize: '14px'}} />
              </div>
              <span className="d-none d-md-inline">Administrador</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="#">
                  <FaUser className="me-2" />
                  Meu Perfil
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <FaCog className="me-2" />
                  Configurações
                </a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a className="dropdown-item" href="#">
                  Sair
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
