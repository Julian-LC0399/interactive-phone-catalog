import React, { useState } from 'react';
import axios from 'axios';
import './LeadForm.css'; // Importamos el CSS

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.email) {
      setError('Nombre y email son campos obligatorios');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    try {
      const response = await axios.post('/api/leads', formData);
      if (response.data) {
        setSubmitted(true);
      }
    } catch (err) {
      setError('Ocurrió un error al enviar el formulario. Por favor intenta nuevamente.');
      console.error('Error submitting lead:', err);
    }
  };

  if (submitted) {
    return (
      <div className="success-message">
        <h2>¡Gracias por contactarnos!</h2>
        <p>Hemos recibido tu información y nos pondremos en contacto contigo pronto.</p>
        <button 
          className="success-button"
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', interest: '' });
          }}
        >
          Enviar otro formulario
        </button>
      </div>
    );
  }

  return (
    <div className="lead-form-container dark-theme">
      <h2>Déjanos tus datos</h2>
      <p className="subtitle">Nos pondremos en contacto contigo a la brevedad.</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="interest">¿En qué estás interesado? (opcional):</label>
          <textarea
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            rows="4"
            className="form-textarea"
            placeholder="Cuéntanos qué te interesa o en qué podemos ayudarte..."
          />
        </div>
        
        <button type="submit" className="submit-button">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default LeadForm;