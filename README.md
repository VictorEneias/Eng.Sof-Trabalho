# 🎪 Sistema de Gestão de Feiras

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.68+-green.svg)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org)
[![SQLite](https://img.shields.io/badge/SQLite-3+-lightgrey.svg)](https://sqlite.org)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 👥 Autores

- **Higor Roger de Freitas Santos** - 221006440
- **Victor Eneias Oliveira** - 221038364

**Trabalho realizado para a matéria:** Engenharia de Software CIC0105 Turma 01 2025.1

## 📋 Visão Geral

O **Sistema de Gestão de Feiras** é uma plataforma web completa desenvolvida para facilitar a organização, administração e participação em eventos comerciais do tipo feira. O sistema permite que organizadores criem e gerenciem eventos, expositores se cadastrem para participar apresentando seus produtos, e visitantes adquiram ingressos de acesso aos eventos.

### 🎯 Problema que Resolve

O sistema centraliza todas as operações relacionadas a feiras comerciais, resolvendo:

- **Para Organizadores**: Dificuldades para centralizar informações sobre eventos, controlar participantes e gerenciar ingressos
- **Para Expositores**: Processos manuais ou sistemas isolados para se cadastrar em eventos e apresentar produtos
- **Para Visitantes**: Falta de forma padronizada e digital de adquirir ingressos e conhecer previamente os expositores
- **Para Administração**: Carência de visibilidade integrada sobre todos os aspectos do evento

## ✨ Funcionalidades Principais

### 🔐 **Gestão de Usuários**
- Registro seguro com validação de email único
- Autenticação via JWT (60 minutos de validade)
- Criptografia de senhas com BCrypt

### 🎪 **Gestão de Feiras**
- Criação de eventos com informações completas
- Listagem pública de feiras disponíveis
- Edição/exclusão restrita aos organizadores

### 🏢 **Gestão de Expositores**
- Cadastro de expositores em feiras específicas
- Informações empresariais e de contato
- Controle de participação por evento

### 📦 **Gestão de Produtos**
- Catálogo digital de produtos por expositor
- Informações detalhadas com preços
- Controle de estoque e disponibilidade

### 🎫 **Gestão de Ingressos**
- Emissão de ingressos únicos (UUID)
- Controle de data de emissão
- Associação a usuários compradores

### 🔒 **Segurança e Autorização**
- Autenticação baseada em JWT
- Autorização por propriedade (id_criador)
- Proteção contra modificações não autorizadas

## 🏗️ Arquitetura Técnica

### Backend (API REST)
- **Framework**: FastAPI 0.68+
- **ORM**: SQLAlchemy
- **Banco de Dados**: SQLite
- **Autenticação**: JWT + BCrypt
- **Validação**: Pydantic Schemas
- **Documentação**: Swagger UI automático

### Frontend (SPA)
- **Framework**: JavaScript Vanilla + React
- **Gerenciamento de Estado**: LocalStorage
- **Requisições HTTP**: Fetch API
- **UI**: CSS3 + Flexbox/Grid
- **Responsividade**: Mobile-first

### Estrutura do Projeto
```
Eng.Sof-Trabalho/
├── 🗄️ Backend (FastAPI + SQLAlchemy)
│   ├── main.py              # Servidor principal
│   ├── models.py            # Modelos de dados
│   ├── schemas.py           # Validação Pydantic
│   ├── crud.py              # Operações CRUD
│   ├── auth.py              # Autenticação JWT
│   ├── database.py          # Configuração do banco
│   └── routers/             # Endpoints por módulo
│       ├── usuarios.py      # Gestão de usuários
│       ├── feiras.py        # Gestão de feiras
│       ├── expositores.py   # Gestão de expositores
│       ├── produtos.py      # Gestão de produtos
│       └── ingressos.py     # Gestão de ingressos
│
├── 🌐 Frontend (JavaScript)
│   ├── index.html           # Página principal
│   ├── app.js               # Aplicação principal
│   ├── api.js               # Configurações da API
│   ├── login.js             # Módulo de autenticação
│   ├── feiras.js            # Gestão de feiras
│   ├── expositores.js       # Gestão de expositores
│   ├── produtos.js          # Gestão de produtos
│   ├── ingressos.js         # Gestão de ingressos
│   └── styles/              # Estilos CSS
│       ├── base.css         # Estilos base
│       ├── components.css   # Componentes
│       └── layout.css       # Layout responsivo
│
├── 🧪 Testes
│   └── api_test.py          # Testes funcionais da API
│
├── 📚 Documentação LaTeX
│   ├── docs/
│   │   ├── visao_e_escopo.tex               # Documento de visão
│   │   ├── user_stories.tex                 # Histórias de usuário
│   │   ├── architecture_notebook.tex        # Arquitetura do sistema
│   │   ├── processo_gerenciamento.tex       # Processo Kanban
│   │   ├── requisitos_nao_funcionais.tex    # Requisitos não funcionais
│   │   ├── projeto_fisico_banco_dados.tex   # Projeto do banco
│   │   ├── projeto_interface_usuario.tex    # Projeto da interface
│   │   ├── infraestrutura_implantacao.tex   # Infraestrutura
│   │   ├── requirements.md                  # Especificações do trabalho
│   │   ├── diagrams/                        # Diagramas do sistema
│   │   ├── wireframes/                      # Wireframes da interface
│   │   └── pdf/                            # Documentos compilados
│   └── README.md                           # Este arquivo
│
└── 📦 Configuração
    └── requirements.txt     # Dependências Python
```

## 🚀 Instalação e Execução

### Pré-requisitos
- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)
- Navegador web moderno

### 1. Clone o Repositório
```bash
git clone <url-do-repositorio>
cd Eng.Sof-Trabalho
```

### 2. Instale as Dependências
```bash
pip install -r requirements.txt
```

### 3. Execute o Backend
```bash
# Terminal 1 - Na pasta raiz do projeto
python -m uvicorn main:app --reload --port 8000
```
✅ **Servidor rodando em:** `http://localhost:8000`

### 4. Execute o Frontend
```bash
# Terminal 2 - Na pasta frontend
cd frontend
python -m http.server 3000
```
✅ **Frontend disponível em:** `http://localhost:3000`

### 5. Teste o Sistema
```bash
# Terminal 3 - Na pasta raiz do projeto
python tests/api_test.py
```

## 📊 Exemplo de Uso

O script `tests/api_test.py` demonstra um fluxo completo:

1. **👤 Registro de usuário** (Maria Silva)
2. **🔐 Login** e obtenção de token JWT
3. **🎪 Criação de feira** (Feira de Artesanato 2025)
4. **🏢 Cadastro de expositor** (Artesanatos da Vovó)
5. **📦 Adição de produto** (Vaso de Cerâmica - R$ 45,90)
6. **🎫 Emissão de ingresso** (UUID único)
7. **📋 Verificação de dados** criados

### Dados de Exemplo Criados:
- **Usuário**: `maria@exemplo.com` / `senha123`
- **Feira**: Feira de Artesanato 2025 (São Paulo, SP)
- **Expositor**: Artesanatos da Vovó
- **Produto**: Vaso de Cerâmica (R$ 45,90)
- **Ingresso**: Gerado automaticamente

## 🌐 Uso do Frontend

### Opção 1: Servidor HTTP Simples
```bash
cd frontend
python -m http.server 3000
```
Acesse: `http://localhost:3000`

### Opção 2: Abrir Diretamente
1. Navegue até a pasta `frontend/`
2. Clique duas vezes no arquivo `index.html`

### Opção 3: VS Code Live Server
1. Instale a extensão "Live Server"
2. Clique direito em `index.html` → "Open with Live Server"

## 📱 Fluxos de Usuário

### 🎯 Como Organizador de Feira:
1. **Registrar-se** no sistema
2. **Fazer login** com suas credenciais
3. **Criar uma feira** com todas as informações
4. **Monitorar expositores** que se cadastram
5. **Visualizar ingressos** vendidos

### 🏪 Como Expositor:
1. **Registrar-se** no sistema
2. **Fazer login** com suas credenciais
3. **Visualizar feiras** disponíveis
4. **Cadastrar-se como expositor** em uma feira
5. **Adicionar produtos** ao seu catálogo

### 🎫 Como Visitante:
1. **Registrar-se** no sistema
2. **Visualizar feiras** disponíveis
3. **Conhecer expositores** e produtos
4. **Comprar ingressos** para as feiras
5. **Gerenciar seus ingressos**

## 🔗 URLs Importantes

| Serviço | URL | Descrição |
|---------|-----|-----------|
| 🗄️ **API Backend** | `http://localhost:8000` | Servidor principal |
| 📖 **Documentação** | `http://localhost:8000/docs` | Swagger UI interativo |
| 🌐 **Frontend** | `http://localhost:3000` | Interface do usuário |

## 🛠️ Solução de Problemas

### ❌ Erro de CORS
- Verifique se o backend está em `localhost:8000`
- Confirme as configurações de CORS no `main.py`

### ❌ Erro de Conexão
- Certifique-se de que o servidor backend está rodando
- Teste a API em `http://localhost:8000/docs`

### ❌ Problemas de Autenticação
- Tokens JWT expiram em 60 minutos
- Faça login novamente se necessário

### ❌ Dependências
```bash
# Se houver problemas, reinstale as dependências:
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

## 🧪 Testes

### Executar Exemplo Completo
```bash
python tests/api_test.py
```

### Testar API Manualmente
1. Acesse `http://localhost:8000/docs`
2. Use a interface Swagger para testar endpoints
3. Primeiro registre um usuário
4. Faça login para obter token
5. Use o token nas requisições autenticadas

## 📚 Documentação Técnica

### Documentos LaTeX (em `docs/`)
- **Visão e Escopo**: `visao_e_escopo.tex`
- **Histórias de Usuário**: `user_stories.tex`
- **Architecture Notebook**: `architecture_notebook.tex`
- **Processo de Gerenciamento**: `processo_gerenciamento.tex`
- **Requisitos Não Funcionais**: `requisitos_nao_funcionais.tex`
- **Projeto Físico do Banco**: `projeto_fisico_banco_dados.tex`
- **Projeto da Interface**: `projeto_interface_usuario.tex`
- **Infraestrutura de Implantação**: `infraestrutura_implantacao.tex`

### Documentação Online
- **API Documentation**: `http://localhost:8000/docs` (Swagger UI)
- **Redoc Documentation**: `http://localhost:8000/redoc`
