import React, { useState, useEffect } from 'react';
import './EventsPages.css';
import EventRegistrationsPage from './EventRegistrationsPage';
const ViewEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvents([
        {
          id: 1,
          title: "Concert d'été",
          date: "2023-07-15",
          location: "Parc Central",
          description: "Concert en plein air avec plusieurs artistes locaux",
          capacity: 500,
          registered: 327
        },
        {
          id: 2,
          title: "Atelier Culinaire",
          date: "2023-08-02",
          location: "Cuisine du Chef",
          description: "Apprenez à préparer des plats méditerranéens",
          capacity: 20,
          registered: 18
        },
        {
          id: 3,
          title: "Conférence Technologie",
          date: "2023-09-10",
          location: "Centre des Congrès",
          description: "Les dernières tendances en technologie et innovation",
          capacity: 200,
          registered: 145
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewRegistrations = (event) => {
    setSelectedEvent(event);
  };

  if (selectedEvent) {
    return (
      <div className="page-container">
        <button onClick={() => setSelectedEvent(null)} className="back-button">
          &larr; Retour aux événements
        </button>
        <EventRegistrationsPage event={selectedEvent} />
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2>Liste des Événements</h2>
      
      {loading ? (
        <div className="loading">Chargement...</div>
      ) : (
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <h3>{event.title}</h3>
              <div className="event-details">
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Lieu:</strong> {event.location}</p>
                <p><strong>Description:</strong> {event.description}</p>
                <p><strong>Inscriptions:</strong> {event.registered}/{event.capacity}</p>
              </div>
              <button 
                onClick={() => handleViewRegistrations(event)}
                className="view-registrations-btn"
              >
                Voir les inscrits
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewEventsPage;