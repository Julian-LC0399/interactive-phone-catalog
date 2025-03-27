import React, { useState } from "react";
import axios from "axios";

const LeadForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad del formulario

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Asegúrate de que la URL apunte a tu API
      await axios.post("http://localhost:8000/api/leads", { name, email });
      alert("Gracias por suscribirte!");
      setName("");
      setEmail("");
    } catch (err) {
      setError(
        "Hubo un problema al enviar tus datos. Inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-form-wrapper">
      <button className="lead-form-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "Cerrar formulario" : "Formulario de suscripción"}
      </button>
      {isOpen && (
        <form onSubmit={handleSubmit} className="lead-form">
          <h3>Suscríbete para más información</h3>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Nombre"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Suscribirse"}
          </button>
        </form>
      )}
    </div>
  );
};

export default LeadForm;