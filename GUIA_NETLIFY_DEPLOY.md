# 🌐 Guia Completo: Deploy no Netlify

## 📋 **Passo 3: Configurar Variáveis no Netlify**

### **3.1 Acessar o Netlify**
1. **Abra seu navegador** e vá para: https://app.netlify.com/
2. **Faça login** na sua conta (ou crie uma se não tiver)

### **3.2 Se ainda não tem site no Netlify:**

#### **Opção A: Criar Novo Site**
1. Clique em **"New site from Git"**
2. Escolha **"GitHub"**
3. Autorize o Netlify a acessar seus repositórios
4. Selecione o repositório **"gm-biblioteca-react"**
5. **Configurações de Build:**
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
6. Clique em **"Deploy site"**

#### **Opção B: Se já tem site**
1. Selecione seu site existente
2. Vá para **"Site settings"**

### **3.3 Configurar Variáveis de Ambiente:**

1. **No painel do seu site**, clique em **"Site settings"**
2. **No menu lateral**, clique em **"Environment variables"**
3. **Clique em "Add variable"**

#### **Adicionar Variável 1:**
- **Key:** `REACT_APP_SUPABASE_URL`
- **Value:** `https://djfkoacmmbdufucriqyd.supabase.co`
- Clique em **"Save"**

#### **Adicionar Variável 2:**
- **Key:** `REACT_APP_SUPABASE_ANON_KEY`
- **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqZmtvYWNtbWJkdWZ1Y3JpcXlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNzgwMDQsImV4cCI6MjA3NDc1NDAwNH0.mrMw6WjwIc1K7becJK6vSStxynCXsHxYdfZtiNKTzMw`
- Clique em **"Save"**

#### **Adicionar Variável 3:**
- **Key:** `REACT_APP_API_URL`
- **Value:** `supabase`
- Clique em **"Save"**

## 🚀 **Passo 4: Deploy Automático**

### **4.1 O Deploy Já Está Configurado!**

Como você já fez push do código para o GitHub, o Netlify fará deploy automático quando:
- ✅ As variáveis de ambiente estiverem configuradas
- ✅ O código estiver no GitHub

### **4.2 Forçar Novo Deploy (se necessário):**

1. **No painel do Netlify**, vá para **"Deploys"**
2. Clique em **"Trigger deploy"** → **"Deploy site"**
3. Aguarde o build (2-3 minutos)

### **4.3 Verificar Deploy:**

1. **Vá para a aba "Deploys"**
2. **Clique no deploy mais recente**
3. **Verifique os logs** para garantir que não há erros
4. **Acesse seu site** pelo URL fornecido

## 🎯 **Resultado Final**

Após configurar tudo, você terá:

✅ **Site online** com URL público  
✅ **Conectado ao Supabase** com dados reais  
✅ **Deploy automático** a cada push no GitHub  
✅ **Dashboard** com estatísticas reais  
✅ **Gestão completa** de livros, autores, editoras, etc.  

## 🔍 **Troubleshooting**

### **Erro: "Build failed"**
- Verifique se as variáveis de ambiente estão configuradas
- Verifique os logs de build no Netlify

### **Erro: "Environment variables not found"**
- Certifique-se de que as 3 variáveis estão adicionadas
- Verifique se os nomes estão exatamente como mostrado

### **Site não carrega dados**
- Verifique se `REACT_APP_API_URL=supabase`
- Verifique se as credenciais do Supabase estão corretas

## 📱 **Testar Aplicação**

1. **Acesse seu site** pelo URL do Netlify
2. **Teste o Dashboard** - deve mostrar estatísticas reais
3. **Teste a lista de livros** - deve mostrar os 6 livros do seu banco
4. **Teste outras funcionalidades**

## 🎉 **Sucesso!**

Se tudo estiver funcionando, você terá:
- **Aplicação React** online
- **Conectada ao Supabase** 
- **Com dados reais** da sua base de dados
- **Deploy automático** configurado

**Parabéns! Sua aplicação está online! 🚀**
