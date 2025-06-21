import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
import "./AjouterEvents.css"

const AddEventPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    price: '',
    capacity: '',
    image: null,
    category: 'concert'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi au serveur
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Événement créé:', formData);
      setSuccessMessage('Événement créé avec succès !');
      
      // Réinitialisation après 2 secondes
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/view-events');
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la création:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-event-container">
      <h2>Ajouter un Nouvel Événement</h2>
      
      {successMessage ? (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-row">
            <div className="form-group">
              <label>Titre de l'événement*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Catégorie*</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="concert">Concert</option>
                <option value="workshop">Atelier</option>
                <option value="conference">Conférence</option>
                <option value="exhibition">Exposition</option>
                <option value="sport">Événement sportif</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Date*</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Heure*</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Lieu*</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Prix (en €)*</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Capacité (nombre de places)*</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Image de l'événement</label>
            <div className="file-upload">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.image && (
                <p className="file-name">{formData.image.name}</p>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label>Description*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="5"
              required
            />
          </div>
          
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/view-events')}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : 'Créer l\'événement'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddEventPage;