# 🛢️ FuelWise — AI Prompts for Split Development

> **3 Prompts: Frontend (PC-A) → Backend (PC-B) → Merge (Final PC)**
>
> Copy-paste each prompt into your AI coding assistant (Gemini / Cursor / Copilot).

---

---

## 🟢 PROMPT 1 — FRONTEND (Person A's PC)

> Copy everything below the line and paste it into your AI assistant.

---

```
You are a senior React developer. Build the complete frontend for "FuelWise" — a fuel station finder app with map congestion view.

PROJECT SETUP:
- Create a folder called "frontend" in the current directory
- Use Vite + React (JavaScript, NOT TypeScript)
- Use Tailwind CSS v4 (via @tailwindcss/vite plugin)
- Install: leaflet, react-leaflet, axios

DESIGN:
- Dark theme (background: #0f172a, cards: #1e293b, text: #f8fafc)
- Primary accent: #3b82f6 (blue)
- Font: Inter from Google Fonts
- Modern, premium, glassmorphism cards with subtle shadows
- Smooth hover animations on cards and buttons
- Fully responsive (map full-width on mobile, side panel on desktop)

PAGE LAYOUT (Single Page App):
- Top Navbar: Logo "🛢️ FuelWise", city name "📍 Mumbai", Emergency button (red)
- Left/Main: Interactive map (70% width on desktop, full on mobile)
- Right Sidebar (30% width on desktop, below map on mobile):
  - "⭐ Recommended Pump" card at top (highlighted with blue border glow)
  - "📋 All Stations" list below (scrollable pump cards)
- Floating "📝 Update Status" button (bottom-right corner)

COMPONENTS TO BUILD:

1. src/components/Navbar.jsx
   - Logo, city name, emergency mode toggle button
   - Sticky top, glassmorphism background (backdrop-blur)

2. src/components/MapView.jsx
   - Use react-leaflet MapContainer, TileLayer, CircleMarker, Popup
   - Center: [19.076, 72.8777] (Mumbai), zoom: 12
   - Use dark map tiles: https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
   - CircleMarker for each station:
     - Color based on queue_status: "Short" → #22c55e, "Medium" → #f59e0b, "Long" → #ef4444
     - radius: 14, fillOpacity: 0.85, white border (weight: 2)
     - Pulse animation on the recommended pump marker
   - Popup on click: station name, fuel status, queue status, wait time
   - Map height: calc(100vh - 64px)

3. src/components/PumpCard.jsx
   - Props: station object, isRecommended (boolean)
   - Show: name, brand, address, fuel status badge, queue status badge, estimated wait
   - Fuel badge colors: Available → green, Low → orange, Out of Stock → gray
   - Queue badge colors: Short → green, Medium → yellow, Long → red
   - "Last updated: X min ago" in muted text
   - Hover: slight scale + border glow
   - If isRecommended: blue left border + "⭐ Best Pick" tag + score display

4. src/components/PumpList.jsx
   - Scrollable list of PumpCard components
   - Section header "📋 Nearby Stations (X)"
   - Sort by: score (best first)

5. src/components/RecommendedPump.jsx
   - Special highlighted card for the top recommendation
   - Show: station name, score, reason text, distance, wait time
   - Animated gradient border (blue to purple)
   - "Navigate" button (just visual, no real navigation)

6. src/components/StatusBadge.jsx
   - Reusable badge component
   - Props: label, type ("fuel" or "queue"), value
   - Returns colored pill/badge

7. src/components/UpdateModal.jsx
   - Modal overlay (click backdrop to close)
   - Dropdown: Select station (from list)
   - Radio buttons: Fuel status (Available / Low / Out of Stock)
   - Radio buttons: Queue status (Short / Medium / Long)
   - Submit button → calls POST /update-status
   - Success toast/message after submit

8. src/pages/Home.jsx
   - Main layout: Navbar + Map + Sidebar
   - On mount: fetch stations from API, fetch recommendation
   - Pass data to child components
   - Handle station selection (click on map → highlight in list)

9. src/services/api.js
   - Axios instance with baseURL: "http://localhost:8000"
   - getStations() → GET /stations
   - getRecommendation(lat, lng) → GET /recommendation?lat={lat}&lng={lng}
   - updateStatus(data) → POST /update-status

MOCK DATA (use until backend is ready):
Create src/data/mockStations.js with this data:

const mockStations = [
  { _id: "st_001", name: "HP Fuel Station - Andheri", address: "SV Road, Andheri West", lat: 19.1196, lng: 72.8466, brand: "HP", fuel_types: ["Petrol", "Diesel"], fuel_status: "Available", queue_status: "Short", estimated_wait: 5, last_updated: "2026-04-02T12:00:00Z" },
  { _id: "st_002", name: "Indian Oil - Bandra", address: "Hill Road, Bandra West", lat: 19.0596, lng: 72.8295, brand: "Indian Oil", fuel_types: ["Petrol", "Diesel", "CNG"], fuel_status: "Available", queue_status: "Medium", estimated_wait: 12, last_updated: "2026-04-02T11:45:00Z" },
  { _id: "st_003", name: "Bharat Petroleum - Dadar", address: "LBS Marg, Dadar East", lat: 19.0178, lng: 72.8478, brand: "BPCL", fuel_types: ["Petrol", "Diesel"], fuel_status: "Low", queue_status: "Long", estimated_wait: 25, last_updated: "2026-04-02T11:30:00Z" },
  { _id: "st_004", name: "Shell - Powai", address: "Hiranandani, Powai", lat: 19.1176, lng: 72.9060, brand: "Shell", fuel_types: ["Petrol", "Diesel", "Premium"], fuel_status: "Available", queue_status: "Short", estimated_wait: 3, last_updated: "2026-04-02T12:15:00Z" },
  { _id: "st_005", name: "HP Pump - Goregaon", address: "SV Road, Goregaon West", lat: 19.1663, lng: 72.8494, brand: "HP", fuel_types: ["Petrol", "Diesel"], fuel_status: "Out of Stock", queue_status: "Long", estimated_wait: 0, last_updated: "2026-04-02T10:00:00Z" },
  { _id: "st_006", name: "Indian Oil - Kurla", address: "LBS Marg, Kurla West", lat: 19.0726, lng: 72.8793, brand: "Indian Oil", fuel_types: ["Petrol", "Diesel"], fuel_status: "Available", queue_status: "Medium", estimated_wait: 10, last_updated: "2026-04-02T12:05:00Z" },
  { _id: "st_007", name: "BPCL - Juhu", address: "Juhu Tara Road, Juhu", lat: 19.0883, lng: 72.8263, brand: "BPCL", fuel_types: ["Petrol", "Diesel", "CNG"], fuel_status: "Available", queue_status: "Short", estimated_wait: 4, last_updated: "2026-04-02T12:20:00Z" },
  { _id: "st_008", name: "Nayara - Malad", address: "Link Road, Malad West", lat: 19.1862, lng: 72.8484, brand: "Nayara", fuel_types: ["Petrol", "Diesel"], fuel_status: "Low", queue_status: "Medium", estimated_wait: 15, last_updated: "2026-04-02T11:50:00Z" },
  { _id: "st_009", name: "Indian Oil - Borivali", address: "Western Express Hwy, Borivali", lat: 19.2288, lng: 72.8567, brand: "Indian Oil", fuel_types: ["Petrol", "Diesel", "CNG"], fuel_status: "Available", queue_status: "Long", estimated_wait: 20, last_updated: "2026-04-02T11:40:00Z" },
  { _id: "st_010", name: "Shell - Vile Parle", address: "SV Road, Vile Parle East", lat: 19.0996, lng: 72.8567, brand: "Shell", fuel_types: ["Petrol", "Diesel", "Premium"], fuel_status: "Available", queue_status: "Short", estimated_wait: 2, last_updated: "2026-04-02T12:25:00Z" }
];

IMPORTANT RULES:
- Use mock data by default, but have a toggle/env flag to switch to live API
- In Home.jsx, try API first → if it fails, fall back to mock data (try/catch)
- Import leaflet CSS in MapView: import "leaflet/dist/leaflet.css"
- Map container MUST have explicit height style, or it won't render
- Make sure Tailwind is configured properly with @tailwindcss/vite plugin
- Use "Inter" font via Google Fonts CDN link in index.html
- All components should be functional components with hooks
- App should work standalone with mock data (no backend needed for demo)
- DO NOT use TypeScript

FINAL OUTPUT:
- Complete working frontend in /frontend folder
- Running on http://localhost:5173
- Beautiful dark theme, smooth animations, responsive layout
- Map with colored markers, pump list, recommendation card, update modal
```

---

---

## 🔵 PROMPT 2 — BACKEND (Person B's PC)

> Copy everything below the line and paste it into your AI assistant.

---

```
You are a senior Python backend developer. Build the complete backend for "FuelWise" — a fuel station finder REST API with recommendation engine.

PROJECT SETUP:
- Create a folder called "backend" in the current directory
- Use FastAPI (Python)
- Use Motor (async MongoDB driver)
- Use python-dotenv for env config
- Use Pydantic for data models

FOLDER STRUCTURE:
/backend
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app + CORS + router includes
│   ├── routes/
│   │   ├── __init__.py
│   │   └── stations.py      # All API endpoints
│   ├── models/
│   │   ├── __init__.py
│   │   └── station.py       # Pydantic models
│   ├── services/
│   │   ├── __init__.py
│   │   ├── database.py      # MongoDB connection + CRUD operations
│   │   └── recommendation.py # Recommendation scoring algorithm
│   └── seed.py              # Seed script to populate MongoDB
├── .env
├── requirements.txt
└── README.md

ENVIRONMENT FILE (.env):
MONGO_URI=mongodb://localhost:27017
DB_NAME=fuelwise

REQUIREMENTS (requirements.txt):
fastapi==0.115.0
uvicorn[standard]==0.30.0
motor==3.5.0
python-dotenv==1.0.0
pydantic==2.9.0

---

API ENDPOINTS:

1. GET /
   Response: { "message": "FuelWise API is running 🛢️", "version": "1.0.0" }

2. GET /stations
   - Fetch all stations from MongoDB
   - Return: { "stations": [...], "count": N }
   - Each station object includes all fields from the schema

3. GET /recommendation?lat={lat}&lng={lng}
   - lat, lng are required float query params (user's location)
   - Run recommendation algorithm on all stations
   - Skip stations with fuel_status == "Out of Stock"
   - Return the best station with score, distance, and reason text
   - Response: {
       "recommended": {
         "_id": "st_004",
         "name": "Shell - Powai",
         "address": "Hiranandani, Powai",
         "lat": 19.1176,
         "lng": 72.9060,
         "brand": "Shell",
         "fuel_status": "Available",
         "queue_status": "Short",
         "estimated_wait": 3,
         "score": 92.5,
         "distance_km": 1.2,
         "reason": "Available fuel, short queue, 1.2 km away"
       }
     }
   - If no station available: { "recommended": null, "message": "No available stations found" }

4. POST /update-status
   - Body: { "station_id": "st_001", "fuel_status": "Low", "queue_status": "Long", "updated_by": "anonymous" }
   - Update the station document in MongoDB (set fuel_status, queue_status, last_updated)
   - Push to update_history array
   - Response: { "message": "Status updated successfully", "station_id": "st_001", "updated_at": "ISO timestamp" }

5. GET /stations/{station_id}
   - Fetch single station by _id
   - Return station object or 404

---

RECOMMENDATION ALGORITHM (services/recommendation.py):

Use Haversine formula for distance:
def haversine(lat1, lng1, lat2, lng2):
    from math import radians, cos, sin, asin, sqrt
    lat1, lng1, lat2, lng2 = map(radians, [lat1, lng1, lat2, lng2])
    dlat = lat2 - lat1
    dlng = lng2 - lng1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlng/2)**2
    return 2 * 6371 * asin(sqrt(a))

Scoring:
  - fuel_score: Available=100, Low=50, Out of Stock=0
  - queue_score: Short=100, Medium=50, Long=0
  - distance_score: max(0, 100 - (distance_km * 20))
  - total_score = (0.4 * fuel_score) + (0.35 * queue_score) + (0.25 * distance_score)

Generate reason string:
  - "{fuel_status} fuel, {queue_status.lower()} queue, {distance_km} km away"

---

DATABASE SERVICE (services/database.py):

- Connect using Motor AsyncIOMotorClient
- Database: from env DB_NAME
- Collection: "stations"
- Functions:
  - get_all_stations() → list of all station dicts (convert ObjectId to string)
  - get_station_by_id(station_id) → single station dict or None
  - update_station_status(station_id, fuel_status, queue_status, updated_by) → update document + push history
  - seed_stations(stations_list) → insert many (used by seed script)

---

PYDANTIC MODELS (models/station.py):

class StationBase(BaseModel):
    name: str
    address: str
    lat: float
    lng: float
    brand: str
    fuel_types: List[str]
    fuel_status: str  # "Available" | "Low" | "Out of Stock"
    queue_status: str  # "Short" | "Medium" | "Long"
    estimated_wait: int  # minutes

class UpdateStatusRequest(BaseModel):
    station_id: str
    fuel_status: Optional[str] = None
    queue_status: Optional[str] = None
    updated_by: str = "anonymous"

---

SEED DATA (app/seed.py):

Create a runnable script: python -m app.seed
It should:
1. Connect to MongoDB
2. Drop existing "stations" collection
3. Insert these 10 stations:

[
  { "_id": "st_001", "name": "HP Fuel Station - Andheri", "address": "SV Road, Andheri West", "lat": 19.1196, "lng": 72.8466, "brand": "HP", "fuel_types": ["Petrol", "Diesel"], "fuel_status": "Available", "queue_status": "Short", "estimated_wait": 5, "last_updated": "2026-04-02T12:00:00Z", "update_history": [] },
  { "_id": "st_002", "name": "Indian Oil - Bandra", "address": "Hill Road, Bandra West", "lat": 19.0596, "lng": 72.8295, "brand": "Indian Oil", "fuel_types": ["Petrol", "Diesel", "CNG"], "fuel_status": "Available", "queue_status": "Medium", "estimated_wait": 12, "last_updated": "2026-04-02T11:45:00Z", "update_history": [] },
  { "_id": "st_003", "name": "Bharat Petroleum - Dadar", "address": "LBS Marg, Dadar East", "lat": 19.0178, "lng": 72.8478, "brand": "BPCL", "fuel_types": ["Petrol", "Diesel"], "fuel_status": "Low", "queue_status": "Long", "estimated_wait": 25, "last_updated": "2026-04-02T11:30:00Z", "update_history": [] },
  { "_id": "st_004", "name": "Shell - Powai", "address": "Hiranandani, Powai", "lat": 19.1176, "lng": 72.9060, "brand": "Shell", "fuel_types": ["Petrol", "Diesel", "Premium"], "fuel_status": "Available", "queue_status": "Short", "estimated_wait": 3, "last_updated": "2026-04-02T12:15:00Z", "update_history": [] },
  { "_id": "st_005", "name": "HP Pump - Goregaon", "address": "SV Road, Goregaon West", "lat": 19.1663, "lng": 72.8494, "brand": "HP", "fuel_types": ["Petrol", "Diesel"], "fuel_status": "Out of Stock", "queue_status": "Long", "estimated_wait": 0, "last_updated": "2026-04-02T10:00:00Z", "update_history": [] },
  { "_id": "st_006", "name": "Indian Oil - Kurla", "address": "LBS Marg, Kurla West", "lat": 19.0726, "lng": 72.8793, "brand": "Indian Oil", "fuel_types": ["Petrol", "Diesel"], "fuel_status": "Available", "queue_status": "Medium", "estimated_wait": 10, "last_updated": "2026-04-02T12:05:00Z", "update_history": [] },
  { "_id": "st_007", "name": "BPCL - Juhu", "address": "Juhu Tara Road, Juhu", "lat": 19.0883, "lng": 72.8263, "brand": "BPCL", "fuel_types": ["Petrol", "Diesel", "CNG"], "fuel_status": "Available", "queue_status": "Short", "estimated_wait": 4, "last_updated": "2026-04-02T12:20:00Z", "update_history": [] },
  { "_id": "st_008", "name": "Nayara - Malad", "address": "Link Road, Malad West", "lat": 19.1862, "lng": 72.8484, "brand": "Nayara", "fuel_types": ["Petrol", "Diesel"], "fuel_status": "Low", "queue_status": "Medium", "estimated_wait": 15, "last_updated": "2026-04-02T11:50:00Z", "update_history": [] },
  { "_id": "st_009", "name": "Indian Oil - Borivali", "address": "Western Express Hwy, Borivali", "lat": 19.2288, "lng": 72.8567, "brand": "Indian Oil", "fuel_types": ["Petrol", "Diesel", "CNG"], "fuel_status": "Available", "queue_status": "Long", "estimated_wait": 20, "last_updated": "2026-04-02T11:40:00Z", "update_history": [] },
  { "_id": "st_010", "name": "Shell - Vile Parle", "address": "SV Road, Vile Parle East", "lat": 19.0996, "lng": 72.8567, "brand": "Shell", "fuel_types": ["Petrol", "Diesel", "Premium"], "fuel_status": "Available", "queue_status": "Short", "estimated_wait": 2, "last_updated": "2026-04-02T12:25:00Z", "update_history": [] }
]

Print "✅ Seeded 10 stations into MongoDB" when done.

---

MAIN APP (app/main.py):

- Create FastAPI app with title="FuelWise API", version="1.0.0"
- Add CORS middleware:
  - allow_origins: ["http://localhost:5173", "http://localhost:3000", "*"]
  - allow_credentials: True
  - allow_methods: ["*"]
  - allow_headers: ["*"]
- Include station_router
- Root endpoint returns health check

---

IMPORTANT RULES:
- All MongoDB operations must be async (use Motor, not PyMongo)
- Use _id as string (not ObjectId) for simplicity — set _id manually in seed data
- Handle errors gracefully with try/except and proper HTTP status codes
- Add docstrings to all route handlers (they show in FastAPI auto-docs)
- Test that http://localhost:8000/docs shows Swagger UI
- Make sure seed.py is runnable standalone: python -m app.seed
- DO NOT use SQLAlchemy or any SQL database

FINAL OUTPUT:
- Complete working backend in /backend folder
- Server running on http://localhost:8000
- All 3 API endpoints working
- MongoDB seeded with 10 stations
- Swagger docs at /docs
```

---

---

## 🟣 PROMPT 3 — MERGE (After both are done, on final PC)

> Copy everything below the line and paste it into your AI assistant.

---

```
You are a senior full-stack developer. I have a "FuelWise" project built by two people on separate PCs. I now have both folders on this machine. Your job is to merge them into one working project and ensure end-to-end integration.

CURRENT STATE:
- /frontend folder → React + Vite + Tailwind + Leaflet app (runs on port 5173)
- /backend folder → FastAPI + MongoDB app (runs on port 8000)
- Both were built independently and may have minor integration issues

YOUR TASKS:

STEP 1 — VERIFY FOLDER STRUCTURE
Check that both folders exist and have the expected structure:

/frontend
  /src
    /components (MapView, PumpCard, PumpList, RecommendedPump, StatusBadge, UpdateModal, Navbar)
    /pages (Home)
    /services (api.js)
    /data (mockStations.js)
  package.json, vite.config.js

/backend
  /app
    main.py
    /routes/stations.py
    /models/station.py
    /services/database.py, recommendation.py
    seed.py
  requirements.txt, .env

If any files are missing, create them.

STEP 2 — FIX FRONTEND API INTEGRATION
In /frontend/src/services/api.js, ensure:
- baseURL is "http://localhost:8000"
- Three functions exist: getStations(), getRecommendation(lat, lng), updateStatus(data)

In /frontend/src/pages/Home.jsx, ensure:
- On mount, it tries to fetch from the live API first
- If API call fails (backend not running), it falls back to mock data from /data/mockStations.js
- When fetching recommendation, use default location lat=19.076, lng=72.8777 (Mumbai center) if geolocation is not available
- Console.log whether using "live API" or "mock data" so we can verify during demo

STEP 3 — FIX BACKEND CORS
In /backend/app/main.py, ensure CORS allows:
- Origins: ["http://localhost:5173", "http://localhost:3000", "*"]
- All methods and headers

STEP 4 — VERIFY API CONTRACT MATCH
Make sure the frontend expects the EXACT same JSON shape the backend returns:

GET /stations returns:
{
  "stations": [ { "_id", "name", "address", "lat", "lng", "brand", "fuel_types", "fuel_status", "queue_status", "estimated_wait", "last_updated" } ]
}

GET /recommendation?lat=X&lng=Y returns:
{
  "recommended": { "_id", "name", "score", "distance_km", "reason", "fuel_status", "queue_status", "estimated_wait", ... }
}

POST /update-status expects:
{ "station_id", "fuel_status", "queue_status", "updated_by" }

If the frontend reads fields differently than backend sends (e.g., "id" vs "_id", "queueStatus" vs "queue_status"), fix whichever side is easier.

STEP 5 — SEED THE DATABASE
- Make sure MongoDB is expected to run on localhost:27017
- Run the seed script to populate data: cd backend && python -m app.seed
- Verify by hitting http://localhost:8000/stations

STEP 6 — CREATE ROOT-LEVEL START SCRIPTS

Create a root-level README.md:

# 🛢️ FuelWise — Fuel Availability & Queue Indicator

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- MongoDB running on localhost:27017

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate         # Windows
pip install -r requirements.txt
python -m app.seed            # Seed database
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

---

Create start_backend.bat (Windows):
@echo off
cd backend
call venv\Scripts\activate
uvicorn app.main:app --reload --port 8000

Create start_frontend.bat (Windows):
@echo off
cd frontend
npm run dev

Create start_all.bat (Windows):
@echo off
echo Starting FuelWise...
start "FuelWise Backend" cmd /k "cd backend && call venv\Scripts\activate && uvicorn app.main:app --reload --port 8000"
timeout /t 3
start "FuelWise Frontend" cmd /k "cd frontend && npm run dev"
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo Swagger: http://localhost:8000/docs

STEP 7 — SMOKE TEST
Run through this checklist and fix any issues:
1. Backend starts without errors on port 8000
2. GET http://localhost:8000/stations returns 10 stations
3. GET http://localhost:8000/recommendation?lat=19.076&lng=72.8777 returns a recommended station
4. Frontend starts without errors on port 5173
5. Map renders with colored circle markers
6. Pump list shows station cards
7. Recommended pump card appears at top of sidebar
8. Clicking "Update Status" opens modal
9. Submitting update changes station status
10. No CORS errors in browser console

STEP 8 — FINAL POLISH
- Make sure the frontend console shows "✅ Connected to live API" when backend is running
- Make sure "Out of Stock" stations show with gray markers and are excluded from recommendation
- Make sure the recommended pump has a visible highlight/glow effect on the map
- Ensure the map doesn't have broken tiles or missing markers
- Add a subtle loading spinner while data is being fetched

IMPORTANT RULES:
- Do NOT rebuild either project from scratch — only fix integration issues
- Keep changes minimal — only touch what's needed for integration
- If something is working, don't change it
- Both servers must run simultaneously (different terminals)
- The app must work fully with the backend running
- The app must ALSO work with mock data if backend is down (graceful fallback)

FINAL DELIVERABLE:
- Both /frontend and /backend folders working together
- Root-level README.md + .bat start scripts
- Fully integrated: map + list + recommendation + update — all hitting live API
- Zero console errors, zero CORS issues
```

---

---

## 📋 Quick Reference: Who Does What

| Step | Who | What | Time |
|---|---|---|---|
| 1 | **Person A** | Copy Prompt 1 → AI → Build frontend on their PC | 0–45 min |
| 2 | **Person B** | Copy Prompt 2 → AI → Build backend on their PC | 0–45 min |
| 3 | **Both** | Share folders (USB / Git / zip) → put on one PC | 45–48 min |
| 4 | **Either** | Copy Prompt 3 → AI → Merge and fix integration | 48–58 min |
| 5 | **Both** | Run through smoke test + demo prep | 58–60 min |

---

> 🛢️ **FuelWise** — *Find fuel. Skip the queue. Drive smart.*
