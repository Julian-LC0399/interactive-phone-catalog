import React, { useState, useEffect } from "react";
import axios from "axios";

const LeadForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [validModels, setValidModels] = useState([]); // Modelos disponibles
  const [suggestions, setSuggestions] = useState([]); // Sugerencias de autocompletado

  // Cargar modelos válidos al iniciar
  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/phones/models");
        setValidModels(response.data);
      } catch (err) {
        console.error("Error cargando modelos:", err);
      }
    };
    fetchModels();
  }, []);

  // Autocompletado
  const handleInterestChange = (e) => {
    const value = e.target.value;
    setInterest(value);
    
    if (value.length > 1) {
      const filtered = validModels.filter(model => 
        model.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validación rápida en frontend
    if (!validModels.includes(interest)) {
      setError("Por favor selecciona un modelo válido");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/leads", { 
        name, 
        email, 
        interest 
      });
      alert("¡Gracias por tu interés en el " + interest + "!");
      setName("");
      setEmail("");
      setInterest("");
      setSuggestions([]);
    } catch (err) {
      setError(
        err.response?.data?.error || 
        "Hubo un problema al enviar tus datos. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lead-form-wrapper">
      <button 
        className="lead-form-toggle" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Cerrar formulario" : "Quiero información"}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="lead-form">
          <h3>Recibe información exclusiva</h3>
          {error && <p className="error-message">{error}</p>}

          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="autocomplete">
            <input
              type="text"
              placeholder="Modelo que te interesa (ej: iPhone 15)"
              value={interest}
              onChange={handleInterestChange}
              required
            />
            {suggestions.length > 0 && (
              <ul className="suggestions">
                {suggestions.map((model, index) => (
                  <li key={index} onClick={() => {
                    setInterest(model);
                    setSuggestions([]);
                  }}>
                    {model}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar solicitud"}
          </button>
        </form>
      )}
    </div>
  );
};

export default LeadForm;