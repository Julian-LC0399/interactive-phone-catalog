import React, { useState } from 'react';
import axios from 'axios';
import './LeadForm.css';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Configuración de axios para la URL base
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json'
    }
  });

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
    setIsLoading(true);
    
    // Validaciones
    if (!formData.name.trim()) {
      setError('El nombre es obligatorio');
      setIsLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('El email es obligatorio');
      setIsLoading(false);
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/leads', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        comment: formData.comment.trim()
      });
      
      if (response.status === 201) {
        setSubmitted(true);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.error || 
                         'Error al enviar el formulario. Por favor intenta nuevamente.';
      setError(errorMessage);
      console.error('Error submitting lead:', err);
    } finally {
      setIsLoading(false);
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
            setFormData({ name: '', email: '', comment: '' });
          }}
        >
          Enviar otro formulario
        </button>
      </div>
    );
  }

  return (
    <div className="lead-form-container">
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
            placeholder="Tu nombre completo"
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
            placeholder="tucorreo@ejemplo.com"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="comment">Comentario (opcional):</label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows="4"
            className="form-textarea"
            placeholder="Cuéntanos en qué podemos ayudarte..."
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;