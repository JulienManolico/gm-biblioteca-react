import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import Livros from './pages/Livros';
import CadastrarLivro from './pages/CadastrarLivro';
import Autores from './pages/Autores';
import CadastrarAutor from './pages/CadastrarAutor';
import Editoras from './pages/Editoras';
import CadastrarEditora from './pages/CadastrarEditora';
import Generos from './pages/Generos';
import CadastrarGenero from './pages/CadastrarGenero';
import Utentes from './pages/Utentes';
import CadastrarUtente from './pages/CadastrarUtente';
import Emprestimos from './pages/Emprestimos';
import CodigoPostal from './pages/CodigoPostal';
import CadastrarCodigoPostal from './pages/CadastrarCodigoPostal';

// Configuração do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

function App() {
  // Debug: Log das variáveis de ambiente
  useEffect(() => {
    console.log('🔍 Debug - Variáveis de ambiente:');
    console.log('REACT_APP_SUPABASE_URL:', process.env.REACT_APP_SUPABASE_URL);
    console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
    console.log('REACT_APP_SUPABASE_ANON_KEY configurada:', !!process.env.REACT_APP_SUPABASE_ANON_KEY);
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="App">
            {/* Debug info - remover depois */}
            <div style={{
              position: 'fixed',
              top: '10px',
              right: '10px',
              background: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
              fontSize: '12px',
              zIndex: 9999
            }}>
              <div>Supabase: {process.env.REACT_APP_SUPABASE_URL ? '✅' : '❌'}</div>
              <div>API: {process.env.REACT_APP_API_URL || 'N/A'}</div>
            </div>
            
            <Layout>
              <Routes>
              {/* Rotas principais */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Rotas de Livros */}
              <Route path="/livros" element={<Livros />} />
              <Route path="/livros/cadastrar" element={<CadastrarLivro />} />
              <Route path="/livros/editar/:id" element={<CadastrarLivro />} />
              
              {/* Rotas de Autores */}
              <Route path="/autores" element={<Autores />} />
              <Route path="/autores/cadastrar" element={<CadastrarAutor />} />
              <Route path="/autores/editar/:id" element={<CadastrarAutor />} />
              
              {/* Rotas de Editoras */}
              <Route path="/editoras" element={<Editoras />} />
              <Route path="/editoras/cadastrar" element={<CadastrarEditora />} />
              <Route path="/editoras/editar/:id" element={<CadastrarEditora />} />
              
              {/* Rotas de Gêneros */}
              <Route path="/generos" element={<Generos />} />
              <Route path="/generos/cadastrar" element={<CadastrarGenero />} />
              
              {/* Rotas de Utentes */}
              <Route path="/utentes" element={<Utentes />} />
              <Route path="/utentes/cadastrar" element={<CadastrarUtente />} />
              <Route path="/utentes/editar/:id" element={<CadastrarUtente />} />
              
              {/* Rotas de Empréstimos */}
              <Route path="/emprestimos" element={<Emprestimos />} />
              
              {/* Rotas de Código Postal */}
              <Route path="/codigo-postal" element={<CodigoPostal />} />
              <Route path="/codigo-postal/cadastrar" element={<CadastrarCodigoPostal />} />
              </Routes>
            </Layout>
          </div>
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
