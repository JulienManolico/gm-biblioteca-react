# Instruções para Executar o GMBiblioteca React

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

1. **Node.js** (versão 16 ou superior)
   - Download: https://nodejs.org/
   - Verificar instalação: `node --version`

2. **npm** (geralmente vem com o Node.js)
   - Verificar instalação: `npm --version`

## 🚀 Passos para Executar

### 1. Navegar para o diretório do projeto
```bash
cd gm-biblioteca-react
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Iniciar o servidor de desenvolvimento
```bash
npm start
```

### 4. Acessar o sistema
- O navegador deve abrir automaticamente em `http://localhost:3000`
- Se não abrir, acesse manualmente: `http://localhost:3000`

## 🔧 Comandos Disponíveis

```bash
# Iniciar em modo de desenvolvimento
npm start

# Criar build de produção
npm run build

# Executar testes
npm test

# Verificar problemas de linting
npm run lint
```

## 📱 Funcionalidades Disponíveis

### ✅ Sistema Funcionando com Dados Mock

O sistema está configurado para funcionar com dados de exemplo (mock data), incluindo:

- **3 livros** de exemplo
- **3 autores** cadastrados
- **3 editoras** cadastradas
- **10 gêneros** literários
- **1 utente** cadastrado
- **1 empréstimo** ativo
- **3 códigos postais**

### 🎯 Páginas Disponíveis

1. **Dashboard** (`/`) - Página inicial com estatísticas
2. **Livros** (`/livros`) - Listagem e gestão de livros
3. **Autores** (`/autores`) - Gestão de autores
4. **Editoras** (`/editoras`) - Gestão de editoras
5. **Gêneros** (`/generos`) - Gestão de gêneros literários
6. **Utentes** (`/utentes`) - Gestão de usuários
7. **Empréstimos** (`/emprestimos`) - Sistema de empréstimos
8. **Código Postal** (`/codigo-postal`) - Gestão de códigos postais

### 🔍 Funcionalidades de Busca

- Busca por título, autor ou categoria nos livros
- Filtros por gênero e disponibilidade
- Busca em todas as seções do sistema

### 📊 Estatísticas em Tempo Real

- Total de livros, autores, editoras e utentes
- Empréstimos ativos
- Livros disponíveis

## 🎨 Interface

- **Design responsivo** - funciona em desktop, tablet e mobile
- **Sidebar colapsível** - menu lateral que se adapta ao tamanho da tela
- **Tema moderno** - interface limpa e intuitiva
- **Navegação fluida** - transições suaves entre páginas

## 🔄 Dados Mock vs API Real

### Modo Atual (Mock Data)
- Dados são armazenados em memória
- Mudanças são perdidas ao recarregar a página
- Ideal para demonstração e desenvolvimento

### Para Conectar com API Real
1. Crie um arquivo `.env` na raiz do projeto
2. Adicione: `REACT_APP_API_URL=http://localhost:3001/api`
3. Certifique-se de que a API está rodando

## 🐛 Solução de Problemas

### Erro: "npm não é reconhecido"
- Instale o Node.js: https://nodejs.org/
- Reinicie o terminal após a instalação

### Erro: "Porta 3000 já está em uso"
- Pare outros processos na porta 3000
- Ou use: `PORT=3001 npm start`

### Erro: "Módulo não encontrado"
- Execute: `npm install` novamente
- Verifique se está no diretório correto

### Página em branco
- Verifique o console do navegador (F12)
- Certifique-se de que todas as dependências foram instaladas

## 📞 Suporte

Se encontrar problemas:

1. Verifique se o Node.js está instalado corretamente
2. Execute `npm install` novamente
3. Limpe o cache: `npm cache clean --force`
4. Verifique o console do navegador para erros

## 🎉 Próximos Passos

Após executar o sistema:

1. **Explore as funcionalidades** - navegue pelas diferentes seções
2. **Teste os formulários** - cadastre novos livros, autores, etc.
3. **Teste a responsividade** - redimensione a janela do navegador
4. **Experimente as buscas** - use os filtros e campos de busca

---

**Sistema pronto para uso!** 🚀
