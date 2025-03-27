const express = require('express');
const router = express.Router();
const phonesController = require('../controllers/phones');

router.get('/models', phonesController.getModels);
router.get('/check-model/:model', phonesController.checkModel);

module.exports = router;