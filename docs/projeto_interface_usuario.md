# Projeto de Interface com o Usuário
## Sistema de Gestão de Feiras

**Autores:** Higor Roger de Freitas Santos (221006440), Victor Eneias Oliveira (221038364)  
**Disciplina:** Engenharia de Software CIC0105 Turma 01 2025.1  
**Data:** Janeiro 2025

---

## 1. Introdução

Este documento apresenta o projeto de interface com o usuário para o Sistema de Gestão de Feiras, desenvolvido como parte dos requisitos da disciplina de Engenharia de Software. O projeto inclui wireframes, storyboards e especificações técnicas da interface, seguindo princípios de usabilidade e design responsivo.

### 1.1 Objetivos

- Definir a estrutura visual e funcional das principais telas do sistema
- Estabelecer padrões de navegação e interação
- Garantir experiência consistente entre diferentes dispositivos
- Facilitar a implementação e manutenção da interface

### 1.2 Escopo

O projeto abrange as seguintes telas principais:
1. **Tela de Login/Registro**
2. **Dashboard Principal**
3. **Listagem de Feiras**
4. **Detalhes da Feira**
5. **Gestão de Expositores**
6. **Gestão de Produtos**
7. **Gestão de Ingressos**

---

## 2. Arquitetura da Interface

### 2.1 Padrão de Layout

O sistema utiliza um layout de **aplicação web moderna** com:

- **Header fixo** com navegação principal e controles de usuário
- **Sidebar responsiva** para navegação entre seções
- **Área de conteúdo principal** adaptável
- **Sistema de modais** para formulários e detalhes

### 2.2 Sistema de Design

#### Cores Principais
```css
--primary: #2563eb (Azul principal)
--primary-dark: #1d4ed8 (Azul escuro)
--success: #10b981 (Verde sucesso)
--warning: #f59e0b (Amarelo alerta)
--error: #ef4444 (Vermelho erro)
--gray-50: #f8fafc (Fundo claro)
--gray-900: #0f172a (Texto principal)
```

#### Tipografia
- **Fonte Principal:** Inter (sistema san-serif moderno)
- **Tamanhos:** Responsivos usando clamp() para escalabilidade
- **Pesos:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

#### Espaçamentos
- **Sistema de Grid:** 8px base (--space-1 a --space-12)
- **Responsividade:** Mobile-first com breakpoints em 640px, 768px, 1024px

---

## 3. Wireframes das Telas Principais

### 3.1 Tela de Login/Registro

#### Estrutura Visual
```
┌─────────────────────────────────────┐
│  [Modal Overlay - Fundo Escuro]    │
│                                     │
│    ┌─────────────────────────┐     │
│    │  ACESSO AO SISTEMA  [×] │     │
│    ├─────────────────────────┤     │
│    │                         │     │
│    │  [Nome Completo*]       │     │
│    │  [Email*]               │     │
│    │  [Senha*]               │     │
│    │                         │     │
│    │     [CRIAR CONTA]       │     │
│    │                         │     │
│    │  "Já tenho uma conta"   │     │
│    └─────────────────────────┘     │
└─────────────────────────────────────┘
```

#### Funcionalidades
- **Alternância** entre modo login e registro
- **Validação** em tempo real dos campos
- **Feedback visual** para erros e sucessos
- **Responsividade** para dispositivos móveis

#### Fluxo de Interação
1. Usuario clica em "Entrar" no header
2. Modal de login aparece
3. Usuario pode alternar para "Criar conta"
4. Preenchimento e validação dos campos
5. Submissão e redirecionamento

---

### 3.2 Dashboard Principal

#### Estrutura Visual
```
┌─────────────────────────────────────────────────────────┐
│ 🎪 Sistema de Feiras        [👤 U] [Sair]              │
├─────────────────────────────────────────────────────────┤
│ │📊 Dashboard│                                          │
│ │🎪 Feiras   │  DASHBOARD                              │
│ │            │  Visão geral do sistema                 │
│ │            │                                         │
│ │            │  ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│ │            │  │🎪 Feiras│ │🏢 Expo. │ │📦 Prod. │   │
│ │            │  │   12    │ │   45    │ │   128   │   │
│ │            │  │ Total   │ │ Registr.│ │ Catálog.│   │
│ │            │  └─────────┘ └─────────┘ └─────────┘   │
│ │            │                                         │
│ │            │  ┌─────────┐                           │
│ │            │  │🎫 Ingres│                           │
│ │            │  │   67    │                           │
│ │            │  │ Emitidos│                           │
│ │            │  └─────────┘                           │
└─────────────────────────────────────────────────────────┘
```

#### Componentes
- **Cards de estatísticas** com ícones e números grandes
- **Layout em grid** responsivo
- **Cores diferenciadas** por categoria
- **Animações hover** para interação

---

### 3.3 Listagem de Feiras

#### Estrutura Visual
```
┌─────────────────────────────────────────────────────────┐
│ 🎪 Sistema de Feiras        [👤 U] [Sair]              │
├─────────────────────────────────────────────────────────┤
│ │🎪 Feiras   │  FEIRAS                [+ Nova Feira]   │
│ │📊 Dashboard│  Gerencie e explore feiras              │
│ │            │                                         │
│ │            │  ┌─────────────┐ ┌─────────────┐       │
│ │            │  │     🎪      │ │     🎪      │       │
│ │            │  │ Feira Arte  │ │ Feira Tech  │       │
│ │            │  │ 2025        │ │ 2025        │       │
│ │            │  │             │ │             │       │
│ │            │  │ Feira anual │ │ Tecnologia  │       │
│ │            │  │ de artesa...│ │ e inovação  │       │
│ │            │  │             │ │             │       │
│ │            │  │📅 10-12/08  │ │📅 15-17/09  │       │
│ │            │  │📍 SP/SP     │ │📍 RJ/RJ     │       │
│ │            │  │             │ │             │       │
│ │            │  │🏢🎫 [Geren.]│ │🏢🎫 [Geren.]│       │
│ │            │  └─────────────┘ └─────────────┘       │
└─────────────────────────────────────────────────────────┘
```

#### Funcionalidades
- **Grid responsivo** de cards de feira
- **Informações resumidas** em cada card
- **Hover effects** para interação
- **Estado vazio** quando não há feiras
- **Modal de criação** acionado pelo botão "Nova Feira"

#### Cards de Feira
- **Imagem/ícone** representativo
- **Título** da feira
- **Descrição** truncada
- **Datas** de início e fim
- **Localização** (cidade/estado)
- **Indicadores** de expositores e ingressos

---

### 3.4 Modal de Criação de Feira

#### Estrutura Visual
```
┌─────────────────────────────────────────────────────────┐
│  [Modal Overlay - Fundo Escuro]                        │
│                                                         │
│    ┌─────────────────────────────────────────────┐     │
│    │  NOVA FEIRA                             [×] │     │
│    ├─────────────────────────────────────────────┤     │
│    │                                             │     │
│    │  [Nome da Feira*]      [Local*]            │     │
│    │                                             │     │
│    │  [Descrição*]                               │     │
│    │  ┌─────────────────────────────────────┐   │     │
│    │  │                                     │   │     │
│    │  └─────────────────────────────────────┘   │     │
│    │                                             │     │
│    │  [Data Início*]        [Data Fim*]         │     │
│    │                                             │     │
│    │  [Cidade*]             [Estado*]           │     │
│    │                                             │     │
│    │                    [Cancelar] [Criar Feira]│     │
│    └─────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

#### Validações
- **Campos obrigatórios** marcados com *
- **Validação de datas** (fim >= início)
- **Feedback visual** para erros
- **Desabilitação** do botão durante envio

---

### 3.5 Detalhes da Feira

#### Estrutura Visual
```
┌─────────────────────────────────────────────────────────┐
│ 🎪 Sistema de Feiras        [👤 U] [Sair]              │
├─────────────────────────────────────────────────────────┤
│ │🎪 Feiras   │  ← FEIRA DE ARTESANATO 2025             │
│ │📊 Dashboard│                          [Editar][Excl.]│
│ │            │                                         │
│ │            │  📅 10/08/2025 - 12/08/2025            │
│ │            │  📍 Praça Central, São Paulo/SP        │
│ │            │                                         │
│ │            │  Feira anual de artesanato com          │
│ │            │  expositores locais...                  │
│ │            │                                         │
│ │            │  ┌─── EXPOSITORES ──┐ ┌─── INGRESSOS ─┐ │
│ │            │  │                  │ │               │ │
│ │            │  │ • Artesanatos    │ │ [Emitir]      │ │
│ │            │  │   da Vovó        │ │               │ │
│ │            │  │ • Cerâmicas      │ │ #12345...     │ │
│ │            │  │   Bela Vista     │ │ 10/01/2025     │ │
│ │            │  │                  │ │               │ │
│ │            │  │ [+ Expositor]    │ │ #67890...     │ │
│ │            │  │                  │ │ 10/01/2025     │ │
│ │            │  └──────────────────┘ └───────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### Seções
- **Informações principais** da feira
- **Lista de expositores** com links para detalhes
- **Gestão de ingressos** com emissão
- **Ações de edição/exclusão** (apenas para criador)

---

### 3.6 Gestão de Expositores

#### Estrutura Visual
```
┌─────────────────────────────────────────────────────────┐
│ 🎪 Sistema de Feiras        [👤 U] [Sair]              │
├─────────────────────────────────────────────────────────┤
│ │🎪 Feiras   │  EXPOSITORES - Feira Arte 2025          │
│ │📊 Dashboard│                        [+ Novo Expositor]│
│ │            │                                         │
│ │            │  ┌─────────────────────────────────────┐ │
│ │            │  │ 🏢 Artesanatos da Vovó              │ │
│ │            │  │ Produtos artesanais feitos à mão    │ │
│ │            │  │ 📧 contato@artesanatosdavovo.com    │ │
│ │            │  │                                     │ │
│ │            │  │ Produtos: 📦 Vaso Cerâmica (R$45,90)│ │
│ │            │  │           📦 Pulseira Macramê       │ │
│ │            │  │                                     │ │
│ │            │  │                [Editar] [Excluir]   │ │
│ │            │  └─────────────────────────────────────┘ │
│ │            │                                         │
│ │            │  ┌─────────────────────────────────────┐ │
│ │            │  │ 🏢 Cerâmicas Bela Vista             │ │
│ │            │  │ Cerâmicas decorativas e utilitárias │ │
│ │            │  │ 📧 contato@ceramicasbelavista.com   │ │
│ │            │  │                                     │ │
│ │            │  │ Produtos: 📦 Jarro Decorativo       │ │
│ │            │  │                                     │ │
│ │            │  │                [Editar] [Excluir]   │ │
│ │            │  └─────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### Funcionalidades
- **Lista expandida** de expositores
- **Informações de contato** visíveis
- **Preview dos produtos** por expositor
- **Ações CRUD** por expositor
- **Filtros e busca** (implementação futura)

---

### 3.7 Gestão de Produtos

#### Estrutura Visual
```
┌─────────────────────────────────────────────────────────┐
│ 🎪 Sistema de Feiras        [👤 U] [Sair]              │
├─────────────────────────────────────────────────────────┤
│ │🎪 Feiras   │  PRODUTOS - Artesanatos da Vovó         │
│ │📊 Dashboard│                         [+ Novo Produto] │
│ │            │                                         │
│ │            │  ┌─────────────────────────────────────┐ │
│ │            │  │ 📦 Vaso de Cerâmica      R$ 45,90   │ │
│ │            │  │ Vaso decorativo feito em cerâmica   │ │
│ │            │  │ artesanal com acabamento rústico    │ │
│ │            │  │                                     │ │
│ │            │  │                [Editar] [Excluir]   │ │
│ │            │  └─────────────────────────────────────┘ │
│ │            │                                         │
│ │            │  ┌─────────────────────────────────────┐ │
│ │            │  │ 📦 Pulseira Macramê      R$ 25,00   │ │
│ │            │  │ Pulseira artesanal feita com        │ │
│ │            │  │ técnica de macramê                  │ │
│ │            │  │                                     │ │
│ │            │  │                [Editar] [Excluir]   │ │
│ │            │  └─────────────────────────────────────┘ │
│ │            │                                         │
│ │            │  ┌─────────────────────────────────────┐ │
│ │            │  │ 📦 Colar de Contas       R$ 18,50   │ │
│ │            │  │ Colar feito com contas coloridas    │ │
│ │            │  │ em madeira natural                  │ │
│ │            │  │                                     │ │
│ │            │  │                [Editar] [Excluir]   │ │
│ │            │  └─────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

#### Características
- **Lista de produtos** com preços destacados
- **Descrições completas** visíveis
- **Formatação monetária** brasileira
- **Ações individuais** por produto

---

## 4. Fluxos de Navegação

### 4.1 Fluxo Principal (Usuário Não Autenticado)

```
[Página Inicial] 
       ↓
[Lista de Feiras] ← → [Detalhes da Feira]
       ↓                      ↓
[Expositores da Feira] ← → [Produtos do Expositor]
       ↓
[Clique em "Entrar"]
       ↓
[Modal de Login] → [Dashboard] (após autenticação)
```

### 4.2 Fluxo Autenticado (Usuário Logado)

```
[Dashboard]
    ↓
[Sidebar Navigation]
    ├── [Feiras] → [Criar/Editar Feira] → [Detalhes]
    │                                         ↓
    │                                   [Expositores] → [Criar/Editar]
    │                                         ↓              ↓
    │                                   [Produtos] → [Criar/Editar]
    │                                         ↓
    │                                   [Ingressos] → [Emitir]
    │
    └── [Dashboard] (estatísticas gerais)
```

### 4.3 Fluxo de Criação de Feira

```
[Lista de Feiras]
       ↓
[Botão "+ Nova Feira"]
       ↓
[Modal de Criação]
       ↓
[Preenchimento do Formulário]
       ↓
[Validação] → [Erro: Correção] ← ┐
       ↓                          │
[Submissão] → [Sucesso] → [Fechar Modal] → [Lista Atualizada]
       ↓
[Erro de Rede] ────────────────────┘
```

---

## 5. Responsividade

### 5.1 Breakpoints

- **Mobile:** < 640px
- **Tablet:** 640px - 768px  
- **Desktop Small:** 768px - 1024px
- **Desktop Large:** > 1024px

### 5.2 Adaptações por Dispositivo

#### Mobile (< 640px)
- **Sidebar** colapsa em menu horizontal no topo
- **Grid de feiras** vira coluna única
- **Modais** ocupam tela inteira
- **Formulários** empilham campos verticalmente
- **Botões** ficam full-width

#### Tablet (640px - 768px)
- **Sidebar** mantém-se visível mas mais estreita
- **Grid de feiras** em 1-2 colunas
- **Modais** centralizados com margem
- **Dashboard** em 2 colunas

#### Desktop (> 768px)
- **Layout completo** com sidebar fixa
- **Grid responsivo** até 3 colunas
- **Hover effects** ativos
- **Dashboard** em 2-4 colunas conforme espaço

---

## 6. Componentes Reutilizáveis

### 6.1 Sistema de Botões

```css
/* Botão Primário */
.btn-primary {
  background: #2563eb;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
}

/* Botão Secundário */
.btn-secondary {
  background: white;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 12px 24px;
  border-radius: 8px;
}

/* Botão de Perigo */
.btn-danger {
  background: #ef4444;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
}
```

### 6.2 Sistema de Cards

```css
/* Card Base */
.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

/* Card de Feira */
.feira-card {
  cursor: pointer;
  overflow: hidden;
}

.feira-card-image {
  height: 200px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
}
```

### 6.3 Sistema de Formulários

```css
/* Grupo de Campo */
.form-group {
  margin-bottom: 1rem;
}

/* Label */
.form-label {
  display: block;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

/* Input */
.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.875rem;
}

.form-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}
```

---

## 7. Estados da Interface

### 7.1 Estados de Loading

- **Skeleton screens** para carregamento de listas
- **Spinners** para ações de botão
- **Overlay** para operações modais
- **Desabilitação** de elementos durante processamento

### 7.2 Estados de Erro

- **Alertas inline** para erros de validação
- **Banners de erro** para falhas de rede
- **Estados vazios** com call-to-action
- **Fallbacks** para dados não encontrados

### 7.3 Estados de Sucesso

- **Notificações toast** para ações completadas
- **Feedback visual** em botões (checkmark temporário)
- **Atualizações otimistas** de listas
- **Redirecionamentos** pós-criação

---

## 8. Acessibilidade

### 8.1 Princípios Aplicados

- **Contraste adequado** (WCAG AA)
- **Navegação por teclado** completa
- **Labels semânticos** em formulários
- **Estados de foco** visíveis
- **Texto alternativo** para ícones

### 8.2 Implementações Específicas

```css
/* Foco visível */
*:focus {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #2563eb;
  color: white;
  padding: 8px;
  text-decoration: none;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 6px;
}
```

---

## 9. Performance e Otimização

### 9.1 Estratégias Implementadas

- **CSS minificado** em produção
- **Lazy loading** de componentes não críticos
- **Debounce** em campos de busca
- **Otimização de imagens** (WebP quando possível)
- **Caching** de requisições GET

### 9.2 Métricas Alvo

- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **First Input Delay:** < 100ms

---

## 10. Considerações Técnicas

### 10.1 Compatibilidade

- **Navegadores modernos** (Chrome 90+, Firefox 88+, Safari 14+)
- **Graceful degradation** para versões antigas
- **Progressive enhancement** para funcionalidades avançadas

### 10.2 Tecnologias Utilizadas

- **React 18** para componentes
- **CSS3** com variáveis customizadas
- **Flexbox/Grid** para layouts
- **Fetch API** para requisições
- **LocalStorage** para persistência local

---

## 11. Conclusão

O projeto de interface apresentado estabelece uma base sólida para o Sistema de Gestão de Feiras, priorizando:

- **Usabilidade** através de padrões conhecidos
- **Responsividade** para diferentes dispositivos  
- **Acessibilidade** seguindo diretrizes WCAG
- **Manutenibilidade** com componentes reutilizáveis
- **Performance** otimizada para web

A implementação seguiu princípios de design system moderno, garantindo consistência visual e funcional em todas as telas. Os wireframes e fluxos documentados servem como referência para desenvolvimento e futuras iterações do sistema.

### 11.1 Próximos Passos

1. **Testes de usabilidade** com usuários reais
2. **Implementação de temas** (claro/escuro)
3. **Adição de animações** micro-interações
4. **Otimização para PWA** (Progressive Web App)
5. **Integração com ferramentas de analytics**

---

**Documento gerado em:** Janeiro 2025  
**Versão:** 1.0  
**Status:** Concluído para entrega acadêmica 