from fastapi import APIRouter, Query, HTTPException
from datetime import datetime, timezone

from app.models.station import UpdateStatusRequest
from app.services.database import (
    get_all_stations,
    get_station_by_id,
    update_station_status,
)
from app.services.recommendation import get_recommendation

router = APIRouter(tags=["Stations"])


@router.get("/stations")
async def list_stations():
    """Fetch all fuel stations with their current status."""
    try:
        stations = await get_all_stations()
        return {"stations": stations, "count": len(stations)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/stations/{station_id}")
async def get_station(station_id: str):
    """Fetch a single station by its ID."""
    station = await get_station_by_id(station_id)
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")
    return station


@router.get("/recommendation")
async def recommend(
    lat: float = Query(..., description="User latitude"),
    lng: float = Query(..., description="User longitude"),
):
    """Get the best fuel station recommendation based on user location."""
    try:
        stations = await get_all_stations()
        best = get_recommendation(stations, lat, lng)
        if not best:
            return {"recommended": None, "message": "No available stations found"}
        return {"recommended": best}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/update-status")
async def update_status(data: UpdateStatusRequest):
    """Crowd-source update: let users report fuel/queue status."""
    # Verify station exists
    station = await get_station_by_id(data.station_id)
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")

    success = await update_station_status(
        station_id=data.station_id,
        fuel_status=data.fuel_status,
        queue_status=data.queue_status,
        updated_by=data.updated_by,
    )

    if not success:
        raise HTTPException(status_code=500, detail="Failed to update status")

    return {
        "message": "Status updated successfully",
        "station_id": data.station_id,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
