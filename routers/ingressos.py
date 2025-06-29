from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Ingresso, Feira
from schemas import IngressoCreate, IngressoOut
from auth import verificar_token
import uuid
from datetime import date

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
    feira = db.query(Feira).get(ingresso.feira_id)
    if not feira:
        raise HTTPException(status_code=404, detail="Feira não encontrada")
    novo = Ingresso(
        feira_id=ingresso.feira_id,
        data_emissao=ingresso.data_emissao or date.today(),
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
