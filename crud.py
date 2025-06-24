from sqlalchemy.orm import Session
from models import Usuario
from schemas import UsuarioCreate
from passlib.hash import bcrypt

def criar_usuario(db: Session, usuario: UsuarioCreate):
    db_usuario = Usuario(
        nome=usuario.nome,
        email=usuario.email,
        senha=bcrypt.hash(usuario.senha)
    )
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

def autenticar_usuario(db: Session, email: str, senha: str):
    usuario = db.query(Usuario).filter(Usuario.email == email).first()
    if usuario and bcrypt.verify(senha, usuario.senha):
        return usuario
    return None
