import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-badge">{product.isNew ? 'Nuevo' : 'Oferta'}</div>
      <div className="product-image">
        <img src={product.imageUrl || '/assets/phone-placeholder.png'} alt={product.model} />
        <div className="product-actions">
          <button className="action-btn wishlist-btn">
            <FiHeart />
          </button>
          <button className="action-btn cart-btn">
            <FiShoppingCart />
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.brand} {product.model}</h3>
        <div className="product-price">
          ${product.price}
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>
        <div className="product-specs">
          <span>{product.ram} RAM</span>
          <span>{product.storage} Almacenamiento</span>
        </div>
        <Link to={`/product/${product._id}`} className="view-details-btn">
          Ver detalles
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;