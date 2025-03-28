import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <img src="/assets/tecno-logo.png" alt="TECNO Logo" />
        </Link>

        {/* Menú Desktop */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            <li>
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li>
              <Link to="/lead-form" className="nav-link">Suscribirse</Link>
            </li>
          </ul>
        </nav>

        {/* Botón Menú Mobile */}
        <button 
          className="mobile-menu-button" 
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Overlay y Menú Mobile */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} 
             onClick={closeMobileMenu}></div>

        <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <ul className="mobile-nav-list">
            <li>
              <Link to="/" className="nav-link" onClick={closeMobileMenu}>Inicio</Link>
            </li>
            <li>
              <Link to="/lead-form" className="nav-link" onClick={closeMobileMenu}>Suscribirse</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;