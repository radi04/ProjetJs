from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import CompteCreate, CompteOut
from app.crud import auth
from app.database import SessionLocal


router = APIRouter()


@router.post("/signup", response_model=CompteOut)
def signup(compte: CompteCreate, db: Session = Depends(get_db)):
    return auth.create_account(db, compte)


@router.post("/signin", response_model=CompteOut)
def signin(email: str, password: str, db: Session = Depends(get_db)):
    return auth.login(db, email, password)
