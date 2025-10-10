# 🚀 Guia Completo de Deploy no Netlify

## 📋 Pré-requisitos

### 1. Instalar Node.js
1. Acesse: https://nodejs.org/
2. Baixe a versão **LTS** (Long Term Support)
3. Execute o instalador e siga as instruções
4. Reinicie o terminal/PowerShell
5. Verifique a instalação:
   ```bash
   node --version
   npm --version
   ```

### 2. Criar conta no Netlify
1. Acesse: https://netlify.com/
2. Clique em "Sign up"
3. Use sua conta GitHub, GitLab ou email

## 🔧 Configuração Local

### 1. Instalar dependências
```bash
npm install
```

### 2. Testar o build localmente
```bash
npm run build
```

### 3. Testar localmente (opcional)
```bash
npx serve -s build
```

## 🌐 Deploy no Netlify

### Método 1: Deploy Manual (Mais Simples)

1. **Fazer build do projeto:**
   ```bash
   npm run build
   ```

2. **Acessar o Netlify:**
   - Vá para https://app.netlify.com/
   - Faça login na sua conta

3. **Deploy manual:**
   - Arraste a pasta `build` (que foi criada após o `npm run build`) para a área de deploy do Netlify
   - Ou clique em "Deploy manually" e selecione a pasta `build`

4. **Configurar domínio:**
   - O Netlify criará um URL automático (ex: `amazing-name-123456.netlify.app`)
   - Você pode personalizar o nome em "Site settings" > "Change site name"

### Método 2: Deploy via GitHub (Recomendado)

1. **Subir código para GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/gm-biblioteca-react.git
   git push -u origin main
   ```

2. **Conectar no Netlify:**
   - No Netlify, clique em "New site from Git"
   - Escolha "GitHub"
   - Autorize o Netlify a acessar seus repositórios
   - Selecione o repositório `gm-biblioteca-react`

3. **Configurar build:**
   - Build command: `npm run build`
   - Publish directory: `build`
   - Clique em "Deploy site"

### Método 3: Netlify CLI (Avançado)

1. **Instalar Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Fazer login:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   netlify deploy
   ```

4. **Deploy para produção:**
   ```bash
   netlify deploy --prod
   ```

## ⚙️ Configurações Importantes

### Variáveis de Ambiente
No painel do Netlify, vá em:
- Site settings > Environment variables
- Adicione as variáveis necessárias:
  ```
  REACT_APP_APP_NAME=GMBiblioteca
  REACT_APP_VERSION=1.0.0
  REACT_APP_ENVIRONMENT=production
  ```

### Domínio Personalizado
1. Vá em Site settings > Domain management
2. Clique em "Add custom domain"
3. Digite seu domínio
4. Configure os DNS conforme instruções

### Configurações de Build
O arquivo `netlify.toml` já está configurado com:
- ✅ Comando de build: `npm run build`
- ✅ Diretório de publicação: `build`
- ✅ Redirecionamentos para SPA
- ✅ Headers de segurança
- ✅ Cache otimizado

## 🔍 Troubleshooting

### Erro: "Build failed"
- Verifique se todas as dependências estão no `package.json`
- Execute `npm install` localmente primeiro
- Verifique os logs de build no Netlify

### Erro: "Page not found" em rotas
- O arquivo `netlify.toml` já tem redirecionamentos configurados
- Se persistir, verifique se o React Router está configurado corretamente

### Erro: "Module not found"
- Verifique se todas as importações estão corretas
- Execute `npm run build` localmente para testar

## 📱 Testando o Deploy

1. Acesse o URL fornecido pelo Netlify
2. Teste todas as funcionalidades:
   - ✅ Navegação entre páginas
   - ✅ Formulários
   - ✅ Responsividade
   - ✅ Performance

## 🎉 Próximos Passos

1. **Configurar domínio personalizado** (opcional)
2. **Configurar HTTPS** (automático no Netlify)
3. **Configurar CI/CD** (deploy automático a cada push)
4. **Monitorar performance** com Netlify Analytics

## 📞 Suporte

- **Netlify Docs:** https://docs.netlify.com/
- **Netlify Community:** https://community.netlify.com/
- **Status Page:** https://www.netlifystatus.com/

---

## 🚀 Comandos Rápidos

```bash
# Instalar dependências
npm install

# Build para produção
npm run build

# Testar build localmente
npx serve -s build

# Deploy via CLI (se instalado)
netlify deploy --prod
```

**Boa sorte com seu deploy! 🎉**
