import React from "react";
import PropTypes from "prop-types";

const PhoneDetails = ({ phone, onClose }) => {
  return (
    <div className="phone-details-overlay" onClick={onClose}>
      <div
        className="phone-details"
        role="dialog"
        aria-labelledby="phone-details-title"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="close-button"
          onClick={onClose}
          aria-label="Cerrar"
        ></button>
        <h2 id="phone-details-title">{phone.model}</h2>
        <img src={phone.image} alt={phone.model} className="phone-image" />
        <div className="phone-description">{phone.description}</div>
        <p className="phone-price">
          Precio: <strong>${phone.price.toFixed(2)}</strong>
        </p>
        <button className="close-button" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

// Validación de tipos
PhoneDetails.propTypes = {
  phone: PropTypes.shape({
    model: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.node.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PhoneDetails;
