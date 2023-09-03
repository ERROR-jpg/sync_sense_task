const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  days_after_sowing: {
    type: Number,
    required: true,
  },
  fertilizer: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  quantity_unit: {
    type: String,
    enum: ['ton', 'kg', 'g', 'L', 'mL'],
    required: true,
  },
  farm_number: {
    type: String, // Use String type for farm_number
    ref: 'Farm', // Reference to the Farm model
    required: true,
  },
  
  // Other schedule-related fields if needed
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
