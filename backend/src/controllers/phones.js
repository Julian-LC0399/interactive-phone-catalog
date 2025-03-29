const Phone = require('../models/Phone');

// Obtener todos los teléfonos
exports.getAllPhones = async (req, res) => {
  try {
    const phones = await Phone.getAll();
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los teléfonos' });
  }
};

// Crear nuevo teléfono
exports.createPhone = async (req, res) => {
  try {
    const { model, brand, price, specs, image_url } = req.body;
    
    if (!model || !brand || !price) {
      return res.status(400).json({ error: 'Modelo, marca y precio son requeridos' });
    }

    const newPhone = await Phone.create({ model, brand, price, specs, image_url });
    res.status(201).json(newPhone);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el teléfono' });
  }
};

// Obtener teléfono por ID
exports.getPhoneById = async (req, res) => {
  try {
    const phone = await Phone.getById(req.params.id);
    if (!phone) {
      return res.status(404).json({ error: 'Teléfono no encontrado' });
    }
    res.status(200).json(phone);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el teléfono' });
  }
};

// Actualizar teléfono
exports.updatePhone = async (req, res) => {
  try {
    const { model, brand, price, specs, image_url } = req.body;
    const updatedPhone = await Phone.update(req.params.id, { 
      model, brand, price, specs, image_url 
    });
    res.status(200).json(updatedPhone);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el teléfono' });
  }
};

// Eliminar teléfono
exports.deletePhone = async (req, res) => {
  try {
    const success = await Phone.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Teléfono no encontrado' });
    }
    res.status(200).json({ message: 'Teléfono eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el teléfono' });
  }
};

// Buscar teléfonos
exports.searchPhones = async (req, res) => {
  try {
    const phones = await Phone.search(req.query.q);
    res.status(200).json(phones);
  } catch (error) {
    res.status(500).json({ error: 'Error en la búsqueda' });
  }
};