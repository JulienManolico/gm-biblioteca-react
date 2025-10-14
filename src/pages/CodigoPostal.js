import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { 
  FaMapMarkerAlt, 
  FaPlus, 
  FaSearch, 
  FaEdit, 
  FaTrash
} from 'react-icons/fa';
import { codigoPostalService } from '../services/api';

const CodigoPostal = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const queryClient = useQueryClient();

  const { data: codigosData, isLoading, error } = useQuery(
    ['codigos-postais', { busca: searchQuery }],
    () => codigoPostalService.getAll({ busca: searchQuery })
  );

  const deleteMutation = useMutation(codigoPostalService.delete, {
    onSuccess: () => {
      queryClient.invalidateQueries('codigos-postais');
    },
  });

  const handleDelete = async (codigo, localidade) => {
    if (window.confirm(`Tem certeza que deseja deletar o código postal "${codigo} - ${localidade}"?`)) {
      try {
        await deleteMutation.mutateAsync(codigo);
        alert('Código postal deletado com sucesso!');
      } catch (error) {
        alert('Erro ao deletar código postal: ' + error.message);
      }
    }
  };

  const codigos = Array.isArray(codigosData?.data) ? codigosData.data : [];

  if (error) {
    return (
      <div className="alert alert-danger">
        <h4>Erro ao carregar códigos postais</h4>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Códigos Postais</h1>
          <p className="text-muted mb-0">Gerencie os códigos postais e localidades</p>
        </div>
        <Link to="/codigo-postal/cadastrar" className="btn btn-primary">
          <FaPlus className="me-2" />
          Adicionar Código
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
                placeholder="Buscar por código ou localidade..."
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
        ) : codigos.length === 0 ? (
          <div className="alert alert-info text-center">
            <FaMapMarkerAlt className="fa-2x mb-3" />
            <h4>Nenhum código postal encontrado</h4>
            <p>
              {searchQuery ? 'Tente uma busca diferente ou ' : ''}
              <Link to="/codigo-postal/cadastrar">cadastre um novo código postal</Link>
            </p>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                {codigos.length} código(s) encontrado(s)
              </h5>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Código Postal</th>
                    <th>Localidade</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {codigos.map((codigo) => (
                    <tr key={codigo.cod_postal}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                            <FaMapMarkerAlt className="text-white" />
                          </div>
                          <div>
                            <strong>{codigo.cod_postal}</strong>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span>{codigo.cod_localidade}</span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Link
                            to={`/codigo-postal/editar/${codigo.cod_postal}`}
                            className="btn btn-sm btn-outline-primary"
                            title="Editar"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(codigo.cod_postal, codigo.cod_localidade)}
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

export default CodigoPostal;
