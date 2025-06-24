from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import usuarios, feiras, expositores, produtos, ingressos
from database import criar_db

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

criar_db()

app.include_router(usuarios.router)
app.include_router(feiras.router)
app.include_router(expositores.router)
app.include_router(produtos.router)
app.include_router(ingressos.router)
