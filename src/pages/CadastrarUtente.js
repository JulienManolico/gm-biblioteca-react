import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  FaUsers, 
  FaSave, 
  FaArrowLeft, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaIdCard
} from 'react-icons/fa';
import { utenteService } from '../services/api';

const CadastrarUtente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditing = Boolean(id);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm();

  const saveMutation = useMutation(
    (data) => isEditing ? utenteService.update(id, data) : utenteService.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('utentes');
        alert(isEditing ? 'Utente atualizado com sucesso!' : 'Utente cadastrado com sucesso!');
        navigate('/utentes');
      },
      onError: (error) => {
        alert('Erro ao salvar utente: ' + error.message);
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

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 mb-1">
            {isEditing ? 'Editar Utente' : 'Cadastrar Utente'}
          </h1>
          <p className="text-muted mb-0">
            {isEditing ? 'Atualize as informações do utente' : 'Adicione um novo utente ao sistema'}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate('/utentes')}
        >
          <FaArrowLeft className="me-2" />
          Voltar
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-8 mb-3">
              <label htmlFor="ut_nome" className="form-label">
                <FaUsers className="me-2" />
                Nome Completo *
              </label>
              <input
                type="text"
                className={`form-control ${errors.ut_nome ? 'is-invalid' : ''}`}
                id="ut_nome"
                {...register('ut_nome', { 
                  required: 'Nome é obrigatório',
                  minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }
                })}
                placeholder="Digite o nome completo"
              />
              {errors.ut_nome && (
                <div className="invalid-feedback">
                  {errors.ut_nome.message}
                </div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="ut_nif" className="form-label">
                <FaIdCard className="me-2" />
                NIF
              </label>
              <input
                type="text"
                className="form-control"
                id="ut_nif"
                {...register('ut_nif')}
                placeholder="12345678901"
                maxLength="15"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="ut_email" className="form-label">
                <FaEnvelope className="me-2" />
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="ut_email"
                {...register('ut_email')}
                placeholder="usuario@email.com"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="ut_tlm" className="form-label">
                <FaPhone className="me-2" />
                Telefone
              </label>
              <input
                type="text"
                className="form-control"
                id="ut_tlm"
                {...register('ut_tlm')}
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-8 mb-3">
              <label htmlFor="ut_morada" className="form-label">
                <FaMapMarkerAlt className="me-2" />
                Endereço
              </label>
              <input
                type="text"
                className="form-control"
                id="ut_morada"
                {...register('ut_morada')}
                placeholder="Digite o endereço completo"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="ut_cod_postal" className="form-label">
                Código Postal
              </label>
              <input
                type="text"
                className="form-control"
                id="ut_cod_postal"
                {...register('ut_cod_postal')}
                placeholder="2000-123"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="ut_turma" className="form-label">
                <FaGraduationCap className="me-2" />
                Turma
              </label>
              <input
                type="text"
                className="form-control"
                id="ut_turma"
                {...register('ut_turma')}
                placeholder="Ex: 3º A, 2º B"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="ut_ano" className="form-label">
                Ano Letivo
              </label>
              <input
                type="number"
                className="form-control"
                id="ut_ano"
                {...register('ut_ano')}
                placeholder="2024"
                min="2020"
                max="2030"
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/utentes')}
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

export default CadastrarUtente;
