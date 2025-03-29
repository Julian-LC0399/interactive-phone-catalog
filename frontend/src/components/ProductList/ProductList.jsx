import { useState, useEffect } from 'react';
import axios from 'axios';

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener lista de teléfonos desde la API
  useEffect(() => {
    const fetchPhones = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/phones');
        setPhones(response.data);
      } catch (err) {
        setError('Error al cargar los teléfonos. Por favor intenta más tarde.');
        console.error('Error fetching phones:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhones();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando lista de teléfonos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="phone-list-container">
      <h2>Catálogo de Teléfonos</h2>
      
      {phones.length === 0 ? (
        <p>No hay teléfonos disponibles en este momento.</p>
      ) : (
        <div className="phones-grid">
          {phones.map(phone => (
            <div key={phone.id} className="phone-card">
              {phone.image_url && (
                <img 
                  src={phone.image_url} 
                  alt={phone.model} 
                  className="phone-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                  }}
                />
              )}
              <div className="phone-details">
                <h3>{phone.model}</h3>
                <p className="phone-brand">{phone.brand}</p>
                <p className="phone-price">${phone.price.toFixed(2)}</p>
                {phone.specs && <p className="phone-specs">{phone.specs}</p>}
                <p className={`phone-stock ${phone.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {phone.stock > 0 ? `Disponibles: ${phone.stock}` : 'Agotado'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhoneList;