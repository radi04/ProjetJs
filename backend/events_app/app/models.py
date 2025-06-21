from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base


class Compte(Base):
    __tablename__ = "comptes"

    idCompte = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False)

    admin = relationship("Admin", back_populates="compte", uselist=False)
    client = relationship("Client", back_populates="compte", uselist=False)


class Admin(Base):
    __tablename__ = "admins"

    idAdmin = Column(Integer, primary_key=True, index=True)
    firstName = Column(String(100))
    lastName = Column(String(100))
    phoneNum = Column(String(20))
    address = Column(String(255))
    idCompte = Column(Integer, ForeignKey("comptes.idCompte"))

    compte = relationship("Compte", back_populates="admin")


class Client(Base):
    __tablename__ = "clients"

    idClient = Column(Integer, primary_key=True, index=True)
    firstName = Column(String(100))
    lastName = Column(String(100))
    phoneNum = Column(String(20))
    address = Column(String(255))
    idCompte = Column(Integer, ForeignKey("comptes.idCompte"))

    compte = relationship("Compte", back_populates="client")
    reservations = relationship("Reservation", back_populates="client")


class Association(Base):
    __tablename__ = "associations"

    idAssociation = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    headquarter = Column(String(255))
    mainActivity = Column(String(255))

    events = relationship("Event", back_populates="association")


class Event(Base):
    __tablename__ = "events"

    idEvent = Column(Integer, primary_key=True, index=True)
    eventTitle = Column(String(255), nullable=False)
    description = Column(String(1000))
    dateEvent = Column(DateTime)
    idAssociation = Column(Integer, ForeignKey("associations.idAssociation"))

    association = relationship("Association", back_populates="events")
    reservations = relationship("Reservation", back_populates="event")


class Reservation(Base):
    __tablename__ = "reservations"

    idReservation = Column(Integer, primary_key=True, index=True)
    dateReservation = Column(DateTime)
    idClient = Column(Integer, ForeignKey("clients.idClient"))
    idEvent = Column(Integer, ForeignKey("events.idEvent"))

    client = relationship("Client", back_populates="reservations")
    event = relationship("Event", back_populates="reservations")
