from fastapi import APIRouter, Query, HTTPException, Header
from datetime import datetime, timezone

from app.models.station import UpdateStatusRequest, StationCreate
from app.services.database import (
    get_all_stations,
    get_station_by_id,
    update_station_status,
    add_station,
    delete_station
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
async def update_status(
    data: UpdateStatusRequest,
    x_role: str = Header("user", description="user, operator, or admin"),
    x_station_id: str | None = Header(None, description="Assigned station id for operator")
):
    """Crowd-source update: handle user, operator, and admin logic."""
    station = await get_station_by_id(data.station_id)
    if not station:
        raise HTTPException(status_code=404, detail="Station not found")

    # RBAC rules
    if x_role == "operator":
        if x_station_id != data.station_id:
            raise HTTPException(status_code=403, detail="Operator can only update their assigned station")
    elif x_role == "user":
        # Users might only be allowed to update queue_status, or their fuel_status updates are just history
        pass
    # Admin can update everything.

    success = await update_station_status(
        station_id=data.station_id,
        fuel_status=data.fuel_status,
        queue_status=data.queue_status,
        updated_by=f"{x_role} - {data.updated_by}",
    )

    if not success:
        raise HTTPException(status_code=500, detail="Failed to update status")

    return {
        "message": "Status updated successfully",
        "station_id": data.station_id,
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }


@router.post("/stations", status_code=201)
async def create_station(
    station_data: StationCreate, 
    x_role: str = Header("user")
):
    """Admin only: Add a new station to the live map."""
    if x_role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can perform this action.")
    
    new_id = await add_station(station_data.model_dump())
    return {"message": "Station created", "_id": new_id}


@router.delete("/stations/{station_id}")
async def remove_station(
    station_id: str,
    x_role: str = Header("user")
):
    """Admin only: Remove a station."""
    if x_role != "admin":
        raise HTTPException(status_code=403, detail="Only admins can perform this action.")
    
    success = await delete_station(station_id)
    if not success:
        raise HTTPException(status_code=404, detail="Station not found")
        
    return {"message": "Station removed successfully"}
