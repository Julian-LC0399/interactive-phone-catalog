import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Datos mock definidos DENTRO del efecto
    const mockProducts = {
      1: { id: 1, name: 'iPhone 13', price: 999, description: 'El último iPhone' },
      2: { id: 2, name: 'Samsung Galaxy S22', price: 899, description: 'Flagship de Samsung' },
      3: { id: 3, name: 'Google Pixel 6', price: 799, description: 'El mejor Android' }
    };

    // Simulamos carga de datos
    setTimeout(() => {
      setProduct(mockProducts[id] || null);
    }, 500);
  }, [id]); // Solo 'id' como dependencia

  if (!product) return <div>Cargando producto...</div>;

  return (
    <div className="product-detail">
      <h2>{product.name}</h2>
      <p>Precio: ${product.price}</p>
      <p>Descripción: {product.description}</p>
    </div>
  );
};

export default ProductDetail;