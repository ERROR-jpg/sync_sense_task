const mongoose = require('mongoose');
const { Farmer } = require('../models/farmer');
require('dotenv').config();

const farmerData = [
  {
    phone_number: '2566418421',
    name: 'John Doe',
    language: 'English',
    country: 'USA',
  },
];

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
  await Farmer.deleteMany({});
  await Farmer.insertMany(farmerData);
});

// Your individual tests
describe('Insert Farmers', () => {
  it('should insert farmers into the database', async () => {

    const farmers = await Farmer.find({});
    expect(farmers.length).toBe(farmerData.length);
  });
});
