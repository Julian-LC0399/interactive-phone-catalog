import React from "react";
import PropTypes from "prop-types";
import PhoneCard from "./PhoneCard";

const PhoneCatalog = ({ phones, onSelect }) => {
  return (
    <div className="phone-catalog">
      <div className="phone-list">
        {phones.length > 0 ? (
          phones.map((phone) => (
            <PhoneCard key={phone.model} phone={phone} onSelect={onSelect} />
          ))
        ) : (
          <p>No hay teléfonos disponibles en este momento.</p>
        )}
      </div>
    </div>
  );
};

// Validación de tipos
PhoneCatalog.propTypes = {
  phones: PropTypes.arrayOf(
    PropTypes.shape({
      model: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.node.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default PhoneCatalog;
