// bomController.js

const { farmerSchema, Farmer } = require('../models/farmer');
const Farm = require('../models/farm');
const Schedule = require('../models/schedule');

const calculateBOM = async (req, res) => {
  try {
    const farmerPhoneNumber = req.params.phoneNumber;
    const pricesJSON = req.query.prices;

    const fertilizerPrices = JSON.parse(pricesJSON);

    const farmer = await Farmer.findOne({ phone_number: farmerPhoneNumber }).exec();

    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }

    const farms = await Farm.find({ farmer_phone_number: farmer.phone_number }).exec();

    let totalCost = 0;
    const fertilizerDetails = [];

    for (const farm of farms) {
      const schedules = await Schedule.find({ farm_number: farm.farm_number }).exec();

      for (const schedule of schedules) {
        if (schedule.fertilizer in fertilizerPrices) {
          const fertilizerPricePerGram = fertilizerPrices[schedule.fertilizer];
          const fertilizerQuantityInKg = schedule.quantity;

          const fertilizerCost = fertilizerPricePerGram * (fertilizerQuantityInKg * 1000);

          totalCost += fertilizerCost;

          fertilizerDetails.push({
            fertilizer: schedule.fertilizer,
            quantity: fertilizerQuantityInKg,
            cost: fertilizerCost,
          });
        }
      }
    }

    res.json({
      message: 'Bill of Materials (BOM) for the farmer',
      farmer_name: farmer.name,
      total_cost: totalCost,
      fertilizers: fertilizerDetails,
    });
  } catch (error) {
    console.error('Error calculating BOM for the farmer:', error);
    res.status(500).json({ error: 'An error occurred while calculating the BOM' });
  }
};

module.exports = {
  calculateBOM,
};
