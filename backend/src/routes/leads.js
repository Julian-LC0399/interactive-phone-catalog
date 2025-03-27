const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leads');

router.post('/', leadController.createLead);
router.get('/', leadController.getLeads);

module.exports = router;