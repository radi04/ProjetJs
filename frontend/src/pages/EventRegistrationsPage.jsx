import React, { useState, useEffect } from 'react';
import './EventsPages.css';

const EventRegistrationsPage = ({ event }) => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate API call with mock data
    setTimeout(() => {
      const mockRegistrations = [
        { id: 1, name: "Jean Dupont", email: "jean.dupont@example.com", registrationDate: "2023-06-10" },
        { id: 2, name: "Marie Lambert", email: "marie.lambert@example.com", registrationDate: "2023-06-12" },
        { id: 3, name: "Pierre Martin", email: "pierre.martin@example.com", registrationDate: "2023-06-15" },
        { id: 4, name: "Sophie Bernard", email: "sophie.bernard@example.com", registrationDate: "2023-06-18" },
        { id: 5, name: "Lucie Petit", email: "lucie.petit@example.com", registrationDate: "2023-06-20" }
      ];
      setRegistrations(mockRegistrations);
      setLoading(false);
    }, 800);
  }, [event]);

  const filteredRegistrations = registrations.filter(reg =>
    reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="registrations-container">
      <h2>Inscrits pour: {event.title}</h2>
      <p className="event-info">Date: {new Date(event.date).toLocaleDateString()} | Lieu: {event.location}</p>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher un inscrit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loading">Chargement des inscriptions...</div>
      ) : (
        <div className="registrations-table-container">
          <table className="registrations-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Date d'inscription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRegistrations.map(registration => (
                <tr key={registration.id}>
                  <td>{registration.name}</td>
                  <td>{registration.email}</td>
                  <td>{new Date(registration.registrationDate).toLocaleDateString()}</td>
                  <td>
                    <button className="action-btn view-btn">Voir</button>
                    <button className="action-btn delete-btn">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EventRegistrationsPage;