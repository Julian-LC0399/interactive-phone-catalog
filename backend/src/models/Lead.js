const pool = require('../config/database');

class Lead {
  // Registrar nuevo lead
  static async create(name, email) {
    const [result] = await pool.query(
      'INSERT INTO leads (name, email) VALUES (?, ?)',
      [name, email]
    );
    return { id: result.insertId, name, email };
  }

  // Obtener todos los leads
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    return rows;
  }

  // Buscar por email
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM leads WHERE email = ?', [email]);
    return rows[0];
  }
}

module.exports = Lead;