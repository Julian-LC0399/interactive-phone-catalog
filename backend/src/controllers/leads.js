const Lead = require('../models/Lead');

// Crear un nuevo lead
exports.createLead = async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    const newLead = await Lead.create(name, email, comment);
    res.status(201).json(newLead);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el lead', error: error.message });
  }
};

// Obtener todos los leads
exports.getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.getAll();
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los leads', error: error.message });
  }
};

// Obtener un lead por ID
exports.getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.getById(id);
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead no encontrado' });
    }
    
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el lead', error: error.message });
  }
};

// Actualizar un lead
exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, comment } = req.body;
    
    const existingLead = await Lead.getById(id);
    if (!existingLead) {
      return res.status(404).json({ message: 'Lead no encontrado' });
    }
    
    const updatedLead = await Lead.update(id, name, email, comment);
    res.status(200).json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el lead', error: error.message });
  }
};

// Eliminar un lead
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const existingLead = await Lead.getById(id);
    
    if (!existingLead) {
      return res.status(404).json({ message: 'Lead no encontrado' });
    }
    
    const isDeleted = await Lead.delete(id);
    if (isDeleted) {
      res.status(200).json({ message: 'Lead eliminado correctamente' });
    } else {
      res.status(500).json({ message: 'No se pudo eliminar el lead' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el lead', error: error.message });
  }
};