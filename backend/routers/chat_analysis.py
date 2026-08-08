from fastapi import APIRouter, UploadFile, File
from models.schemas import ChatTextRequest, ChatAnalysisResponse, ThreatInfo
import re

router = APIRouter()

THREAT_PATTERNS = {
    "blackmail": [r"send.*money", r"i have your.*photos", r"pay me.*or else", r"expose you"],
    "sextortion": [r"nudes", r"private pictures", r"video call", r"naked"],
    "manipulation": [r"don't tell anyone", r"our little secret", r"you owe me"],
    "grooming": [r"how old are you", r"where do you live", r"are you alone", r"send me a pic"],
    "threats": [r"i will find you", r"kill", r"hurt", r"ruin your life"],
    "harassment": [r"bitch", r"slut", r"whore", r"ugly"]
}

def analyze_content(text: str) -> ChatAnalysisResponse:
    text_lower = text.lower()
    found_threats = []
    total_score = 0
    
    for threat_type, patterns in THREAT_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, text_lower):
                confidence = 0.85
                found_threats.append(ThreatInfo(
                    type=threat_type,
                    description=f"Detected pattern associated with {threat_type}",
                    confidence=confidence
                ))
                total_score += 30
                break # Count each threat type once
                
    total_score = min(total_score, 100)
    
    if total_score >= 80:
        threat_level = "critical"
        risk_explanation = "Critical threat detected. This conversation shows clear signs of malicious intent."
    elif total_score >= 60:
        threat_level = "high"
        risk_explanation = "High risk detected. Multiple concerning patterns found in the conversation."
    elif total_score >= 30:
        threat_level = "medium"
        risk_explanation = "Moderate risk. Some suspicious patterns detected."
    elif total_score > 0:
        threat_level = "low"
        risk_explanation = "Low risk. Minor concerns detected."
    else:
        threat_level = "none"
        risk_explanation = "No immediate threats detected in the text."
        
    recommendations = []
    if total_score > 0:
        recommendations.append("Do not engage further if you feel unsafe.")
        recommendations.append("Take screenshots of the conversation as evidence.")
        if total_score >= 60:
            recommendations.append("Consider reporting this user to the platform or authorities.")
            recommendations.append("Block the user immediately.")

    return ChatAnalysisResponse(
        threat_level=threat_level,
        overall_score=total_score,
        threats=found_threats,
        risk_explanation=risk_explanation,
        recommended_actions=recommendations
    )

@router.post("/analyze-text", response_model=ChatAnalysisResponse)
async def analyze_chat_text(request: ChatTextRequest):
    return analyze_content(request.text)

@router.post("/analyze-file", response_model=ChatAnalysisResponse)
async def analyze_chat_file(file: UploadFile = File(...)):
    # Mock file processing - in reality, extract text from PDF/TXT/Image
    content = "Mock extracted text from file that might say send me money."
    return analyze_content(content)
