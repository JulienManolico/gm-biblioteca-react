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
        .from('livro')
        .select(`
          *,
          autor(au_nome, au_pais),
          editora(ed_nome, ed_pais),
          genero(ge_genero),
          livro_exemplar(lex_cod, lex_estado, lex_disponivel)
        `);

      // Aplicar filtros
      if (filtros.busca) {
        query = query.or(`li_titulo.ilike.%${filtros.busca}%,autor.au_nome.ilike.%${filtros.busca}%,genero.ge_genero.ilike.%${filtros.busca}%`);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      // Transformar dados para compatibilidade com o frontend
      const livrosTransformados = data?.map(livro => ({
        li_cod: livro.li_cod,
        li_titulo: livro.li_titulo,
        li_ano: livro.li_ano,
        li_edicao: livro.li_edicao,
        li_isbn: livro.li_isbn,
        autor: livro.autor?.au_nome || '',
        editora: livro.editora?.ed_nome || '',
        categoria: livro.genero?.ge_genero || '',
        total_exemplares: livro.livro_exemplar?.length || 0,
        exemplares_disponiveis: livro.livro_exemplar?.filter(ex => ex.lex_disponivel).length || 0
      })) || [];
      
      return { data: livrosTransformados };
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
        .from('livro')
        .select(`
          *,
          autor(au_nome, au_pais),
          editora(ed_nome, ed_pais),
          genero(ge_genero),
          livro_exemplar(lex_cod, lex_estado, lex_disponivel)
        `)
        .eq('li_cod', id)
        .single();

      if (error) throw error;
      
      // Transformar dados para compatibilidade
      const livroTransformado = {
        li_cod: data.li_cod,
        li_titulo: data.li_titulo,
        li_ano: data.li_ano,
        li_edicao: data.li_edicao,
        li_isbn: data.li_isbn,
        autor: data.autor?.au_nome || '',
        editora: data.editora?.ed_nome || '',
        categoria: data.genero?.ge_genero || '',
        total_exemplares: data.livro_exemplar?.length || 0,
        exemplares_disponiveis: data.livro_exemplar?.filter(ex => ex.lex_disponivel).length || 0
      };
      
      return { data: livroTransformado };
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
        .from('livro')
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
        .from('livro')
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
        .from('livro')
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
        .from('autor')
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
        .from('autor')
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
        .from('editora')
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
        .from('editora')
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
        .from('genero')
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
        .from('genero')
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
        .from('utente')
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
        .from('utente')
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
        .from('requisicao')
        .select(`
          *,
          utente(ut_nome, ut_email),
          livro_exemplar(
            lex_cod,
            lex_disponivel,
            livro(li_titulo, li_autor, autor(au_nome))
          )
        `)
        .order('re_data_requisicao', { ascending: false });

      if (error) throw error;
      
      // Transformar dados para compatibilidade
      const emprestimosTransformados = data?.map(emprestimo => ({
        em_cod: emprestimo.re_cod,
        em_ut_cod: emprestimo.re_ut_cod,
        em_lex_cod: emprestimo.re_lex_cod,
        em_data: emprestimo.re_data_requisicao,
        em_devolucao_prevista: emprestimo.re_data_devolucao,
        em_data_devolucao: emprestimo.re_data_devolucao,
        em_devolvido: !!emprestimo.re_data_devolucao,
        utente_nome: emprestimo.utente?.ut_nome || '',
        livro_titulo: emprestimo.livro_exemplar?.livro?.li_titulo || '',
        autor_nome: emprestimo.livro_exemplar?.livro?.autor?.au_nome || ''
      })) || [];
      
      return { data: emprestimosTransformados };
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
        .from('requisicao')
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
        .from('requisicao')
        .update({ 
          re_data_devolucao: new Date().toISOString().split('T')[0]
        })
        .eq('re_cod', id)
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
      const [livrosResult, autoresResult, editorasResult, utentesResult, emprestimosResult, exemplaresResult] = await Promise.all([
        supabase.from('livro').select('li_cod', { count: 'exact', head: true }),
        supabase.from('autor').select('au_cod', { count: 'exact', head: true }),
        supabase.from('editora').select('ed_cod', { count: 'exact', head: true }),
        supabase.from('utente').select('ut_cod', { count: 'exact', head: true }),
        supabase.from('requisicao').select('re_cod', { count: 'exact', head: true }).is('re_data_devolucao', null),
        supabase.from('livro_exemplar').select('lex_cod', { count: 'exact', head: true }).eq('lex_disponivel', true)
      ]);

      const stats = {
        totalLivros: livrosResult.count || 0,
        totalAutores: autoresResult.count || 0,
        totalEditoras: editorasResult.count || 0,
        totalUtentes: utentesResult.count || 0,
        emprestimosAtivos: emprestimosResult.count || 0,
        livrosDisponiveis: exemplaresResult.count || 0
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
        .from('codigo_postal')
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
        .from('codigo_postal')
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
        .from('codigo_postal')
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
        .from('codigo_postal')
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
