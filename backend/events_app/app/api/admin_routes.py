from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.crud import admin as admin_crud
from app.schemas import AdminCreate, AdminOut, EventCreate, EventOut, ClientOut

router = APIRouter(prefix="/api/admin", tags=["Admin"])

# Dépendance pour la session DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------- AJOUTER UN ADMIN --------
@router.post("/add-admin", response_model=AdminOut)
def create_admin(admin_data: AdminCreate, db: Session = Depends(get_db)):
    return admin_crud.create_admin(db, admin_data)

# -------- AJOUTER UN ÉVÉNEMENT --------
@router.post("/events", response_model=EventOut)
def create_event(event_data: EventCreate, db: Session = Depends(get_db)):
    return admin_crud.create_event(db, event_data)

# -------- MODIFIER UN ÉVÉNEMENT --------
@router.put("/events/{event_id}", response_model=EventOut)
def update_event(event_id: int, event_data: EventCreate, db: Session = Depends(get_db)):
    return admin_crud.update_event(db, event_id, event_data)

# -------- AFFICHER TOUS LES ÉVÉNEMENTS --------
@router.get("/events", response_model=List[EventOut])
def get_all_events(db: Session = Depends(get_db)):
    return admin_crud.get_all_events(db)

# -------- VOIR LES CLIENTS INSCRITS À UN ÉVÉNEMENT --------
@router.get("/events/{event_id}/clients", response_model=List[ClientOut])
def get_clients_by_event(event_id: int, db: Session = Depends(get_db)):
    return admin_crud.get_clients_by_event(db, event_id)
