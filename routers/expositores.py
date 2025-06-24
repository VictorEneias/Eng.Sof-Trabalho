from fastapi import APIRouter, Depends, HTTPException, Header
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Expositor
from schemas import ExpositorCreate, ExpositorOut
from auth import verificar_token

router = APIRouter(prefix="/expositores", tags=["Expositores"])

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

@router.post("/", response_model=ExpositorOut)
def criar_expositor(expositor: ExpositorCreate, db: Session = Depends(get_db), usuario_id: int = Depends(get_usuario_id)):
    novo = Expositor(**expositor.dict(), id_criador=usuario_id)
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo

@router.get("/", response_model=list[ExpositorOut])
def listar_expositores(db: Session = Depends(get_db)):
    return db.query(Expositor).all()

@router.put("/{expositor_id}")
def editar_expositor(expositor_id: int, expositor: ExpositorCreate, db: Session = Depends(get_db), usuario_id: int = Depends(get_usuario_id)):
    e = db.query(Expositor).get(expositor_id)
    if not e or e.id_criador != usuario_id:
        raise HTTPException(status_code=403, detail="Sem permissão")
    for campo, valor in expositor.dict().items():
        setattr(e, campo, valor)
    db.commit()
    return {"msg": "Expositor atualizado"}

@router.delete("/{expositor_id}")
def excluir_expositor(expositor_id: int, db: Session = Depends(get_db), usuario_id: int = Depends(get_usuario_id)):
    e = db.query(Expositor).get(expositor_id)
    if not e or e.id_criador != usuario_id:
        raise HTTPException(status_code=403, detail="Sem permissão")
    db.delete(e)
    db.commit()
    return {"msg": "Expositor excluído"}
