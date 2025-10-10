import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { 
  FaUser, 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaGlobe
} from 'react-icons/fa';
import { autorService } from '../services/api';

const Autores = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  // Buscar autores
  const { data: autoresData, isLoading, error } = useQuery(
    ['autores', { busca: searchQuery }],
    () => autorService.getAll({ busca: searchQuery })
  );

  // Mutação para deletar autor
  const deleteMutation = useMutation(autorService.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('autores');
    },
  });

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar o autor "${nome}"?`)) {
      try {
        await deleteMutation.mutateAsync(id);
        alert('Autor deletado com sucesso!');
      } catch (error) {
        alert('Erro ao deletar autor: ' + error.message);
      }
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // A busca é automática via useQuery
  };

  const autores = autoresData?.data || [];

  if (error) {
    return (
      <div className="alert alert-danger">
        <h4>Erro ao carregar autores</h4>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Autores</h1>
          <p className="text-muted mb-0">Gerencie os autores da biblioteca</p>
        </div>
        <Link to="/autores/cadastrar" className="btn btn-primary">
          <FaPlus className="me-2" />
          Adicionar Autor
        </Link>
      </div>

      {/* Busca */}
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
                  placeholder="Buscar por nome ou país..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Lista de autores */}
      <div className="table-container">
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : autores.length === 0 ? (
          <div className="alert alert-info text-center">
            <FaUser className="fa-2x mb-3" />
            <h4>Nenhum autor encontrado</h4>
            <p>
              {searchQuery ? 'Tente uma busca diferente ou ' : ''}
              <Link to="/autores/cadastrar">cadastre um novo autor</Link>
            </p>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                {autores.length} autor(es) encontrado(s)
              </h5>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>País</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {autores.map((autor) => (
                    <tr key={autor.au_cod}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                            <FaUser className="text-white" />
                          </div>
                          <div>
                            <strong>{autor.au_nome}</strong>
                          </div>
                        </div>
                      </td>
                      <td>
                        {autor.au_pais ? (
                          <span className="d-flex align-items-center">
                            <FaGlobe className="me-2 text-muted" />
                            {autor.au_pais}
                          </span>
                        ) : (
                          <span className="text-muted">Não informado</span>
                        )}
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/autores/editar/${autor.au_cod}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Editar"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(autor.au_cod, autor.au_nome)}
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

export default Autores;
