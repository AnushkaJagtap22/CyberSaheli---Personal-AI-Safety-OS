from fastapi import APIRouter, UploadFile, File, HTTPException
from models.schemas import DeepfakeAnalysisResponse
import random
import asyncio

router = APIRouter()

@router.post("/analyze", response_model=DeepfakeAnalysisResponse)
async def analyze_media(file: UploadFile = File(...)):
    if file.content_type not in ["image/jpeg", "image/png", "video/mp4", "video/quicktime"]:
        raise HTTPException(status_code=400, detail="Unsupported file format. Please upload JPEG, PNG, or MP4.")
    
    # Simulate processing time
    await asyncio.sleep(2)
    
    # Mock ML Inference Logic
    # Generate random scores for demonstration
    is_fake = random.choice([True, False])
    base_score = random.uniform(0.7, 0.99) if is_fake else random.uniform(0.01, 0.3)
    
    face_inconsistency = random.uniform(base_score - 0.1, base_score + 0.1)
    lighting_artifacts = random.uniform(base_score - 0.1, base_score + 0.1)
    blink_patterns = random.uniform(base_score - 0.1, base_score + 0.1)
    background_consistency = random.uniform(0.1, 0.9) # Can be random
    
    explanation = "Our AI models detected significant manipulation artifacts, particularly around the facial boundaries and inconsistent lighting." if is_fake else "No significant manipulation artifacts detected. The media appears to be authentic based on our current models."
    
    recommendations = []
    if is_fake:
        recommendations = [
            "Do not share this media further.",
            "Report the source if it was sent to harass or deceive.",
            "Keep a copy of this analysis for your records."
        ]
    else:
        recommendations = [
            "The media seems authentic, but always trust your instincts.",
            "Verify the source if you still have suspicions."
        ]

    return DeepfakeAnalysisResponse(
        confidence_score=min(max(base_score, 0.0), 1.0),
        is_deepfake=is_fake,
        face_inconsistency=min(max(face_inconsistency, 0.0), 1.0),
        lighting_artifacts=min(max(lighting_artifacts, 0.0), 1.0),
        blink_patterns=min(max(blink_patterns, 0.0), 1.0),
        background_consistency=min(max(background_consistency, 0.0), 1.0),
        explanation=explanation,
        recommendations=recommendations
    )
