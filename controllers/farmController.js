// farmController.js

const { farmerSchema, Farmer } = require('../models/farmer');
const Farm = require('../models/farm');
const Schedule = require('../models/schedule');

const createFarm = async (req, res) => {
    try {
      const farmerPhoneNumber = req.body.farmer_phone_number;
      const existingFarmer = await Farmer.findOne({ phone_number: farmerPhoneNumber }).exec();
  
      if (!existingFarmer) {
        return res.status(400).json({ error: 'Invalid farmer phone number' });
      }
  
      const farmNumberPattern = /^[A-Z]\d{6}$/;
  
      if (!req.body.farm_number || !farmNumberPattern.test(req.body.farm_number)) {
        return res.status(400).json({ error: 'Invalid farm number format. It must start with a capital letter followed by exactly 6 digits.' });
      }
  
      const farmNumberExists = await Farm.exists({ farm_number: req.body.farm_number });
  
      if (farmNumberExists) {
        return res.status(400).json({ error: 'Farm number already exists' });
      }
  
      const area = req.body.area;
      if (!area || area.length === 0) {
        return res.status(400).json({ error: 'Area is required' });
      }
  
      const village = req.body.village;
      if (!village || village.length === 0) {
        return res.status(400).json({ error: 'Village is required' });
      }
  
      const cropGrown = req.body.crop_grown;
      if (cropGrown && cropGrown.length > 100) {
        return res.status(400).json({ error: 'Crop grown should not exceed 100 characters in length' });
      }
  
      const sowingDate = new Date(req.body.sowing_date);
      if (isNaN(sowingDate.getTime())) {
        return res.status(400).json({ error: 'Invalid sowing date' });
      }
  
      const farmerPhoneNumberPattern = /^[0-9]{10}$/;
      if (!farmerPhoneNumberPattern.test(farmerPhoneNumber)) {
        return res.status(400).json({ error: 'Invalid farmer phone number format. It must be exactly 10 digits' });
      }
  
      const newFarm = new Farm({
        area: req.body.area,
        village: req.body.village,
        crop_grown: req.body.crop_grown,
        sowing_date: req.body.sowing_date,
        farmer_phone_number: req.body.farmer_phone_number,
        farm_number: req.body.farm_number,
      });
  
      await newFarm.save();
  
      res.json({ message: 'Farm data inserted successfully', data: newFarm });
    } catch (error) {
      console.error('Error inserting farm data:', error);
      res.status(500).json({ error: 'An error occurred while inserting farm data' });
    }
  };
  

const getFarmsDueTodayTomorrow = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const allSchedules = await Schedule.find().exec();
    const farmsDueTodayTomorrow = [];

    for (const schedule of allSchedules) {
      const farm = await Farm.findOne({ farm_number: schedule.farm_number }).exec();

      if (farm) {
        const dueDate = new Date(farm.sowing_date);
        dueDate.setDate(dueDate.getDate() + schedule.days_after_sowing);
        dueDate.setHours(0, 0, 0, 0);

        if (dueDate >= today && dueDate <= tomorrow) {
          const farmer = await Farmer.findOne({ phone_number: farm.farmer_phone_number }).exec();
          
          farmsDueTodayTomorrow.push({
            farm_number: farm.farm_number,
            area: farm.area,
            village: farm.village,
            crop_grown: farm.crop_grown,
            sowing_date: farm.sowing_date.toISOString().split('T')[0],
            fertilizer: schedule.fertilizer,
            farmer_country: farmer ? farmer.country : 'Unknown',
            farmer_name: farmer ? farmer.name : 'Unknown',
            due: dueDate.toDateString() === today.toDateString() ? 'today' : 'tomorrow',
          });
        }
      }
    }

    res.json({
      message: 'Farms with schedules due for today/tomorrow',
      data: farmsDueTodayTomorrow,
    });
  } catch (error) {
    console.error('Error finding farms with schedules:', error);
    res.status(500).json({ error: 'An error occurred while finding farms' });
  }
};

module.exports = {
  createFarm,
  getFarmsDueTodayTomorrow,
};
