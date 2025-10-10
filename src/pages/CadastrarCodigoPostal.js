import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  FaMapMarkerAlt, 
  FaSave, 
  FaArrowLeft
} from 'react-icons/fa';
import { codigoPostalService } from '../services/api';

const CadastrarCodigoPostal = () => {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = Boolean(codigo);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const saveMutation = useMutation(
    (data) => isEditing ? codigoPostalService.update(codigo, data) : codigoPostalService.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('codigos-postais');
        alert(isEditing ? 'Código postal atualizado com sucesso!' : 'Código postal cadastrado com sucesso!');
        navigate('/codigo-postal');
      },
      onError: (error) => {
        alert('Erro ao salvar código postal: ' + error.message);
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

  // Formatar código postal automaticamente
  const formatCodigoPostal = (value) => {
    // Remove caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Formata como 0000-000 se tiver 7 dígitos
    if (numbers.length === 7) {
      return numbers.replace(/(\d{4})(\d{3})/, '$1-$2');
    }
    
    return value;
  };

  const handleCodigoChange = (e) => {
    const formatted = formatCodigoPostal(e.target.value);
    setValue('cod_postal', formatted);
  };

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">
            {isEditing ? 'Editar Código Postal' : 'Cadastrar Código Postal'}
          </h1>
          <p className="text-muted mb-0">
            {isEditing ? 'Atualize as informações do código postal' : 'Adicione um novo código postal ao sistema'}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate('/codigo-postal')}
        >
          <FaArrowLeft className="me-2" />
          Voltar
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="cod_postal" className="form-label">
                <FaMapMarkerAlt className="me-2" />
                Código Postal *
              </label>
              <input
                type="text"
                className={`form-control ${errors.cod_postal ? 'is-invalid' : ''}`}
                id="cod_postal"
                {...register('cod_postal', { 
                  required: 'Código postal é obrigatório',
                  pattern: {
                    value: /^\d{4}-\d{3}$/,
                    message: 'Formato inválido. Use: 0000-000'
                  }
                })}
                onChange={handleCodigoChange}
                placeholder="Ex: 2000-123"
                maxLength="8"
              />
              {errors.cod_postal && (
                <div className="invalid-feedback">
                  {errors.cod_postal.message}
                </div>
              )}
              <div className="form-text">
                Digite apenas números, a formatação será aplicada automaticamente
              </div>
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="cod_localidade" className="form-label">
                Localidade *
              </label>
              <input
                type="text"
                className={`form-control ${errors.cod_localidade ? 'is-invalid' : ''}`}
                id="cod_localidade"
                {...register('cod_localidade', { 
                  required: 'Localidade é obrigatória',
                  minLength: { value: 2, message: 'Localidade deve ter pelo menos 2 caracteres' }
                })}
                placeholder="Ex: Lisboa, Porto, Coimbra"
              />
              {errors.cod_localidade && (
                <div className="invalid-feedback">
                  {errors.cod_localidade.message}
                </div>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/codigo-postal')}
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

export default CadastrarCodigoPostal;
