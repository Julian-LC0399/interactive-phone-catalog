import { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Datos mock definidos DENTRO del efecto
    const mockProducts = [
      { id: 1, name: 'iPhone 13', price: 999 },
      { id: 2, name: 'Samsung Galaxy S22', price: 899 },
      { id: 3, name: 'Google Pixel 6', price: 799 }
    ];

    // Simulamos carga de datos
    setTimeout(() => {
      setProducts(mockProducts);
    }, 500);
  }, []); // Ahora el array de dependencias está vacío correctamente

  return (
    <div className="product-list">
      <h2>Nuestros Productos</h2>
      {products.length === 0 ? (
        <p>Cargando productos...</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>Precio: ${product.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;