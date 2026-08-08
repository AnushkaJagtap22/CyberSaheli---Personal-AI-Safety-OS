import time
from datetime import datetime, date
from typing import List, Optional, Dict, Any
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# --- DATA MODELS ---

class CompleteScenarioRequest(BaseModel):
    user_id: Optional[str] = "user_default"
    choice_index: int
    time_taken_sec: Optional[int] = 30

class SubmitQuizRequest(BaseModel):
    user_id: Optional[str] = "user_default"
    selected_option: int

class SubmitDailyChallengeRequest(BaseModel):
    user_id: Optional[str] = "user_default"
    selected_option: int

class AIChallengeRequest(BaseModel):
    topic: str
    difficulty: Optional[str] = 'Beginner'
    language: Optional[str] = 'en'

# --- LEVEL SYSTEM CONFIGURATION ---

LEVEL_TITLES = {
    1: "Beginner",
    2: "Aware",
    3: "Defender",
    4: "Digital Guardian",
    5: "Cyber Smart",
    6: "Threat Spotter",
    7: "Cyber Guardian",
    8: "Safety Strategist",
    9: "Cyber Sentinel",
    10: "CyberSaheli Champion"
}

LEVEL_XP_THRESHOLDS = {
    1: 0,
    2: 500,
    3: 1000,
    4: 1750,
    5: 2500,
    6: 3500,
    7: 4750,
    8: 6000,
    9: 7500,
    10: 9000
}

# IN-MEMORY TRANSACTION LEDGER & STATE (Persisted per session)
user_xp_ledger: List[Dict[str, Any]] = [
    {"user_id": "user_default", "source": "onboarding", "source_id": "welcome", "xp": 250, "timestamp": time.time()},
    {"user_id": "user_default", "source": "mission", "source_id": "mis-01", "xp": 150, "timestamp": time.time()}
]

user_completed_sources: set = {"onboarding_welcome", "mission_mis-01"}
user_last_activity_date: str = str(date.today())
user_streak_count: int = 3

# --- HELPER FUNCTIONS ---

def calculate_user_level_and_xp():
    total_xp = sum(item["xp"] for item in user_xp_ledger if item["user_id"] == "user_default")
    
    current_level = 1
    for lvl in range(1, 11):
        if total_xp >= LEVEL_XP_THRESHOLDS[lvl]:
            current_level = lvl
        else:
            break
            
    next_level = min(10, current_level + 1)
    current_level_base = LEVEL_XP_THRESHOLDS[current_level]
    next_level_target = LEVEL_XP_THRESHOLDS[next_level]
    
    return {
        "total_xp": total_xp,
        "level": current_level,
        "title": LEVEL_TITLES[current_level],
        "next_level": next_level,
        "next_level_title": LEVEL_TITLES[next_level],
        "current_level_base": current_level_base,
        "next_level_target": next_level_target,
        "xp_in_level": total_xp - current_level_base,
        "xp_needed": max(0, next_level_target - total_xp)
    }

def award_xp(user_id: str, source: str, source_id: str, xp_amount: int) -> bool:
    unique_key = f"{source}_{source_id}"
    if unique_key in user_completed_sources:
        return False  # Already completed - no double XP
        
    user_completed_sources.add(unique_key)
    user_xp_ledger.append({
        "user_id": user_id,
        "source": source,
        "source_id": source_id,
        "xp": xp_amount,
        "timestamp": time.time()
    })
    
    # Update streak
    global user_last_activity_date, user_streak_count
    today_str = str(date.today())
    if user_last_activity_date != today_str:
        user_streak_count += 1
        user_last_activity_date = today_str
        
    return True

# --- API ENDPOINTS ---

@router.get("/dashboard")
async def get_learning_dashboard():
    level_info = calculate_user_level_and_xp()
    
    # Completed counts
    missions_completed = len([k for k in user_completed_sources if k.startswith("mission_")])
    quizzes_completed = len([k for k in user_completed_sources if k.startswith("quiz_")])
    challenges_completed = len([k for k in user_completed_sources if k.startswith("daily_")])
    
    return {
        "status": "online",
        "user": {
            "id": "user_default",
            "name": "Anushka Jagtap",
            "level": level_info["level"],
            "title": level_info["title"],
            "total_xp": level_info["total_xp"],
            "xp_needed": level_info["xp_needed"],
            "next_level_target": level_info["next_level_target"],
            "streak": user_streak_count,
            "missions_completed": missions_completed,
            "quizzes_completed": quizzes_completed,
            "challenges_completed": challenges_completed,
            "badges_unlocked": min(8, 2 + missions_completed)
        },
        "skill_mastery": {
            "scam_detection": 80,
            "account_security": 70,
            "financial_safety": 60,
            "privacy": 65,
            "deepfake_awareness": 40
        }
    }

@router.get("/scenarios")
async def get_learning_scenarios():
    scenarios = [
        {
            "id": "mis-01",
            "title": "Amazon Work-From-Home Recruitment Scam",
            "topic": "Recruitment Scam",
            "difficulty": "Beginner",
            "reward_xp": 150,
            "estimated_time": "3 min",
            "is_completed": "mission_mis-01" in user_completed_sources,
            "situation": "A recruiter contacts you on WhatsApp offering ₹50,000/month work-from-home job, but demands ₹1,999 registration fee first.",
            "choices": [
                {"text": "Pay ₹1,999 immediately", "risk_score": 100, "is_correct": False, "explanation": "Never pay money for job offers."},
                {"text": "Ask for a discount", "risk_score": 90, "is_correct": False, "explanation": "Asking for discount does not fix the scam."},
                {"text": "Verify company on official careers portal & report handle", "risk_score": 0, "is_correct": True, "explanation": "Legitimate employers never demand registration deposits."}
            ]
        },
        {
            "id": "mis-02",
            "title": "UPI Collect Request QR Scam",
            "topic": "UPI Fraud",
            "difficulty": "Intermediate",
            "reward_xp": 150,
            "estimated_time": "4 min",
            "is_completed": "mission_mis-02" in user_completed_sources,
            "situation": "A buyer sends a QR code on WhatsApp claiming you must scan it and enter your UPI PIN to RECEIVE ₹4,500 payment.",
            "choices": [
                {"text": "Scan QR code & enter PIN to accept money", "risk_score": 100, "is_correct": False, "explanation": "Entering PIN transfers money OUT of your account."},
                {"text": "Refuse and explain that receiving money requires NO PIN", "risk_score": 0, "is_correct": True, "explanation": "Correct! UPI PIN is ONLY entered when sending money."}
            ]
        },
        {
            "id": "mis-03",
            "title": "AI Voice Clone Emergency Call",
            "topic": "Deepfakes",
            "difficulty": "Advanced",
            "reward_xp": 200,
            "estimated_time": "5 min",
            "is_completed": "mission_mis-03" in user_completed_sources,
            "situation": "An unknown number calls with your friend's synthesized AI voice claiming they had an accident and need ₹15,000 immediately.",
            "choices": [
                {"text": "Transfer money instantly in panic", "risk_score": 100, "is_correct": False, "explanation": "High panic is an indicator of AI voice clone distress fraud."},
                {"text": "Hang up & call friend directly on their saved primary phone number", "risk_score": 0, "is_correct": True, "explanation": "Always call back directly to bypass voice cloning."}
            ]
        }
    ]
    return {"scenarios": scenarios}

@router.post("/scenarios/{scenario_id}/complete")
async def complete_scenario(scenario_id: str, payload: CompleteScenarioRequest):
    awarded = award_xp(payload.user_id or "user_default", "mission", scenario_id, 150)
    level_info = calculate_user_level_and_xp()
    
    return {
        "success": True,
        "xp_awarded": 150 if awarded else 0,
        "already_completed": not awarded,
        "rank": "S" if payload.choice_index == 2 or payload.choice_index == 1 else "B",
        "user": level_info
    }

@router.get("/daily-challenge")
async def get_daily_challenge():
    today_key = f"daily_{str(date.today())}"
    return {
        "id": today_key,
        "is_completed": today_key in user_completed_sources,
        "question": "An Instagram account with 50 followers claims to sell iPhone 15 for ₹12,000 via GPay advance. What is the strongest red flag?",
        "options": [
            "Account has a profile picture",
            "Unrealistic 80% discount + advance GPay requirement",
            "Account posts daily",
            "Account uses hashtags"
        ],
        "correct_index": 1,
        "explanation": "Massive discounts combined with advance non-refundable payment demands are classic social media scam red flags."
    }

@router.post("/daily-challenge/submit")
async def submit_daily_challenge(payload: SubmitDailyChallengeRequest):
    today_key = str(date.today())
    is_correct = (payload.selected_option == 1)
    
    xp_gained = 0
    if is_correct:
        awarded = award_xp(payload.user_id or "user_default", "daily", today_key, 100)
        xp_gained = 100 if awarded else 0
        
    level_info = calculate_user_level_and_xp()
    return {
        "is_correct": is_correct,
        "xp_gained": xp_gained,
        "explanation": "Massive discounts combined with advance non-refundable payment demands are classic social media scam red flags.",
        "user": level_info
    }

@router.get("/achievements")
async def get_achievements():
    achievements = [
        {"id": "ach-01", "title": "First Defender", "desc": "Complete your first safety mission.", "icon": "🛡️", "xp": 100, "unlocked": True},
        {"id": "ach-02", "title": "Scam Spotter", "desc": "Identify 5 scam indicators.", "icon": "🔎", "xp": 150, "unlocked": True},
        {"id": "ach-03", "title": "UPI Guardian", "desc": "Complete all UPI safety scenarios.", "icon": "💳", "xp": 200, "unlocked": "mission_mis-02" in user_completed_sources},
        {"id": "ach-04", "title": "Deepfake Detective", "desc": "Verify an AI voice clone threat.", "icon": "👁️", "xp": 250, "unlocked": "mission_mis-03" in user_completed_sources},
        {"id": "ach-05", "title": "Consistent Defender", "desc": "Maintain a 3-day streak.", "icon": "🔥", "xp": 300, "unlocked": user_streak_count >= 3},
        {"id": "ach-06", "title": "CyberSaheli Champion", "desc": "Reach Level 10.", "icon": "🏆", "xp": 500, "unlocked": False}
    ]
    return {"achievements": achievements}

@router.post("/ai-challenge")
async def generate_ai_challenge(payload: AIChallengeRequest):
    return {
        "title": f"AI Scenario: {payload.topic.title()}",
        "difficulty": payload.difficulty,
        "situation": f"You receive an unsolicited message regarding {payload.topic}. The sender pressures you to act within 5 minutes.",
        "choices": [
            {"text": "Comply with urgent request", "is_correct": False},
            {"text": "Verify identity via official secondary channel", "is_correct": True}
        ],
        "explanation": f"When dealing with unexpected {payload.topic} messages, always verify credentials independently before taking action."
    }
