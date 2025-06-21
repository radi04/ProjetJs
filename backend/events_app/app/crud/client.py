from sqlalchemy.orm import Session
from app.models import Client, Reservation, Event
from app.schemas import ClientCreate, ReservationCreate
from fastapi import HTTPException
from datetime import datetime


# -------- MODIFIER INFOS CLIENT --------
def update_client(db: Session, client_id: int, updated_data: ClientCreate):
    client = db.query(Client).filter(Client.idClient == client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client non trouvé")

    for field, value in updated_data.dict().items():
        setattr(client, field, value)

    db.commit()
    db.refresh(client)
    return client


# -------- S'INSCRIRE À UN ÉVÉNEMENT --------
def inscrire_evenement(db: Session, data: ReservationCreate):
    client = db.query(Client).filter(Client.idClient == data.idClient).first()
    if not client:
        raise HTTPException(status_code=404, detail="Client introuvable")

    event = db.query(Event).filter(Event.idEvent == data.idEvent).first()
    if not event:
        raise HTTPException(status_code=404, detail="Événement introuvable")

    existing = db.query(Reservation).filter(
        Reservation.idClient == data.idClient,
        Reservation.idEvent == data.idEvent
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Déjà inscrit à cet événement")

    reservation = Reservation(
        dateReservation=data.dateReservation or datetime.now(),
        idClient=data.idClient,
        idEvent=data.idEvent
    )
    db.add(reservation)
    db.commit()
    db.refresh(reservation)
    return reservation


# -------- AFFICHER TOUS LES ÉVÉNEMENTS --------
def get_all_events(db: Session):
    return db.query(Event).all()


# -------- DÉTAILS D'UN ÉVÉNEMENT --------
def get_event_by_id(db: Session, event_id: int):
    event = db.query(Event).filter(Event.idEvent == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Événement non trouvé")
    return event
