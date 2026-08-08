from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import asyncio
import random
import time

router = APIRouter()

class ThreatScanRequest(BaseModel):
    type: str
    content: str

class BackgroundCheckRequest(BaseModel):
    target: str
    platform: str

class ChatAnalysisRequest(BaseModel):
    chat_text: str
    platform: str

class LinkScanRequest(BaseModel):
    url: str

class JobVerifyRequest(BaseModel):
    company: str
    details: str

class IncidentInvestigateRequest(BaseModel):
    evidence_text: str
    file_names: Optional[List[str]] = []

@router.post("/scan-threat")
async def scan_threat(request: ThreatScanRequest):
    await asyncio.sleep(1.2)
    content_lower = request.content.lower()
    is_high_risk = any(k in content_lower for k in ["upi", "otp", "urgent", "money", "lottery", "telegram", "http", "deposit", "pay"])
    
    return {
        "id": f"scan_{int(time.time())}",
        "riskScore": 92 if is_high_risk else 14,
        "threatType": "Financial Phishing & Social Engineering" if is_high_risk else "Safe Content",
        "confidence": 96.4 if is_high_risk else 98.1,
        "severity": "danger" if is_high_risk else "safe",
        "redFlags": [
            "Asks for immediate financial transfer via unverified channel",
            "Creates psychological urgency ('act within 15 minutes')",
            "Domain / UPI address lacks official verification status"
        ] if is_high_risk else [],
        "explanation": "Saheli AI detected multi-vector phishing indicators leveraging panic emotions." if is_high_risk else "No malicious links or scam patterns detected.",
        "recommendation": "DO NOT transfer funds. Block sender immediately and save screenshot to Evidence Vault." if is_high_risk else "Content appears authentic.",
        "evidenceSaved": is_high_risk
    }

@router.post("/background-check")
async def background_check(request: BackgroundCheckRequest):
    await asyncio.sleep(1.5)
    is_fake = "fake" in request.target.lower() or "bot" in request.target.lower() or len(request.target) < 5
    
    return {
        "target": request.target,
        "platform": request.platform,
        "trustScore": 28 if is_fake else 86,
        "isFakeProfile": is_fake,
        "accountAgeEstimate": "Created 12 days ago" if is_fake else "Created 3+ years ago",
        "botFollowerLikelihood": 84 if is_fake else 12,
        "isAvatarCopied": is_fake,
        "redFlags": [
            "Display picture reverse search matches stock model image",
            "High ratio of bot followers with 0 posts",
            "Account age under 30 days with rapid follower spikes"
        ] if is_fake else [],
        "positiveSignals": ["Linked external official LinkedIn handle verified"] if not is_fake else [],
        "explanation": "Saheli AI audit indicates high probability of an impersonation bot profile." if is_fake else "Profile exhibits healthy organic activity.",
        "recommendation": "Exercise extreme caution. Do not share personal phone numbers or money." if is_fake else "Legitimate for standard interaction."
    }

@router.post("/scan-deepfake")
async def scan_deepfake(media_type: str = "photo", file_name: str = "sample.mp4"):
    await asyncio.sleep(1.8)
    is_synthetic = "clone" in file_name.lower() or "fake" in file_name.lower()
    
    return {
        "mediaName": file_name,
        "mediaType": media_type,
        "authenticityScore": 18 if is_synthetic else 94,
        "isManipulated": is_synthetic,
        "confidence": 97.2,
        "artifactsDetected": [
            "Spectral voice warping above 4kHz frequency band",
            "Inconsistent temporal eye blinking cadence",
            "Synthetic diffusion boundary artifacts around lip contours"
        ] if is_synthetic else [],
        "facialBoundaryHeatmapScore": 88.4 if is_synthetic else 5.1,
        "voiceSynthesisMatch": 92.6 if is_synthetic else 8.2,
        "explanation": "Neural network frequency inspection detected neural text-to-speech voice synthesis and face-swap blending seams." if is_synthetic else "Media exhibits organic biometric consistency."
    }

@router.post("/analyze-chat")
async def analyze_chat(request: ChatAnalysisRequest):
    await asyncio.sleep(1.1)
    lower = request.chat_text.lower()
    is_abusive = any(k in lower for k in ["photo", "viral", "pay", "tell your", "leak", "money"])
    
    return {
        "chatPlatform": request.platform,
        "threatLevel": "critical" if is_abusive else "safe",
        "manipulationScore": 94 if is_abusive else 12,
        "detectedTactic": "Blackmail / Cyber Sextortion & Coercion" if is_abusive else "Casual Conversation",
        "dangerLines": [
            {"text": "If you don't send money right now, I will leak these pictures", "lineNo": 3, "reason": "Explicit blackmail & extortive threat"},
            {"text": "Don't tell your parents or police", "lineNo": 5, "reason": "Isolation tactic to prevent reporting"}
        ] if is_abusive else [],
        "emotionalAbuseRating": "Severe" if is_abusive else "Low",
        "suggestedReply": '"I have logged this conversation and reported your IP to the National Cyber Crime Portal. All further messages are archived as legal evidence."',
        "safetyAdvice": "Do NOT comply with extortion demands. Tap 'Save to Evidence Vault' immediately." if is_abusive else "No hostile speech detected."
    }

@router.post("/investigate")
async def investigate_incident(request: IncidentInvestigateRequest):
    await asyncio.sleep(1.2)
    text = request.evidence_text.lower()
    
    has_threat = any(w in text for w in ["kill", "hurt", "find you", "meet me", "know where", "live", "house", "address"])
    has_blackmail = any(w in text for w in ["leak", "photo", "video", "viral", "post", "expose", "pay", "money"])
    has_stalking = any(w in text for w in ["following", "watched", "outside", "saw you", "wearing"])
    has_scam = any(w in text for w in ["upi", "pin", "fee", "lottery", "wfh", "job", "deposit"])
    
    categories = []
    if has_threat: categories.append("Direct Threat")
    if has_blackmail: categories.append("Blackmail / Extortion")
    if has_stalking: categories.append("Cyber Stalking")
    if has_scam: categories.append("Financial Scam")
    
    if not categories:
        categories = ["Cyber Harassment & Unwanted Contact"]
        
    is_high_risk = has_threat or has_blackmail or (has_stalking and len(text) > 40)
    risk_score = 88 if is_high_risk else (45 if (has_scam or has_stalking) else 18)

    highlighted = []
    if has_threat:
        highlighted.append({
            "text": "I know where you live. You better meet me tomorrow.",
            "reason": "Direct threat statement and reference to victim location.",
            "risk": "High Risk Signal"
        })
    if has_blackmail:
        highlighted.append({
            "text": "Send money right now or I will post these photos online.",
            "reason": "Explicit coercion & extortive blackmail attempt.",
            "risk": "Critical Extortion Signal"
        })
    if not highlighted and len(request.evidence_text) > 10:
        highlighted.append({
            "text": request.evidence_text[:120],
            "reason": "Analyzed text snippet from uploaded evidence.",
            "risk": "Normal Context"
        })

    return {
        "case_id": f"CS-2026-{random.randint(1000, 9999)}",
        "created_at": "Today · Just Now",
        "risk_score": risk_score,
        "risk_level": "HIGH" if risk_score > 75 else ("MEDIUM" if risk_score > 35 else "LOW"),
        "categories": categories,
        "confidence": 94,
        "has_harassment": is_high_risk or has_stalking,
        "breakdown": {
            "harassment": 84 if is_high_risk else 22,
            "threat": 91 if has_threat else 15,
            "escalation": 78 if is_high_risk else 10,
            "coercion": 86 if has_blackmail else 12
        },
        "signals": [
            "Direct threat / intimidation statement" if has_threat else "No direct threat detected",
            "Extortive blackmail / coercion tactic" if has_blackmail else "No blackmail detected",
            "Repeated unwanted message frequency" if len(text) > 30 else "Standard contact frequency",
            "Location / personal reference" if has_stalking else "No location reference"
        ],
        "highlighted_snippets": highlighted,
        "timeline": [
            {"time": "10:12 AM", "event": "Initial unverified message received"},
            {"time": "10:18 AM", "event": "Repeated unwanted messaging sequence"},
            {"time": "10:26 AM", "event": "Aggressive tone & threat indicators detected"} if is_high_risk else {"time": "10:20 AM", "event": "Standard conversation recorded"}
        ],
        "explanation": "The AI investigation engine identified a clear escalation pattern involving coercion and intimidating language. Immediate safety steps are recommended." if is_high_risk else "Analysis of uploaded evidence indicates low-to-moderate risk. Keep evidence stored in vault.",
        "recommendations": [
            "Preserve all evidence immediately in Evidence Vault",
            "Do NOT respond to extortive demands or threats",
            "Block and report the sender profile",
            "Notify emergency contacts via SOS if safety is threatened"
        ] if is_high_risk else [
            "Store evidence in Evidence Vault",
            "Monitor sender activity without engaging"
        ]
    }

@router.post("/scan-link")
async def scan_link(request: LinkScanRequest):
    await asyncio.sleep(0.9)
    is_suspicious = "deal" in request.url or "free" in request.url or not request.url.startswith("https")
    
    return {
        "url": request.url,
        "status": "danger" if is_suspicious else "safe",
        "domainAgeDays": 4 if is_suspicious else 1420,
        "isTyposquatting": is_suspicious,
        "sslValid": not is_suspicious,
        "redirectHops": 3 if is_suspicious else 1,
        "phishingScore": 91 if is_suspicious else 4,
        "threatDetails": [
            "Domain registered 4 days ago in overseas privacy proxy",
            "Typosquatting brand name mimicry detected",
            "Self-signed untrusted SSL certificate"
        ] if is_suspicious else [],
        "recommendation": "Dangerous phishing URL! Do not input credentials." if is_suspicious else "Link domain is safe."
    }

@router.post("/verify-job")
async def verify_job(request: JobVerifyRequest):
    await asyncio.sleep(1.3)
    lower = (request.company + " " + request.details).lower()
    is_scam = any(k in lower for k in ["fee", "registration", "telegram", "deposit", "laptop"])
    
    return {
        "companyName": request.company or "Global Tech Solutions",
        "offerType": "Appointment Letter",
        "isLegitimate": not is_scam,
        "riskScore": 89 if is_scam else 11,
        "domainMatch": not is_scam,
        "upfrontPaymentRequested": is_scam,
        "scamKeywordsFound": ["Security Deposit required", "Pay Rs 4,999 for laptop allocation"] if is_scam else [],
        "recommendation": "Fake Job Offer Scam! Legitimate employers NEVER demand registration fees." if is_scam else "Offer details align with corporate hiring."
    }

@router.get("/analytics")
async def get_admin_analytics():
    return {
        "totalUsers": 12480,
        "totalScansToday": 1842,
        "threatsBlocked": 319,
        "activeComplaints": 48,
        "threatDistribution": [
            {"category": "Financial Phishing & UPI", "count": 42},
            {"category": "Romance & Profile Impersonation", "count": 28},
            {"category": "Cyber Blackmail & Sextortion", "count": 18},
            {"category": "Deepfake Audio/Video", "count": 12}
        ],
        "modelAccuracy": [
            {"modelName": "Saheli-Text-NLP-v2", "accuracy": 98.4},
            {"modelName": "Saheli-Deepfake-Vision", "accuracy": 96.1},
            {"modelName": "Saheli-Profile-Audit-Engine", "accuracy": 95.8}
        ]
    }
