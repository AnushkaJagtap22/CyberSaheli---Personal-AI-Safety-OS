from fastapi import APIRouter, HTTPException, status
from models.schemas import UserSignUp, UserLogin, Token, LoginResponse, UserResponse, OTPVerify, RefreshToken
from datetime import datetime, timedelta
from jose import jwt
import uuid

router = APIRouter()

SECRET_KEY = "cybersaheli_super_secret_key"
ALGORITHM = "HS256"

# Mock Database
users_db = []

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/signup", response_model=LoginResponse)
async def signup(user: UserSignUp):
    # Check if email exists
    if any(u['email'] == user.email for u in users_db):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = {
        "id": str(uuid.uuid4()),
        "name": user.name,
        "email": user.email,
        "password": user.password, # In reality, we should hash this
        "created_at": datetime.utcnow()
    }
    users_db.append(new_user)
    
    access_token = create_access_token(data={"sub": new_user["email"]})
    
    return LoginResponse(
        token=Token(access_token=access_token, token_type="bearer"),
        user=UserResponse(**new_user)
    )

@router.post("/login", response_model=LoginResponse)
async def login(user: UserLogin):
    db_user = next((u for u in users_db if u["email"] == user.email), None)
    if not db_user or db_user["password"] != user.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
        
    access_token = create_access_token(data={"sub": db_user["email"]})
    
    return LoginResponse(
        token=Token(access_token=access_token, token_type="bearer"),
        user=UserResponse(**db_user)
    )

@router.post("/verify-otp")
async def verify_otp(data: OTPVerify):
    if data.otp == "123456": # Mock OTP
        return {"status": "success", "message": "OTP verified successfully"}
    raise HTTPException(status_code=400, detail="Invalid OTP")

@router.post("/refresh-token", response_model=Token)
async def refresh_token(data: RefreshToken):
    # Mock refresh logic
    new_token = create_access_token(data={"sub": "user@example.com"})
    return Token(access_token=new_token, token_type="bearer")
