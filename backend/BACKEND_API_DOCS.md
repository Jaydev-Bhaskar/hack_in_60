# 🛢️ FuelWise Backend — Full API Documentation for Frontend Team

> **Backend is LIVE at:** `http://localhost:8000`
> **Swagger UI:** `http://localhost:8000/docs`
> **Database:** MongoDB Atlas (10 stations seeded)
> **CORS:** All origins allowed — frontend can call from any port

---

## 🔌 Connection Setup (Frontend)

```javascript
// src/services/api.js
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

## 📡 API Endpoints — Exact Responses

---

### 1. `GET /` — Health Check

**URL:** `http://localhost:8000/`

**Response:**
```json
{
  "message": "FuelWise API is running 🛢️",
  "version": "1.0.0"
}
```

---

### 2. `GET /stations` — List All Stations

**URL:** `http://localhost:8000/stations`

**Response Shape:**
```json
{
  "stations": [ ...array of station objects... ],
  "count": 10
}
```

**Single Station Object Shape (EXACT fields):**
```json
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
}
```

**Field Reference:**

| Field | Type | Possible Values | Description |
|---|---|---|---|
| `_id` | string | `"st_001"` to `"st_010"` | Unique station ID |
| `name` | string | — | Station display name |
| `address` | string | — | Street address |
| `lat` | float | `19.0178` – `19.2288` | Latitude |
| `lng` | float | `72.8263` – `72.9060` | Longitude |
| `brand` | string | `"HP"`, `"Indian Oil"`, `"BPCL"`, `"Shell"`, `"Nayara"` | Fuel brand |
| `fuel_types` | string[] | `"Petrol"`, `"Diesel"`, `"CNG"`, `"Premium"` | Available fuel types |
| `fuel_status` | string | `"Available"` \| `"Low"` \| `"Out of Stock"` | Current fuel availability |
| `queue_status` | string | `"Short"` \| `"Medium"` \| `"Long"` | Current queue congestion |
| `estimated_wait` | int | `0` – `25` | Wait time in minutes |
| `last_updated` | string | ISO 8601 timestamp | Last status update time |
| `update_history` | array | Array of update objects | Crowd-sourced update log |

**ACTUAL RESPONSE (live from server):**
```json
{
  "stations": [
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
      "lng": 72.906,
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
  ],
  "count": 10
}
```

---

### 3. `GET /stations/{station_id}` — Get Single Station

**URL:** `http://localhost:8000/stations/st_004`

**Response** (same shape as one station object above):
```json
{
  "_id": "st_004",
  "name": "Shell - Powai",
  "address": "Hiranandani, Powai",
  "lat": 19.1176,
  "lng": 72.906,
  "brand": "Shell",
  "fuel_types": ["Petrol", "Diesel", "Premium"],
  "fuel_status": "Available",
  "queue_status": "Short",
  "estimated_wait": 3,
  "last_updated": "2026-04-02T12:15:00Z",
  "update_history": []
}
```

**Error (station not found):**
```json
{
  "detail": "Station not found"
}
```
HTTP Status: `404`

---

### 4. `GET /recommendation?lat={lat}&lng={lng}` — Smart Recommendation

**URL:** `http://localhost:8000/recommendation?lat=19.076&lng=72.8777`

**Query Parameters:**

| Param | Type | Required | Description |
|---|---|---|---|
| `lat` | float | YES | User's current latitude |
| `lng` | float | YES | User's current longitude |

**Default user location (Mumbai center):** `lat=19.076`, `lng=72.8777`

**Response Shape:**
```json
{
  "recommended": {
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
    "update_history": [],
    "score": 82.86,
    "distance_km": 3.43,
    "reason": "Available fuel, short queue, 3.43 km away"
  }
}
```

**Extra fields on recommended station (NOT on regular stations):**

| Field | Type | Description |
|---|---|---|
| `score` | float | 0–100 recommendation score |
| `distance_km` | float | Distance from user in kilometers |
| `reason` | string | Human-readable explanation |

**If no stations available:**
```json
{
  "recommended": null,
  "message": "No available stations found"
}
```

**Scoring Algorithm (for reference):**
```
score = (0.40 × fuel_score) + (0.35 × queue_score) + (0.25 × distance_score)

fuel_score:     Available = 100, Low = 50, Out of Stock = 0 (skipped)
queue_score:    Short = 100, Medium = 50, Long = 0
distance_score: max(0, 100 - (distance_km × 20))
```

---

### 5. `POST /update-status` — Crowd-Source Status Update

**URL:** `http://localhost:8000/update-status`
**Method:** `POST`
**Content-Type:** `application/json`

**Request Body:**
```json
{
  "station_id": "st_001",
  "fuel_status": "Low",
  "queue_status": "Long",
  "updated_by": "anonymous"
}
```

**Request Fields:**

| Field | Type | Required | Possible Values |
|---|---|---|---|
| `station_id` | string | YES | `"st_001"` to `"st_010"` |
| `fuel_status` | string | NO | `"Available"` \| `"Low"` \| `"Out of Stock"` |
| `queue_status` | string | NO | `"Short"` \| `"Medium"` \| `"Long"` |
| `updated_by` | string | NO (default: `"anonymous"`) | Any string |

**Success Response:**
```json
{
  "message": "Status updated successfully",
  "station_id": "st_001",
  "updated_at": "2026-04-02T07:45:00.123456+00:00"
}
```

**Error (station not found):**
```json
{
  "detail": "Station not found"
}
```
HTTP Status: `404`

**Axios call example:**
```javascript
await API.post("/update-status", {
  station_id: "st_001",
  fuel_status: "Low",
  queue_status: "Long",
  updated_by: "anonymous"
});
```

---

## 🎨 Frontend Color Mapping Guide

Use these exact field values to map colors:

### Queue Status → Map Marker Colors

| `queue_status` value | Color | Hex | Meaning |
|---|---|---|---|
| `"Short"` | 🟢 Green | `#22c55e` | Short queue, go here |
| `"Medium"` | 🟡 Yellow | `#f59e0b` | Moderate wait |
| `"Long"` | 🔴 Red | `#ef4444` | Avoid if possible |

```javascript
const getMarkerColor = (queue_status) => {
  switch (queue_status) {
    case "Short":  return "#22c55e";
    case "Medium": return "#f59e0b";
    case "Long":   return "#ef4444";
    default:       return "#6b7280";
  }
};
```

### Fuel Status → Badge Colors

| `fuel_status` value | Color | Hex | Label |
|---|---|---|---|
| `"Available"` | 🟢 Green | `#16a34a` | Available |
| `"Low"` | 🟠 Orange | `#ea580c` | Low |
| `"Out of Stock"` | ⚫ Gray | `#6b7280` | Out of Stock |

```javascript
const getFuelBadgeColor = (fuel_status) => {
  switch (fuel_status) {
    case "Available":    return "#16a34a";
    case "Low":          return "#ea580c";
    case "Out of Stock": return "#6b7280";
    default:             return "#6b7280";
  }
};
```

---

## 🗺️ Map Configuration

**All stations are in Mumbai, India.**

| Setting | Value |
|---|---|
| **Map Center** | `[19.076, 72.8777]` |
| **Zoom Level** | `12` |
| **Lat Range** | `19.0178` (south) to `19.2288` (north) |
| **Lng Range** | `72.8263` (west) to `72.9060` (east) |

**Dark Map Tiles (recommended):**
```
https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png
```

**Standard Map Tiles (alternative):**
```
https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
```

---

## 📊 All 10 Stations — Quick Reference

| ID | Name | Brand | Fuel Status | Queue | Wait | Lat | Lng |
|---|---|---|---|---|---|---|---|
| st_001 | HP Fuel Station - Andheri | HP | Available | Short | 5 min | 19.1196 | 72.8466 |
| st_002 | Indian Oil - Bandra | Indian Oil | Available | Medium | 12 min | 19.0596 | 72.8295 |
| st_003 | Bharat Petroleum - Dadar | BPCL | Low | Long | 25 min | 19.0178 | 72.8478 |
| st_004 | Shell - Powai | Shell | Available | Short | 3 min | 19.1176 | 72.9060 |
| st_005 | HP Pump - Goregaon | HP | Out of Stock | Long | 0 min | 19.1663 | 72.8494 |
| st_006 | Indian Oil - Kurla | Indian Oil | Available | Medium | 10 min | 19.0726 | 72.8793 |
| st_007 | BPCL - Juhu | BPCL | Available | Short | 4 min | 19.0883 | 72.8263 |
| st_008 | Nayara - Malad | Nayara | Low | Medium | 15 min | 19.1862 | 72.8484 |
| st_009 | Indian Oil - Borivali | Indian Oil | Available | Long | 20 min | 19.2288 | 72.8567 |
| st_010 | Shell - Vile Parle | Shell | Available | Short | 2 min | 19.0996 | 72.8567 |

**Summary:** 6 Available, 2 Low, 1 Out of Stock | 4 Short, 3 Medium, 3 Long queues

---

## ⚠️ Important Notes for Frontend Dev

1. **Field names use snake_case** — `fuel_status`, `queue_status`, `estimated_wait`, `last_updated`, `distance_km`. NOT camelCase.

2. **`_id` is a string** (e.g. `"st_001"`), not a MongoDB ObjectId. Use it directly as a key.

3. **`recommended` object has 3 extra fields** that normal stations don't: `score`, `distance_km`, `reason`. Check for these before rendering.

4. **`recommended` can be `null`** if all stations are out of stock. Always handle this case.

5. **`fuel_types` is an array** — some stations have 2 types, some have 3. Use `.join(", ")` to display.

6. **`update_history` is an array** — usually empty. You can ignore it in the UI unless you want to show history.

7. **`estimated_wait` is in minutes** — display as "~5 min" or "5 min wait".

8. **`last_updated` is ISO 8601** — parse with `new Date(station.last_updated)` to show "X min ago".

9. **CORS is fully open** — no auth needed, no headers required. Just call the URLs directly.

10. **Station `st_005` is "Out of Stock"** — its marker should be gray and it should NOT appear in recommendations.

---

## 🧪 Quick Test URLs (paste in browser)

```
http://localhost:8000/
http://localhost:8000/stations
http://localhost:8000/stations/st_001
http://localhost:8000/stations/st_004
http://localhost:8000/recommendation?lat=19.076&lng=72.8777
http://localhost:8000/recommendation?lat=19.12&lng=72.85
http://localhost:8000/docs
```

---

## 📱 Frontend Component → API Mapping

| Component | API Call | Data Used |
|---|---|---|
| `MapView.jsx` | `getStations()` | `stations[]` → `.lat`, `.lng`, `.queue_status` for marker color |
| `PumpCard.jsx` | (from parent) | Single station object → all fields |
| `PumpList.jsx` | `getStations()` | `stations[]` → render list of `PumpCard` |
| `RecommendedPump.jsx` | `getRecommendation(lat, lng)` | `recommended` → `.name`, `.score`, `.reason`, `.distance_km` |
| `StatusBadge.jsx` | (from parent) | `.fuel_status` or `.queue_status` → badge color |
| `UpdateModal.jsx` | `updateStatus(data)` | POST body: `station_id`, `fuel_status`, `queue_status` |
| `Navbar.jsx` | — | Static, no API call |

---

> **Backend is running. Frontend just needs to call `http://localhost:8000` and use the exact field names above. No auth, no API keys, no token — just fetch and render.**
