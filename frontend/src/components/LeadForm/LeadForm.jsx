import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import './LeadForm.css'

const LeadForm = ({ apiUrl = "http://localhost:8000/api/leads" }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    email: false,
  });

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Form validation
  const errors = {
    name: formData.name.trim() === "" ? "Nombre es requerido" : "",
    email:
      formData.email.trim() === ""
        ? "Email es requerido"
        : !validateEmail(formData.email)
        ? "Por favor ingresa un email válido"
        : "",
  };

  const isFormValid = Object.values(errors).every((x) => x === "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await axios.post(apiUrl, formData);
      setSuccess(true);
      setFormData({ name: "", email: "" });
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Hubo un problema al enviar tus datos. Inténtalo de nuevo más tarde.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-form-wrapper">
      <form
        onSubmit={handleSubmit}
        className={`lead-form ${success ? "success" : ""}`}
        id="lead-form"
      >
        {success ? (
          <div className="success-message">
            <h3>¡Gracias por suscribirte!</h3>
            <p>Te mantendremos informado con nuestras últimas novedades.</p>
          </div>
        ) : (
          <>
            <h3>Suscríbete para más información</h3>
            <p>Recibe nuestras últimas actualizaciones y promociones</p>

            {error && (
              <div className="error-message" role="alert">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                required
                aria-describedby={touched.name && errors.name ? "name-error" : null}
                className={touched.name && errors.name ? "error" : ""}
              />
              {touched.name && errors.name && (
                <span id="name-error" className="error-text">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                required
                aria-describedby={touched.email && errors.email ? "email-error" : null}
                className={touched.email && errors.email ? "error" : ""}
              />
              {touched.email && errors.email && (
                <span id="email-error" className="error-text">
                  {errors.email}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="submit-button"
            >
              {loading ? (
                <>
                  <span className="spinner" aria-hidden="true"></span>
                  <span className="sr-only">Enviando...</span>
                </>
              ) : (
                "Suscribirse"
              )}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

LeadForm.propTypes = {
  apiUrl: PropTypes.string,
};

export default LeadForm;