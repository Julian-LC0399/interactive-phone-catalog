import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';
import './LeadForm.css';

const LeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.name || !formData.email) {
      setError('Nombre y correo electrónico son requeridos');
      return;
    }

    try {
      // Simulación del envío sin necesidad de la API
      console.log('Datos enviados:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', interest: '' });
    } catch (err) {
      setError('Error al procesar el formulario');
      console.error(err);
    }
  };

  if (submitted) {
    return (
      <div className="success-message">
        <h3>¡Gracias por tu interés!</h3>
        <p>Nos pondremos en contacto contigo pronto.</p>
      </div>
    );
  }

  return (
    <div className="lead-form-container">
      <h2>¿Interesado en nuestros productos?</h2>
      <p>Déjanos tus datos y te contactaremos.</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">
            <FiUser /> Nombre completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">
            <FiMail /> Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">
            <FiPhone /> Teléfono (opcional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="interest">Modelo de interés</label>
          <select
            id="interest"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
          >
            <option value="">Selecciona un modelo</option>
            <option value="CAMON 20 Pro">CAMON 20 Pro</option>
            <option value="SPARK 10 Pro">SPARK 10 Pro</option>
            <option value="PHANTOM X2">PHANTOM X2</option>
            <option value="POVA 5 Pro">POVA 5 Pro</option>
          </select>
        </div>
        
        <button type="submit" className="submit-btn">
          Enviar información
        </button>
      </form>
    </div>
  );
};

export default LeadForm;