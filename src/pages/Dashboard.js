import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { 
  FaBook, 
  FaUser, 
  FaBuilding, 
  FaUsers, 
  FaExchangeAlt,
  FaPlus,
  FaSearch,
  FaCheck,
  FaTimes
} from 'react-icons/fa';
import { statsService, livroService } from '../services/api';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Buscar estatísticas do dashboard
  const { data: stats, isLoading: statsLoading } = useQuery(
    'dashboard-stats',
    statsService.getDashboardStats,
    {
      refetchInterval: 30000, // Atualizar a cada 30 segundos
    }
  );

  // Buscar livros para exibir na página inicial
  const { data: livrosData, isLoading: livrosLoading } = useQuery(
    'livros-dashboard',
    () => livroService.getAll({ limite: 8 }),
    {
      refetchInterval: 60000, // Atualizar a cada 1 minuto
    }
  );

  // Função de busca
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const response = await livroService.getAll({ busca: searchQuery });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Erro na busca:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Limpar busca
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const livros = searchResults.length > 0 ? searchResults : (Array.isArray(livrosData?.data) ? livrosData.data : []);

  return (
    <div className="fade-in">
      {/* Header com ações rápidas */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Dashboard</h1>
          <p className="text-muted mb-0">Visão geral do sistema de biblioteca</p>
        </div>
        <div className="d-flex gap-2">
          <Link to="/livros/cadastrar" className="btn btn-primary">
            <FaPlus className="me-2" />
            Adicionar Livro
          </Link>
          <Link to="/livros" className="btn btn-outline-primary">
            <FaBook className="me-2" />
            Ver Todos os Livros
          </Link>
        </div>
      </div>

      {/* Barra de busca */}
      <div className="search-container mb-4">
        <form onSubmit={handleSearch}>
          <div className="row">
            <div className="col-md-8">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por título, autor ou categoria..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={clearSearch}
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <button 
                type="submit" 
                className="btn btn-primary w-100"
                disabled={isSearching}
              >
                {isSearching ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Cards de estatísticas */}
      {!statsLoading && stats?.data && (
        <div className="row mb-4">
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="stats-card">
              <FaBook className="mb-2" style={{fontSize: '2rem'}} />
              <h3>{stats.data.totalLivros}</h3>
              <p>Total de Livros</p>
            </div>
          </div>
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="stats-card">
              <FaUser className="mb-2" style={{fontSize: '2rem'}} />
              <h3>{stats.data.totalAutores}</h3>
              <p>Autores</p>
            </div>
          </div>
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="stats-card">
              <FaBuilding className="mb-2" style={{fontSize: '2rem'}} />
              <h3>{stats.data.totalEditoras}</h3>
              <p>Editoras</p>
            </div>
          </div>
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="stats-card">
              <FaUsers className="mb-2" style={{fontSize: '2rem'}} />
              <h3>{stats.data.totalUtentes}</h3>
              <p>Utentes</p>
            </div>
          </div>
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="stats-card">
              <FaExchangeAlt className="mb-2" style={{fontSize: '2rem'}} />
              <h3>{stats.data.emprestimosAtivos}</h3>
              <p>Empréstimos Ativos</p>
            </div>
          </div>
          <div className="col-md-2 col-sm-6 mb-3">
            <div className="stats-card">
              <FaCheck className="mb-2" style={{fontSize: '2rem'}} />
              <h3>{stats.data.livrosDisponiveis}</h3>
              <p>Disponíveis</p>
            </div>
          </div>
        </div>
      )}

      {/* Lista de livros */}
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>
              {searchResults.length > 0 ? (
                <>
                  Resultados para "{searchQuery}"
                  <span className="badge bg-primary ms-2">{searchResults.length} encontrado(s)</span>
                </>
              ) : (
                'Nossos Livros'
              )}
            </h2>
          </div>

          {livrosLoading ? (
            <div className="loading-spinner">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : livros.length === 0 ? (
            <div className="alert alert-info text-center">
              <FaBook className="fa-2x mb-3" />
              <h4>Nenhum livro encontrado</h4>
              <p>
                {searchResults.length > 0 ? (
                  'Tente uma busca diferente ou '
                ) : ''}
                <Link to="/livros/cadastrar">cadastre um novo livro</Link>
              </p>
            </div>
          ) : (
            <div className="row">
              {livros.map((livro) => (
                <div key={livro.li_cod} className="col-md-4 col-lg-3 mb-4">
                  <div className="card book-card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{livro.li_titulo}</h5>
                      <p className="card-text">
                        <strong>Autor:</strong> {livro.autor || 'Não informado'}<br />
                        <strong>Editora:</strong> {livro.editora || 'Não informado'}<br />
                        <strong>Ano:</strong> {livro.li_ano || 'Não informado'}<br />
                        <strong>Gênero:</strong>{' '}
                        <span className="badge bg-secondary">
                          {livro.categoria || 'Não informado'}
                        </span>
                      </p>
                      {livro.li_edicao && (
                        <p className="card-text">
                          <small className="text-muted">Edição: {livro.li_edicao}</small>
                        </p>
                      )}
                      {livro.li_isbn && (
                        <p className="card-text">
                          <small className="text-muted">ISBN: {livro.li_isbn}</small>
                        </p>
                      )}
                    </div>
                    <div className="card-footer">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className={`badge ${livro.exemplares_disponiveis > 0 ? 'bg-success' : 'bg-danger'}`}>
                          <FaCheck className="me-1" />
                          {livro.exemplares_disponiveis > 0 ? 'Disponível' : 'Indisponível'}
                        </span>
                        <small className="text-muted">
                          {livro.exemplares_disponiveis}/{livro.total_exemplares} disp.
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!searchResults.length && livrosData?.data && livrosData.data.length > 8 && (
            <div className="text-center mt-3">
              <Link to="/livros" className="btn btn-primary">
                <FaBook className="me-2" />
                Ver todos os livros
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
