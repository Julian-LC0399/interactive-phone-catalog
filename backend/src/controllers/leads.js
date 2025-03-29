const Lead = require('../models/Lead');

const leadController = {
  // Crear un nuevo lead
  createLead: async (req, res) => {
    try {
      const { name, email, comment } = req.body;
      const newLead = await Lead.create(name, email, comment);
      res.status(201).json(newLead);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al crear el lead',
        details: error.message 
      });
    }
  },

  // Obtener todos los leads
  getAllLeads: async (req, res) => {
    try {
      const leads = await Lead.getAll();
      res.status(200).json(leads);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener los leads',
        details: error.message 
      });
    }
  },

  // Obtener un lead por ID
  getLeadById: async (req, res) => {
    try {
      const { id } = req.params;
      const lead = await Lead.getById(id);
      
      if (!lead) {
        return res.status(404).json({ error: 'Lead no encontrado' });
      }
      
      res.status(200).json(lead);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al obtener el lead',
        details: error.message 
      });
    }
  },

  // Actualizar un lead
  updateLead: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, comment } = req.body;
      
      const existingLead = await Lead.getById(id);
      if (!existingLead) {
        return res.status(404).json({ error: 'Lead no encontrado' });
      }
      
      const updatedLead = await Lead.update(id, name, email, comment);
      res.status(200).json(updatedLead);
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al actualizar el lead',
        details: error.message 
      });
    }
  },

  // Eliminar un lead
  deleteLead: async (req, res) => {
    try {
      const { id } = req.params;
      
      const existingLead = await Lead.getById(id);
      if (!existingLead) {
        return res.status(404).json({ error: 'Lead no encontrado' });
      }
      
      const isDeleted = await Lead.delete(id);
      if (isDeleted) {
        res.status(200).json({ message: 'Lead eliminado correctamente' });
      } else {
        res.status(500).json({ error: 'No se pudo eliminar el lead' });
      }
    } catch (error) {
      res.status(500).json({ 
        error: 'Error al eliminar el lead',
        details: error.message 
      });
    }
  }
};

module.exports = leadController;