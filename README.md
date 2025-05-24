Tech Stack
1. Frontend
React with Vite

Tailwind CSS for styling

Chart.js for visualizing trends

Leaflet.js for interactive region selection

2. Backend
Node.js + Express

MongoDB Atlas (cloud DB)

Axios for API requests

Open-Meteo API for historical weather data

PTOJECT STRUCTURE : - 


climate-hazard-trend-analyzer/
├── client/                       # Frontend (React)
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── DateRangePicker.jsx
│   │   │   ├── RegionSelector.jsx
│   │   │   ├── SummaryBox.jsx
│   │   │   ├── TrendChart.jsx
│   │   │   └── MapView.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── tailwind.config.js
│
├── server/                      # Backend (Node.js + Express)
│   ├── controllers/
│   │   └── climateController.js
│   ├── services/
│   │   ├── dataFetcher.js       # Calls Open-Meteo API
│   │   └── hazardAnalyzer.js    # Heatwave detection logic
│   ├── routes/
│   │   └── climateRoutes.js
│   ├── models/
│   │   └── ClimateRecord.js
│   ├── utils/
│   │   └── percentile.js        # Utility to calculate 95th percentile
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── app.js
│   └── server.js
│
├── .env                         # API keys, DB URI
├── .gitignore
├── package.json                 # Shared or backend only
├── README.md
└── README.client.md             # Optional client-specific README


SETUP INSTRUCTIONS :-
 1. Clone the Repo
    git clone https://github.com/srjaiswalgithub/climate-hazard-trend-analyzer.git
    cd climate-hazard-trend-analyzer

2.Setup Frontend

  cd client
  npm install
  npm run dev

3. Setup Backend
   cd ../server
   npm install

4. Create a .env file in server/:
   PORT=5000
   MONGO_URI=mongodb+srv://<your-db-uri>

5. Then run the backend:
    npm run dev
