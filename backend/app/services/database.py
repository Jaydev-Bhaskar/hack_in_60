from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from datetime import datetime, timezone
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "fuelwise")

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
stations_col = db["stations"]


async def get_all_stations() -> list:
    """Fetch all stations from MongoDB."""
    stations = []
    async for doc in stations_col.find():
        doc["_id"] = str(doc["_id"])
        stations.append(doc)
    return stations


async def get_station_by_id(station_id: str) -> dict | None:
    """Fetch a single station by its _id."""
    doc = await stations_col.find_one({"_id": station_id})
    if doc:
        doc["_id"] = str(doc["_id"])
    return doc


async def update_station_status(
    station_id: str,
    fuel_status: str | None,
    queue_status: str | None,
    updated_by: str,
) -> bool:
    """Update a station's fuel/queue status and push to history."""
    now = datetime.now(timezone.utc).isoformat()

    set_fields: dict = {"last_updated": now}
    if fuel_status:
        set_fields["fuel_status"] = fuel_status
    if queue_status:
        set_fields["queue_status"] = queue_status

    history_entry = {
        "fuel_status": fuel_status,
        "queue_status": queue_status,
        "updated_by": updated_by,
        "timestamp": now,
    }

    result = await stations_col.update_one(
        {"_id": station_id},
        {"$set": set_fields, "$push": {"update_history": history_entry}},
    )
    return result.modified_count > 0


async def seed_stations(stations_list: list) -> int:
    """Drop existing data and insert seed stations."""
    await stations_col.drop()
    if stations_list:
        result = await stations_col.insert_many(stations_list)
        return len(result.inserted_ids)
    return 0

async def add_station(station_data: dict) -> str:
    """Admin function: Add a new station"""
    from datetime import datetime, timezone
    station_data["last_updated"] = datetime.now(timezone.utc).isoformat()
    station_data["update_history"] = []
    # Use the custom _id if provided, else rely on mongodb
    if "id" in station_data:
        station_data["_id"] = station_data.pop("id")
        
    result = await stations_col.insert_one(station_data)
    return str(result.inserted_id)

async def delete_station(station_id: str) -> bool:
    """Admin function: Delete a station"""
    result = await stations_col.delete_one({"_id": station_id})
    return result.deleted_count > 0
