import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiX, FiSend } from 'react-icons/fi';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [suggestions] = useState([
    "¿Qué modelos tienen disponible?",
    "¿Cuál es el precio del CAMON 20 Pro?",
    "¿Dónde puedo comprar un TECNO?",
    "¿Tienen servicio técnico?"
  ]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Mensaje inicial del bot
      setTimeout(() => {
        setMessages([{
          text: "¡Hola! Soy tu asistente virtual de TECNO. ¿En qué puedo ayudarte hoy?",
          sender: 'bot'
        }]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Agregar mensaje del usuario
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simular respuesta del bot
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Gracias por tu mensaje. Un asesor te contactará pronto con información detallada.",
        sender: 'bot'
      }]);
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  return (
    <>
      <button 
        className={`chatbot-toggle ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
      >
        <FiMessageSquare />
        <span>Asistencia</span>
      </button>
      
      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <h3>Asistente TECNO</h3>
            <button onClick={() => setIsOpen(false)}>
              <FiX />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          
          {messages.length === 0 && (
            <div className="chatbot-suggestions">
              <h4>Puedes preguntarme sobre:</h4>
              {suggestions.map((suggestion, i) => (
                <button 
                  key={i} 
                  className="suggestion-btn"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button onClick={handleSend}>
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;