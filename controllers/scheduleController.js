// scheduleController.js

const Farm = require('../models/farm');
const Schedule = require('../models/schedule');

const insertSchedule = async (req, res) => {
  try {
    const {
      days_after_sowing,
      fertilizer,
      quantity,
      quantity_unit,
      farm_number
    } = req.body;

    const farmExists = await Farm.exists({ farm_number });

    if (!farmExists) {
      return res.status(404).json({ error: 'Farm not found. Check the farm_number.' });
    }

    const isValidDaysAfterSowing = Number.isInteger(days_after_sowing) && days_after_sowing > 0;
    const isValidQuantity = Number.isInteger(quantity) && quantity > 0;

    if (!isValidDaysAfterSowing || !isValidQuantity) {
      return res.status(400).json({ error: 'Invalid days_after_sowing or quantity' });
    }

    const isValidQuantityUnit = ['ton', 'kg', 'g', 'L', 'mL'].includes(quantity_unit);
    if (!isValidQuantityUnit) {
      return res.status(400).json({ error: 'Invalid quantity_unit' });
    }

    if (fertilizer.length < 3 || fertilizer.length > 50) {
      return res.status(400).json({ error: 'Fertilizer length should be between 3 and 50 characters' });
    }

   
    const farmNumberPattern = /^[A-Z]\d{6}$/;
    if (!farmNumberPattern.test(farm_number)) {
      return res.status(400).json({ error: 'Farm number should start with a capital letter followed by exactly 6 digits' });
    }

    const newSchedule = new Schedule({
      days_after_sowing,
      fertilizer,
      quantity,
      quantity_unit,
      farm_number
    });

    await newSchedule.save();

    res.json({ message: 'Schedule created successfully', data: newSchedule });
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ error: 'An error occurred while creating the schedule' });
  }
};


module.exports = {
  insertSchedule,
};
