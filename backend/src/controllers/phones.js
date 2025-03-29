const Phone = require('../models/phone');

const phoneController = {
  // Crear un nuevo teléfono
  createPhone: async (req, res) => {
    try {
      const { nombre, marca, precio } = req.body;
      const newPhone = await Phone.create(nombre, marca, precio);
      res.status(201).json(newPhone);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el teléfono' });
    }
  },

  // Obtener todos los teléfonos
  getAllPhones: async (req, res) => {
    try {
      const phones = await Phone.getAll();
      res.status(200).json(phones);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los teléfonos' });
    }
  },

  // Obtener un teléfono por ID
  getPhoneById: async (req, res) => {
    try {
      const { id } = req.params;
      const phone = await Phone.getById(id);
      
      if (!phone) {
        return res.status(404).json({ error: 'Teléfono no encontrado' });
      }
      
      res.status(200).json(phone);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el teléfono' });
    }
  },

  // Actualizar un teléfono
  updatePhone: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, marca, precio } = req.body;
      
      const existingPhone = await Phone.getById(id);
      if (!existingPhone) {
        return res.status(404).json({ error: 'Teléfono no encontrado' });
      }
      
      const updatedPhone = await Phone.update(id, nombre, marca, precio);
      res.status(200).json(updatedPhone);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el teléfono' });
    }
  },

  // Eliminar un teléfono
  deletePhone: async (req, res) => {
    try {
      const { id } = req.params;
      
      const existingPhone = await Phone.getById(id);
      if (!existingPhone) {
        return res.status(404).json({ error: 'Teléfono no encontrado' });
      }
      
      const deleted = await Phone.delete(id);
      if (deleted) {
        res.status(200).json({ message: 'Teléfono eliminado correctamente' });
      } else {
        res.status(500).json({ error: 'No se pudo eliminar el teléfono' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el teléfono' });
    }
  },

  // Buscar teléfonos por marca
  getPhonesByBrand: async (req, res) => {
    try {
      const { marca } = req.params;
      const phones = await Phone.findByBrand(marca);
      
      if (phones.length === 0) {
        return res.status(404).json({ message: 'No se encontraron teléfonos de esta marca' });
      }
      
      res.status(200).json(phones);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar teléfonos por marca' });
    }
  },

  // Buscar teléfonos por rango de precio
  getPhonesByPriceRange: async (req, res) => {
    try {
      const { min, max } = req.params;
      const phones = await Phone.findByPriceRange(min, max);
      
      if (phones.length === 0) {
        return res.status(404).json({ message: 'No se encontraron teléfonos en este rango de precios' });
      }
      
      res.status(200).json(phones);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar teléfonos por rango de precio' });
    }
  }
};

module.exports = phoneController;