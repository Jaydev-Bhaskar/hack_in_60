from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.stations import router as station_router

app = FastAPI(
    title="FuelWise API",
    description="Smart fuel station finder with real-time congestion & recommendation engine 🛢️",
    version="1.0.0",
)

# CORS — allow frontend dev servers and all origins for hackathon
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(station_router)


@app.get("/", tags=["Health"])
async def root():
    """Health check endpoint."""
    return {"message": "FuelWise API is running 🛢️", "version": "1.0.0"}
