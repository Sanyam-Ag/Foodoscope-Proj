from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from main import run_recommendation_pipeline
import uvicorn

app = FastAPI(
    title="Foodoscope Adaptive Recommendation API",
    description="API for personalized food recommendations based on health profiles and RAG guidelines.",
    version="2.0.0"
)

@app.on_event("startup")
async def startup_event():
    """Initializer for recommendation engines to avoid cold-start latency."""
    print("Pre-loading Recommendation Engines...")
    from rag_engine import MedicalRAG
    from recommender_engine import NutritionRecommender
    MedicalRAG()
    NutritionRecommender()
    print("Engines Ready.")

# Pydantic Models for Request/Response
class UserProfileRequest(BaseModel):
    user_id: str = Field(..., example="user_001")
    age: int = Field(..., example=30)
    gender: str = Field(..., example="male")
    weight: float = Field(..., example=75.0)
    height: float = Field(..., example=175.0)
    activityLevel: str = Field(..., example="moderately_active")
    dietaryPreference: str = Field(..., example="vegan")
    primaryGoal: str = Field(..., example="weight_loss")
    allergies: List[str] = Field(default_factory=list, example=["Peanuts"])
    medicalHistory: List[str] = Field(default_factory=list, example=["Diabetes"])
    healthGoals: List[str] = Field(default_factory=list, example=["Weight Loss"])

class RecipeMatch(BaseModel):
    Recipe_title: str
    score: float

class RecommendationResponse(BaseModel):
    status: str
    user_id: str
    api_request_payload: Dict[str, Any]
    internal_preview: Dict[str, Any]

@app.get("/")
async def root():
    return {"message": "Foodoscope Recommendation API is running. Use /recommend for results."}

@app.post("/recommend", response_model=RecommendationResponse)
async def get_recommendations(profile: UserProfileRequest):
    """
    Triggers the recommendation pipeline for a given user profile.
    """
    try:
        # Convert Pydantic model to dict for the pipeline
        user_data = profile.dict()
        
        # Run the existing pipeline logic
        results = run_recommendation_pipeline(user_data)
        
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
