import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  FaBuilding, 
  FaSave, 
  FaArrowLeft, 
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { editoraService } from '../services/api';

const CadastrarEditora = () => {
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
    (data) => isEditing ? editoraService.update(id, data) : editoraService.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('editoras');
        alert(isEditing ? 'Editora atualizada com sucesso!' : 'Editora cadastrada com sucesso!');
        navigate('/editoras');
      },
      onError: (error) => {
        alert('Erro ao salvar editora: ' + error.message);
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
            {isEditing ? 'Editar Editora' : 'Cadastrar Editora'}
          </h1>
          <p className="text-muted mb-0">
            {isEditing ? 'Atualize as informações da editora' : 'Adicione uma nova editora ao sistema'}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate('/editoras')}
        >
          <FaArrowLeft className="me-2" />
          Voltar
        </button>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-8 mb-3">
              <label htmlFor="ed_nome" className="form-label">
                <FaBuilding className="me-2" />
                Nome da Editora *
              </label>
              <input
                type="text"
                className={`form-control ${errors.ed_nome ? 'is-invalid' : ''}`}
                id="ed_nome"
                {...register('ed_nome', { 
                  required: 'Nome é obrigatório',
                  minLength: { value: 2, message: 'Nome deve ter pelo menos 2 caracteres' }
                })}
                placeholder="Digite o nome da editora"
              />
              {errors.ed_nome && (
                <div className="invalid-feedback">
                  {errors.ed_nome.message}
                </div>
              )}
            </div>

            <div className="col-md-4 mb-3">
              <label htmlFor="ed_pais" className="form-label">
                <FaGlobe className="me-2" />
                País *
              </label>
              <input
                type="text"
                className={`form-control ${errors.ed_pais ? 'is-invalid' : ''}`}
                id="ed_pais"
                {...register('ed_pais', { required: 'País é obrigatório' })}
                placeholder="Ex: Brasil"
              />
              {errors.ed_pais && (
                <div className="invalid-feedback">
                  {errors.ed_pais.message}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="ed_morada" className="form-label">
                <FaMapMarkerAlt className="me-2" />
                Endereço
              </label>
              <input
                type="text"
                className="form-control"
                id="ed_morada"
                {...register('ed_morada')}
                placeholder="Digite o endereço"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="ed_cod_postal" className="form-label">
                Código Postal
              </label>
              <input
                type="text"
                className="form-control"
                id="ed_cod_postal"
                {...register('ed_cod_postal')}
                placeholder="Ex: 2000-123"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="ed_email" className="form-label">
                <FaEnvelope className="me-2" />
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="ed_email"
                {...register('ed_email')}
                placeholder="contato@editora.com"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label htmlFor="ed_tlm" className="form-label">
                <FaPhone className="me-2" />
                Telefone
              </label>
              <input
                type="text"
                className="form-control"
                id="ed_tlm"
                {...register('ed_tlm')}
                placeholder="(11) 1234-5678"
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/editoras')}
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

export default CadastrarEditora;
