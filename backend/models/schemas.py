from pydantic import BaseModel, EmailStr, HttpUrl, Field
from typing import List, Optional
from datetime import datetime

# --- Auth Models ---

class UserSignUp(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    created_at: datetime

class LoginResponse(BaseModel):
    token: Token
    user: UserResponse

class OTPVerify(BaseModel):
    email: EmailStr
    otp: str

class RefreshToken(BaseModel):
    refresh_token: str

# --- Deepfake Models ---

class DeepfakeAnalysisResponse(BaseModel):
    confidence_score: float = Field(..., description="0.0 to 1.0 confidence that it's a deepfake")
    is_deepfake: bool
    face_inconsistency: float
    lighting_artifacts: float
    blink_patterns: float
    background_consistency: float
    explanation: str
    recommendations: List[str]

# --- Phishing Models ---

class PhishingUrlRequest(BaseModel):
    url: str

class PhishingSmsRequest(BaseModel):
    text: str

class PhishingQrRequest(BaseModel):
    content: str

class PhishingResponse(BaseModel):
    risk_level: str = Field(..., description="'safe', 'suspicious', or 'dangerous'")
    score: int = Field(..., description="0 to 100 risk score")
    domain_info: Optional[dict] = None
    threat_categories: List[str]
    explanation: str
    recommendations: List[str]

# --- Chat Analysis Models ---

class ChatTextRequest(BaseModel):
    text: str

class ThreatInfo(BaseModel):
    type: str
    description: str
    confidence: float

class ChatAnalysisResponse(BaseModel):
    threat_level: str = Field(..., description="'none', 'low', 'medium', 'high', 'critical'")
    overall_score: int = Field(..., description="0 to 100")
    threats: List[ThreatInfo]
    risk_explanation: str
    recommended_actions: List[str]

# --- Background Check Models ---

class BackgroundCheckRequest(BaseModel):
    instagram_url: Optional[str] = None
    facebook_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    username: Optional[str] = None
    phone: Optional[str] = None

class BackgroundCheckResponse(BaseModel):
    overall_risk_score: int
    confidence_level: str
    profile_authenticity: int
    identity_consistency: int
    scam_indicators: int
    image_analysis: dict
    language_behaviour: str
    risk_signals: List[str]
    positive_signals: List[str]
    red_flags: List[str]
    safety_advice: List[str]
    disclaimer: str = "AI evaluation based on publicly available data"
