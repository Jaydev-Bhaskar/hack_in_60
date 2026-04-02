# 🛢️ FuelWise — Fuel Availability & Queue Indicator with Map Congestion View

> **Hackathon Blueprint · 60 Minutes · 2-Person Team**

---

## 📌 Problem Statement

Finding a petrol pump with available fuel and short queues is a daily frustration for millions of drivers, delivery agents, and commuters. During fuel shortages or peak hours, drivers waste time visiting pumps that are either out of fuel or have extremely long queues — causing more congestion, fuel waste, and frustration.

**FuelWise** solves this by providing a **real-time map view** of nearby petrol pumps with **color-coded congestion indicators**, **fuel availability status**, and a **smart recommendation engine** that suggests the best pump based on distance, queue length, and fuel availability.

---

## 💡 Core Idea

A smart, crowd-powered fuel station discovery system that:

1. Shows nearby petrol pumps on an interactive map
2. Displays real-time congestion and fuel availability via color-coded markers
3. Recommends the **optimal pump** (shortest queue + available fuel + closest distance)
4. Allows users to crowd-source status updates

---

## 🎯 Target Users

| User Type | Pain Point | FuelWise Value |
|---|---|---|
| **Daily Commuters** | Waste time at crowded pumps | See queue status before going |
| **Delivery Agents** | Need quick refuels for efficiency | Find fastest available pump |
| **Ride-share Drivers** | Can't afford long pump queues | Smart recommendation saves time |
| **Emergency Vehicles** | Need nearest available fuel ASAP | Emergency mode — nearest with fuel |

---

## ⚙️ Feature Breakdown

### ✅ Core Features (MVP — Must Ship)

| # | Feature | Description | Priority |
|---|---|---|---|
| 1 | **Interactive Map** | Leaflet + OpenStreetMap with pump markers | 🔴 Critical |
| 2 | **Color-coded Congestion** | 🟢 Green (Short) · 🟡 Yellow (Medium) · 🔴 Red (Long) | 🔴 Critical |
| 3 | **Fuel Availability Status** | Badge: `Available` / `Low` / `Out of Stock` | 🔴 Critical |
| 4 | **Pump List View** | Scrollable card list with details | 🔴 Critical |
| 5 | **Recommended Pump** | Algorithm picks best option (score-based) | 🔴 Critical |
| 6 | **Pump Detail View** | Name, address, fuels, queue, last updated | 🟡 Important |

### 🌟 Optional Features (If Time Permits)

| # | Feature | Description | Priority |
|---|---|---|---|
| 7 | **Crowd-source Updates** | Users update queue/fuel status | 🟢 Nice-to-have |
| 8 | **Emergency Mode** | Nearest pump with available fuel | 🟢 Nice-to-have |
| 9 | **Search/Filter** | Filter by fuel type, brand | ⚪ Stretch |

---

## 🧠 System Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                                                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐ │
│  │  Map View     │  │  Pump List   │  │  Recommendation Card   │ │
│  │  (Leaflet)    │  │  (Cards)     │  │  (Best Pump)           │ │
│  └──────┬───────┘  └──────┬───────┘  └────────────┬───────────┘ │
│         │                 │                        │             │
│         └────────────┬────┘────────────────────────┘             │
│                      │                                           │
│              ┌───────▼────────┐                                  │
│              │  API Service   │  (Axios → localhost:8000)        │
│              └───────┬────────┘                                  │
└──────────────────────┼──────────────────────────────────────────┘
                       │  HTTP REST
┌──────────────────────┼──────────────────────────────────────────┐
│                      │         SERVER (FastAPI)                  │
│              ┌───────▼────────┐                                  │
│              │   FastAPI App  │                                   │
│              └───────┬────────┘                                  │
│                      │                                           │
│  ┌───────────────────┼───────────────────────────┐              │
│  │                   │                           │              │
│  ▼                   ▼                           ▼              │
│ /stations      /update-status            /recommendation        │
│ (GET)          (POST)                    (GET)                   │
│  │                   │                           │              │
│  └───────────────────┼───────────────────────────┘              │
│                      │                                           │
│              ┌───────▼────────┐                                  │
│              │  Recommendation│                                  │
│              │  Engine        │  Score = f(queue, fuel, dist)    │
│              └───────┬────────┘                                  │
│                      │                                           │
│              ┌───────▼────────┐                                  │
│              │   MongoDB      │  (stations collection)          │
│              └────────────────┘                                  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure

```
/frontend                         # React App (Vite + Tailwind)
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── MapView.jsx           # Leaflet map with markers
│   │   ├── PumpCard.jsx          # Individual pump card
│   │   ├── PumpList.jsx          # List of pump cards
│   │   ├── RecommendedPump.jsx   # Highlighted best pump
│   │   ├── StatusBadge.jsx       # Fuel/queue status badge
│   │   ├── UpdateModal.jsx       # Crowd-source update form
│   │   └── Navbar.jsx            # Top navigation bar
│   ├── pages/
│   │   └── Home.jsx              # Main page layout
│   ├── services/
│   │   └── api.js                # Axios API calls
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
├── tailwind.config.js
└── vite.config.js

/backend                          # FastAPI App
├── app/
│   ├── main.py                   # FastAPI entry point + CORS
│   ├── routes/
│   │   └── stations.py           # All API route handlers
│   ├── models/
│   │   └── station.py            # Pydantic models
│   ├── services/
│   │   ├── recommendation.py     # Recommendation algorithm
│   │   └── database.py           # MongoDB connection + helpers
│   └── seed.py                   # Seed sample data
├── requirements.txt
└── .env
```

---

## 📡 API Specification

### `GET /stations`

> Fetch all petrol stations with current status.

**Response:**
```json
{
  "stations": [
    {
      "_id": "st_001",
      "name": "HP Fuel Station - Andheri",
      "address": "Andheri West, Mumbai",
      "lat": 19.1196,
      "lng": 72.8466,
      "brand": "HP",
      "fuel_types": ["Petrol", "Diesel"],
      "fuel_status": "Available",
      "queue_status": "Short",
      "estimated_wait": 5,
      "last_updated": "2026-04-02T12:30:00Z"
    }
  ]
}
```

---

### `GET /recommendation?lat={lat}&lng={lng}`

> Get the best pump recommendation based on user's location.

**Query Params:**

| Param | Type | Description |
|---|---|---|
| `lat` | float | User's latitude |
| `lng` | float | User's longitude |

**Response:**
```json
{
  "recommended": {
    "_id": "st_003",
    "name": "Indian Oil - Bandra",
    "score": 92.5,
    "reason": "Available fuel, short queue, 1.2 km away",
    "distance_km": 1.2,
    "estimated_wait": 3,
    "fuel_status": "Available",
    "queue_status": "Short"
  }
}
```

**Scoring Algorithm:**
```
score = (fuel_weight × fuel_score) + (queue_weight × queue_score) + (distance_weight × distance_score)

Where:
  fuel_score    → Available: 100, Low: 50, Out: 0
  queue_score   → Short: 100, Medium: 50, Long: 0
  distance_score → max(0, 100 - (distance_km × 20))

Weights: fuel=0.4, queue=0.35, distance=0.25
```

---

### `POST /update-status`

> Crowd-source update for a station's status.

**Request Body:**
```json
{
  "station_id": "st_001",
  "fuel_status": "Low",
  "queue_status": "Long",
  "updated_by": "anonymous"
}
```

**Response:**
```json
{
  "message": "Status updated successfully",
  "station_id": "st_001",
  "updated_at": "2026-04-02T12:45:00Z"
}
```

---

## 🗄️ MongoDB Schema

### Database: `fuelwise`

### Collection: `stations`

```json
{
  "_id": "st_001",
  "name": "HP Fuel Station - Andheri",
  "address": "Andheri West, Mumbai",
  "lat": 19.1196,
  "lng": 72.8466,
  "brand": "HP",
  "fuel_types": ["Petrol", "Diesel"],
  "fuel_status": "Available",       // "Available" | "Low" | "Out of Stock"
  "queue_status": "Short",          // "Short" | "Medium" | "Long"
  "estimated_wait": 5,              // minutes
  "last_updated": "2026-04-02T12:30:00Z",
  "update_history": [
    {
      "fuel_status": "Available",
      "queue_status": "Medium",
      "updated_by": "user_anon_42",
      "timestamp": "2026-04-02T12:00:00Z"
    }
  ]
}
```

### Sample Seed Data (10 Stations — Mumbai Region)

```json
[
  {
    "_id": "st_001",
    "name": "HP Fuel Station - Andheri",
    "address": "SV Road, Andheri West",
    "lat": 19.1196,
    "lng": 72.8466,
    "brand": "HP",
    "fuel_types": ["Petrol", "Diesel"],
    "fuel_status": "Available",
    "queue_status": "Short",
    "estimated_wait": 5,
    "last_updated": "2026-04-02T12:00:00Z",
    "update_history": []
  },
  {
    "_id": "st_002",
    "name": "Indian Oil - Bandra",
    "address": "Hill Road, Bandra West",
    "lat": 19.0596,
    "lng": 72.8295,
    "brand": "Indian Oil",
    "fuel_types": ["Petrol", "Diesel", "CNG"],
    "fuel_status": "Available",
    "queue_status": "Medium",
    "estimated_wait": 12,
    "last_updated": "2026-04-02T11:45:00Z",
    "update_history": []
  },
  {
    "_id": "st_003",
    "name": "Bharat Petroleum - Dadar",
    "address": "LBS Marg, Dadar East",
    "lat": 19.0178,
    "lng": 72.8478,
    "brand": "BPCL",
    "fuel_types": ["Petrol", "Diesel"],
    "fuel_status": "Low",
    "queue_status": "Long",
    "estimated_wait": 25,
    "last_updated": "2026-04-02T11:30:00Z",
    "update_history": []
  },
  {
    "_id": "st_004",
    "name": "Shell - Powai",
    "address": "Hiranandani, Powai",
    "lat": 19.1176,
    "lng": 72.9060,
    "brand": "Shell",
    "fuel_types": ["Petrol", "Diesel", "Premium"],
    "fuel_status": "Available",
    "queue_status": "Short",
    "estimated_wait": 3,
    "last_updated": "2026-04-02T12:15:00Z",
    "update_history": []
  },
  {
    "_id": "st_005",
    "name": "HP Pump - Goregaon",
    "address": "SV Road, Goregaon West",
    "lat": 19.1663,
    "lng": 72.8494,
    "brand": "HP",
    "fuel_types": ["Petrol", "Diesel"],
    "fuel_status": "Out of Stock",
    "queue_status": "Long",
    "estimated_wait": 0,
    "last_updated": "2026-04-02T10:00:00Z",
    "update_history": []
  },
  {
    "_id": "st_006",
    "name": "Indian Oil - Kurla",
    "address": "LBS Marg, Kurla West",
    "lat": 19.0726,
    "lng": 72.8793,
    "brand": "Indian Oil",
    "fuel_types": ["Petrol", "Diesel"],
    "fuel_status": "Available",
    "queue_status": "Medium",
    "estimated_wait": 10,
    "last_updated": "2026-04-02T12:05:00Z",
    "update_history": []
  },
  {
    "_id": "st_007",
    "name": "BPCL - Juhu",
    "address": "Juhu Tara Road, Juhu",
    "lat": 19.0883,
    "lng": 72.8263,
    "brand": "BPCL",
    "fuel_types": ["Petrol", "Diesel", "CNG"],
    "fuel_status": "Available",
    "queue_status": "Short",
    "estimated_wait": 4,
    "last_updated": "2026-04-02T12:20:00Z",
    "update_history": []
  },
  {
    "_id": "st_008",
    "name": "Nayara - Malad",
    "address": "Link Road, Malad West",
    "lat": 19.1862,
    "lng": 72.8484,
    "brand": "Nayara",
    "fuel_types": ["Petrol", "Diesel"],
    "fuel_status": "Low",
    "queue_status": "Medium",
    "estimated_wait": 15,
    "last_updated": "2026-04-02T11:50:00Z",
    "update_history": []
  },
  {
    "_id": "st_009",
    "name": "Indian Oil - Borivali",
    "address": "Western Express Hwy, Borivali",
    "lat": 19.2288,
    "lng": 72.8567,
    "brand": "Indian Oil",
    "fuel_types": ["Petrol", "Diesel", "CNG"],
    "fuel_status": "Available",
    "queue_status": "Long",
    "estimated_wait": 20,
    "last_updated": "2026-04-02T11:40:00Z",
    "update_history": []
  },
  {
    "_id": "st_010",
    "name": "Shell - Vile Parle",
    "address": "SV Road, Vile Parle East",
    "lat": 19.0996,
    "lng": 72.8567,
    "brand": "Shell",
    "fuel_types": ["Petrol", "Diesel", "Premium"],
    "fuel_status": "Available",
    "queue_status": "Short",
    "estimated_wait": 2,
    "last_updated": "2026-04-02T12:25:00Z",
    "update_history": []
  }
]
```

---

## 🔌 Integration Contract

| Property | Value |
|---|---|
| **Backend URL** | `http://localhost:8000` |
| **CORS Origin** | `http://localhost:5173` (Vite dev) |
| **API Format** | JSON |
| **Auth** | None (hackathon MVP) |

### Frontend → Backend Connection (Axios)

```javascript
// /frontend/src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const getStations = () => API.get("/stations");
export const getRecommendation = (lat, lng) =>
  API.get(`/recommendation?lat=${lat}&lng=${lng}`);
export const updateStatus = (data) => API.post("/update-status", data);
```

---

## ⚡ Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Frontend Framework** | React 18 (Vite) | Fast dev, component-based |
| **Styling** | Tailwind CSS | Rapid UI, utility-first |
| **Map** | Leaflet + react-leaflet | Free, no API key |
| **HTTP Client** | Axios | Clean API calls |
| **Backend Framework** | FastAPI (Python) | Fast, async, auto-docs |
| **Database** | MongoDB | Flexible schema, quick setup |
| **ODM** | Motor (async) | Async MongoDB for FastAPI |
| **CORS** | FastAPI middleware | Cross-origin frontend calls |

---

## 🚀 60-Minute Build Strategy

### 🧑‍💻 Person A — Frontend (React + Map)

| Time | Task | Deliverable |
|---|---|---|
| **0–5 min** | Scaffold Vite + React + Tailwind | Working dev server |
| **5–10 min** | Install leaflet, react-leaflet, axios | Dependencies ready |
| **10–20 min** | Build `MapView.jsx` with hardcoded markers | Map rendering with colored markers |
| **20–30 min** | Build `PumpCard.jsx` + `PumpList.jsx` | Pump list sidebar |
| **30–35 min** | Build `StatusBadge.jsx` | Color-coded badges |
| **35–40 min** | Build `RecommendedPump.jsx` | Highlighted recommendation card |
| **40–45 min** | Create `api.js` service + wire to backend | Live data on map |
| **45–50 min** | Build `UpdateModal.jsx` (if time) | Crowd-source input |
| **50–60 min** | Polish UI, responsive, fix bugs | Demo-ready frontend |

### 🧑‍💻 Person B — Backend (FastAPI + MongoDB)

| Time | Task | Deliverable |
|---|---|---|
| **0–5 min** | Init project, install FastAPI + Motor | Server running |
| **5–10 min** | Setup MongoDB connection + `.env` | DB connected |
| **10–15 min** | Create station Pydantic model | Schema ready |
| **15–20 min** | Write `seed.py` + seed 10 stations | Sample data in DB |
| **20–30 min** | Build `GET /stations` route | Returns all stations |
| **30–40 min** | Build `GET /recommendation` with scoring | Smart recommendation |
| **40–45 min** | Build `POST /update-status` route | Crowd updates working |
| **45–50 min** | Add CORS + test all endpoints | API ready for frontend |
| **50–55 min** | Integration test with frontend | End-to-end working |
| **55–60 min** | Final fixes + prep demo | Demo-ready backend |

---

## 🔄 User Flow

```
 ┌─────────────┐
 │  Open App   │
 └──────┬──────┘
        │
        ▼
 ┌─────────────────────────────────────────┐
 │  🗺️ Map View loads with pump markers    │
 │  (🟢 Green  🟡 Yellow  🔴 Red)          │
 └──────┬──────────────────────────────────┘
        │
        ├──────────────────┐
        │                  │
        ▼                  ▼
 ┌──────────────┐  ┌──────────────────┐
 │ Click marker │  │ View Pump List   │
 │ → See popup  │  │ → Scroll cards   │
 └──────┬───────┘  └───────┬──────────┘
        │                  │
        └────────┬─────────┘
                 │
                 ▼
 ┌───────────────────────────────────┐
 │  ⭐ See "Recommended Pump" card   │
 │  (Best score: fuel + queue + dist)│
 └──────┬────────────────────────────┘
        │
        ▼
 ┌───────────────────────────┐
 │  📝 Update Status (opt.)  │
 │  → Report queue/fuel      │
 └───────────────────────────┘
```

---

## 🎨 UI Design Guide

### Color System

| Element | Color | Hex | Usage |
|---|---|---|---|
| **Short Queue** | 🟢 Green | `#22c55e` | Marker + badge |
| **Medium Queue** | 🟡 Yellow/Amber | `#f59e0b` | Marker + badge |
| **Long Queue** | 🔴 Red | `#ef4444` | Marker + badge |
| **Available Fuel** | 🟢 Green | `#16a34a` | Fuel badge |
| **Low Fuel** | 🟠 Orange | `#ea580c` | Fuel badge |
| **Out of Stock** | ⚫ Gray | `#6b7280` | Fuel badge |
| **Background** | Dark slate | `#0f172a` | App background |
| **Card BG** | Slate | `#1e293b` | Pump cards |
| **Primary** | Blue | `#3b82f6` | Buttons, accents |
| **Text** | White | `#f8fafc` | Primary text |

### Map Marker Styling

```javascript
// Custom marker colors based on queue status
const getMarkerColor = (queueStatus) => {
  switch (queueStatus) {
    case "Short":  return "#22c55e"; // Green
    case "Medium": return "#f59e0b"; // Yellow
    case "Long":   return "#ef4444"; // Red
    default:       return "#6b7280"; // Gray
  }
};
```

### Component Layout

```
┌─────────────────────────────────────────────────────┐
│  🛢️ FuelWise              📍 Mumbai    [🚨 Emergency] │  ← Navbar
├────────────────────────────────┬────────────────────┤
│                                │                    │
│                                │  ⭐ Recommended    │
│                                │  ┌──────────────┐ │
│        🗺️ MAP VIEW             │  │ Shell - Powai │ │
│                                │  │ 🟢 Short  ⛽ ✓ │ │
│   🟢        🟡                  │  │ ~3 min wait  │ │
│        🔴        🟢             │  └──────────────┘ │
│                                │                    │
│   🟡             🟢             │  📋 All Pumps     │
│                                │  ┌──────────────┐ │
│        🟢   🔴                  │  │ HP - Andheri │ │
│                                │  │ 🟢 Short  ⛽ ✓ │ │
│                                │  ├──────────────┤ │
│                                │  │ IO - Bandra  │ │
│                                │  │ 🟡 Med   ⛽ ✓  │ │
│                                │  ├──────────────┤ │
│                                │  │ BP - Dadar   │ │
│                                │  │ 🔴 Long  ⛽ ↓  │ │
│                                │  └──────────────┘ │
└────────────────────────────────┴────────────────────┘
```

---

## 🔧 Quick Setup Commands

### Frontend Setup

```bash
# Create React app with Vite
npm create vite@latest frontend -- --template react
cd frontend
npm install

# Install dependencies
npm install leaflet react-leaflet axios
npm install -D tailwindcss @tailwindcss/vite

# Start dev server
npm run dev
```

### Backend Setup

```bash
# Create virtual environment
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

# Install dependencies
pip install fastapi uvicorn motor python-dotenv pydantic

# Run server
uvicorn app.main:app --reload --port 8000
```

### MongoDB

```bash
# Make sure MongoDB is running locally on default port 27017
# Or use MongoDB Atlas connection string in .env

# .env file
MONGO_URI=mongodb://localhost:27017
DB_NAME=fuelwise
```

---

## 🧪 Key Code Snippets

### Backend — FastAPI Entry Point

```python
# /backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.stations import router as station_router

app = FastAPI(title="FuelWise API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(station_router)

@app.get("/")
async def root():
    return {"message": "FuelWise API is running 🛢️"}
```

### Backend — Recommendation Engine

```python
# /backend/app/services/recommendation.py
from math import radians, cos, sin, asin, sqrt

def haversine(lat1, lng1, lat2, lng2):
    lat1, lng1, lat2, lng2 = map(radians, [lat1, lng1, lat2, lng2])
    dlat = lat2 - lat1
    dlng = lng2 - lng1
    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlng/2)**2
    return 2 * 6371 * asin(sqrt(a))  # km

def calculate_score(station, user_lat, user_lng):
    fuel_scores = {"Available": 100, "Low": 50, "Out of Stock": 0}
    queue_scores = {"Short": 100, "Medium": 50, "Long": 0}

    fuel_score = fuel_scores.get(station["fuel_status"], 0)
    queue_score = queue_scores.get(station["queue_status"], 0)
    distance = haversine(user_lat, user_lng, station["lat"], station["lng"])
    distance_score = max(0, 100 - (distance * 20))

    total = (0.4 * fuel_score) + (0.35 * queue_score) + (0.25 * distance_score)
    return round(total, 2), round(distance, 2)

def get_recommendation(stations, user_lat, user_lng):
    best = None
    best_score = -1
    for s in stations:
        if s["fuel_status"] == "Out of Stock":
            continue
        score, dist = calculate_score(s, user_lat, user_lng)
        if score > best_score:
            best_score = score
            best = {**s, "score": score, "distance_km": dist}
    return best
```

### Backend — Routes

```python
# /backend/app/routes/stations.py
from fastapi import APIRouter, Query
from app.services.database import get_all_stations, update_station_status
from app.services.recommendation import get_recommendation
from datetime import datetime, timezone

router = APIRouter()

@router.get("/stations")
async def list_stations():
    stations = await get_all_stations()
    return {"stations": stations}

@router.get("/recommendation")
async def recommend(lat: float = Query(...), lng: float = Query(...)):
    stations = await get_all_stations()
    best = get_recommendation(stations, lat, lng)
    if not best:
        return {"recommended": None, "message": "No available stations"}
    return {"recommended": best}

@router.post("/update-status")
async def update_status(data: dict):
    result = await update_station_status(
        station_id=data["station_id"],
        fuel_status=data.get("fuel_status"),
        queue_status=data.get("queue_status"),
        updated_by=data.get("updated_by", "anonymous")
    )
    return {
        "message": "Status updated successfully",
        "station_id": data["station_id"],
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
```

### Backend — Database Service

```python
# /backend/app/services/database.py
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from datetime import datetime, timezone
import os

load_dotenv()

client = AsyncIOMotorClient(os.getenv("MONGO_URI", "mongodb://localhost:27017"))
db = client[os.getenv("DB_NAME", "fuelwise")]
stations_col = db["stations"]

async def get_all_stations():
    stations = []
    async for s in stations_col.find():
        s["_id"] = str(s["_id"])
        stations.append(s)
    return stations

async def update_station_status(station_id, fuel_status, queue_status, updated_by):
    update = {"last_updated": datetime.now(timezone.utc).isoformat()}
    if fuel_status:
        update["fuel_status"] = fuel_status
    if queue_status:
        update["queue_status"] = queue_status

    history_entry = {
        "fuel_status": fuel_status,
        "queue_status": queue_status,
        "updated_by": updated_by,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

    await stations_col.update_one(
        {"_id": station_id},
        {"$set": update, "$push": {"update_history": history_entry}}
    )
```

### Frontend — MapView Component

```jsx
// /frontend/src/components/MapView.jsx
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const getColor = (queue) => {
  if (queue === "Short") return "#22c55e";
  if (queue === "Medium") return "#f59e0b";
  return "#ef4444";
};

export default function MapView({ stations, onSelect }) {
  return (
    <MapContainer center={[19.076, 72.8777]} zoom={12}
      className="w-full h-full rounded-xl">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />
      {stations.map((s) => (
        <CircleMarker key={s._id}
          center={[s.lat, s.lng]}
          radius={12}
          fillColor={getColor(s.queue_status)}
          fillOpacity={0.9}
          stroke={true}
          color="#fff"
          weight={2}
          eventHandlers={{ click: () => onSelect(s) }}
        >
          <Popup>
            <strong>{s.name}</strong><br/>
            Fuel: {s.fuel_status}<br/>
            Queue: {s.queue_status}<br/>
            Wait: ~{s.estimated_wait} min
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
```

---

## 🎤 Demo Script (3-Minute Pitch)

### Slide 1 — Problem (30 sec)
> "Every day, millions waste time driving to pumps that are out of fuel or have huge queues. There's no way to know before you go."

### Slide 2 — Solution (30 sec)
> "FuelWise shows you real-time fuel availability and queue congestion on an interactive map. Green means go, red means avoid."

### Slide 3 — Live Demo (90 sec)
1. **Open app** → Show the map with colored markers across Mumbai
2. **Click a green marker** → Show popup with station details
3. **Point out red markers** → "These pumps have long queues — avoid them"
4. **Show Recommended Pump card** → "Our algorithm scores pumps on fuel availability, queue length, and distance to find the best option"
5. **Show pump list** → "Users can also browse all pumps in a list view"
6. **Update status** (if implemented) → "Crowd-sourced updates keep data fresh"

### Slide 4 — Tech & Impact (30 sec)
> "Built with React, Leaflet, FastAPI, and MongoDB. Our smart recommendation engine uses a weighted scoring algorithm. With crowd-sourcing, data stays real-time. This can save commuters 15-20 minutes daily and reduce road congestion near fuel stations."

---

## 🏆 Judging Criteria Alignment

| Criteria | How FuelWise Addresses It |
|---|---|
| **Innovation** | Crowd-sourced real-time fuel intelligence + smart recommendation |
| **Technical Complexity** | Full-stack: React map + FastAPI + MongoDB + scoring algorithm |
| **UI/UX** | Beautiful dark-themed map with color-coded markers |
| **Completeness** | Working MVP with all core features |
| **Impact** | Saves time, reduces congestion, helps during fuel crises |
| **Scalability** | MongoDB + async FastAPI = scales to thousands of stations |

---

## ⚠️ Common Pitfalls & Fixes

| Issue | Fix |
|---|---|
| Leaflet CSS not loading | Import `leaflet/dist/leaflet.css` in component |
| CORS errors | Add `CORSMiddleware` in FastAPI with correct origin |
| Map not rendering | Set explicit height on map container (`h-[calc(100vh-4rem)]`) |
| MongoDB connection fails | Check if `mongod` service is running |
| Markers not showing | Ensure lat/lng are numbers, not strings |
| Tailwind not applying | Check `tailwind.config.js` content paths |

---

## 📝 Requirements Files

### `/backend/requirements.txt`

```
fastapi==0.115.0
uvicorn==0.30.0
motor==3.5.0
python-dotenv==1.0.0
pydantic==2.9.0
```

### `/frontend/package.json` (key dependencies)

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1",
    "axios": "^1.7.0"
  },
  "devDependencies": {
    "tailwindcss": "^4.0.0",
    "@tailwindcss/vite": "^4.0.0"
  }
}
```

---

> **🛢️ FuelWise** — *Find fuel. Skip the queue. Drive smart.*
