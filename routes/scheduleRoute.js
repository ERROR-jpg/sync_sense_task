// scheduleRoutes.js

const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController'); 

// the route to insert a new schedule
router.post('/insert-schedule', scheduleController.insertSchedule);

module.exports = router;
