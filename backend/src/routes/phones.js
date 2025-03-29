const express = require('express');
const router = express.Router();
const phoneController = require('../controllers/phones');

// Rutas CRUD básicas
router.post('/', phoneController.createPhone);
router.get('/', phoneController.getAllPhones);
router.get('/:id', phoneController.getPhoneById);
router.put('/:id', phoneController.updatePhone);
router.delete('/:id', phoneController.deletePhone);

module.exports = router;