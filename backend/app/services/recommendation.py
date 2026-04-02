from math import radians, cos, sin, asin, sqrt


def haversine(lat1: float, lng1: float, lat2: float, lng2: float) -> float:
    """Calculate the great-circle distance (km) between two points."""
    lat1, lng1, lat2, lng2 = map(radians, [lat1, lng1, lat2, lng2])
    dlat = lat2 - lat1
    dlng = lng2 - lng1
    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlng / 2) ** 2
    return 2 * 6371 * asin(sqrt(a))


def calculate_score(
    station: dict, user_lat: float, user_lng: float
) -> tuple[float, float]:
    """Return (score, distance_km) for a station relative to the user."""
    fuel_scores = {"Available": 100, "Low": 50, "Out of Stock": 0}
    queue_scores = {"Short": 100, "Medium": 50, "Long": 0}

    fuel_score = fuel_scores.get(station["fuel_status"], 0)
    queue_score = queue_scores.get(station["queue_status"], 0)
    distance = haversine(user_lat, user_lng, station["lat"], station["lng"])
    distance_score = max(0, 100 - (distance * 20))

    total = (0.4 * fuel_score) + (0.35 * queue_score) + (0.25 * distance_score)
    return round(total, 2), round(distance, 2)


def get_recommendation(
    stations: list, user_lat: float, user_lng: float
) -> dict | None:
    """Pick the best station by score, skipping out-of-stock ones."""
    best = None
    best_score = -1

    for s in stations:
        if s.get("fuel_status") == "Out of Stock":
            continue

        score, dist = calculate_score(s, user_lat, user_lng)

        if score > best_score:
            best_score = score
            fuel = s["fuel_status"]
            queue = s["queue_status"]
            best = {
                **s,
                "score": score,
                "distance_km": dist,
                "reason": f"{fuel} fuel, {queue.lower()} queue, {dist} km away",
            }

    return best
