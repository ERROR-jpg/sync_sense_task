// bomRoutes.js

const express = require('express');
const router = express.Router();
const bomController = require('../controllers/bomController'); 

// the route to calculate the BOM
router.get('/calculate-bom/:phoneNumber', bomController.calculateBOM);

module.exports = router;
