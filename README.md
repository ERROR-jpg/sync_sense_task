# Sync Sense Backend Development Task

## Deployment

To deploy this project run

```bash
  git clone https://github.com/ERROR-jpg/sync_sense_task.git
```

To run the backend
```bash
    npm install
    node index.js
```

Api Testing (Appropriate validations are given for all the inputs)

*Assuming that its running on port 3000 locally*

Api to insert Data - Farmer Details

```bash
post

localhost:3000/api/farmers/farmers

{
  "phone_number": "9876142271",
  "name": "Elon Musk",
  "country": "India",
  "language": "Hindi"
}
```


Api to insert data - Farm Details

```bash
post

localhost:3000/api/farms/farms

{
  "area": 100,
  "village": "Palanpur",
  "crop_grown": "Wheat",
  "sowing_date": "2023-09-02",
  "farmer_phone_number": "1234567890",
  "farm_number": "F239810"
}

```

Api to insert data - Schedule Details

```bash
post

localhost:3000/api/schedule/insert-schedule

{
  "days_after_sowing": 10,
  "fertilizer": "SuperGrow Fertilizer",
  "quantity": 50,
  "quantity_unit": "kg",
  "farm_number": "F123456"
}

```

Api to Find all schedules due for today/tomorrow 

```bash
GET

localhost:3000/api/farms/farms-due
```

Api to Find all farmers who are growing a crop (all farmers details)
```bash
GET

localhost:3000/api/farmers/farmers-with-crops
```

Api to Find Farmers growing a specific crop
```bash
GET

localhost:3000/api/farmers/farmers-growing-specific-crop/Corn
```

Api for Given prices of fertilizers, calculate the bill of materials for a single farmer 
(Assuming that the quantity unit stored in db is stored in kg or L format. we provide price of fertilizer per gram or ml for convenience)

```bash
GET

localhost:3000/api/bom/calculate-bom/1234567890?prices={ "NPK 10-10-10": 1, "NPK 10-10-5": 1, "NPK 10-20-10": 1, "NPK 10-20-20": 1, "NPK 10-5-20": 1, "NPK 10-5-5": 1, "NPK 15-10-5": 1, "NPK 15-15-15": 1, "NPK 15-15-5": 1, "NPK 15-5-15": 1, "NPK 18-6-12": 0.5, "NPK 20-10-10": 1, "NPK 20-20-10": 1, "NPK 20-20-20": 1, "NPK 20-40-10": 1, "NPK 5-10-10": 1, "NPK 5-10-5": 1, "NPK 5-5-15": 1, "NPK 8-8-8": 1 }
```

