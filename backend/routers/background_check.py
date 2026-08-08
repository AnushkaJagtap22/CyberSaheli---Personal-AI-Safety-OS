from fastapi import APIRouter
from models.schemas import BackgroundCheckRequest, BackgroundCheckResponse
import random

router = APIRouter()

@router.post("/analyze", response_model=BackgroundCheckResponse)
async def analyze_profile(request: BackgroundCheckRequest):
    # Mock analysis logic based on provided inputs
    
    has_multiple_links = sum([1 for link in [request.instagram_url, request.facebook_url, request.linkedin_url] if link]) > 1
    
    if request.username and "scam" in request.username.lower():
        overall_risk_score = 90
        profile_authenticity = 10
        identity_consistency = 20
        scam_indicators = 95
        red_flags = ["Username matches known scam patterns", "No consistent digital footprint"]
        positive_signals = []
    elif has_multiple_links:
        overall_risk_score = 15
        profile_authenticity = 85
        identity_consistency = 90
        scam_indicators = 5
        red_flags = []
        positive_signals = ["Consistent profiles across multiple platforms", "Established digital presence"]
    else:
        overall_risk_score = 55
        profile_authenticity = 50
        identity_consistency = 40
        scam_indicators = 45
        red_flags = ["Limited digital footprint", "Recently created accounts"]
        positive_signals = ["No direct scam reports found"]

    return BackgroundCheckResponse(
        overall_risk_score=overall_risk_score,
        confidence_level="High" if has_multiple_links else "Medium",
        profile_authenticity=profile_authenticity,
        identity_consistency=identity_consistency,
        scam_indicators=scam_indicators,
        image_analysis={
            "reverse_image_search_matches": random.randint(0, 5),
            "stock_photo_likelihood": random.uniform(0.1, 0.8) if not has_multiple_links else 0.05
        },
        language_behaviour="Normal conversational patterns detected." if overall_risk_score < 50 else "High frequency of persuasive or urgent language.",
        risk_signals=["Potential impersonation risk"] if overall_risk_score > 50 else [],
        positive_signals=positive_signals,
        red_flags=red_flags,
        safety_advice=[
            "Always verify identity through a video call.",
            "Never send money to someone you haven't met in person."
        ] if overall_risk_score > 30 else ["Proceed normally but stay vigilant."]
    )
