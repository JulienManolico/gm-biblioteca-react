import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  FaUser, 
  FaSave, 
  FaArrowLeft, 
  FaGlobe
} from 'react-icons/fa';
import { autorService } from '../services/api';

const CadastrarAutor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();

  // Buscar autor para edição
  const { data: autorData, isLoading: autorLoading } = useQuery(
    ['autor', id],
    () => autorService.getById(id),
    {
      enabled: isEditing,
      onSuccess: (data) => {
        if (data?.data) {
          const autor = data.data;
          setValue('au_nome', autor.au_nome);
          setValue('au_pais', autor.au_pais);
        }
      }
    }
  );

  // Mutação para criar/editar autor
  const saveMutation = useMutation(
    (data) => isEditing ? autorService.update(id, data) : autorService.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('autores');
        alert(isEditing ? 'Autor atualizado com sucesso!' : 'Autor cadastrado com sucesso!');
        navigate('/autores');
      },
      onError: (error) => {
        alert('Erro ao salvar autor: ' + error.message);
      }
    }
  );

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await saveMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing && autorLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">
            {isEditing ? 'Editar Autor' : 'Cadastrar Autor'}
          </h1>
          <p className="text-muted mb-0">
            {isEditing ? 'Atualize as informações do autor' : 'Adicione um novo autor ao sistema'}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate('/autores')}
        >
          <FaArrowLeft className="me-2" />
          Voltar
        </button>
      </div>

      {/* Formulário */}
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Nome */}
            <div className="col-md-8 mb-3">
              <label htmlFor="au_nome" className="form-label">
                <FaUser className="me-2" />
                Nome do Autor *
              </label>
              <input
                type="text"
                className={`form-control ${errors.au_nome ? 'is-invalid' : ''}`}
                id="au_nome"
                {...register('au_nome', { 
                  required: 'Nome é obrigatório',
                  minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }
                })}
                placeholder="Digite o nome completo do autor"
              />
              {errors.au_nome && (
                <div className="invalid-feedback">
                  {errors.au_nome.message}
                </div>
              )}
            </div>

            {/* País */}
            <div className="col-md-4 mb-3">
              <label htmlFor="au_pais" className="form-label">
                <FaGlobe className="me-2" />
                País
              </label>
              <input
                type="text"
                className="form-control"
                id="au_pais"
                {...register('au_pais')}
                placeholder="Ex: Brasil, Portugal, Estados Unidos"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/autores')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              <FaSave className="me-2" />
              {isSubmitting ? 'Salvando...' : (isEditing ? 'Atualizar' : 'Cadastrar')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastrarAutor;
