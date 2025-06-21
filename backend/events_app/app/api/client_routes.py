from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import (
    ClientCreate,
    ClientOut,
    ReservationCreate,
    ReservationOut,
    EventOut
)
from app.crud import client as client_crud

router = APIRouter()


# -------- MODIFIER INFORMATIONS PERSONNELLES --------
@router.put("/clients/{client_id}", response_model=ClientOut)
def update_client(client_id: int, client_data: ClientCreate, db: Session = Depends(get_db)):
    return client_crud.update_client(db, client_id, client_data)


# -------- S'INSCRIRE À UN ÉVÉNEMENT --------
@router.post("/reservations/", response_model=ReservationOut)
def reserver_event(data: ReservationCreate, db: Session = Depends(get_db)):
    return client_crud.inscrire_evenement(db, data)


# -------- AFFICHER TOUS LES ÉVÉNEMENTS --------
@router.get("/events/", response_model=list[EventOut])
def list_events(db: Session = Depends(get_db)):
    return client_crud.get_all_events(db)


# -------- DÉTAIL D'UN ÉVÉNEMENT --------
@router.get("/events/{event_id}", response_model=EventOut)
def event_detail(event_id: int, db: Session = Depends(get_db)):
    return client_crud.get_event_by_id(db, event_id)
