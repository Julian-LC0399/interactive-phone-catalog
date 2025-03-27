const pool = require('../config/db');

class Lead {
  // Crear nuevo lead
  static async create(name, email, interest) {
    const [result] = await pool.query(
      'INSERT INTO leads (name, email, interest) VALUES (?, ?, ?)',
      [name, email, interest]
    );
    return { id: result.insertId, name, email, interest };
  }

  // Obtener todos los leads
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    return rows;
  }

  // Buscar lead por email
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM leads WHERE email = ?', [email]);
    return rows[0];
  }
}

module.exports = Lead;