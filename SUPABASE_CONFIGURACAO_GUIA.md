# 🗄️ Guia Completo: Configurar Supabase com React

## 🎯 **O que é o Supabase?**
O Supabase é um backend-as-a-service que oferece:
- ✅ **Banco de dados PostgreSQL** na nuvem
- ✅ **API REST automática** 
- ✅ **Autenticação** integrada
- ✅ **Real-time subscriptions**
- ✅ **Storage** para arquivos
- ✅ **Dashboard** visual para gerenciar dados

---

## 📋 **Passo 1: Criar Projeto no Supabase**

### 1.1 Acessar Supabase
1. Vá para: https://supabase.com/
2. Clique em **"Start your project"**
3. Faça login com GitHub (recomendado)

### 1.2 Criar Novo Projeto
1. Clique em **"New Project"**
2. Preencha os dados:
   ```
   Organization: Sua organização
   Project Name: gm-biblioteca
   Database Password: [senha forte]
   Region: Choose a region close to you
   ```
3. Clique em **"Create new project"**
4. Aguarde a criação (2-3 minutos)

---

## 🗃️ **Passo 2: Configurar Banco de Dados**

### 2.1 Acessar SQL Editor
1. No painel do Supabase, vá em **"SQL Editor"**
2. Clique em **"New query"**

### 2.2 Criar Tabelas
Execute o seguinte SQL para criar as tabelas:

```sql
-- Tabela de Autores
CREATE TABLE autores (
    au_cod SERIAL PRIMARY KEY,
    au_nome VARCHAR(255) NOT NULL,
    au_pais VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Editoras
CREATE TABLE editoras (
    ed_cod SERIAL PRIMARY KEY,
    ed_nome VARCHAR(255) NOT NULL,
    ed_pais VARCHAR(100),
    ed_morada TEXT,
    ed_email VARCHAR(255),
    ed_tlm VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Gêneros
CREATE TABLE generos (
    ge_cod SERIAL PRIMARY KEY,
    ge_genero VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Códigos Postais
CREATE TABLE codigos_postais (
    cod_postal VARCHAR(10) PRIMARY KEY,
    cod_localidade VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Utentes
CREATE TABLE utentes (
    ut_cod SERIAL PRIMARY KEY,
    ut_nome VARCHAR(255) NOT NULL,
    ut_nif VARCHAR(20) UNIQUE,
    ut_email VARCHAR(255),
    ut_tlm VARCHAR(20),
    ut_morada TEXT,
    ut_turma VARCHAR(50),
    ut_ano INTEGER,
    ut_cod_postal VARCHAR(10) REFERENCES codigos_postais(cod_postal),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Livros
CREATE TABLE livros (
    li_cod SERIAL PRIMARY KEY,
    li_titulo VARCHAR(255) NOT NULL,
    li_ano INTEGER,
    li_edicao VARCHAR(100),
    li_isbn VARCHAR(20),
    li_autor_cod INTEGER REFERENCES autores(au_cod),
    li_editora_cod INTEGER REFERENCES editoras(ed_cod),
    li_genero_cod INTEGER REFERENCES generos(ge_cod),
    total_exemplares INTEGER DEFAULT 1,
    exemplares_disponiveis INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Empréstimos
CREATE TABLE emprestimos (
    em_cod SERIAL PRIMARY KEY,
    em_ut_cod INTEGER REFERENCES utentes(ut_cod),
    em_lex_cod INTEGER REFERENCES livros(li_cod),
    em_data DATE DEFAULT CURRENT_DATE,
    em_devolucao_prevista DATE,
    em_data_devolucao DATE,
    em_devolvido BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 2.3 Inserir Dados de Exemplo
```sql
-- Inserir gêneros
INSERT INTO generos (ge_genero) VALUES 
('Fantasia'), ('Ficção Científica'), ('Literatura Brasileira'), 
('Romance'), ('Suspense'), ('Terror'), ('Biografia'), 
('História'), ('Filosofia'), ('Poesia');

-- Inserir autores
INSERT INTO autores (au_nome, au_pais) VALUES 
('J.R.R. Tolkien', 'Reino Unido'),
('George Orwell', 'Reino Unido'),
('Machado de Assis', 'Brasil');

-- Inserir editoras
INSERT INTO editoras (ed_nome, ed_pais, ed_morada, ed_email, ed_tlm) VALUES 
('Martins Fontes', 'Brasil', 'Rua das Flores, 123', 'contato@martinsfontes.com.br', '(11) 1234-5678'),
('Companhia das Letras', 'Brasil', 'Av. Paulista, 1000', 'contato@companhiadasletras.com.br', '(11) 2345-6789'),
('Ática', 'Brasil', 'Rua do Comércio, 456', 'contato@atica.com.br', '(11) 3456-7890');

-- Inserir códigos postais
INSERT INTO codigos_postais (cod_postal, cod_localidade) VALUES 
('2000-123', 'Lisboa'),
('4000-123', 'Porto'),
('3000-123', 'Coimbra');

-- Inserir livros
INSERT INTO livros (li_titulo, li_ano, li_edicao, li_isbn, li_autor_cod, li_editora_cod, li_genero_cod, total_exemplares, exemplares_disponiveis) VALUES 
('O Senhor dos Anéis', 1954, '1ª Edição', '978-85-359-0277-8', 1, 1, 1, 3, 2),
('1984', 1949, '2ª Edição', '978-85-254-1234-5', 2, 2, 2, 2, 1),
('Dom Casmurro', 1899, '1ª Edição', '978-85-254-2345-6', 3, 3, 3, 4, 3);
```

---

## 🔑 **Passo 3: Obter Credenciais**

### 3.1 Acessar Configurações
1. No painel do Supabase, vá em **"Settings"** → **"API"**
2. Copie as seguintes informações:
   - **Project URL** (ex: `https://abcdefgh.supabase.co`)
   - **anon public** key (chave pública)

### 3.2 Configurar Variáveis de Ambiente

#### **Para Desenvolvimento Local:**
1. Crie um arquivo `.env.local` na raiz do projeto:
```env
REACT_APP_SUPABASE_URL=https://seu-projeto.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
REACT_APP_API_URL=supabase
```

#### **Para Produção (Netlify):**
1. No painel do Netlify, vá em **"Site settings"** → **"Environment variables"**
2. Adicione as variáveis:
```
REACT_APP_SUPABASE_URL = https://seu-projeto.supabase.co
REACT_APP_SUPABASE_ANON_KEY = sua-chave-anonima-aqui
REACT_APP_API_URL = supabase
```

---

## 🔒 **Passo 4: Configurar Políticas de Segurança (RLS)**

### 4.1 Habilitar RLS
```sql
-- Habilitar Row Level Security em todas as tabelas
ALTER TABLE autores ENABLE ROW LEVEL SECURITY;
ALTER TABLE editoras ENABLE ROW LEVEL SECURITY;
ALTER TABLE generos ENABLE ROW LEVEL SECURITY;
ALTER TABLE codigos_postais ENABLE ROW LEVEL SECURITY;
ALTER TABLE utentes ENABLE ROW LEVEL SECURITY;
ALTER TABLE livros ENABLE ROW LEVEL SECURITY;
ALTER TABLE emprestimos ENABLE ROW LEVEL SECURITY;
```

### 4.2 Criar Políticas Públicas
```sql
-- Políticas para permitir leitura pública
CREATE POLICY "Permitir leitura pública de autores" ON autores FOR SELECT USING (true);
CREATE POLICY "Permitir leitura pública de editoras" ON editoras FOR SELECT USING (true);
CREATE POLICY "Permitir leitura pública de gêneros" ON generos FOR SELECT USING (true);
CREATE POLICY "Permitir leitura pública de códigos postais" ON codigos_postais FOR SELECT USING (true);
CREATE POLICY "Permitir leitura pública de utentes" ON utentes FOR SELECT USING (true);
CREATE POLICY "Permitir leitura pública de livros" ON livros FOR SELECT USING (true);
CREATE POLICY "Permitir leitura pública de empréstimos" ON emprestimos FOR SELECT USING (true);

-- Políticas para permitir inserção/atualização (ajuste conforme necessário)
CREATE POLICY "Permitir inserção de autores" ON autores FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserção de editoras" ON editoras FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserção de gêneros" ON generos FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserção de códigos postais" ON codigos_postais FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserção de utentes" ON utentes FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserção de livros" ON livros FOR INSERT WITH CHECK (true);
CREATE POLICY "Permitir inserção de empréstimos" ON emprestimos FOR INSERT WITH CHECK (true);

CREATE POLICY "Permitir atualização de autores" ON autores FOR UPDATE USING (true);
CREATE POLICY "Permitir atualização de editoras" ON editoras FOR UPDATE USING (true);
CREATE POLICY "Permitir atualização de gêneros" ON generos FOR UPDATE USING (true);
CREATE POLICY "Permitir atualização de códigos postais" ON codigos_postais FOR UPDATE USING (true);
CREATE POLICY "Permitir atualização de utentes" ON utentes FOR UPDATE USING (true);
CREATE POLICY "Permitir atualização de livros" ON livros FOR UPDATE USING (true);
CREATE POLICY "Permitir atualização de empréstimos" ON emprestimos FOR UPDATE USING (true);

CREATE POLICY "Permitir exclusão de autores" ON autores FOR DELETE USING (true);
CREATE POLICY "Permitir exclusão de editoras" ON editoras FOR DELETE USING (true);
CREATE POLICY "Permitir exclusão de gêneros" ON generos FOR DELETE USING (true);
CREATE POLICY "Permitir exclusão de códigos postais" ON codigos_postais FOR DELETE USING (true);
CREATE POLICY "Permitir exclusão de utentes" ON utentes FOR DELETE USING (true);
CREATE POLICY "Permitir exclusão de livros" ON livros FOR DELETE USING (true);
CREATE POLICY "Permitir exclusão de empréstimos" ON emprestimos FOR DELETE USING (true);
```

---

## 🧪 **Passo 5: Testar Conexão**

### 5.1 Teste Local
1. Configure o arquivo `.env.local`
2. Execute o projeto:
```bash
npm start
```
3. Abra o console do navegador (F12)
4. Verifique se não há erros de conexão

### 5.2 Teste no Netlify
1. Configure as variáveis de ambiente no Netlify
2. Faça um novo deploy
3. Teste todas as funcionalidades

---

## 🔧 **Configurações Avançadas**

### 5.1 Configurar CORS
No painel do Supabase:
1. Vá em **"Settings"** → **"API"**
2. Em **"CORS"**, adicione seu domínio:
```
https://seu-site.netlify.app
http://localhost:3000
```

### 5.2 Configurar Webhooks (Opcional)
Para notificações em tempo real:
1. Vá em **"Database"** → **"Webhooks"**
2. Configure webhooks para eventos importantes

### 5.3 Backup Automático
1. Vá em **"Settings"** → **"Database"**
2. Configure backups automáticos

---

## 🚨 **Troubleshooting**

### Erro: "Invalid API key"
- Verifique se a chave anônima está correta
- Certifique-se de que as variáveis de ambiente estão configuradas

### Erro: "Row Level Security"
- Verifique se as políticas RLS estão configuradas
- Teste com políticas mais permissivas temporariamente

### Erro: "CORS"
- Adicione seu domínio nas configurações de CORS
- Verifique se está usando HTTPS em produção

### Erro: "Table doesn't exist"
- Verifique se as tabelas foram criadas corretamente
- Execute o SQL de criação das tabelas novamente

---

## 📊 **Monitoramento**

### Supabase Dashboard
- **Database**: Monitore queries e performance
- **API**: Veja logs de requisições
- **Auth**: Gerencie usuários (se usar autenticação)
- **Storage**: Gerencie arquivos (se usar)

### Métricas Importantes
- **Queries per second**
- **Database size**
- **API requests**
- **Error rate**

---

## 🎉 **Resultado Final**

Após configurar tudo, você terá:

✅ **Banco de dados PostgreSQL** na nuvem  
✅ **API REST automática** para todas as tabelas  
✅ **Interface visual** para gerenciar dados  
✅ **Backup automático** dos dados  
✅ **Escalabilidade** automática  
✅ **Segurança** com RLS  
✅ **Real-time** capabilities (se necessário)  

---

## 🚀 **Próximos Passos**

1. **Configurar autenticação** (se necessário)
2. **Implementar real-time** para atualizações ao vivo
3. **Configurar storage** para upload de imagens
4. **Implementar backup** e restore
5. **Monitorar performance** e otimizar queries

**Sua aplicação agora está conectada ao Supabase! 🎉**
