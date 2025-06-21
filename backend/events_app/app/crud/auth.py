from sqlalchemy.orm import Session
from app.models import Compte, Client, Admin
from app.schemas import CompteCreate
from fastapi import HTTPException
import hashlib


# Fonction utilitaire pour hasher les mots de passe
def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


# -------- SIGN UP --------
def create_account(db: Session, compte_data: CompteCreate):
    # Vérifie si l'email existe déjà
    existing = db.query(Compte).filter(Compte.email == compte_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email déjà utilisé")

    # Hasher le mot de passe
    hashed_pw = hash_password(compte_data.password)

    # Créer le compte
    new_compte = Compte(
        email=compte_data.email,
        password=hashed_pw,
        role=compte_data.role
    )
    db.add(new_compte)
    db.commit()
    db.refresh(new_compte)

    # Créer Client ou Admin selon le rôle
    if new_compte.role == "client":
        new_client = Client(
            firstName="",
            lastName="",
            phoneNum="",
            address="",
            idCompte=new_compte.idCompte
        )
        db.add(new_client)
    elif new_compte.role == "admin":
        new_admin = Admin(
            firstName="",
            lastName="",
            phoneNum="",
            address="",
            idCompte=new_compte.idCompte
        )
        db.add(new_admin)

    db.commit()
    return new_compte


# -------- SIGN IN --------
def login(db: Session, email: str, password: str):
    compte = db.query(Compte).filter(Compte.email == email).first()
    if not compte:
        raise HTTPException(status_code=404, detail="Email introuvable")

    if compte.password != hash_password(password):
        raise HTTPException(status_code=401, detail="Mot de passe incorrect")

    return compte
