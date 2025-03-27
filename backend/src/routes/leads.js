const express = require('express');
const router = express.Router();
const leadsController = require('../controllers/leads');

// POST /api/leads → Crear lead
router.post('/', leadsController.createLead);

// GET /api/leads → Obtener todos los leads
router.get('/', leadsController.getAllLeads);

module.exports = router;