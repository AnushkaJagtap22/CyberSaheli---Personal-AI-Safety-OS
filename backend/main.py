import os
from dotenv import load_dotenv

# Load .env variables before app initialization
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import ai_routes, sos_routes, learning_routes, profile_routes

app = FastAPI(
    title="CyberSaheli API",
    description="Backend API for CyberSaheli v2.0 AI Bodyguard & Emergency SOS",
    version="2.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://cyber-saheli-personal-ai-safety-os.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ai_routes.router, prefix="/api/v1/ai", tags=["AI Modules"])
app.include_router(sos_routes.router, prefix="/api/sos", tags=["SOS Emergency"])
app.include_router(sos_routes.router, prefix="/api/v1/sos", tags=["SOS Emergency"])
app.include_router(learning_routes.router, prefix="/api/learning", tags=["Learning Quest"])
app.include_router(learning_routes.router, prefix="/api/v1/learning", tags=["Learning Quest"])
app.include_router(profile_routes.router, prefix="/api/profile", tags=["User Profile"])
app.include_router(profile_routes.router, prefix="/api/v1/profile", tags=["User Profile"])

@app.get("/")
async def root():
    return {"message": "CyberSaheli API is running. Safe Online. Safe Offline."}
