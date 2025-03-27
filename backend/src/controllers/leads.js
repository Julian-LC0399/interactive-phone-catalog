const Lead = require('../models/Lead');

// Ejemplo: Registrar lead desde un formulario
const registerLead = async (req, res) => {
  const { name, email } = req.body;

  try {
    // Validar email (opcional)
    if (!email.includes('@')) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const existingLead = await Lead.findByEmail(email);
    if (existingLead) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }

    const newLead = await Lead.create(name, email);
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el lead' });
  }
};