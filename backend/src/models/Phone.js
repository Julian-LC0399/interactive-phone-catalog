const pool = require('../config/db');

class Phone {
  // Crear un nuevo teléfono
  static async create(nombre, marca, precio) {
    const [result] = await pool.query(
      'INSERT INTO phones (name, brand, price) VALUES (?, ?, ?)',
      [nombre, marca, precio]
    );
    return { id: result.insertId, nombre, marca, precio };
  }

  // Obtener todos los teléfonos
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM phones ORDER BY name ASC');
    return rows;
  }

  // Obtener un teléfono por ID
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM phones WHERE id = ?', [id]);
    return rows[0];
  }

  // Actualizar un teléfono
  static async update(id, nombre, marca, precio) {
    await pool.query(
      'UPDATE phones SET name = ?, brand = ?, price = ? WHERE id = ?',
      [nombre, marca, precio, id]
    );
    return { id, nombre, marca, precio };
  }

  // Eliminar un teléfono
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM phones WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  // Buscar teléfonos por marca
  static async findByBrand(marca) {
    const [rows] = await pool.query('SELECT * FROM phones WHERE brand = ?', [marca]);
    return rows;
  }

  // Buscar teléfonos por rango de precio
  static async findByPriceRange(precioMin, precioMax) {
    const [rows] = await pool.query(
      'SELECT * FROM phones WHERE price BETWEEN ? AND ? ORDER BY price ASC',
      [precioMin, precioMax]
    );
    return rows;
  }
}

module.exports = Phone;