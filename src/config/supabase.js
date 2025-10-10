import { createClient } from '@supabase/supabase-js';

// Configurações do Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Verificar se as variáveis de ambiente estão configuradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variáveis do Supabase não configuradas. Usando mock data.');
}

// Criar cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Função para verificar se o Supabase está configurado
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey);
};

// Função para testar conexão com Supabase
export const testSupabaseConnection = async () => {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase não configurado' };
  }

  try {
    const { data, error } = await supabase
      .from('livros')
      .select('count')
      .limit(1);
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true, message: 'Conexão com Supabase estabelecida' };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default supabase;
