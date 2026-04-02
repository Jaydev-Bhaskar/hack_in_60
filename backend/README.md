# 🛢️ FuelWise — Backend API

## Quick Start

```bash
# 1. Create virtual environment
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac/Linux

# 2. Install dependencies
pip install -r requirements.txt

# 3. Update .env with your MongoDB Atlas password
# Edit .env → replace YOUR_PASSWORD_HERE

# 4. Seed the database
python -m app.seed

# 5. Start the server
uvicorn app.main:app --reload --port 8000
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/stations` | List all stations |
| GET | `/stations/{id}` | Get single station |
| GET | `/recommendation?lat=X&lng=Y` | Best pump recommendation |
| POST | `/update-status` | Crowd-source status update |

## Swagger Docs

Open http://localhost:8000/docs after starting the server.
