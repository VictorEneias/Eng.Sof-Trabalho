from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Feira
from schemas import FeiraCreate, FeiraOut
from auth import verificar_token
from datetime import date

router = APIRouter(prefix="/feiras", tags=["Feiras"])

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

@router.post("/", response_model=FeiraOut)
def criar_feira(feira: FeiraCreate, db: Session = Depends(get_db), usuario_id: int = Depends(get_usuario_id)):
    nova_feira = Feira(**feira.dict(), id_criador=usuario_id)
    db.add(nova_feira)
    db.commit()
    db.refresh(nova_feira)
    return nova_feira

@router.get("/", response_model=list[FeiraOut])
def listar_feiras(db: Session = Depends(get_db)):
    return db.query(Feira).all()

@router.put("/{feira_id}")
def editar_feira(feira_id: int, feira: FeiraCreate, db: Session = Depends(get_db), usuario_id: int = Depends(get_usuario_id)):
    feira_db = db.query(Feira).get(feira_id)
    if not feira_db or feira_db.id_criador != usuario_id:
        raise HTTPException(status_code=403, detail="Sem permissão")
    for campo, valor in feira.dict().items():
        setattr(feira_db, campo, valor)
    db.commit()
    return {"msg": "Feira atualizada"}

@router.delete("/{feira_id}")
def excluir_feira(feira_id: int, db: Session = Depends(get_db), usuario_id: int = Depends(get_usuario_id)):
    feira = db.query(Feira).get(feira_id)
    if not feira or feira.id_criador != usuario_id:
        raise HTTPException(status_code=403, detail="Sem permissão")
    db.delete(feira)
    db.commit()
    return {"msg": "Feira excluída"}
