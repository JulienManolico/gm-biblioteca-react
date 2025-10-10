import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { 
  FaBook, 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaCheck,
  FaTimes,
  FaFilter
} from 'react-icons/fa';
import { livroService } from '../services/api';

const Livros = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('');
  const [filtroDisponibilidade, setFiltroDisponibilidade] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const queryClient = useQueryClient();

  // Buscar livros
  const { data: livrosData, isLoading, error } = useQuery(
    ['livros', { busca: searchQuery, genero: filtroGenero, disponibilidade: filtroDisponibilidade }],
    () => livroService.getAll({ 
      busca: searchQuery, 
      genero: filtroGenero, 
      disponibilidade: filtroDisponibilidade 
    })
  );

  // Mutação para deletar livro
  const deleteMutation = useMutation(livroService.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('livros');
    },
  });

  const handleDelete = async (id, titulo) => {
    if (window.confirm(`Tem certeza que deseja deletar o livro "${titulo}"?`)) {
      try {
        await deleteMutation.mutateAsync(id);
        alert('Livro deletado com sucesso!');
      } catch (error) {
        alert('Erro ao deletar livro: ' + error.message);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // A busca é automática via useQuery
  };

  const clearFilters = () => {
    setSearchQuery('');
    setFiltroGenero('');
    setFiltroDisponibilidade('');
  };

  const livros = livrosData?.data || [];

  if (error) {
    return (
      <div className="alert alert-danger">
        <h4>Erro ao carregar livros</h4>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Livros</h1>
          <p className="text-muted mb-0">Gerencie o acervo da biblioteca</p>
        </div>
        <Link to="/livros/cadastrar" className="btn btn-primary">
          <FaPlus className="me-2" />
          Adicionar Livro
        </Link>
      </div>

      {/* Filtros e Busca */}
      <div className="search-container mb-4">
        <form onSubmit={handleSearch}>
          <div className="row">
            <div className="col-md-6">
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
              </div>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                value={filtroGenero}
                onChange={(e) => setFiltroGenero(e.target.value)}
              >
                <option value="">Todos os gêneros</option>
                <option value="Fantasia">Fantasia</option>
                <option value="Ficção Científica">Ficção Científica</option>
                <option value="Literatura Brasileira">Literatura Brasileira</option>
                <option value="Romance">Romance</option>
                <option value="Suspense">Suspense</option>
                <option value="Terror">Terror</option>
                <option value="Biografia">Biografia</option>
                <option value="História">História</option>
                <option value="Filosofia">Filosofia</option>
                <option value="Poesia">Poesia</option>
              </select>
            </div>
            <div className="col-md-3">
              <div className="d-flex gap-2">
                <select
                  className="form-select"
                  value={filtroDisponibilidade}
                  onChange={(e) => setFiltroDisponibilidade(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="disponivel">Disponíveis</option>
                  <option value="indisponivel">Indisponíveis</option>
                </select>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={clearFilters}
                >
                  Limpar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Resultados */}
      <div className="table-container">
        {isLoading ? (
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
              {searchQuery || filtroGenero || filtroDisponibilidade ? (
                'Tente ajustar os filtros ou '
              ) : ''}
              <Link to="/livros/cadastrar">cadastre um novo livro</Link>
            </p>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                {livros.length} livro(s) encontrado(s)
              </h5>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Editora</th>
                    <th>Ano</th>
                    <th>Gênero</th>
                    <th>Disponibilidade</th>
                    <th>Exemplares</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {livros.map((livro) => (
                    <tr key={livro.li_cod}>
                      <td>
                        <div>
                          <strong>{livro.li_titulo}</strong>
                          {livro.li_isbn && (
                            <div>
                              <small className="text-muted">ISBN: {livro.li_isbn}</small>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>{livro.autor || 'Não informado'}</td>
                      <td>{livro.editora || 'Não informado'}</td>
                      <td>{livro.li_ano || '-'}</td>
                      <td>
                        <span className="badge bg-secondary">
                          {livro.categoria || 'Não informado'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${livro.exemplares_disponiveis > 0 ? 'bg-success' : 'bg-danger'}`}>
                          <FaCheck className="me-1" />
                          {livro.exemplares_disponiveis > 0 ? 'Disponível' : 'Indisponível'}
                        </span>
                      </td>
                      <td>
                        <small className="text-muted">
                          {livro.exemplares_disponiveis}/{livro.total_exemplares}
                        </small>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/livros/editar/${livro.li_cod}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Editar"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(livro.li_cod, livro.li_titulo)}
                            title="Deletar"
                            disabled={deleteMutation.isLoading}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Livros;
