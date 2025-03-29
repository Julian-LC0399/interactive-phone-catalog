const express = require('express');
const router = express.Router();
const phoneController = require('../controllers/phones');

// CRUD para teléfonos
router.get('/', phoneController.getAllPhones);
router.post('/', phoneController.createPhone);
router.get('/search', phoneController.searchPhones);
router.get('/:id', phoneController.getPhoneById);
router.put('/:id', phoneController.updatePhone);
router.delete('/:id', phoneController.deletePhone);

module.exports = router;