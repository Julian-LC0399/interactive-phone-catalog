const pool = require('../config/db');

const leadController = {
  createLead: async (req, res) => {
    try {
      const { nombre, email, telefono, interes } = req.body;
      
      const [result] = await pool.query(
        `INSERT INTO leads (nombre, email, telefono, interes) 
         VALUES (?, ?, ?, ?)`,
        [nombre, email, telefono, interes]
      );
      
      res.status(201).json({
        id: result.insertId,
        nombre,
        email
      });
    } catch (error) {
      console.error('MySQL Error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  },

  getLeads: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM leads ORDER BY fecha_registro DESC');
      res.json(rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = leadController;