import { supabase, isSupabaseConfigured } from '../config/supabase';

// Função para verificar se deve usar Supabase ou mock data
const useSupabase = () => {
  return isSupabaseConfigured() && process.env.REACT_APP_API_URL !== 'mock';
};

// Serviços para Livros com Supabase
export const livroSupabaseService = {
  // Buscar todos os livros
  getAll: async (filtros = {}) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      let query = supabase
        .from('livros')
        .select(`
          *,
          autores(au_nome),
          editoras(ed_nome),
          generos(ge_genero)
        `);

      // Aplicar filtros
      if (filtros.busca) {
        query = query.or(`li_titulo.ilike.%${filtros.busca}%,autores.au_nome.ilike.%${filtros.busca}%,generos.ge_genero.ilike.%${filtros.busca}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
      throw error;
    }
  },

  // Buscar livro por ID
  getById: async (id) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('livros')
        .select(`
          *,
          autores(au_nome),
          editoras(ed_nome),
          generos(ge_genero)
        `)
        .eq('li_cod', id)
        .single();

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao buscar livro:', error);
      throw error;
    }
  },

  // Criar novo livro
  create: async (livroData) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('livros')
        .insert([livroData])
        .select()
        .single();

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao criar livro:', error);
      throw error;
    }
  },

  // Atualizar livro
  update: async (id, livroData) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('livros')
        .update(livroData)
        .eq('li_cod', id)
        .select()
        .single();

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
      throw error;
    }
  },

  // Deletar livro
  delete: async (id) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { error } = await supabase
        .from('livros')
        .delete()
        .eq('li_cod', id);

      if (error) throw error;
      
      return { data: { message: 'Livro deletado com sucesso' } };
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
      throw error;
    }
  }
};

// Serviços para Autores com Supabase
export const autorSupabaseService = {
  getAll: async () => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('autores')
        .select('*')
        .order('au_nome');

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao buscar autores:', error);
      throw error;
    }
  },

  create: async (autorData) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('autores')
        .insert([autorData])
        .select()
        .single();

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao criar autor:', error);
      throw error;
    }
  }
};

// Serviços para Editoras com Supabase
export const editoraSupabaseService = {
  getAll: async () => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('editoras')
        .select('*')
        .order('ed_nome');

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao buscar editoras:', error);
      throw error;
    }
  },

  create: async (editoraData) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('editoras')
        .insert([editoraData])
        .select()
        .single();

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao criar editora:', error);
      throw error;
    }
  }
};

// Serviços para Gêneros com Supabase
export const generoSupabaseService = {
  getAll: async () => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('generos')
        .select('*')
        .order('ge_genero');

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
      throw error;
    }
  },

  create: async (generoData) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('generos')
        .insert([generoData])
        .select()
        .single();

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao criar gênero:', error);
      throw error;
    }
  }
};

// Serviços para Utentes com Supabase
export const utenteSupabaseService = {
  getAll: async () => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('utentes')
        .select('*')
        .order('ut_nome');

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao buscar utentes:', error);
      throw error;
    }
  },

  create: async (utenteData) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('utentes')
        .insert([utenteData])
        .select()
        .single();

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao criar utente:', error);
      throw error;
    }
  }
};

// Serviços para Empréstimos com Supabase
export const emprestimoSupabaseService = {
  getAll: async () => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('emprestimos')
        .select(`
          *,
          utentes(ut_nome),
          livros(li_titulo)
        `)
        .order('em_data', { ascending: false });

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao buscar empréstimos:', error);
      throw error;
    }
  },

  create: async (emprestimoData) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('emprestimos')
        .insert([emprestimoData])
        .select()
        .single();

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao criar empréstimo:', error);
      throw error;
    }
  },

  devolver: async (id) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('emprestimos')
        .update({ 
          em_devolvido: true,
          em_data_devolucao: new Date().toISOString().split('T')[0]
        })
        .eq('em_cod', id)
        .select()
        .single();

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao devolver empréstimo:', error);
      throw error;
    }
  }
};

// Serviços para Estatísticas com Supabase
export const statsSupabaseService = {
  getDashboardStats: async () => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      // Buscar contagens em paralelo
      const [livrosResult, autoresResult, editorasResult, utentesResult, emprestimosResult] = await Promise.all([
        supabase.from('livros').select('li_cod', { count: 'exact', head: true }),
        supabase.from('autores').select('au_cod', { count: 'exact', head: true }),
        supabase.from('editoras').select('ed_cod', { count: 'exact', head: true }),
        supabase.from('utentes').select('ut_cod', { count: 'exact', head: true }),
        supabase.from('emprestimos').select('em_cod', { count: 'exact', head: true }).eq('em_devolvido', false)
      ]);

      const stats = {
        totalLivros: livrosResult.count || 0,
        totalAutores: autoresResult.count || 0,
        totalEditoras: editorasResult.count || 0,
        totalUtentes: utentesResult.count || 0,
        emprestimosAtivos: emprestimosResult.count || 0,
        livrosDisponiveis: 0 // Será calculado separadamente se necessário
      };

      return { data: stats };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  }
};

// Serviços para Código Postal com Supabase
export const codigoPostalSupabaseService = {
  getAll: async (filtros = {}) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      let query = supabase
        .from('codigos_postais')
        .select('*')
        .order('cod_postal');

      // Aplicar filtros
      if (filtros.busca) {
        query = query.or(`cod_postal.ilike.%${filtros.busca}%,cod_localidade.ilike.%${filtros.busca}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao buscar códigos postais:', error);
      throw error;
    }
  },

  create: async (codigoData) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('codigos_postais')
        .insert([codigoData])
        .select()
        .single();

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao criar código postal:', error);
      throw error;
    }
  },

  update: async (codigo, codigoData) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { data, error } = await supabase
        .from('codigos_postais')
        .update(codigoData)
        .eq('cod_postal', codigo)
        .select()
        .single();

      if (error) throw error;
      
      return { data };
    } catch (error) {
      console.error('Erro ao atualizar código postal:', error);
      throw error;
    }
  },

  delete: async (codigo) => {
    if (!useSupabase()) {
      throw new Error('Supabase não configurado');
    }

    try {
      const { error } = await supabase
        .from('codigos_postais')
        .delete()
        .eq('cod_postal', codigo);

      if (error) throw error;
      
      return { data: { message: 'Código postal deletado com sucesso' } };
    } catch (error) {
      console.error('Erro ao deletar código postal:', error);
      throw error;
    }
  }
};
