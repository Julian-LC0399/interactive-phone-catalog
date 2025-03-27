import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/api';
import { FiShoppingCart, FiHeart, FiShare2 } from 'react-icons/fi';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError('Error al cargar el producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <div className="product-detail-container">
      <div className="product-gallery">
        <div className="main-image">
          <img 
            src={product.images?.[selectedImage] || product.imageUrl || '/assets/phone-placeholder.png'} 
            alt={product.model} 
          />
        </div>
        <div className="thumbnail-container">
          {product.images?.map((img, index) => (
            <div 
              key={index} 
              className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={img} alt={`Vista ${index + 1} de ${product.model}`} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="product-info">
        <h1>{product.brand} {product.model}</h1>
        <div className="product-meta">
          <span className="rating">★★★★☆ (24)</span>
          <span className="sku">SKU: {product.sku || 'N/A'}</span>
        </div>
        
        <div className="price-container">
          <span className="current-price">${product.price}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
          {product.discount && (
            <span className="discount">-{product.discount}%</span>
          )}
        </div>
        
        <div className="product-actions">
          <button className="add-to-cart">
            <FiShoppingCart /> Añadir al carrito
          </button>
          <button className="wishlist">
            <FiHeart /> Lista de deseos
          </button>
          <button className="share">
            <FiShare2 /> Compartir
          </button>
        </div>
        
        <div className="product-specs">
          <h3>Especificaciones</h3>
          <ul>
            <li><strong>Pantalla:</strong> {product.screenSize || 'N/A'}</li>
            <li><strong>Procesador:</strong> {product.processor || 'N/A'}</li>
            <li><strong>RAM:</strong> {product.ram || 'N/A'}</li>
            <li><strong>Almacenamiento:</strong> {product.storage || 'N/A'}</li>
            <li><strong>Cámara:</strong> {product.camera || 'N/A'}</li>
            <li><strong>Batería:</strong> {product.battery || 'N/A'}</li>
            <li><strong>Sistema Operativo:</strong> {product.os || 'N/A'}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;