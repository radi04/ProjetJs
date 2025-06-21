from sqlalchemy.orm import Session
from app.models import Admin, Event, Client, Reservation
from app.schemas import AdminCreate, EventCreate
from fastapi import HTTPException


# -------- AJOUTER UN ADMIN --------
def create_admin(db: Session, admin_data: AdminCreate):
    admin = Admin(**admin_data.dict())
    db.add(admin)
    db.commit()
    db.refresh(admin)
    return admin


# -------- AJOUTER UN ÉVÉNEMENT --------
def create_event(db: Session, event_data: EventCreate):
    event = Event(**event_data.dict())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


# -------- MODIFIER UN ÉVÉNEMENT --------
def update_event(db: Session, event_id: int, event_data: EventCreate):
    event = db.query(Event).filter(Event.idEvent == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Événement non trouvé")

    for field, value in event_data.dict().items():
        setattr(event, field, value)

    db.commit()
    db.refresh(event)
    return event


# -------- AFFICHER TOUS LES ÉVÉNEMENTS --------
def get_all_events(db: Session):
    return db.query(Event).all()


# -------- VOIR LES CLIENTS INSCRITS À UN ÉVÉNEMENT --------
def get_clients_by_event(db: Session, event_id: int):
    reservations = db.query(Reservation).filter(Reservation.idEvent == event_id).all()
    
    if not reservations:
        raise HTTPException(status_code=404, detail="Aucun client inscrit ou événement inexistant")

    clients = [r.client for r in reservations]  # grâce à la relation SQLAlchemy
    return clients
