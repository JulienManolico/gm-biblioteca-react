# 📋 Estrutura das Tabelas no Supabase

## Para que o projeto funcione corretamente, suas tabelas devem ter esta estrutura:

### 1. **Tabela: autores**
```sql
CREATE TABLE autores (
    au_cod SERIAL PRIMARY KEY,
    au_nome VARCHAR(255) NOT NULL,
    au_pais VARCHAR(100)
);
```

### 2. **Tabela: editoras**
```sql
CREATE TABLE editoras (
    ed_cod SERIAL PRIMARY KEY,
    ed_nome VARCHAR(255) NOT NULL,
    ed_pais VARCHAR(100),
    ed_morada TEXT,
    ed_email VARCHAR(255),
    ed_tlm VARCHAR(20)
);
```

### 3. **Tabela: generos**
```sql
CREATE TABLE generos (
    ge_cod SERIAL PRIMARY KEY,
    ge_genero VARCHAR(100) NOT NULL UNIQUE
);
```

### 4. **Tabela: codigos_postais**
```sql
CREATE TABLE codigos_postais (
    cod_postal VARCHAR(10) PRIMARY KEY,
    cod_localidade VARCHAR(255) NOT NULL
);
```

### 5. **Tabela: utentes**
```sql
CREATE TABLE utentes (
    ut_cod SERIAL PRIMARY KEY,
    ut_nome VARCHAR(255) NOT NULL,
    ut_nif VARCHAR(20) UNIQUE,
    ut_email VARCHAR(255),
    ut_tlm VARCHAR(20),
    ut_morada TEXT,
    ut_turma VARCHAR(50),
    ut_ano INTEGER,
    ut_cod_postal VARCHAR(10) REFERENCES codigos_postais(cod_postal)
);
```

### 6. **Tabela: livros**
```sql
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
    exemplares_disponiveis INTEGER DEFAULT 1
);
```

### 7. **Tabela: emprestimos**
```sql
CREATE TABLE emprestimos (
    em_cod SERIAL PRIMARY KEY,
    em_ut_cod INTEGER REFERENCES utentes(ut_cod),
    em_lex_cod INTEGER REFERENCES livros(li_cod),
    em_data DATE DEFAULT CURRENT_DATE,
    em_devolucao_prevista DATE,
    em_data_devolucao DATE,
    em_devolvido BOOLEAN DEFAULT FALSE
);
```

## 🔧 **Se suas tabelas têm nomes diferentes:**

Se suas tabelas têm nomes diferentes, você pode:

1. **Renomear as tabelas** no Supabase para corresponder à estrutura acima
2. **Ou modificar o código** para usar os nomes das suas tabelas

## 🔒 **Configurar Políticas de Segurança (RLS):**

Para permitir acesso público às tabelas:

```sql
-- Habilitar RLS
ALTER TABLE autores ENABLE ROW LEVEL SECURITY;
ALTER TABLE editoras ENABLE ROW LEVEL SECURITY;
ALTER TABLE generos ENABLE ROW LEVEL SECURITY;
ALTER TABLE codigos_postais ENABLE ROW LEVEL SECURITY;
ALTER TABLE utentes ENABLE ROW LEVEL SECURITY;
ALTER TABLE livros ENABLE ROW LEVEL SECURITY;
ALTER TABLE emprestimos ENABLE ROW LEVEL SECURITY;

-- Políticas para permitir acesso público
CREATE POLICY "Permitir acesso público" ON autores FOR ALL USING (true);
CREATE POLICY "Permitir acesso público" ON editoras FOR ALL USING (true);
CREATE POLICY "Permitir acesso público" ON generos FOR ALL USING (true);
CREATE POLICY "Permitir acesso público" ON codigos_postais FOR ALL USING (true);
CREATE POLICY "Permitir acesso público" ON utentes FOR ALL USING (true);
CREATE POLICY "Permitir acesso público" ON livros FOR ALL USING (true);
CREATE POLICY "Permitir acesso público" ON emprestimos FOR ALL USING (true);
```

## 🧪 **Testar Conexão:**

Após configurar, você pode testar se está funcionando:

1. Abra o console do navegador (F12)
2. Vá para a aba "Console"
3. Procure por mensagens de erro relacionadas ao Supabase
4. Se não houver erros, a conexão está funcionando!
