// farmerRoutes.js

const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController'); 

//route to create a new farmer
router.post('/farmers', farmerController.createFarmer);


//route to get farmers with crops and farm numbers
router.get('/farmers-with-crops', farmerController.getFarmersWithCrops);

//route to get farmers growing a specific crop (case-insensitive)
router.get('/farmers-growing-specific-crop/:crop', farmerController.getFarmersGrowingSpecificCrop);

module.exports = router;
