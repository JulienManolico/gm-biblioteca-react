# 🚀 Guia: GitHub + Vercel - Deploy Automático

## 📋 Passo a Passo Completo

### 1. 📁 Preparar o Projeto

✅ **Arquivos já criados:**
- `vercel.json` - Configuração do Vercel
- `.gitignore` - Arquivos ignorados pelo Git
- `package.json` - Dependências e scripts

### 2. 🌐 Criar Repositório no GitHub

#### Opção A: Via Interface Web (Recomendado)

1. **Acesse**: [github.com](https://github.com)
2. **Faça login** ou crie uma conta
3. **Clique em "New repository"** (botão verde)
4. **Configure o repositório**:
   - **Repository name**: `gm-biblioteca-react`
   - **Description**: `Sistema de Gestão de Biblioteca em React`
   - **Visibility**: Public (gratuito) ou Private
   - **NÃO marque** "Add a README file"
   - **NÃO marque** "Add .gitignore"
   - **NÃO marque** "Choose a license"
5. **Clique em "Create repository"**

#### Opção B: Via GitHub CLI (Avançado)

```bash
# Instalar GitHub CLI
# Windows: winget install GitHub.cli
# Ou baixar de: https://cli.github.com/

# Login
gh auth login

# Criar repositório
gh repo create gm-biblioteca-react --public --description "Sistema de Gestão de Biblioteca em React"
```

### 3. 📤 Fazer Upload para o GitHub

#### Método 1: Via Interface Web (Mais Fácil)

1. **No repositório criado**, você verá instruções
2. **Clique em "uploading an existing file"**
3. **Arraste todos os arquivos** da pasta `gm-biblioteca-react`
4. **Adicione uma mensagem de commit**: "Initial commit - GMBiblioteca React"
5. **Clique em "Commit changes"**

#### Método 2: Via Git (Avançado)

```bash
# Navegar para o projeto
cd "C:\Users\aluno\Desktop\WebApp\gm-biblioteca-react"

# Inicializar git
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "Initial commit - GMBiblioteca React"

# Conectar com GitHub (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/gm-biblioteca-react.git

# Push para GitHub
git push -u origin main
```

### 4. 🔗 Conectar GitHub ao Vercel

1. **Acesse**: [vercel.com](https://vercel.com)
2. **Faça login** ou crie uma conta
3. **Clique em "New Project"**
4. **Conecte com GitHub**:
   - Clique em "Import Git Repository"
   - Autorize o Vercel a acessar seu GitHub
   - Selecione o repositório `gm-biblioteca-react`

### 5. ⚙️ Configurar Deploy no Vercel

1. **Configure o projeto**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `./` (raiz)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

2. **Variáveis de Ambiente** (opcional):
   ```
   REACT_APP_APP_NAME=GMBiblioteca
   REACT_APP_VERSION=1.0.0
   REACT_APP_ENVIRONMENT=production
   ```

3. **Clique em "Deploy"**

### 6. 🎉 Deploy Automático Configurado!

Após o primeiro deploy:

- ✅ **Deploy automático**: A cada push para `main`
- ✅ **Preview deployments**: Para Pull Requests
- ✅ **URL automática**: `https://gm-biblioteca-react-[hash].vercel.app`
- ✅ **HTTPS**: Automático
- ✅ **CDN**: Global

## 🔄 Como Funciona o Deploy Automático

### Push para main branch:
```bash
git add .
git commit -m "Nova funcionalidade"
git push origin main
# → Deploy automático de produção
```

### Pull Request:
```bash
git checkout -b nova-funcionalidade
git add .
git commit -m "Adicionar nova funcionalidade"
git push origin nova-funcionalidade
# → Criar Pull Request no GitHub
# → Preview deployment automático
```

## 📊 Monitoramento

### Vercel Dashboard:
- **Deployments**: Histórico de deploys
- **Analytics**: Métricas de performance
- **Logs**: Logs de erro e build
- **Domains**: Gerenciar domínios

### GitHub:
- **Actions**: CI/CD automático
- **Issues**: Rastrear problemas
- **Pull Requests**: Code review

## 🎯 Próximos Passos

1. **Teste o deploy**: Acesse a URL do Vercel
2. **Configure domínio personalizado** (opcional)
3. **Implemente analytics** (opcional)
4. **Configure monitoramento** (opcional)

## 🚨 Solução de Problemas

### Erro: "Build failed"
- Verifique logs no Vercel dashboard
- Certifique-se que todas as dependências estão no `package.json`

### Erro: "Repository not found"
- Verifique se o repositório é público
- Ou configure acesso privado no Vercel

### Erro: "404 em rotas"
- Verifique configuração de rotas no `vercel.json`
- Certifique-se que todas as rotas redirecionam para `index.html`

## 📱 Funcionalidades do Sistema

✅ **Dashboard** com estatísticas
✅ **Gestão de livros** completa
✅ **Sistema de autores** e editoras
✅ **Gestão de gêneros** literários
✅ **Sistema de utentes**
✅ **Empréstimos** com controle
✅ **Códigos postais**
✅ **Interface responsiva**
✅ **Busca em tempo real**

## 🌐 URLs Importantes

- **GitHub**: `https://github.com/SEU_USUARIO/gm-biblioteca-react`
- **Vercel**: `https://vercel.com/dashboard`
- **Site**: `https://gm-biblioteca-react-[hash].vercel.app`

---

**Deploy automático configurado!** 🚀

Agora a cada push no GitHub, o Vercel fará deploy automático!
