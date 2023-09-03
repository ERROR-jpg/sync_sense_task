const mongoose = require('mongoose');
const Farm = require('../models/farm');
require('dotenv').config();

const farmData = [
    {
        area: 100,
        village: 'Farmville',
        crop_grown: 'Wheat',
        sowing_date: new Date('2023-01-15'),
        farm_number: 1,
        farmer_phone_number: '1234553160',
      },];

      beforeAll(async () => {
        
        await mongoose.connect(process.env.TEST_MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
      });
      
      afterAll(async () => {
        
        await mongoose.connection.close();
      });

      beforeEach(async () => {
        await Farm.deleteMany({});
        await Farm.insertMany(farmData);
      });

    describe('Insert Farms', () => {
        it("should insert farms into the database with references to farmers", async () => {
          const farms = await Farm.find({});
          expect(farms.length).toBe(farmData.length);
        });
      });