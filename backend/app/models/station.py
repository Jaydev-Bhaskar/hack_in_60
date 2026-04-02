from pydantic import BaseModel
from typing import List, Optional


class StationBase(BaseModel):
    """Base schema for a fuel station."""
    name: str
    address: str
    lat: float
    lng: float
    brand: str
    fuel_types: List[str]
    fuel_status: str        # "Available" | "Low" | "Out of Stock"
    queue_status: str       # "Short" | "Medium" | "Long"
    estimated_wait: int     # minutes


class StationCreate(StationBase):
    """Schema for creating a new station."""
    _id: str


class UpdateStatusRequest(BaseModel):
    """Request body for updating a station's status."""
    station_id: str
    fuel_status: Optional[str] = None
    queue_status: Optional[str] = None
    updated_by: str = "anonymous"


class UpdateHistoryEntry(BaseModel):
    """A single crowd-sourced status update record."""
    fuel_status: Optional[str] = None
    queue_status: Optional[str] = None
    updated_by: str
    timestamp: str
