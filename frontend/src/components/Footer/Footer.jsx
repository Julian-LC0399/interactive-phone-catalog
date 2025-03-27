import React from 'react';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>TECNO Mobile</h3>
          <p>Innovación y calidad en dispositivos móviles accesibles para todos.</p>
          <div className="social-links">
            <a href="https://facebook.com" aria-label="Facebook"><FiFacebook /></a>
            <a href="https://twitter.com" aria-label="Twitter"><FiTwitter /></a>
            <a href="https://instagram.com" aria-label="Instagram"><FiInstagram /></a>
            <a href="https://youtube.com" aria-label="YouTube"><FiYoutube /></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Productos</h4>
          <ul>
            <li><a href="/products">Todos los modelos</a></li>
            <li><a href="/products/camon">Serie CAMON</a></li>
            <li><a href="/products/spark">Serie SPARK</a></li>
            <li><a href="/products/phantom">Serie PHANTOM</a></li>
            <li><a href="/products/pova">Serie POVA</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Soporte</h4>
          <ul>
            <li><a href="/support">Centro de soporte</a></li>
            <li><a href="/warranty">Garantía</a></li>
            <li><a href="/contact">Contacto</a></li>
            <li><a href="/faq">Preguntas frecuentes</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="/privacy">Política de privacidad</a></li>
            <li><a href="/terms">Términos de servicio</a></li>
            <li><a href="/cookies">Política de cookies</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} TECNO Mobile. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;