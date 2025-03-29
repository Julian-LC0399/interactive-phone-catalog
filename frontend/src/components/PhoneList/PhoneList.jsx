import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PhoneList.css';

// Importación de imágenes principales y por defecto
import iphoneImage from '../../assets/images/phones/iphone15.jpg';


const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapeo estático de imágenes para mejor rendimiento
  const staticImageMap = {
    'iPhone': iphoneImage
  };

  // Función mejorada para obtener imágenes
  const getPhoneImage = (phone) => {
    // Primero busca coincidencia exacta en el mapeo estático
    for (const [key, value] of Object.entries(staticImageMap)) {
      if (phone.name.includes(key) || phone.brand.includes(key)) {
        return value;
      }
    }

    // Intenta cargar imagen específica dinámicamente
    try {
      const modelSlug = phone.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]/g, '');
      return require(`../../assets/images/phones/models/${modelSlug}.jpg`).iphoneImage;
    } catch {
      return iphoneImage
    }
  };

  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/phones');
        setPhones(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  if (loading) return <div className="loading">Cargando teléfonos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="phone-list-container">
      <h1>Catálogo de Teléfonos</h1>
      
      <div className="phone-cards">
        {phones.map(phone => (
          <div key={phone.id} className="phone-card">
            <div className="phone-image">
              <img 
                src={getPhoneImage(phone)} 
                alt={`${phone.brand} ${phone.name}`}
                className="phone-img"
                onError={(e) => {
                  e.target.src = iphoneImage;
                }}
              />
            </div>
            <div className="phone-details">
              <h2>{phone.name}</h2>
              <p className="brand">{phone.brand}</p>
              <p className="price">${phone.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="stats">
        Mostrando {phones.length} dispositivos
      </div>
    </div>
  );
};

export default PhoneList;