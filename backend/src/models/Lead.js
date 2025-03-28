const pool = require('../config/db');

class Lead {
  // Crear nuevo lead
  static async create(name, email, comment) {
    const [result] = await pool.query(
      'INSERT INTO leads (name, email, comment) VALUES (?, ?, ?)',
      [name, email, comment]
    );
    return { id: result.insertId, name, email, comment };
  }

  // Obtener todos los leads
  static async getAll() {
    const [rows] = await pool.query('SELECT * FROM leads ORDER BY created_at DESC');
    return rows;
  }

  // Obtener lead por ID
  static async getById(id) {
    const [rows] = await pool.query('SELECT * FROM leads WHERE id = ?', [id]);
    return rows[0];
  }

  // Actualizar lead
  static async update(id, name, email, comment) {
    await pool.query(
      'UPDATE leads SET name = ?, email = ?, comment = ? WHERE id = ?',
      [name, email, comment, id]
    );
    return { id, name, email, comment };
  }

  // Eliminar lead
  static async delete(id) {
    const [result] = await pool.query('DELETE FROM leads WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  // Buscar lead por email
  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM leads WHERE email = ?', [email]);
    return rows[0];
  }
}

module.exports = Lead;