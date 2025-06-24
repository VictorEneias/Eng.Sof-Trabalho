from datetime import datetime, timedelta
from jose import JWTError, jwt

SECRET_KEY = "segredo-supersecreto"
ALGORITHM = "HS256"
EXPIRE_MINUTES = 60

def criar_token(usuario_id: int):
    exp = datetime.utcnow() + timedelta(minutes=EXPIRE_MINUTES)
    dados = {"sub": str(usuario_id), "exp": exp}
    return jwt.encode(dados, SECRET_KEY, algorithm=ALGORITHM)

def verificar_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return int(payload.get("sub"))
    except JWTError:
        return None
