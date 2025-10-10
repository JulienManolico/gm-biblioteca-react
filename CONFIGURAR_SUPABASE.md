# 🔧 Configurar Supabase com suas Credenciais

## ✅ **Suas Credenciais do Supabase:**

```
URL: https://seu-projeto.supabase.co
ANON KEY: sua-chave-anonima-aqui
```

## 📋 **Passo 1: Configurar Localmente**

### 1.1 Criar arquivo `.env.local`
Crie um arquivo chamado `.env.local` na raiz do projeto (mesmo nível do `package.json`) com o seguinte conteúdo:

```env
# Configurações do Supabase
REACT_APP_SUPABASE_URL=https://seu-projeto.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sua-chave-anonima-aqui

# Configurações da aplicação
REACT_APP_APP_NAME=GMBiblioteca
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development

# Use 'supabase' para conectar ao Supabase
REACT_APP_API_URL=supabase
```

### 1.2 Testar Localmente
```bash
npm start
```

## 🌐 **Passo 2: Configurar no Netlify**

### 2.1 Acessar Netlify
1. Vá para: https://app.netlify.com/
2. Selecione seu site

### 2.2 Adicionar Variáveis de Ambiente
1. Vá em **"Site settings"** → **"Environment variables"**
2. Clique em **"Add variable"**
3. Adicione uma por uma:

```
REACT_APP_SUPABASE_URL = https://seu-projeto.supabase.co
REACT_APP_SUPABASE_ANON_KEY = sua-chave-anonima-aqui
REACT_APP_API_URL = supabase
```

### 2.3 Deploy
1. Faça um novo push no GitHub
2. O Netlify fará deploy automático
3. Seu site estará conectado ao Supabase!

## 🗃️ **Estrutura das Tabelas (Já Configurada)**

Suas tabelas no Supabase:
- ✅ `codigo_postal` - Códigos postais de Portugal
- ✅ `editora` - Editoras
- ✅ `autor` - Autores
- ✅ `genero` - Gêneros literários
- ✅ `livro` - Livros
- ✅ `livro_exemplar` - Exemplares dos livros
- ✅ `utente` - Utentes da biblioteca
- ✅ `requisicao` - Empréstimos/requisições

## 🔒 **Políticas RLS (Já Configuradas)**

As políticas de Row Level Security já estão configuradas para permitir:
- ✅ Leitura pública de todas as tabelas
- ✅ Inserção de dados
- ✅ Atualização de dados
- ✅ Exclusão de dados

## 🧪 **Testar Conexão**

Após configurar, você pode testar:

1. **Localmente**: Abra o console do navegador (F12) e verifique se não há erros
2. **No Netlify**: Acesse seu site e teste as funcionalidades

## 🎯 **Funcionalidades Disponíveis**

Com sua base de dados, você terá:
- ✅ **Dashboard** com estatísticas reais
- ✅ **Lista de livros** com dados do Supabase
- ✅ **Gestão de autores** conectada ao banco
- ✅ **Gestão de editoras** conectada ao banco
- ✅ **Gestão de gêneros** conectada ao banco
- ✅ **Gestão de utentes** conectada ao banco
- ✅ **Gestão de empréstimos** conectada ao banco
- ✅ **Códigos postais** de Portugal

## 🚀 **Próximos Passos**

1. Configure o arquivo `.env.local`
2. Teste localmente com `npm start`
3. Configure as variáveis no Netlify
4. Faça deploy
5. Teste todas as funcionalidades

**Sua aplicação estará 100% conectada ao Supabase! 🎉**
