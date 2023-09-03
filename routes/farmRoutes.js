// farmRoutes.js

const express = require('express');
const router = express.Router();
const farmController = require('../controllers/farmController'); 

// route to create a new farm
router.post('/farms', farmController.createFarm);

// route to get farms due today/tomorrow
router.get('/farms-due', farmController.getFarmsDueTodayTomorrow);

module.exports = router;
