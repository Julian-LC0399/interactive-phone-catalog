const Phone = require('../models/Phone');

// Obtener lista de modelos
exports.getModels = async (req, res) => {
  try {
    const models = await Phone.getAllModels();
    res.json(models);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verificar modelo (para el formulario de leads)
exports.checkModel = async (req, res) => {
  try {
    const { model } = req.params;
    const exists = await Phone.modelExists(model);
    res.json({ exists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};