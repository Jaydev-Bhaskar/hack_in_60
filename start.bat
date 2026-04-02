@echo off
echo Starting FuelWise Backend...
start "FuelWise Backend" cmd /c "cd backend && venv\Scripts\activate.bat && uvicorn app.main:app --reload --port 8000"

echo Starting FuelWise Frontend...
start "FuelWise Frontend" cmd /c "cd frontend && npm run dev"

echo Both apps are booting up! Check new terminal windows.
pause
