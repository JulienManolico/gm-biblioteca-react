// Configuração do banco de dados para React
// Como React é frontend, vamos usar uma API mock ou conectar com um backend

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// Configurações do banco (para referência - será usado pelo backend)
export const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gm_biblioteca',
  charset: 'utf8mb4'
};

// Mock data para desenvolvimento (quando não há backend)
export const MOCK_DATA = {
  livros: [
    {
      li_cod: 1,
      li_titulo: "O Senhor dos Anéis",
      li_ano: 1954,
      li_edicao: "1ª Edição",
      li_isbn: "978-85-359-0277-8",
      autor: "J.R.R. Tolkien",
      editora: "Martins Fontes",
      categoria: "Fantasia",
      total_exemplares: 3,
      exemplares_disponiveis: 2
    },
    {
      li_cod: 2,
      li_titulo: "1984",
      li_ano: 1949,
      li_edicao: "2ª Edição",
      li_isbn: "978-85-254-1234-5",
      autor: "George Orwell",
      editora: "Companhia das Letras",
      categoria: "Ficção Científica",
      total_exemplares: 2,
      exemplares_disponiveis: 1
    },
    {
      li_cod: 3,
      li_titulo: "Dom Casmurro",
      li_ano: 1899,
      li_edicao: "1ª Edição",
      li_isbn: "978-85-254-2345-6",
      autor: "Machado de Assis",
      editora: "Ática",
      categoria: "Literatura Brasileira",
      total_exemplares: 4,
      exemplares_disponiveis: 3
    }
  ],
  autores: [
    { au_cod: 1, au_nome: "J.R.R. Tolkien", au_pais: "Reino Unido" },
    { au_cod: 2, au_nome: "George Orwell", au_pais: "Reino Unido" },
    { au_cod: 3, au_nome: "Machado de Assis", au_pais: "Brasil" }
  ],
  editoras: [
    { 
      ed_cod: 1, 
      ed_nome: "Martins Fontes", 
      ed_pais: "Brasil",
      ed_morada: "Rua das Flores, 123",
      ed_email: "contato@martinsfontes.com.br",
      ed_tlm: "(11) 1234-5678"
    },
    { 
      ed_cod: 2, 
      ed_nome: "Companhia das Letras", 
      ed_pais: "Brasil",
      ed_morada: "Av. Paulista, 1000",
      ed_email: "contato@companhiadasletras.com.br",
      ed_tlm: "(11) 2345-6789"
    },
    { 
      ed_cod: 3, 
      ed_nome: "Ática", 
      ed_pais: "Brasil",
      ed_morada: "Rua do Comércio, 456",
      ed_email: "contato@atica.com.br",
      ed_tlm: "(11) 3456-7890"
    }
  ],
  generos: [
    "Fantasia",
    "Ficção Científica",
    "Literatura Brasileira",
    "Romance",
    "Suspense",
    "Terror",
    "Biografia",
    "História",
    "Filosofia",
    "Poesia"
  ],
  utentes: [
    {
      ut_cod: 1,
      ut_nome: "João Silva",
      ut_nif: "12345678901",
      ut_email: "joao@email.com",
      ut_tlm: "(11) 99999-9999",
      ut_morada: "Rua A, 123",
      ut_turma: "3º A",
      ut_ano: 2024
    }
  ],
  emprestimos: [
    {
      em_cod: 1,
      em_ut_cod: 1,
      em_lex_cod: 1,
      em_data: "2024-01-15",
      em_devolucao_prevista: "2024-02-15",
      em_data_devolucao: null,
      em_devolvido: false,
      utente_nome: "João Silva",
      livro_titulo: "O Senhor dos Anéis"
    }
  ]
};

// Função para simular delay de API
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
