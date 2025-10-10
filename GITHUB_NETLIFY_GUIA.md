# 🐙 Guia Completo: Deploy via GitHub + Netlify

## 🎯 **Vantagens do Método GitHub:**
- ✅ **Deploy automático** a cada push
- ✅ **Histórico de versões** completo
- ✅ **Colaboração** em equipe
- ✅ **Backup** do código na nuvem
- ✅ **Rollback** fácil para versões anteriores

---

## 📋 **Passo 1: Criar Repositório no GitHub**

### 1.1 Acessar GitHub
1. Vá para: https://github.com/
2. Faça login ou crie uma conta
3. Clique no botão **"New"** (verde) ou **"+"** → **"New repository"**

### 1.2 Configurar Repositório
```
Repository name: gm-biblioteca-react
Description: Sistema de Gestão de Biblioteca em React
Visibility: Public (ou Private se preferir)
```

**⚠️ IMPORTANTE:**
- ❌ **NÃO** marque "Add a README file"
- ❌ **NÃO** marque "Add .gitignore" 
- ❌ **NÃO** marque "Choose a license"

### 1.3 Criar Repositório
- Clique em **"Create repository"**

---

## 📤 **Passo 2: Conectar Repositório Local ao GitHub**

### 2.1 Copiar URL do Repositório
No GitHub, copie a URL do seu repositório (exemplo):
```
https://github.com/SEU_USUARIO/gm-biblioteca-react.git
```

### 2.2 Adicionar Remote Origin
No terminal, execute:
```bash
git remote add origin https://github.com/SEU_USUARIO/gm-biblioteca-react.git
```

### 2.3 Renomear Branch para Main
```bash
git branch -M main
```

### 2.4 Fazer Push Inicial
```bash
git push -u origin main
```

---

## 🌐 **Passo 3: Conectar GitHub ao Netlify**

### 3.1 Acessar Netlify
1. Vá para: https://app.netlify.com/
2. Faça login na sua conta
3. Clique em **"New site from Git"**

### 3.2 Conectar GitHub
1. Clique em **"GitHub"**
2. Autorize o Netlify a acessar seus repositórios
3. Selecione o repositório **"gm-biblioteca-react"**

### 3.3 Configurar Build Settings
```
Build command: npm run build
Publish directory: build
```

### 3.4 Deploy
- Clique em **"Deploy site"**
- Aguarde o build (2-3 minutos)

---

## ⚙️ **Passo 4: Configurações Avançadas**

### 4.1 Variáveis de Ambiente
No Netlify, vá em:
- **Site settings** → **Environment variables**
- Adicione:
```
REACT_APP_APP_NAME=GMBiblioteca
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=production
```

### 4.2 Domínio Personalizado
- **Site settings** → **Domain management**
- Clique em **"Add custom domain"**
- Digite seu domínio

### 4.3 Deploy Automático
✅ **Já configurado automaticamente!**
- A cada push no GitHub → Deploy automático
- A cada pull request → Preview automático

---

## 🔄 **Fluxo de Trabalho Diário**

### Para Fazer Mudanças:
1. **Editar código** localmente
2. **Testar** com `npm start`
3. **Commit** as mudanças:
   ```bash
   git add .
   git commit -m "Descrição da mudança"
   ```
4. **Push** para GitHub:
   ```bash
   git push origin main
   ```
5. **Deploy automático** no Netlify! 🚀

### Para Reverter Mudanças:
1. **GitHub** → **Commits** → **Revert**
2. Ou no terminal:
   ```bash
   git revert HEAD
   git push origin main
   ```

---

## 🛠️ **Comandos Úteis**

### Git Básico:
```bash
# Ver status
git status

# Ver histórico
git log --oneline

# Ver diferenças
git diff

# Adicionar arquivos
git add .

# Commit
git commit -m "Mensagem"

# Push
git push origin main

# Pull (baixar mudanças)
git pull origin main
```

### Netlify CLI (Opcional):
```bash
# Instalar
npm install -g netlify-cli

# Login
netlify login

# Deploy manual
netlify deploy

# Deploy para produção
netlify deploy --prod
```

---

## 🔍 **Troubleshooting**

### Erro: "Repository not found"
- Verifique se o repositório existe no GitHub
- Verifique se você tem permissão de acesso

### Erro: "Build failed"
- Verifique os logs de build no Netlify
- Teste localmente com `npm run build`

### Erro: "Permission denied"
- Verifique se o GitHub está autorizado no Netlify
- Re-autorize se necessário

### Deploy não acontece automaticamente
- Verifique se o webhook está configurado
- Vá em **Site settings** → **Build & deploy** → **Deploy hooks**

---

## 📊 **Monitoramento**

### Netlify Analytics:
- **Analytics** → **Visitors**
- **Analytics** → **Top pages**
- **Analytics** → **Top referrers**

### GitHub Insights:
- **Insights** → **Pulse**
- **Insights** → **Contributors**
- **Insights** → **Traffic**

---

## 🎉 **Resultado Final**

Após seguir todos os passos, você terá:

✅ **Repositório GitHub** com seu código  
✅ **Deploy automático** no Netlify  
✅ **URL público** da sua aplicação  
✅ **Histórico completo** de mudanças  
✅ **Backup** do código na nuvem  
✅ **Colaboração** em equipe (se necessário)  

---

## 🚀 **Próximos Passos**

1. **Personalizar domínio** (opcional)
2. **Configurar HTTPS** (automático)
3. **Adicionar CI/CD** avançado
4. **Monitorar performance**
5. **Configurar backups**

**Boa sorte com seu deploy! 🎉**
