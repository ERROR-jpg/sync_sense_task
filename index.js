const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const connectToDatabase = require('./db');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Backend Developer Task for Sync Sense AI!!');
});

// Import route files
const bomRoute = require('./routes/bomRoute');
const scheduleRoute = require('./routes/scheduleRoute');
const farmerRoutes = require('./routes/farmerRoutes');
const farmRoutes = require('./routes/farmRoutes');

// Use the route files
app.use('/api/bom', bomRoute);
app.use('/api/schedule', scheduleRoute);
app.use('/api/farmers', farmerRoutes);
app.use('/api/farms', farmRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to the MongoDB database
connectToDatabase();
