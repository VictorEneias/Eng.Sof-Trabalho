from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Produto
from schemas import ProdutoCreate, ProdutoOut
from auth import verificar_token

router = APIRouter(prefix="/produtos", tags=["Produtos"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_usuario_id(authorization: str = Header(...)):
    token = authorization.replace("Bearer ", "")
    usuario_id = verificar_token(token)
    if usuario_id is None:
        raise HTTPException(status_code=401, detail="Token inválido")
    return usuario_id

@router.post("/", response_model=ProdutoOut)
def criar_produto(produto: ProdutoCreate, db: Session = Depends(get_db), usuario_id: int = Depends(get_usuario_id)):
    novo = Produto(**produto.dict(), id_criador=usuario_id)
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo

@router.get("/", response_model=list[ProdutoOut])
def listar_produtos(db: Session = Depends(get_db)):
    return db.query(Produto).all()

@router.get("/{produto_id}", response_model=ProdutoOut)
def obter_produto(produto_id: int, db: Session = Depends(get_db)):
    p = db.query(Produto).get(produto_id)
    if not p:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return p

@router.put("/{produto_id}")
def editar_produto(produto_id: int, produto: ProdutoCreate, db: Session = Depends(get_db), usuario_id: int = Depends(get_usuario_id)):
    p = db.query(Produto).get(produto_id)
    if not p or p.id_criador != usuario_id:
        raise HTTPException(status_code=403, detail="Sem permissão")
    for campo, valor in produto.dict().items():
        setattr(p, campo, valor)
    db.commit()
    return {"msg": "Produto atualizado"}

@router.delete("/{produto_id}")
def excluir_produto(produto_id: int, db: Session = Depends(get_db), usuario_id: int = Depends(get_usuario_id)):
    p = db.query(Produto).get(produto_id)
    if not p or p.id_criador != usuario_id:
        raise HTTPException(status_code=403, detail="Sem permissão")
    db.delete(p)
    db.commit()
    return {"msg": "Produto excluído"}
