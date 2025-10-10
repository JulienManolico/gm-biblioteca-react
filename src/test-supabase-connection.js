// Script para testar conexão com Supabase no navegador
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

console.log('🔍 Testando conexão Supabase...');
console.log('URL:', supabaseUrl);
console.log('Key configurada:', !!supabaseKey);

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variáveis do Supabase não configuradas');
  document.getElementById('supabase-test').innerHTML = 
    '<p style="color: red;">❌ Variáveis do Supabase não configuradas</p>';
} else {
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  // Testar conexão
  supabase
    .from('livro')
    .select('count')
    .limit(1)
    .then(({ data, error }) => {
      if (error) {
        console.error('❌ Erro na conexão:', error);
        document.getElementById('supabase-test').innerHTML = 
          `<p style="color: red;">❌ Erro: ${error.message}</p>`;
      } else {
        console.log('✅ Conexão com Supabase OK');
        document.getElementById('supabase-test').innerHTML = 
          '<p style="color: green;">✅ Conexão com Supabase funcionando!</p>';
      }
    })
    .catch(err => {
      console.error('❌ Erro geral:', err);
      document.getElementById('supabase-test').innerHTML = 
        `<p style="color: red;">❌ Erro geral: ${err.message}</p>`;
    });
}
