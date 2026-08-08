from fastapi import APIRouter
from models.schemas import PhishingUrlRequest, PhishingSmsRequest, PhishingQrRequest, PhishingResponse
import re

router = APIRouter()

SUSPICIOUS_KEYWORDS = ['urgent', 'verify', 'account', 'suspended', 'click here', 'win', 'lottery', 'bank', 'otp', 'password', 'free']

def analyze_text(text: str):
    text_lower = text.lower()
    score = 0
    threats = []
    
    for keyword in SUSPICIOUS_KEYWORDS:
        if keyword in text_lower:
            score += 15
            threats.append(f"Suspicious keyword found: '{keyword}'")
            
    if "http://" in text_lower:
        score += 20
        threats.append("Insecure HTTP link found")
        
    # Urgency patterns
    if re.search(r'\b(act now|immediately|within \d+ hours)\b', text_lower):
        score += 25
        threats.append("Sense of urgency detected")
        
    score = min(score, 100)
    
    if score >= 70:
        risk_level = "dangerous"
        explanation = "High risk of phishing or scam. Multiple suspicious indicators detected."
    elif score >= 30:
        risk_level = "suspicious"
        explanation = "Moderate risk. Proceed with caution and verify the source."
    else:
        risk_level = "safe"
        explanation = "No major phishing indicators detected, but stay vigilant."
        
    recommendations = []
    if risk_level != "safe":
        recommendations = [
            "Do not click on any links.",
            "Do not provide personal information.",
            "Block the sender if it's an SMS.",
            "Verify through official channels independently."
        ]
        
    return {
        "risk_level": risk_level,
        "score": score,
        "threat_categories": threats,
        "explanation": explanation,
        "recommendations": recommendations
    }

@router.post("/scan-url", response_model=PhishingResponse)
async def scan_url(request: PhishingUrlRequest):
    result = analyze_text(request.url)
    
    # Mock domain info
    domain = request.url.split('//')[-1].split('/')[0]
    result['domain_info'] = {
        "domain": domain,
        "age_days": 15 if result['score'] > 50 else 3650,
        "registrar": "MockRegistrar LLC"
    }
    
    if result['domain_info']['age_days'] < 30:
        result['score'] = min(result['score'] + 30, 100)
        result['threat_categories'].append("Domain is very newly registered")
        
    return PhishingResponse(**result)

@router.post("/scan-sms", response_model=PhishingResponse)
async def scan_sms(request: PhishingSmsRequest):
    return PhishingResponse(**analyze_text(request.text))

@router.post("/scan-qr", response_model=PhishingResponse)
async def scan_qr(request: PhishingQrRequest):
    return PhishingResponse(**analyze_text(request.content))
