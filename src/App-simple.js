import React from 'react';

// Versão simplificada para teste
function AppSimple() {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#007bff' }}>🚀 GMBiblioteca - Teste</h1>
      
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        margin: '20px 0'
      }}>
        <h2>✅ Aplicação React Funcionando!</h2>
        <p>Se você está vendo esta mensagem, o React está funcionando corretamente.</p>
        
        <h3>🔧 Informações de Debug:</h3>
        <ul>
          <li><strong>Node Environment:</strong> {process.env.NODE_ENV}</li>
          <li><strong>Supabase URL:</strong> {process.env.REACT_APP_SUPABASE_URL ? '✅ Configurado' : '❌ Não configurado'}</li>
          <li><strong>API URL:</strong> {process.env.REACT_APP_API_URL || 'Não definido'}</li>
          <li><strong>Timestamp:</strong> {new Date().toLocaleString()}</li>
        </ul>
        
        <h3>🧪 Teste de Conexão Supabase:</h3>
        <div id="supabase-test">
          <p>Testando conexão...</p>
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '15px', 
        borderRadius: '8px',
        border: '1px solid #2196f3'
      }}>
        <h3>📋 Próximos Passos:</h3>
        <ol>
          <li>Se você vê esta página, o React está funcionando</li>
          <li>Verifique o console do navegador (F12) para erros</li>
          <li>Verifique as variáveis de ambiente no Netlify</li>
          <li>Se tudo estiver OK, podemos voltar à versão completa</li>
        </ol>
      </div>
    </div>
  );
}

export default AppSimple;
