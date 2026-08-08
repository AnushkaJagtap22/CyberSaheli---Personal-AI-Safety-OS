import time
from datetime import datetime
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

router = APIRouter()

class ContactModel(BaseModel):
    name: str
    phone: str

class SosLogRequest(BaseModel):
    contact: ContactModel
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    accuracy: Optional[float] = None
    timestamp: Optional[str] = None

# In-memory incident log store
sos_incidents_db: List[Dict[str, Any]] = []

@router.post("/log")
async def log_sos_incident(request: SosLogRequest):
    lat = request.latitude if request.latitude is not None else 18.5204
    lng = request.longitude if request.longitude is not None else 73.8567
    map_link = f"https://www.google.com/maps?q={lat},{lng}"
    time_str = request.timestamp or datetime.now().strftime("%I:%M %p")
    incident_id = f"SOS-{datetime.now().strftime('%Y%m%d')}-{len(sos_incidents_db) + 1:04d}"

    incident = {
        "id": incident_id,
        "timestamp": time_str,
        "contact_name": request.contact.name,
        "contact_phone": request.contact.phone,
        "latitude": lat,
        "longitude": lng,
        "accuracy": request.accuracy or 15,
        "map_link": map_link,
        "status": "COMPLETED"
    }

    sos_incidents_db.append(incident)

    return {
        "success": True,
        "incident_id": incident_id,
        "status": "COMPLETED",
        "map_link": map_link,
        "timestamp": time_str
    }

@router.get("/status")
async def check_sos_backend():
    return {
        "status": "online",
        "service": "CyberSaheli Emergency Dispatch OS (Pure GPS Mode)",
        "total_incidents_logged": len(sos_incidents_db)
    }
