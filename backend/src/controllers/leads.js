const Lead = require('../models/Lead');

// Crear lead
exports.createLead = async (req, res) => {
  try {
    const { name, email, interest } = req.body;

    // Validación básica
    if (!name || !email || !interest) {
      return res.status(400).json({ error: 'Nombre, email e interés son requeridos' });
    }

    // Verificar si el email ya existe
    const existingLead = await Lead.findByEmail(email);
    if (existingLead) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    // Crear el lead
    const newLead = await Lead.create(name, email, interest);
    res.status(201).json(newLead);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todos los leads
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.getAll();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};