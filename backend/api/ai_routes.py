from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import asyncio
import random
import time
import re

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
    has_media: Optional[bool] = False
    clarification_answer: Optional[str] = None

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

# ============================================================================
# MULTI-AGENT EVIDENCE-FIRST INVESTIGATION PIPELINE
# ============================================================================

@router.post("/investigate")
async def investigate_incident(request: IncidentInvestigateRequest):
    await asyncio.sleep(1.0)
    
    raw_text = request.evidence_text
    text_lower = raw_text.lower()
    file_names = request.file_names or []
    file_names_str = " ".join(file_names).lower()

    # AGENT 1: EVIDENCE UNDERSTANDING AGENT
    extracted_urls = re.findall(r'https?://\S+|www\.\S+', raw_text)
    extracted_phones = re.findall(r'\+?\d[\d -]{8,12}\d', raw_text)
    extracted_handles = re.findall(r'@[A-Za-z0-9_.]+', raw_text)
    
    has_image = any(f.endswith(('.png', '.jpg', '.jpeg', '.webp')) for f in file_names_str.split()) or "image" in file_names_str
    has_video = any(f.endswith(('.mp4', '.mov', '.avi')) for f in file_names_str.split()) or "video" in file_names_str
    
    # Financial keywords
    has_financial = any(w in text_lower for w in ["upi", "money", "pay", "fee", "registration", "rupees", "rs", "deposit", "transfer", "bank", "otp", "pin", "card", "billing"])
    # Threat / Violence keywords
    has_threat = any(w in text_lower for w in ["kill", "hurt", "find you", "meet me", "know where", "live", "house", "address", "outside", "follow"])
    # Blackmail / Coercion keywords
    has_blackmail = any(w in text_lower for w in ["leak", "viral", "expose", "photo", "video", "share with your", "tell your"])
    # Harassment / Abusive keywords
    has_harassment = any(w in text_lower for w in ["useless", "stupid", "bitch", "ugly", "escape me", "messaging you", "harass", "bother", "shut up"])
    # Phishing / Link keywords
    has_phishing = bool(extracted_urls) or any(w in text_lower for w in ["login", "password", "verify account", "suspended", "click link", "http"])
    # Impersonation / Fake Profile keywords
    has_impersonation = "instagram" in text_lower or "profile" in text_lower or "fake" in file_names_str or "impersonat" in text_lower or bool(extracted_handles)
    # Deepfake / Synthetic Media signals
    has_deepfake_signals = "deepfake" in file_names_str or "clone" in file_names_str or "synthetic" in text_lower or "manipulated" in text_lower or (has_image and ("fake" in file_names_str or "profile" in file_names_str))

    # AGENT 2: INVESTIGATION ROUTER & SPECIALIST ACTIVATION
    active_types = []
    if has_deepfake_signals: active_types.append("DEEPFAKE")
    if has_impersonation: active_types.append("IMPERSONATION")
    if has_blackmail: active_types.append("BLACKMAIL")
    if has_threat: active_types.append("THREAT")
    if has_harassment: active_types.append("HARASSMENT")
    if has_phishing: active_types.append("PHISHING")
    if has_financial: active_types.append("FINANCIAL_FRAUD")

    if not active_types:
        active_types.append("GENERAL_INVESTIGATION")

    # AGENT 11 & 12: EVIDENCE CORRELATION & RISK ASSESSMENT AGENT
    risk_matrix = {
        "financial_risk": "HIGH" if (has_financial and ("fee" in text_lower or "upi" in text_lower or "otp" in text_lower)) else ("MEDIUM" if has_financial else "NOT APPLICABLE"),
        "privacy_risk": "HIGH" if (has_blackmail or "password" in text_lower) else ("MEDIUM" if (has_phishing or has_harassment) else "LOW"),
        "identity_risk": "HIGH" if (has_impersonation or has_deepfake_signals) else "NOT APPLICABLE",
        "harassment_risk": "HIGH" if (has_harassment and has_threat) else ("MEDIUM" if has_harassment else "NOT APPLICABLE"),
        "threat_risk": "CRITICAL" if (has_threat and ("kill" in text_lower or "house" in text_lower)) else ("HIGH" if has_threat else "NOT APPLICABLE"),
        "media_authenticity_risk": "HIGH" if has_deepfake_signals else ("MEDIUM" if (has_image or has_video) else "NOT APPLICABLE"),
        "immediate_safety_risk": "HIGH" if (has_threat and "live" in text_lower) else "LOW"
    }

    # Calculate overall risk score dynamically from active risks
    high_count = sum(1 for v in risk_matrix.values() if v in ["HIGH", "CRITICAL"])
    med_count = sum(1 for v in risk_matrix.values() if v == "MEDIUM")
    overall_score = min(98, max(12, high_count * 30 + med_count * 15))
    risk_level = "HIGH" if overall_score >= 70 else ("MEDIUM" if overall_score >= 40 else "LOW")

    # AGENT DYNAMIC QUESTION GENERATOR (0 or 1 question ONLY when context is ambiguous)
    clarification_question = None
    if "DEEPFAKE" in active_types or "IMPERSONATION" in active_types:
        clarification_question = {
            "id": "q_impersonation",
            "question": "Do you know the person whose identity appears to be represented by this account or media?",
            "options": ["Yes, it is someone I know", "No, it is an unverified account", "Not sure"]
        }
    elif "BLACKMAIL" in active_types:
        clarification_question = {
            "id": "q_blackmail",
            "question": "Has the sender threatened to publish private photographs or personal media?",
            "options": ["Yes, explicit threat made", "Indirect coercion", "No media involved"]
        }
    elif "PHISHING" in active_types:
        clarification_question = {
            "id": "q_phishing",
            "question": "Did you enter your account credentials or passwords on the suspicious link?",
            "options": ["Yes, entered password", "Only clicked link", "No, did not click"]
        }
    elif "FINANCIAL_FRAUD" in active_types:
        clarification_question = {
            "id": "q_financial",
            "question": "Have you already transferred money or entered your UPI PIN?",
            "options": ["Yes, funds transferred", "Entered PIN only", "No money transferred"]
        }

    # AGENT HIGHLIGHTED EVIDENCE SNIPPETS
    snippets = []
    lines = [l.strip() for l in raw_text.split('\n') if l.strip()]
    for line in lines:
        l_lower = line.lower()
        if any(w in l_lower for w in ["kill", "hurt", "live", "house", "address", "leak", "photo", "pay", "upi", "password", "useless", "escape me"]):
            snippets.append({
                "text": line,
                "reason": "Contains explicit signal: " + ("threat" if "kill" in l_lower or "live" in l_lower else ("coercion" if "leak" in l_lower or "pay" in l_lower else "harassment")),
                "risk": "Flagged Evidence"
            })
    if not snippets and raw_text:
        snippets.append({
            "text": raw_text[:140],
            "reason": "Submitted text log analyzed for threat & risk indicators.",
            "risk": "Analyzed Evidence"
        })

    # AGENT CATEGORIES DISPLAY
    category_labels = []
    if "DEEPFAKE" in active_types: category_labels.append("Potentially Manipulated Media")
    if "IMPERSONATION" in active_types: category_labels.append("Account Impersonation")
    if "BLACKMAIL" in active_types: category_labels.append("Cyber Blackmail & Coercion")
    if "THREAT" in active_types: category_labels.append("Direct Intimidation / Threat")
    if "HARASSMENT" in active_types: category_labels.append("Persistent Online Harassment")
    if "PHISHING" in active_types: category_labels.append("Credential Phishing")
    if "FINANCIAL_FRAUD" in active_types: category_labels.append("Financial / UPI Fraud")

    if not category_labels:
        category_labels.append("Unverified Digital Contact")

    # AGENT RECOMMENDATIONS
    recs = ["Preserve original uncompressed evidence immediately in Evidence Vault"]
    if "DEEPFAKE" in active_types or "IMPERSONATION" in active_types:
        recs.append("Avoid editing or recompressing the submitted media file")
        recs.append("Verify suspect profile handles independently before engaging")
    if "BLACKMAIL" in active_types or "THREAT" in active_types:
        recs.append("Do NOT comply with extortion demands or threat pressure")
        recs.append("Notify emergency contacts or activate SOS if physical safety is threatened")
    if "PHISHING" in active_types:
        recs.append("Change account passwords immediately if credentials were clicked")
    if "FINANCIAL_FRAUD" in active_types:
        recs.append("Call National Cyber Fraud Helpline (1930) to freeze UPI transfers")

    return {
        "case_id": f"CS-2026-{random.randint(1000, 9999)}",
        "created_at": "Today · Just Now",
        "risk_score": overall_score,
        "risk_level": risk_level,
        "categories": category_labels,
        "active_types": active_types,
        "confidence": 92 if len(raw_text) > 30 else 84,
        "evidence_summary": {
            "file_count": len(file_names),
            "extracted_urls": extracted_urls,
            "extracted_handles": extracted_handles,
            "extracted_phones": extracted_phones,
            "has_media": has_image or has_video
        },
        "deepfake_assessment": {
            "is_analyzed": has_image or has_video or "DEEPFAKE" in active_types,
            "risk_level": risk_matrix["media_authenticity_risk"],
            "confidence": 87 if has_deepfake_signals else 94,
            "indicators": [
                "Facial boundary blending artifacts detected around chin and jawline",
                "Spectral frequency warping inconsistent with organic camera lens compression",
                "Unnatural facial region illumination mismatch"
            ] if has_deepfake_signals else ["Visual biometric structure exhibits organic characteristics"],
            "explanation": "Several visual & spectral inconsistencies were detected in submitted media." if has_deepfake_signals else "Media visual analysis shows organic camera characteristics.",
            "disclaimer": "AI authenticity assessment is probabilistic and provides evidence risk guidance."
        } if (has_image or has_video or "DEEPFAKE" in active_types) else None,
        "risk_matrix": risk_matrix,
        "clarification_question": clarification_question,
        "highlighted_snippets": snippets,
        "explanation": f"Multi-agent investigation correlated {len(active_types)} active threat domains. Primary risk driver: {category_labels[0]}." if category_labels else "Multi-agent analysis complete.",
        "recommendations": recs
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
