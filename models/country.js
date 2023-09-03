const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // Other country-related fields if needed
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
