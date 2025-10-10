import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  FaTags, 
  FaSave, 
  FaArrowLeft
} from 'react-icons/fa';
import { generoService } from '../services/api';

const CadastrarGenero = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const saveMutation = useMutation(generoService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries('generos');
      alert('Gênero cadastrado com sucesso!');
      navigate('/generos');
    },
    onError: (error) => {
      alert('Erro ao salvar gênero: ' + error.message);
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await saveMutation.mutateAsync({ ge_genero: data.ge_genero });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">Cadastrar Gênero</h1>
          <p className="text-muted mb-0">Adicione um novo gênero literário</p>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate('/generos')}
        >
          <FaArrowLeft className="me-2" />
          Voltar
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="ge_genero" className="form-label">
                <FaTags className="me-2" />
                Nome do Gênero *
              </label>
              <input
                type="text"
                className={`form-control ${errors.ge_genero ? 'is-invalid' : ''}`}
                id="ge_genero"
                {...register('ge_genero', { 
                  required: 'Nome do gênero é obrigatório',
                  minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }
                })}
                placeholder="Ex: Romance, Ficção Científica, Terror"
              />
              {errors.ge_genero && (
                <div className="invalid-feedback">
                  {errors.ge_genero.message}
                </div>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/generos')}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              <FaSave className="me-2" />
              {isSubmitting ? 'Salvando...' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CadastrarGenero;
