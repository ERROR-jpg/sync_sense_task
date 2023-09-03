const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  phone_number: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        
        return /^\d{10}$/.test(value);
      },
      message: 'Phone number must be exactly 10 digits without any spaces or special characters.',
    },
  },
  name: {
    type: String,
    required: true,
    minlength: [2, 'Name should be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  language: {
    type: String,
    maxlength: [50, 'Language cannot exceed 50 characters'],
  },
  country: {
    type: String,
    required: true,
    minlength: [2, 'Country name should be at least 2 characters long'],
    maxlength: [50, 'Country name cannot exceed 50 characters'],
  },
});

const Farmer = mongoose.model('Farmer', farmerSchema);

module.exports = {
  Farmer,
  farmerSchema,
};
