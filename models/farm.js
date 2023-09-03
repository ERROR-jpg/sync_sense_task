const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
  area: {
    type: Number,
    required: true,
  },
  village: {
    type: String,
    required: true,
  },
  crop_grown: String,
  sowing_date: {
    type: Date,
    required: true,
  },
  farmer_phone_number: {
    type: String, // Reference to the phone_number field in the farmer model
    ref: 'Farmer', // Reference to the Farmer model
    required: true,
  },
  farm_number: {
    type: String,
    required: true,
    unique: true,
  },
  // Other farm-related fields if needed
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
