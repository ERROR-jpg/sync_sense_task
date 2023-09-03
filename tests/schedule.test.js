const mongoose = require('mongoose');
const Schedule = require('../models/schedule');
require('dotenv').config();

const scheduleData = [
    {
        days_after_sowing: 30,
        fertilizer: 'NPK 10-10-10',
        quantity: 2,
        quantity_unit: 'kg',
        farm_number: 1,
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
        await Schedule.deleteMany({});
        await Schedule.insertMany(scheduleData);
      });
describe('Insert Schedules', () => {
    it('should insert schedules into the database with references to farms', async () => {

      const schedules = await Schedule.find({});
      expect(schedules.length).toBe(scheduleData.length);
  
    });
  });