from sqlalchemy import Column, Integer, String, ForeignKey, Float, Date
from sqlalchemy.orm import relationship
from database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    email = Column(String, unique=True, index=True)
    senha = Column(String)

class Feira(Base):
    __tablename__ = "feiras"
    id = Column(Integer, primary_key=True)
    nome = Column(String)
    descricao = Column(String)
    data_inicio = Column(Date)
    data_fim = Column(Date)
    local = Column(String)
    cidade = Column(String)
    estado = Column(String)
    id_criador = Column(Integer, ForeignKey("usuarios.id"))

class Expositor(Base):
    __tablename__ = "expositores"
    id = Column(Integer, primary_key=True)
    nome = Column(String)
    descricao = Column(String)
    contato = Column(String)
    feira_id = Column(Integer, ForeignKey("feiras.id"))
    id_criador = Column(Integer, ForeignKey("usuarios.id"))

class Produto(Base):
    __tablename__ = "produtos"
    id = Column(Integer, primary_key=True)
    nome = Column(String)
    descricao = Column(String)
    preco = Column(Float)
    expositor_id = Column(Integer, ForeignKey("expositores.id"))
    id_criador = Column(Integer, ForeignKey("usuarios.id"))

class Ingresso(Base):
    __tablename__ = "ingressos"
    id = Column(Integer, primary_key=True)
    numero = Column(String)  # UUID
    data_emissao = Column(Date)
    nome_feira = Column(String)
    feira_id = Column(Integer, ForeignKey("feiras.id"))
    id_criador = Column(Integer, ForeignKey("usuarios.id"))
