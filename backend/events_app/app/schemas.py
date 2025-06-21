from pydantic import BaseModel
from datetime import datetime


# ---------- Compte ----------
class CompteBase(BaseModel):
    email: str
    role: str

class CompteCreate(CompteBase):
    password: str

class CompteOut(CompteBase):
    idCompte: int

    class Config:
        orm_mode = True


# ---------- Admin ----------
class AdminBase(BaseModel):
    firstName: str
    lastName: str
    phoneNum: str
    address: str

class AdminCreate(AdminBase):
    idCompte: int

class AdminOut(AdminBase):
    idAdmin: int
    compte: CompteOut

    class Config:
        orm_mode = True


# ---------- Client ----------
class ClientBase(BaseModel):
    firstName: str
    lastName: str
    phoneNum: str
    address: str

class ClientCreate(ClientBase):
    idCompte: int

class ClientOut(ClientBase):
    idClient: int
    compte: CompteOut

    class Config:
        orm_mode = True


# ---------- Association ----------
class AssociationBase(BaseModel):
    name: str
    headquarter: str
    mainActivity: str

class AssociationCreate(AssociationBase):
    pass

class AssociationOut(AssociationBase):
    idAssociation: int

    class Config:
        orm_mode = True


# ---------- Event ----------
class EventBase(BaseModel):
    eventTitle: str
    description: str
    dateEvent: datetime
    idAssociation: int

class EventCreate(EventBase):
    pass

class EventOut(EventBase):
    idEvent: int

    class Config:
        orm_mode = True


# ---------- Reservation ----------
class ReservationBase(BaseModel):
    dateReservation: datetime
    idClient: int
    idEvent: int

class ReservationCreate(ReservationBase):
    pass

class ReservationOut(ReservationBase):
    idReservation: int

    class Config:
        orm_mode = True
