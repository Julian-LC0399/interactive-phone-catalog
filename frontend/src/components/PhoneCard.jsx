import React from "react";
import PropTypes from "prop-types";

const PhoneCard = ({ phone, onSelect }) => {
  return (
    <div className="phone-card">
      <h2 className="phone-model">{phone.model}</h2>
      <img className="phone-image" src={phone.image} alt={phone.model} />
      <button
        className="details-button"
        onClick={() => onSelect(phone)}
        aria-label={`Ver detalles de ${phone.model}`}
      >
        Ver Detalles
      </button>
    </div>
  );
};

// Validación de tipos
PhoneCard.propTypes = {
  phone: PropTypes.shape({
    model: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PhoneCard;
