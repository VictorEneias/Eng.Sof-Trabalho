from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Ingresso
from schemas import IngressoCreate, IngressoOut
from auth import verificar_token
import uuid

router = APIRouter(prefix="/ingressos", tags=["Ingressos"])

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

@router.post("/", response_model=IngressoOut)
def criar_ingresso(ingresso: IngressoCreate, db: Session = Depends(get_db), usuario_id: int = Depends(get_usuario_id)):
    novo = Ingresso(
        **ingresso.dict(),
        numero=str(uuid.uuid4()),
        id_criador=usuario_id
    )
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo

@router.get("/", response_model=list[IngressoOut])
def listar_ingressos(db: Session = Depends(get_db)):
    return db.query(Ingresso).all()

@router.delete("/{ingresso_id}")
def excluir_ingresso(ingresso_id: int, db: Session = Depends(get_db), usuario_id: int = Depends(get_usuario_id)):
    i = db.query(Ingresso).get(ingresso_id)
    if not i or i.id_criador != usuario_id:
        raise HTTPException(status_code=403, detail="Sem permissão")
    db.delete(i)
    db.commit()
    return {"msg": "Ingresso excluído"}
