const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leads');

// CRUD Routes
router.post('/leads', leadController.createLead); // Crear lead
router.get('/leads', leadController.getAllLeads); // Obtener todos los leads
router.get('/leads/:id', leadController.getLeadById); // Obtener lead por ID
router.put('/leads/:id', leadController.updateLead); // Actualizar lead
router.delete('/leads/:id', leadController.deleteLead); // Eliminar lead

module.exports = router;