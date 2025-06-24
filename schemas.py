from pydantic import BaseModel
from typing import Optional
from datetime import date

class UsuarioBase(BaseModel):
    nome: str
    email: str

class UsuarioCreate(UsuarioBase):
    senha: str

class UsuarioOut(UsuarioBase):
    id: int
    class Config:
        orm_mode = True

class FeiraBase(BaseModel):
    nome: str
    descricao: str
    data_inicio: date
    data_fim: date
    local: str
    cidade: str
    estado: str

class FeiraCreate(FeiraBase):
    pass

class FeiraOut(FeiraBase):
    id: int
    id_criador: int
    class Config:
        orm_mode = True

class ExpositorBase(BaseModel):
    nome: str
    descricao: str
    contato: str
    feira_id: int

class ExpositorCreate(ExpositorBase):
    pass

class ExpositorOut(ExpositorBase):
    id: int
    id_criador: int
    class Config:
        orm_mode = True

class ProdutoBase(BaseModel):
    nome: str
    descricao: str
    preco: float
    expositor_id: int

class ProdutoCreate(ProdutoBase):
    pass

class ProdutoOut(ProdutoBase):
    id: int
    id_criador: int
    class Config:
        orm_mode = True

class IngressoBase(BaseModel):
    numero: str
    data_emissao: date
    feira_id: int

class IngressoCreate(IngressoBase):
    pass

class IngressoOut(IngressoBase):
    id: int
    id_criador: int
    class Config:
        orm_mode = True
