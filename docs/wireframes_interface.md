 # Projeto de Interface com o Usuário - Wireframes
## Sistema de Gestão de Feiras

**Autores:** Higor Roger de Freitas Santos (221006440), Victor Eneias Oliveira (221038364)  
**Disciplina:** Engenharia de Software CIC0105 Turma 01 2025.1

---

## 1. Visão Geral

Este documento apresenta os wireframes e storyboards das principais telas do Sistema de Gestão de Feiras, atendendo aos requisitos da disciplina de Engenharia de Software.

### 1.1 Telas Principais

1. **Login/Registro** - Autenticação de usuários
2. **Dashboard** - Visão geral do sistema  
3. **Lista de Feiras** - Navegação e gestão de feiras
4. **Detalhes da Feira** - Informações específicas
5. **Gestão de Expositores** - CRUD de expositores
6. **Gestão de Produtos** - CRUD de produtos
7. **Gestão de Ingressos** - Emissão e controle

---

## 2. Wireframe 1: Tela de Login

```
┌─────────────────────────────────────┐
│  [Modal Overlay - Fundo Escuro]    │
│                                     │
│    ┌─────────────────────────┐     │
│    │  ACESSO AO SISTEMA  [×] │     │
│    ├─────────────────────────┤     │
│    │                         │     │
│    │  Nome Completo          │     │
│    │  [________________]     │     │
│    │                         │     │
│    │  Email                  │     │
│    │  [________________]     │     │
│    │                         │     │
│    │  Senha                  │     │
│    │  [________________]     │     │
│    │                         │     │
│    │     [CRIAR CONTA]       │     │
│    │                         │     │
│    │  "Já tenho uma conta"   │     │
│    └─────────────────────────┘     │
└─────────────────────────────────────┘
```

**Funcionalidades:**
- Modal centralizado sobre fundo escuro
- Alternância entre Login/Registro
- Validação de campos obrigatórios
- Feedback visual para erros

---

## 3. Wireframe 2: Dashboard Principal

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

**Componentes:**
- Header fixo com logo e controles de usuário
- Sidebar de navegação com ícones
- Cards de estatísticas com números grandes
- Layout responsivo em grid

---

## 4. Wireframe 3: Lista de Feiras

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

**Características:**
- Grid responsivo de cards
- Botão de ação principal destacado
- Informações essenciais visíveis
- Indicadores visuais com emojis

---

## 5. Wireframe 4: Modal de Criação

```
┌─────────────────────────────────────────────────────────┐
│  [Modal Overlay - Fundo Escuro]                        │
│                                                         │
│    ┌─────────────────────────────────────────────┐     │
│    │  NOVA FEIRA                             [×] │     │
│    ├─────────────────────────────────────────────┤     │
│    │                                             │     │
│    │  Nome da Feira        Local                 │     │
│    │  [____________]       [____________]        │     │
│    │                                             │     │
│    │  Descrição                                  │     │
│    │  ┌─────────────────────────────────────┐   │     │
│    │  │                                     │   │     │
│    │  │                                     │   │     │
│    │  └─────────────────────────────────────┘   │     │
│    │                                             │     │
│    │  Data Início          Data Fim             │     │
│    │  [____________]       [____________]        │     │
│    │                                             │     │
│    │  Cidade               Estado               │     │
│    │  [____________]       [____________]        │     │
│    │                                             │     │
│    │                    [Cancelar] [Criar Feira]│     │
│    └─────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────┘
```

**Validações:**
- Campos obrigatórios marcados
- Layout em duas colunas para otimização
- Botões de ação bem definidos

---

## 6. Wireframe 5: Detalhes da Feira

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
│ │            │  expositores locais e produtos          │
│ │            │  artesanais únicos...                   │
│ │            │                                         │
│ │            │  ┌─── EXPOSITORES ──┐ ┌─── INGRESSOS ─┐ │
│ │            │  │                  │ │               │ │
│ │            │  │ • Artesanatos    │ │ [Emitir Novo] │ │
│ │            │  │   da Vovó        │ │               │ │
│ │            │  │ • Cerâmicas      │ │ #12345...     │ │
│ │            │  │   Bela Vista     │ │ 10/01/2025    │ │
│ │            │  │ • Madeiras       │ │               │ │
│ │            │  │   Rústicas       │ │ #67890...     │ │
│ │            │  │                  │ │ 10/01/2025    │ │
│ │            │  │ [+ Expositor]    │ │               │ │
│ │            │  └──────────────────┘ └───────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Seções:**
- Breadcrumb para navegação
- Informações principais destacadas
- Duas colunas para expositores e ingressos
- Ações contextuais por seção

---

## 7. Storyboard: Fluxo de Criação de Feira

### Cenário: Usuário quer criar uma nova feira

**Quadro 1:** Usuário na lista de feiras
```
[Lista de Feiras] → Usuário vê botão "Nova Feira"
```

**Quadro 2:** Clique no botão
```
[Botão Nova Feira] → Modal aparece com formulário
```

**Quadro 3:** Preenchimento
```
[Formulário] → Usuário preenche campos obrigatórios
```

**Quadro 4:** Validação
```
[Campos] → Sistema valida dados em tempo real
```

**Quadro 5:** Submissão
```
[Botão Criar] → Feira é criada e modal fecha
```

**Quadro 6:** Resultado
```
[Lista Atualizada] → Nova feira aparece na lista
```

---

## 8. Responsividade

### Desktop (> 1024px)
- Sidebar fixa visível
- Grid de 3 colunas para feiras
- Modais centralizados

### Tablet (768px - 1024px)  
- Sidebar colapsável
- Grid de 2 colunas
- Formulários em duas colunas

### Mobile (< 768px)
- Menu hambúrguer
- Lista em coluna única
- Formulários empilhados
- Modais em tela cheia

---

## 9. Sistema de Cores

```css
:root {
  --primary: #2563eb;      /* Azul principal */
  --success: #10b981;      /* Verde sucesso */
  --warning: #f59e0b;      /* Amarelo alerta */
  --error: #ef4444;        /* Vermelho erro */
  --gray-50: #f8fafc;      /* Fundo claro */
  --gray-900: #0f172a;     /* Texto escuro */
}
```

---

## 10. Componentes Reutilizáveis

### Botões
- `.btn-primary` - Ações principais
- `.btn-secondary` - Ações secundárias  
- `.btn-danger` - Ações destrutivas
- `.btn-sm` / `.btn-lg` - Variações de tamanho

### Cards
- `.card` - Container base
- `.feira-card` - Específico para feiras
- `.dashboard-card` - Cards de estatísticas

### Formulários
- `.form-group` - Agrupamento de campos
- `.form-label` - Labels padronizados
- `.form-input` - Campos de entrada
- `.form-actions` - Área de botões

---

## 11. Navegação e Fluxos

### Fluxo Principal (Não Autenticado)
```
Página Inicial → Lista Feiras → Detalhes → Login (se necessário)
```

### Fluxo Autenticado
```
Dashboard → Feiras → [Criar/Editar] → Expositores → Produtos → Ingressos
```

### Fluxo de Erro
```
Ação → Erro → Feedback Visual → Correção → Retry
```

---

## 12. Conclusão

Os wireframes apresentados estabelecem uma interface moderna e funcional para o Sistema de Gestão de Feiras, priorizando:

- **Usabilidade** através de padrões conhecidos
- **Responsividade** para diferentes dispositivos
- **Consistência visual** com sistema de design
- **Fluxos intuitivos** de navegação
- **Feedback adequado** para todas as ações

A implementação segue princípios de design centrado no usuário, garantindo uma experiência eficiente para gestão de feiras, expositores e produtos.

---

**Documento:** Wireframes e Interface  
**Data:** Janeiro 2025  
**Status:** Concluído