# 📚 GMBiblioteca React - Sistema de Gestão de Biblioteca

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SEU_USUARIO/gm-biblioteca-react)

Um sistema moderno e responsivo para gestão de acervo bibliotecário desenvolvido com React, Bootstrap e React Query.

## 🚀 Deploy Rápido

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SEU_USUARIO/gm-biblioteca-react)

1. **Fork este repositório**
2. **Clique no botão "Deploy with Vercel" acima**
3. **Conecte com seu GitHub**
4. **Deploy automático!**

## 🚀 Características

- **Interface moderna** com React e Bootstrap 5
- **Design responsivo** que funciona em qualquer dispositivo
- **Sistema de busca** avançado por título, autor ou categoria
- **Cadastro completo** de livros, autores, editoras e utentes
- **Sistema de empréstimos** com controle de devolução
- **Estatísticas em tempo real** do acervo
- **API mock** para desenvolvimento sem backend
- **React Query** para gerenciamento de estado e cache

## 📋 Funcionalidades

### Dashboard
- Visão geral do sistema com estatísticas
- Listagem de livros recentes
- Busca rápida integrada
- Cards de estatísticas em tempo real

### Gestão de Livros
- Listagem completa com filtros
- Cadastro e edição de livros
- Sistema de busca avançado
- Controle de exemplares e disponibilidade

### Gestão de Autores
- Cadastro e listagem de autores
- Informações de país de origem
- Integração com sistema de livros

### Gestão de Editoras
- Cadastro completo de editoras
- Informações de contato e endereço
- Integração com sistema de livros

### Gestão de Gêneros
- Cadastro de gêneros literários
- Interface visual com cards
- Integração com sistema de livros

### Gestão de Utentes
- Cadastro de usuários da biblioteca
- Informações pessoais e acadêmicas
- Controle de empréstimos

### Sistema de Empréstimos
- Controle de empréstimos ativos
- Devolução de livros
- Status de atraso
- Histórico de empréstimos

### Códigos Postais
- Gestão de códigos postais
- Integração com endereços
- Formatação automática

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework frontend
- **React Router DOM** - Roteamento
- **React Query** - Gerenciamento de estado e cache
- **React Hook Form** - Formulários
- **Bootstrap 5** - Framework CSS
- **React Icons** - Ícones
- **Axios** - Cliente HTTP
- **Date-fns** - Manipulação de datas

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Passos de Instalação

1. **Clone ou baixe** os arquivos para uma pasta local

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   ```

4. **Acesse o sistema**
   - Abra seu navegador
   - Acesse: `http://localhost:3000`

## 🏗️ Estrutura do Projeto

```
gm-biblioteca-react/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── Layout.js
│   │       ├── Sidebar.js
│   │       └── TopNavbar.js
│   ├── pages/
│   │   ├── Dashboard.js
│   │   ├── Livros.js
│   │   ├── CadastrarLivro.js
│   │   ├── Autores.js
│   │   ├── CadastrarAutor.js
│   │   ├── Editoras.js
│   │   ├── CadastrarEditora.js
│   │   ├── Generos.js
│   │   ├── CadastrarGenero.js
│   │   ├── Utentes.js
│   │   ├── CadastrarUtente.js
│   │   ├── Emprestimos.js
│   │   ├── CodigoPostal.js
│   │   └── CadastrarCodigoPostal.js
│   ├── services/
│   │   └── api.js
│   ├── config/
│   │   └── database.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# URL da API (opcional - usa mock data por padrão)
REACT_APP_API_URL=http://localhost:3001/api

# Outras configurações
REACT_APP_APP_NAME=GMBiblioteca
```

### Modo de Desenvolvimento

Por padrão, o sistema usa dados mock para desenvolvimento. Para conectar com uma API real:

1. Configure a variável `REACT_APP_API_URL` no arquivo `.env`
2. Certifique-se de que a API está rodando no endereço especificado

## 📱 Responsividade

O sistema foi desenvolvido com foco na responsividade:
- **Mobile First** - Funciona perfeitamente em dispositivos móveis
- **Breakpoints Bootstrap** - Adapta-se a diferentes tamanhos de tela
- **Sidebar colapsível** - Menu lateral que se adapta ao mobile
- **Cards flexíveis** - Layout que se ajusta automaticamente

## 🎨 Personalização

### Modificando o Design
- Edite o arquivo `src/index.css` para estilos globais
- Use classes Bootstrap para estilização rápida
- Personalize cores e temas no CSS

### Adicionando Novas Funcionalidades
- Crie novos componentes em `src/components/`
- Adicione novas páginas em `src/pages/`
- Estenda os serviços em `src/services/api.js`

## 🚀 Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm start

# Criar build de produção
npm run build

# Executar testes
npm test

# Ejetar configurações (não recomendado)
npm run eject
```

## 📊 Dados Mock

O sistema inclui dados de exemplo para demonstração:
- 3 livros de exemplo
- 3 autores
- 3 editoras
- 10 gêneros literários
- 1 utente
- 1 empréstimo ativo
- 3 códigos postais

## 🔄 Migração do PHP

Este projeto React é uma migração completa do sistema PHP original, mantendo:
- ✅ Todas as funcionalidades originais
- ✅ Estrutura de dados compatível
- ✅ Interface moderna e responsiva
- ✅ Melhor experiência do usuário
- ✅ Performance otimizada

## 🚀 Próximas Funcionalidades

- [ ] Sistema de autenticação
- [ ] Relatórios avançados
- [ ] Notificações push
- [ ] PWA (Progressive Web App)
- [ ] Integração com APIs externas
- [ ] Sistema de backup
- [ ] Modo offline

## 📞 Suporte

Para dúvidas ou sugestões sobre o sistema React, consulte a documentação ou entre em contato.

---

**GMBiblioteca React** - Sistema de Gestão de Biblioteca © 2024
