import axios from 'axios';
import { API_BASE_URL, MOCK_DATA, delay } from '../config/database';

// Configuração do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação se existir
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Função para verificar se estamos usando mock data
const useMockData = () => {
  return !process.env.REACT_APP_API_URL || process.env.REACT_APP_API_URL === 'mock';
};

// Serviços para Livros
export const livroService = {
  // Buscar todos os livros
  getAll: async (filtros = {}) => {
    if (useMockData()) {
      await delay(500); // Simular delay de rede
      let livros = [...MOCK_DATA.livros];
      
      // Aplicar filtros
      if (filtros.busca) {
        const busca = filtros.busca.toLowerCase();
        livros = livros.filter(livro => 
          livro.li_titulo.toLowerCase().includes(busca) ||
          livro.autor.toLowerCase().includes(busca) ||
          livro.categoria.toLowerCase().includes(busca)
        );
      }
      
      return { data: livros };
    }
    
    return api.get('/livros', { params: filtros });
  },

  // Buscar livro por ID
  getById: async (id) => {
    if (useMockData()) {
      await delay(300);
      const livro = MOCK_DATA.livros.find(l => l.li_cod === parseInt(id));
      return { data: livro };
    }
    
    return api.get(`/livros/${id}`);
  },

  // Criar novo livro
  create: async (livroData) => {
    if (useMockData()) {
      await delay(800);
      const novoLivro = {
        li_cod: MOCK_DATA.livros.length + 1,
        ...livroData,
        total_exemplares: 1,
        exemplares_disponiveis: 1
      };
      MOCK_DATA.livros.push(novoLivro);
      return { data: novoLivro };
    }
    
    return api.post('/livros', livroData);
  },

  // Atualizar livro
  update: async (id, livroData) => {
    if (useMockData()) {
      await delay(600);
      const index = MOCK_DATA.livros.findIndex(l => l.li_cod === parseInt(id));
      if (index !== -1) {
        MOCK_DATA.livros[index] = { ...MOCK_DATA.livros[index], ...livroData };
        return { data: MOCK_DATA.livros[index] };
      }
      throw new Error('Livro não encontrado');
    }
    
    return api.put(`/livros/${id}`, livroData);
  },

  // Deletar livro
  delete: async (id) => {
    if (useMockData()) {
      await delay(400);
      const index = MOCK_DATA.livros.findIndex(l => l.li_cod === parseInt(id));
      if (index !== -1) {
        MOCK_DATA.livros.splice(index, 1);
        return { data: { message: 'Livro deletado com sucesso' } };
      }
      throw new Error('Livro não encontrado');
    }
    
    return api.delete(`/livros/${id}`);
  }
};

// Serviços para Autores
export const autorService = {
  getAll: async () => {
    if (useMockData()) {
      await delay(300);
      return { data: MOCK_DATA.autores };
    }
    return api.get('/autores');
  },

  create: async (autorData) => {
    if (useMockData()) {
      await delay(500);
      const novoAutor = {
        au_cod: MOCK_DATA.autores.length + 1,
        ...autorData
      };
      MOCK_DATA.autores.push(novoAutor);
      return { data: novoAutor };
    }
    return api.post('/autores', autorData);
  }
};

// Serviços para Editoras
export const editoraService = {
  getAll: async () => {
    if (useMockData()) {
      await delay(300);
      return { data: MOCK_DATA.editoras };
    }
    return api.get('/editoras');
  },

  create: async (editoraData) => {
    if (useMockData()) {
      await delay(500);
      const novaEditora = {
        ed_cod: MOCK_DATA.editoras.length + 1,
        ...editoraData
      };
      MOCK_DATA.editoras.push(novaEditora);
      return { data: novaEditora };
    }
    return api.post('/editoras', editoraData);
  }
};

// Serviços para Gêneros
export const generoService = {
  getAll: async () => {
    if (useMockData()) {
      await delay(200);
      return { data: MOCK_DATA.generos };
    }
    return api.get('/generos');
  },

  create: async (generoData) => {
    if (useMockData()) {
      await delay(300);
      if (!MOCK_DATA.generos.includes(generoData.ge_genero)) {
        MOCK_DATA.generos.push(generoData.ge_genero);
      }
      return { data: generoData };
    }
    return api.post('/generos', generoData);
  }
};

// Serviços para Utentes
export const utenteService = {
  getAll: async () => {
    if (useMockData()) {
      await delay(300);
      return { data: MOCK_DATA.utentes };
    }
    return api.get('/utentes');
  },

  create: async (utenteData) => {
    if (useMockData()) {
      await delay(500);
      const novoUtente = {
        ut_cod: MOCK_DATA.utentes.length + 1,
        ...utenteData
      };
      MOCK_DATA.utentes.push(novoUtente);
      return { data: novoUtente };
    }
    return api.post('/utentes', utenteData);
  }
};

// Serviços para Empréstimos
export const emprestimoService = {
  getAll: async () => {
    if (useMockData()) {
      await delay(400);
      return { data: MOCK_DATA.emprestimos };
    }
    return api.get('/emprestimos');
  },

  create: async (emprestimoData) => {
    if (useMockData()) {
      await delay(600);
      const novoEmprestimo = {
        em_cod: MOCK_DATA.emprestimos.length + 1,
        ...emprestimoData,
        em_data: new Date().toISOString().split('T')[0],
        em_devolvido: false
      };
      MOCK_DATA.emprestimos.push(novoEmprestimo);
      return { data: novoEmprestimo };
    }
    return api.post('/emprestimos', emprestimoData);
  },

  devolver: async (id) => {
    if (useMockData()) {
      await delay(400);
      const emprestimo = MOCK_DATA.emprestimos.find(e => e.em_cod === parseInt(id));
      if (emprestimo) {
        emprestimo.em_data_devolucao = new Date().toISOString().split('T')[0];
        emprestimo.em_devolvido = true;
        return { data: emprestimo };
      }
      throw new Error('Empréstimo não encontrado');
    }
    return api.put(`/emprestimos/${id}/devolver`);
  }
};

// Serviços para Estatísticas
export const statsService = {
  getDashboardStats: async () => {
    if (useMockData()) {
      await delay(300);
      const stats = {
        totalLivros: MOCK_DATA.livros.length,
        totalAutores: MOCK_DATA.autores.length,
        totalEditoras: MOCK_DATA.editoras.length,
        totalUtentes: MOCK_DATA.utentes.length,
        emprestimosAtivos: MOCK_DATA.emprestimos.filter(e => !e.em_devolvido).length,
        livrosDisponiveis: MOCK_DATA.livros.reduce((acc, livro) => acc + livro.exemplares_disponiveis, 0)
      };
      return { data: stats };
    }
    return api.get('/stats/dashboard');
  }
};

// Serviços para Código Postal
export const codigoPostalService = {
  getAll: async (filtros = {}) => {
    if (useMockData()) {
      await delay(300);
      let codigos = [
        { cod_postal: '2000-123', cod_localidade: 'Lisboa' },
        { cod_postal: '4000-123', cod_localidade: 'Porto' },
        { cod_postal: '3000-123', cod_localidade: 'Coimbra' }
      ];
      
      if (filtros.busca) {
        const busca = filtros.busca.toLowerCase();
        codigos = codigos.filter(codigo => 
          codigo.cod_postal.toLowerCase().includes(busca) ||
          codigo.cod_localidade.toLowerCase().includes(busca)
        );
      }
      
      return { data: codigos };
    }
    return api.get('/codigos-postais', { params: filtros });
  },

  create: async (codigoData) => {
    if (useMockData()) {
      await delay(500);
      return { data: codigoData };
    }
    return api.post('/codigos-postais', codigoData);
  },

  update: async (codigo, codigoData) => {
    if (useMockData()) {
      await delay(500);
      return { data: { ...codigoData, cod_postal: codigo } };
    }
    return api.put(`/codigos-postais/${codigo}`, codigoData);
  },

  delete: async (codigo) => {
    if (useMockData()) {
      await delay(400);
      return { data: { message: 'Código postal deletado com sucesso' } };
    }
    return api.delete(`/codigos-postais/${codigo}`);
  }
};

export default api;
