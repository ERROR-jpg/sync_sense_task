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
    type: String, 
    ref: 'Farmer', 
    required: true,
  },
  farm_number: {
    type: String,
    required: true,
    unique: true,
  },
  
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;
