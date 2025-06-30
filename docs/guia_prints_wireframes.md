# Guia de Prints para Wireframes - Sistema de Gestão de Feiras

## Sequência de Prints para Documentação

### 📋 Instruções Gerais
1. **Resolução**: Configure o navegador para 1920x1080 para prints consistentes
2. **Zoom**: Use zoom 100% no navegador
3. **Servidor**: Mantenha o backend rodando em http://localhost:8000 
4. **Frontend**: Mantenha o frontend rodando em http://localhost:3000/frontend/

### 🎯 Prints Necessários

#### **Print 1: tela_01_inicial.png**
- **Descrição**: Tela inicial sem usuário logado
- **Passos**:
  1. Abra http://localhost:3000/frontend/
  2. Certifique-se de não estar logado (limpe localStorage se necessário)
  3. Aguarde carregar a lista de feiras
  4. Tire print da tela completa

#### **Print 2: tela_02_login.png**
- **Descrição**: Modal de login aberto
- **Passos**:
  1. Na tela inicial, clique em "Entrar" no header
  2. Modal de login deve abrir
  3. Tire print com o modal visível

#### **Print 3: tela_03_dashboard.png**
- **Descrição**: Dashboard após login
- **Passos**:
  1. Faça login com qualquer usuário
  2. Vá para "Dashboard" na sidebar
  3. Aguarde carregar as estatísticas
  4. Tire print da tela completa

#### **Print 4: tela_04_feiras_gestao.png**
- **Descrição**: Lista de feiras para usuário autenticado
- **Passos**:
  1. Estando logado, vá para "Feiras" na sidebar
  2. Aguarde carregar a lista com botão "Nova Feira"
  3. Tire print da tela completa

#### **Print 5: tela_05_criar_feira.png**
- **Descrição**: Modal de criação de feira
- **Passos**:
  1. Na tela de feiras, clique em "Nova Feira"
  2. Modal de criação deve abrir
  3. Preencha alguns campos para mostrar o formulário
  4. Tire print com o modal visível

#### **Print 6: tela_06_detalhes_feira.png**
- **Descrição**: Modal de detalhes da feira
- **Passos**:
  1. Na lista de feiras, clique em qualquer feira
  2. Modal de detalhes deve abrir
  3. Aguarde carregar expositores e ingressos
  4. Tire print com o modal visível

#### **Print 7: tela_07_expositores.png**
- **Descrição**: Gestão de expositores dentro do modal
- **Passos**:
  1. No modal de detalhes da feira, clique em "Novo Expositor"
  2. Formulário de expositor deve aparecer
  3. Tire print mostrando a seção de expositores

#### **Print 8: tela_08_produtos.png**
- **Descrição**: Gestão de produtos
- **Passos**:
  1. No modal de detalhes, clique em um expositor
  2. Seção de produtos deve aparecer
  3. Clique em "Novo Produto" se disponível
  4. Tire print mostrando a gestão de produtos

#### **Print 9: tela_09_mobile.png**
- **Descrição**: Versão mobile
- **Passos**:
  1. Abra DevTools (F12)
  2. Ative modo responsivo
  3. Configure para iPhone/Android (375px width)
  4. Navegue pela interface
  5. Tire print da versão mobile

### 🔄 Após Tirar os Prints

1. **Salvar na pasta correta**: `docs/images/wireframes/`
2. **Nomear exatamente**: Use os nomes especificados no documento LaTeX
3. **Verificar qualidade**: Prints devem estar nítidos e completos

### 📊 Diagramas Mermaid

Os diagramas já foram criados e estão visíveis no chat. Para salvá-los:

1. **fluxo_navegacao.png**: Capturar o primeiro diagrama Mermaid do chat
2. **fluxo_criacao_feira.png**: Capturar o segundo diagrama Mermaid do chat

### ✅ Checklist Final

- [ ] 9 prints de telas capturados
- [ ] 2 diagramas Mermaid salvos
- [ ] Todos os arquivos nomeados corretamente
- [ ] Imagens salvas na pasta docs/images/wireframes/
- [ ] Documento LaTeX atualizado com as imagens

### 🚀 Compilação do LaTeX

Após inserir as imagens, compile o documento:

```bash
cd docs
pdflatex projeto_interface_usuario.tex
```

### 💡 Dicas Importantes

1. **Dados de Teste**: Certifique-se de ter algumas feiras, expositores e produtos cadastrados
2. **Estados Diferentes**: Capture tanto telas vazias quanto com dados
3. **Interações**: Mostre formulários preenchidos e estados de hover quando relevante
4. **Consistência**: Mantenha o mesmo usuário/contexto ao longo dos prints

### 🔧 Resolução de Problemas

- **Modal não abre**: Verifique se o JavaScript está carregando corretamente
- **Dados não aparecem**: Confirme se o backend está rodando
- **Layout quebrado**: Limpe cache do navegador (Ctrl+F5)
- **Responsivo**: Use DevTools para simular dispositivos móveis

---

**Nota**: Este guia substitui a necessidade de criar wireframes no Figma, permitindo documentar a interface real implementada. 