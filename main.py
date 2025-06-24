from fastapi import FastAPI
from routers import usuarios, feiras, expositores, produtos, ingressos
from database import criar_db

app = FastAPI()

criar_db()

app.include_router(usuarios.router)
app.include_router(feiras.router)
app.include_router(expositores.router)
app.include_router(produtos.router)
app.include_router(ingressos.router)
