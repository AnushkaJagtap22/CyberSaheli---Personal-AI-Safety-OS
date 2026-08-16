import time
from typing import Optional, Dict, Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class ProfileUpdateRequest(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    language: Optional[str] = None

class NotificationPreferencesRequest(BaseModel):
    safety_alerts: Optional[bool] = True
    learning_reminders: Optional[bool] = True
    security_updates: Optional[bool] = True
    emergency_alerts: Optional[bool] = True

# In-memory user profile data store
user_profile_db: Dict[str, Any] = {
    "id": "usr_001",
    "name": "CyberSaheli User",
    "email": "user@cybersaheli.org",
    "phone": "+91 98765 43210",
    "location": "Pune, Maharashtra",
    "language": "English",
    "avatar_url": None,
    "joined_date": "August 2025",
    "is_protected": True,
    "security_readiness": 82,
    "readiness_breakdown": {
        "account_security": 92,
        "privacy": 78,
        "scam_awareness": 86,
        "emergency_readiness": 74
    },
    "notifications": {
        "safety_alerts": True,
        "learning_reminders": True,
        "security_updates": True,
        "emergency_alerts": True
    }
}

@router.get("/")
async def get_user_profile():
    return {"status": "success", "profile": user_profile_db}

@router.put("/")
async def update_user_profile(payload: ProfileUpdateRequest):
    if payload.name is not None:
        user_profile_db["name"] = payload.name
    if payload.email is not None:
        user_profile_db["email"] = payload.email
    if payload.phone is not None:
        user_profile_db["phone"] = payload.phone
    if payload.location is not None:
        user_profile_db["location"] = payload.location
    if payload.language is not None:
        user_profile_db["language"] = payload.language

    return {"status": "success", "message": "Profile updated successfully.", "profile": user_profile_db}

@router.put("/preferences")
async def update_notification_preferences(payload: NotificationPreferencesRequest):
    user_profile_db["notifications"]["safety_alerts"] = payload.safety_alerts
    user_profile_db["notifications"]["learning_reminders"] = payload.learning_reminders
    user_profile_db["notifications"]["security_updates"] = payload.security_updates
    user_profile_db["notifications"]["emergency_alerts"] = payload.emergency_alerts

    return {"status": "success", "notifications": user_profile_db["notifications"]}

@router.post("/export")
async def export_user_data():
    return {
        "status": "success",
        "export_id": f"EXP-{int(time.time())}",
        "exported_at": time.strftime("%Y-%m-%d %H:%M:%S"),
        "user_summary": user_profile_db
    }
