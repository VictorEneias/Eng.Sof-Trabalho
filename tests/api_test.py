"""
Exemplo Simples - Sistema de Gestão de Feiras
Este script demonstra o uso básico de todas as funcionalidades do sistema.
"""

import requests
from datetime import date

# Configuração
BASE_URL = "http://localhost:8000"

def exemplo_completo():
    print("🎪 Teste de API - Sistema de Gestão de Feiras")
    print("=" * 55)
    
    # 1. Registrar usuário
    print("\n1. 👤 Registrando usuário...")
    usuario = {
        "nome": "Maria Silva",
        "email": "maria@exemplo.com",
        "senha": "senha123"
    }
    
    response = requests.post(f"{BASE_URL}/usuarios/registrar", json=usuario)
    if response.status_code == 200:
        user_data = response.json()
        print(f"✅ Usuário criado: {user_data['nome']} (ID: {user_data['id']})")
    else:
        print(f"❌ Erro: {response.status_code}")
        return
    
    # 2. Fazer login
    print("\n2. 🔐 Fazendo login...")
    login = {
        "email": "maria@exemplo.com",
        "senha": "senha123"
    }
    
    response = requests.post(f"{BASE_URL}/usuarios/login", json=login)
    if response.status_code == 200:
        token = response.json()['access_token']
        headers = {"Authorization": f"Bearer {token}"}
        print("✅ Login realizado com sucesso!")
    else:
        print(f"❌ Erro no login: {response.status_code}")
        return
    
    # 3. Criar feira
    print("\n3. 🎪 Criando feira...")
    feira = {
        "nome": "Feira de Artesanato 2025",
        "descricao": "Feira anual de artesanato local",
        "data_inicio": "2025-08-10",
        "data_fim": "2025-08-12",
        "local": "Praça Central",
        "cidade": "São Paulo",
        "estado": "SP"
    }
    
    response = requests.post(f"{BASE_URL}/feiras/", json=feira, headers=headers)
    if response.status_code == 200:
        feira_data = response.json()
        feira_id = feira_data['id']
        print(f"✅ Feira criada: {feira_data['nome']} (ID: {feira_id})")
    else:
        print(f"❌ Erro ao criar feira: {response.status_code}")
        return
    
    # 4. Cadastrar expositor
    print("\n4. 🏢 Cadastrando expositor...")
    expositor = {
        "nome": "Artesanatos da Vovó",
        "descricao": "Produtos artesanais feitos à mão",
        "contato": "contato@artesanatosdavovo.com",
        "feira_id": feira_id
    }
    
    response = requests.post(f"{BASE_URL}/expositores/", json=expositor, headers=headers)
    if response.status_code == 200:
        expositor_data = response.json()
        expositor_id = expositor_data['id']
        print(f"✅ Expositor cadastrado: {expositor_data['nome']} (ID: {expositor_id})")
    else:
        print(f"❌ Erro ao cadastrar expositor: {response.status_code}")
        return
    
    # 5. Adicionar produto
    print("\n5. 📦 Adicionando produto...")
    produto = {
        "nome": "Vaso de Cerâmica",
        "descricao": "Vaso decorativo feito em cerâmica artesanal",
        "preco": 45.90,
        "expositor_id": expositor_id
    }
    
    response = requests.post(f"{BASE_URL}/produtos/", json=produto, headers=headers)
    if response.status_code == 200:
        produto_data = response.json()
        print(f"✅ Produto adicionado: {produto_data['nome']} - R$ {produto_data['preco']:.2f}")
    else:
        print(f"❌ Erro ao adicionar produto: {response.status_code}")
    
    # 6. Emitir ingresso
    print("\n6. 🎫 Emitindo ingresso...")
    ingresso = {
        "data_emissao": str(date.today()),
        "feira_id": feira_id
    }
    
    response = requests.post(f"{BASE_URL}/ingressos/", json=ingresso, headers=headers)
    if response.status_code == 200:
        ingresso_data = response.json()
        print(f"✅ Ingresso emitido: {ingresso_data['numero'][:8]}...")
    else:
        print(f"❌ Erro ao emitir ingresso: {response.status_code}")
    
    # 7. Verificar dados
    print("\n7. 📊 Verificando dados do sistema...")
    
    # Listar feiras
    response = requests.get(f"{BASE_URL}/feiras/")
    feiras = response.json()
    print(f"   📋 Feiras cadastradas: {len(feiras)}")
    
    # Listar expositores
    response = requests.get(f"{BASE_URL}/expositores/")
    expositores = response.json()
    print(f"   🏢 Expositores: {len(expositores)}")
    
    # Listar produtos
    response = requests.get(f"{BASE_URL}/produtos/")
    produtos = response.json()
    print(f"   📦 Produtos: {len(produtos)}")
    
    # Listar ingressos
    response = requests.get(f"{BASE_URL}/ingressos/")
    ingressos = response.json()
    print(f"   🎫 Ingressos: {len(ingressos)}")
    
    print("\n" + "=" * 55)
    print("🎉 TESTE CONCLUÍDO COM SUCESSO!")
    print("💡 Dados criados:")
    print("   • 1 usuário (Maria Silva)")
    print("   • 1 feira (Feira de Artesanato 2025)")
    print("   • 1 expositor (Artesanatos da Vovó)")
    print("   • 1 produto (Vaso de Cerâmica - R$ 45,90)")
    print("   • 1 ingresso")
    print("\n🌐 Acesse http://localhost:8000/docs para explorar a API")

if __name__ == "__main__":
    try:
        exemplo_completo()
    except requests.exceptions.ConnectionError:
        print("❌ ERRO: Servidor não está rodando!")
        print("💡 Execute primeiro: python -m uvicorn main:app --reload")
    except Exception as e:
        print(f"❌ Erro inesperado: {e}") 