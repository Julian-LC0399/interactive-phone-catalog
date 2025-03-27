const pool = require('../config/db');

class Phone {
  // Obtener todos los modelos disponibles
  static async getAllModels() {
    const [rows] = await pool.query(
      'SELECT DISTINCT model FROM phones ORDER BY model ASC'
    );
    return rows.map(row => row.model);
  }

  // Verificar si un modelo existe
  static async modelExists(model) {
    const [rows] = await pool.query(
      'SELECT 1 FROM phones WHERE model = ? LIMIT 1',
      [model]
    );
    return rows.length > 0;
  }

  // Crear un nuevo modelo (para admin)
  static async create({ model, brand, price }) {
    const [result] = await pool.query(
      'INSERT INTO phones (model, brand, price) VALUES (?, ?, ?)',
      [model, brand, price]
    );
    return { id: result.insertId, model, brand, price };
  }

  // Obtener detalles completos de un modelo
  static async getByModel(model) {
    const [rows] = await pool.query(
      'SELECT * FROM phones WHERE model = ?',
      [model]
    );
    return rows[0];
  }
}

module.exports = Phone;