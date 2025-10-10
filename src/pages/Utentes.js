import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap
} from 'react-icons/fa';
import { utenteService } from '../services/api';

const Utentes = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  const { data: utentesData, isLoading, error } = useQuery(
    ['utentes', { busca: searchQuery }],
    () => utenteService.getAll({ busca: searchQuery })
  );

  const deleteMutation = useMutation(utenteService.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('utentes');
    },
  });

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar o utente "${nome}"?`)) {
      try {
        await deleteMutation.mutateAsync(id);
        alert('Utente deletado com sucesso!');
      } catch (error) {
        alert('Erro ao deletar utente: ' + error.message);
      }
    }
  };

  const utentes = utentesData?.data || [];

  if (error) {
    return (
      <div className="alert alert-danger">
        <h4>Erro ao carregar utentes</h4>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Utentes</h1>
          <p className="text-muted mb-0">Gerencie os usuários da biblioteca</p>
        </div>
        <Link to="/utentes/cadastrar" className="btn btn-primary">
          <FaPlus className="me-2" />
          Adicionar Utente
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
                placeholder="Buscar por nome, email ou turma..."
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
        ) : utentes.length === 0 ? (
          <div className="alert alert-info text-center">
            <FaUsers className="fa-2x mb-3" />
            <h4>Nenhum utente encontrado</h4>
            <p>
              {searchQuery ? 'Tente uma busca diferente ou ' : ''}
              <Link to="/utentes/cadastrar">cadastre um novo utente</Link>
            </p>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                {utentes.length} utente(s) encontrado(s)
              </h5>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Contato</th>
                    <th>Turma/Ano</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {utentes.map((utente) => (
                    <tr key={utente.ut_cod}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                            <FaUsers className="text-white" />
                          </div>
                          <div>
                            <strong>{utente.ut_nome}</strong>
                            {utente.ut_nif && (
                              <div>
                                <small className="text-muted">NIF: {utente.ut_nif}</small>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          {utente.ut_email && (
                            <div>
                              <small className="text-muted">
                                <FaEnvelope className="me-1" />
                                {utente.ut_email}
                              </small>
                            </div>
                          )}
                          {utente.ut_tlm && (
                            <div>
                              <small className="text-muted">
                                <FaPhone className="me-1" />
                                {utente.ut_tlm}
                              </small>
                            </div>
                          )}
                          {utente.ut_morada && (
                            <div>
                              <small className="text-muted">
                                <FaMapMarkerAlt className="me-1" />
                                {utente.ut_morada}
                              </small>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div>
                          {utente.ut_turma && (
                            <div>
                              <small className="text-muted">
                                <FaGraduationCap className="me-1" />
                                {utente.ut_turma}
                              </small>
                            </div>
                          )}
                          {utente.ut_ano && (
                            <div>
                              <small className="text-muted">
                                Ano: {utente.ut_ano}
                              </small>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/utentes/editar/${utente.ut_cod}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Editar"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(utente.ut_cod, utente.ut_nome)}
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

export default Utentes;
