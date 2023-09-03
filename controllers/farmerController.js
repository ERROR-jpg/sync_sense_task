// farmerController.js

const { farmerSchema, Farmer } = require('../models/farmer');
const Farm = require('../models/farm');
const Country = require('../models/country');

const createFarmer = async (req, res) => {
    try {
      const { phone_number, name, country, language } = req.body;
  
      if (!/^\d{10}$/.test(phone_number)) {
        return res.status(400).json({ error: 'Invalid phone number format. It must be exactly 10 digits.' });
      }
  
      const existingFarmer = await Farmer.findOne({ phone_number }).exec();
  
      if (existingFarmer) {
        return res.status(400).json({ error: 'User with this phone number already exists' });
      }
  
      if (!country || typeof country !== 'string' || country.length < 2 || country.length > 50) {
        return res.status(400).json({ error: 'Invalid country name. It must be between 2 and 50 characters.' });
      }
  
      if (!name || typeof name !== 'string' || name.length < 2 || name.length > 50) {
        return res.status(400).json({ error: 'Invalid name. It must be between 2 and 50 characters.' });
      }
  
      if (language && (typeof language !== 'string' || language.length < 2 || language.length > 50)) {
        return res.status(400).json({ error: 'Invalid language. It must be between 2 and 50 characters.' });
      }
  
      let existingCountry = await Country.findOne({ name: country }).exec();
  
      if (!existingCountry) {
        existingCountry = new Country({ name: country });
        await existingCountry.save();
      }
  
      const newFarmer = new Farmer({
        phone_number,
        name,
        country,
        language,
      });
  
      await newFarmer.save();
  
      res.json({ message: 'Farmer created successfully', data: newFarmer });
    } catch (error) {
      console.error('Error creating farmer:', error);
      res.status(500).json({ error: 'An error occurred while creating the farmer' });
    }
  };
  
  


const getFarmersWithCrops = async (req, res) => {
  try {
    const farms = await Farm.find({});
    const farmerDetails = [];

    for (const farm of farms) {
      const farmer = await Farmer.findOne({ phone_number: farm.farmer_phone_number }).exec();

      if (farmer) {
        const details = {
          farmer_name: farmer.name,
          crop_grown: farm.crop_grown,
          farmer_phone_number: farmer.phone_number,
          farm_number: farm.farm_number,
        };

        farmerDetails.push(details);
      }
    }

    res.json({
      message: 'Farmers with names, crops grown, and farm numbers',
      data: farmerDetails,
    });
  } catch (error) {
    console.error('Error finding farmers with crops:', error);
    res.status(500).json({ error: 'An error occurred while finding farmers' });
  }
};

const getFarmersGrowingSpecificCrop = async (req, res) => {
  try {
    const cropToFind = new RegExp(req.params.crop, 'i');

    const farmsWithCrop = await Farm.find({ crop_grown: { $regex: cropToFind } });
    const farmerDetails = [];

    for (const farm of farmsWithCrop) {
      const farmer = await Farmer.findOne({ phone_number: farm.farmer_phone_number }).exec();

      if (farmer) {
        const details = {
          farmer_name: farmer.name,
          crop_grown: farm.crop_grown,
          farmer_phone_number: farmer.phone_number,
          farm_number: farm.farm_number,
        };

        farmerDetails.push(details);
      }
    }

    res.json({
      message: `Farmers growing ${cropToFind} (case-insensitive)`,
      data: farmerDetails,
    });
  } catch (error) {
    console.error(`Error finding farmers growing ${cropToFind} (case-insensitive):`, error);
    res.status(500).json({ error: 'An error occurred while finding farmers' });
  }
};

module.exports = {
  createFarmer,
  getFarmersWithCrops,
  getFarmersGrowingSpecificCrop,
};
