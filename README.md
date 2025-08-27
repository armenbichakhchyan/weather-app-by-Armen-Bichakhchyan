# Weather App by Armen Bichakhchyan

A simple full-stack application that shows the current weather for any city.

## Features
- Search for any city
- Displays temperature, humidity, and weather conditions
- Responsive design

## Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   npm install
   npm run dev
By default, the frontend will run at http://localhost:5173 

Backend Setup

Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Run the backend:

npm run dev

Backend CORS Configuration

If you run the frontend locally, make sure your backend/index.js (or app.js) has:

app.use(cors({
    origin: "http://localhost:5173"
}));
