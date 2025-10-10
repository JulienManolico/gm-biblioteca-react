import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { 
  FaExchangeAlt, 
  FaPlus, 
  FaSearch, 
  FaCheck, 
  FaClock,
  FaBook,
  FaUser
} from 'react-icons/fa';
import { emprestimoService } from '../services/api';

const Emprestimos = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  const queryClient = useQueryClient();

  const { data: emprestimosData, isLoading, error } = useQuery(
    ['emprestimos', { busca: searchQuery, status: filtroStatus }],
    () => emprestimoService.getAll({ busca: searchQuery, status: filtroStatus })
  );

  const devolverMutation = useMutation(emprestimoService.devolver, {
    onSuccess: () => {
      queryClient.invalidateQueries('emprestimos');
      alert('Livro devolvido com sucesso!');
    },
    onError: (error) => {
      alert('Erro ao devolver livro: ' + error.message);
    }
  });

  const handleDevolver = async (id, titulo) => {
    if (window.confirm(`Confirmar devolução do livro "${titulo}"?`)) {
      try {
        await devolverMutation.mutateAsync(id);
      } catch (error) {
        // Error já tratado no onError
      }
    }
  };

  const emprestimos = emprestimosData?.data || [];

  if (error) {
    return (
      <div className="alert alert-danger">
        <h4>Erro ao carregar empréstimos</h4>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Empréstimos</h1>
          <p className="text-muted mb-0">Gerencie os empréstimos da biblioteca</p>
        </div>
        <Link to="/emprestimos/novo" className="btn btn-primary">
          <FaPlus className="me-2" />
          Novo Empréstimo
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
                placeholder="Buscar por utente ou livro..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="ativo">Empréstimos Ativos</option>
              <option value="devolvido">Devolvidos</option>
              <option value="atrasado">Atrasados</option>
            </select>
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
        ) : emprestimos.length === 0 ? (
          <div className="alert alert-info text-center">
            <FaExchangeAlt className="fa-2x mb-3" />
            <h4>Nenhum empréstimo encontrado</h4>
            <p>
              {searchQuery || filtroStatus ? 'Tente ajustar os filtros ou ' : ''}
              <Link to="/emprestimos/novo">crie um novo empréstimo</Link>
            </p>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">
                {emprestimos.length} empréstimo(s) encontrado(s)
              </h5>
            </div>

            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Utente</th>
                    <th>Livro</th>
                    <th>Data do Empréstimo</th>
                    <th>Devolução Prevista</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {emprestimos.map((emprestimo) => {
                    const isAtrasado = !emprestimo.em_devolvido && 
                      new Date(emprestimo.em_devolucao_prevista) < new Date();
                    
                    return (
                      <tr key={emprestimo.em_cod}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                              <FaUser className="text-white" />
                            </div>
                            <div>
                              <strong>{emprestimo.utente_nome}</strong>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-info rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                              <FaBook className="text-white" />
                            </div>
                            <div>
                              <strong>{emprestimo.livro_titulo}</strong>
                            </div>
                          </div>
                        </td>
                        <td>
                          {new Date(emprestimo.em_data).toLocaleDateString('pt-BR')}
                        </td>
                        <td>
                          {emprestimo.em_devolucao_prevista ? 
                            new Date(emprestimo.em_devolucao_prevista).toLocaleDateString('pt-BR') : 
                            '-'
                          }
                        </td>
                        <td>
                          {emprestimo.em_devolvido ? (
                            <span className="badge bg-success">
                              <FaCheck className="me-1" />
                              Devolvido
                            </span>
                          ) : isAtrasado ? (
                            <span className="badge bg-danger">
                              <FaClock className="me-1" />
                              Atrasado
                            </span>
                          ) : (
                            <span className="badge bg-warning">
                              <FaClock className="me-1" />
                              Ativo
                            </span>
                          )}
                        </td>
                        <td>
                          {!emprestimo.em_devolvido && (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleDevolver(emprestimo.em_cod, emprestimo.livro_titulo)}
                              title="Devolver"
                              disabled={devolverMutation.isLoading}
                            >
                              <FaCheck className="me-1" />
                              Devolver
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Emprestimos;
