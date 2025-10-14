import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  FaBook, 
  FaSave, 
  FaArrowLeft, 
  FaUser, 
  FaBuilding, 
  FaTags,
  FaCalendar,
  FaBarcode
} from 'react-icons/fa';
import { livroService, autorService, editoraService, generoService } from '../services/api';

const CadastrarLivro = () => {
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
    watch,
    reset
  } = useForm();

  // Buscar dados para os selects
  const { data: autoresData } = useQuery('autores', autorService.getAll);
  const { data: editorasData } = useQuery('editoras', editoraService.getAll);
  const { data: generosData } = useQuery('generos', generoService.getAll);

  // Buscar livro para edição
  const { data: livroData, isLoading: livroLoading } = useQuery(
    ['livro', id],
    () => livroService.getById(id),
    {
      enabled: isEditing,
      onSuccess: (data) => {
        if (data?.data) {
          const livro = data.data;
          setValue('li_titulo', livro.li_titulo);
          setValue('li_autor', livro.li_autor);
          setValue('li_editora', livro.li_editora);
          setValue('li_genero', livro.li_genero);
          setValue('li_ano', livro.li_ano);
          setValue('li_edicao', livro.li_edicao);
          setValue('li_isbn', livro.li_isbn);
        }
      }
    }
  );

  // Mutação para criar/editar livro
  const saveMutation = useMutation(
    (data) => isEditing ? livroService.update(id, data) : livroService.create(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('livros');
        queryClient.invalidateQueries('dashboard-stats');
        alert(isEditing ? 'Livro atualizado com sucesso!' : 'Livro cadastrado com sucesso!');
        navigate('/livros');
      },
      onError: (error) => {
        alert('Erro ao salvar livro: ' + error.message);
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

  // Formatar ISBN automaticamente
  const formatISBN = (value) => {
    // Remove caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Formata como ISBN-13 se tiver 13 dígitos
    if (numbers.length === 13) {
      return numbers.replace(/(\d{3})(\d{1})(\d{3})(\d{5})(\d{1})/, '$1-$2-$3-$4-$5');
    }
    
    // Formata como ISBN-10 se tiver 10 dígitos
    if (numbers.length === 10) {
      return numbers.replace(/(\d{1})(\d{3})(\d{5})(\d{1})/, '$1-$2-$3-$4');
    }
    
    return value;
  };

  const handleISBNChange = (e) => {
    const formatted = formatISBN(e.target.value);
    setValue('li_isbn', formatted);
  };

  if (isEditing && livroLoading) {
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
            {isEditing ? 'Editar Livro' : 'Cadastrar Livro'}
          </h1>
          <p className="text-muted mb-0">
            {isEditing ? 'Atualize as informações do livro' : 'Adicione um novo livro ao acervo'}
          </p>
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate('/livros')}
        >
          <FaArrowLeft className="me-2" />
          Voltar
        </button>
      </div>

      {/* Formulário */}
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {/* Título */}
            <div className="col-md-8 mb-3">
              <label htmlFor="li_titulo" className="form-label">
                <FaBook className="me-2" />
                Título do Livro *
              </label>
              <input
                type="text"
                className={`form-control ${errors.li_titulo ? 'is-invalid' : ''}`}
                id="li_titulo"
                {...register('li_titulo', { 
                  required: 'Título é obrigatório',
                  minLength: { value: 2, message: 'Título deve ter pelo menos 2 caracteres' }
                })}
                placeholder="Digite o título do livro"
              />
              {errors.li_titulo && (
                <div className="invalid-feedback">
                  {errors.li_titulo.message}
                </div>
              )}
            </div>

            {/* Ano */}
            <div className="col-md-4 mb-3">
              <label htmlFor="li_ano" className="form-label">
                <FaCalendar className="me-2" />
                Ano de Publicação
              </label>
              <input
                type="number"
                className="form-control"
                id="li_ano"
                {...register('li_ano', {
                  min: { value: 1000, message: 'Ano inválido' },
                  max: { value: new Date().getFullYear() + 1, message: 'Ano inválido' }
                })}
                placeholder="Ex: 2023"
                min="1000"
                max={new Date().getFullYear() + 1}
              />
              {errors.li_ano && (
                <div className="invalid-feedback">
                  {errors.li_ano.message}
                </div>
              )}
            </div>
          </div>

          <div className="row">
            {/* Autor */}
            <div className="col-md-6 mb-3">
              <label htmlFor="li_autor" className="form-label">
                <FaUser className="me-2" />
                Autor *
              </label>
              <select
                className={`form-select ${errors.li_autor ? 'is-invalid' : ''}`}
                id="li_autor"
                {...register('li_autor', { required: 'Autor é obrigatório' })}
              >
                <option value="">Selecione um autor</option>
                {autoresData?.data && Array.isArray(autoresData.data) && autoresData.data.map((autor) => (
                  <option key={autor.au_cod} value={autor.au_cod}>
                    {autor.au_nome}
                  </option>
                ))}
              </select>
              {errors.li_autor && (
                <div className="invalid-feedback">
                  {errors.li_autor.message}
                </div>
              )}
              <div className="form-text">
                <a href="/autores/cadastrar" target="_blank" rel="noopener noreferrer">
                  Não encontrou o autor? Cadastre um novo
                </a>
              </div>
            </div>

            {/* Editora */}
            <div className="col-md-6 mb-3">
              <label htmlFor="li_editora" className="form-label">
                <FaBuilding className="me-2" />
                Editora *
              </label>
              <select
                className={`form-select ${errors.li_editora ? 'is-invalid' : ''}`}
                id="li_editora"
                {...register('li_editora', { required: 'Editora é obrigatória' })}
              >
                <option value="">Selecione uma editora</option>
                {editorasData?.data && Array.isArray(editorasData.data) && editorasData.data.map((editora) => (
                  <option key={editora.ed_cod} value={editora.ed_cod}>
                    {editora.ed_nome}
                  </option>
                ))}
              </select>
              {errors.li_editora && (
                <div className="invalid-feedback">
                  {errors.li_editora.message}
                </div>
              )}
              <div className="form-text">
                <a href="/editoras/cadastrar" target="_blank" rel="noopener noreferrer">
                  Não encontrou a editora? Cadastre uma nova
                </a>
              </div>
            </div>
          </div>

          <div className="row">
            {/* Gênero */}
            <div className="col-md-6 mb-3">
              <label htmlFor="li_genero" className="form-label">
                <FaTags className="me-2" />
                Gênero *
              </label>
              <select
                className={`form-select ${errors.li_genero ? 'is-invalid' : ''}`}
                id="li_genero"
                {...register('li_genero', { required: 'Gênero é obrigatório' })}
              >
                <option value="">Selecione um gênero</option>
                {generosData?.data && Array.isArray(generosData.data) && generosData.data.map((genero) => (
                  <option key={genero} value={genero}>
                    {genero}
                  </option>
                ))}
              </select>
              {errors.li_genero && (
                <div className="invalid-feedback">
                  {errors.li_genero.message}
                </div>
              )}
              <div className="form-text">
                <a href="/generos/cadastrar" target="_blank" rel="noopener noreferrer">
                  Não encontrou o gênero? Cadastre um novo
                </a>
              </div>
            </div>

            {/* Edição */}
            <div className="col-md-6 mb-3">
              <label htmlFor="li_edicao" className="form-label">
                Edição
              </label>
              <input
                type="text"
                className="form-control"
                id="li_edicao"
                {...register('li_edicao')}
                placeholder="Ex: 1ª Edição, 2ª Edição"
              />
            </div>
          </div>

          <div className="row">
            {/* ISBN */}
            <div className="col-md-6 mb-3">
              <label htmlFor="li_isbn" className="form-label">
                <FaBarcode className="me-2" />
                ISBN
              </label>
              <input
                type="text"
                className="form-control"
                id="li_isbn"
                {...register('li_isbn')}
                onChange={handleISBNChange}
                placeholder="Ex: 978-85-359-0277-8"
                maxLength="17"
              />
              <div className="form-text">
                Digite apenas números, a formatação será aplicada automaticamente
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate('/livros')}
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

export default CadastrarLivro;
