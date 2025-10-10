import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { 
  FaBuilding, 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash, 
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { editoraService } from '../services/api';

const Editoras = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  const { data: editorasData, isLoading, error } = useQuery(
    ['editoras', { busca: searchQuery }],
    () => editoraService.getAll({ busca: searchQuery })
  );

  const deleteMutation = useMutation(editoraService.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('editoras');
    },
  });

  const handleDelete = async (id, nome) => {
    if (window.confirm(`Tem certeza que deseja deletar a editora "${nome}"?`)) {
      try {
        await deleteMutation.mutateAsync(id);
        alert('Editora deletada com sucesso!');
      } catch (error) {
        alert('Erro ao deletar editora: ' + error.message);
      }
    }
  };

  const editoras = editorasData?.data || [];

  if (error) {
    return (
      <div className="alert alert-danger">
        <h4>Erro ao carregar editoras</h4>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Editoras</h1>
          <p className="text-muted mb-0">Gerencie as editoras da biblioteca</p>
        </div>
        <Link to="/editoras/cadastrar" className="btn btn-primary">
          <FaPlus className="me-2" />
          Adicionar Editora
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
                placeholder="Buscar por nome ou país..."
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
        ) : editoras.length === 0 ? (
          <div className="alert alert-info text-center">
            <FaBuilding className="fa-2x mb-3" />
            <h4>Nenhuma editora encontrada</h4>
            <p>
              {searchQuery ? 'Tente uma busca diferente ou ' : ''}
              <Link to="/editoras/cadastrar">cadastre uma nova editora</Link>
            </p>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                {editoras.length} editora(s) encontrada(s)
              </h5>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>País</th>
                    <th>Contato</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {editoras.map((editora) => (
                    <tr key={editora.ed_cod}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                            <FaBuilding className="text-white" />
                          </div>
                          <div>
                            <strong>{editora.ed_nome}</strong>
                            {editora.ed_morada && (
                              <div>
                                <small className="text-muted">
                                  <FaMapMarkerAlt className="me-1" />
                                  {editora.ed_morada}
                                </small>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="d-flex align-items-center">
                          <FaGlobe className="me-2 text-muted" />
                          {editora.ed_pais}
                        </span>
                      </td>
                      <td>
                        <div>
                          {editora.ed_email && (
                            <div>
                              <small className="text-muted">
                                <FaEnvelope className="me-1" />
                                {editora.ed_email}
                              </small>
                            </div>
                          )}
                          {editora.ed_tlm && (
                            <div>
                              <small className="text-muted">
                                <FaPhone className="me-1" />
                                {editora.ed_tlm}
                              </small>
                            </div>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/editoras/editar/${editora.ed_cod}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Editar"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(editora.ed_cod, editora.ed_nome)}
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

export default Editoras;
