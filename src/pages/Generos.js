import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { 
  FaTags, 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash
} from 'react-icons/fa';
import { generoService } from '../services/api';

const Generos = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  const { data: generosData, isLoading, error } = useQuery(
    ['generos', { busca: searchQuery }],
    () => generoService.getAll({ busca: searchQuery })
  );

  const deleteMutation = useMutation(generoService.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('generos');
    },
  });

  const handleDelete = async (genero) => {
    if (window.confirm(`Tem certeza que deseja deletar o gênero "${genero}"?`)) {
      try {
        await deleteMutation.mutateAsync(genero);
        alert('Gênero deletado com sucesso!');
      } catch (error) {
        alert('Erro ao deletar gênero: ' + error.message);
      }
    }
  };

  const generos = Array.isArray(generosData?.data) ? generosData.data : [];

  if (error) {
    return (
      <div className="alert alert-danger">
        <h4>Erro ao carregar gêneros</h4>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Gêneros</h1>
          <p className="text-muted mb-0">Gerencie os gêneros literários</p>
        </div>
        <Link to="/generos/cadastrar" className="btn btn-primary">
          <FaPlus className="me-2" />
          Adicionar Gênero
        </Link>
      </div>

      <div className="search-container mb-4">
        <div className="row">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text">
                <FaSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar gênero..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        {isLoading ? (
          <div className="loading-spinner">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Carregando...</span>
            </div>
          </div>
        ) : generos.length === 0 ? (
          <div className="alert alert-info text-center">
            <FaTags className="fa-2x mb-3" />
            <h4>Nenhum gênero encontrado</h4>
            <p>
              {searchQuery ? 'Tente uma busca diferente ou ' : ''}
              <Link to="/generos/cadastrar">cadastre um novo gênero</Link>
            </p>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                {generos.length} gênero(s) encontrado(s)
              </h5>
            </div>

            <div className="row">
              {generos.map((genero) => (
                <div key={genero} className="col-md-3 col-sm-6 mb-3">
                  <div className="card">
                    <div className="card-body text-center">
                      <FaTags className="fa-2x text-primary mb-3" />
                      <h5 className="card-title">{genero}</h5>
                      <div className="btn-group" role="group">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(genero)}
                          title="Deletar"
                          disabled={deleteMutation.isLoading}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Generos;
