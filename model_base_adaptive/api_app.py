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
    age: int = Field(..., example=25)
    gender: str = Field(..., example="male")
    weight: float = Field(..., example=65.0)
    height: float = Field(..., example=175.0)
    activityLevel: str = Field(..., example="moderately_active")
    dietaryPreference: str = Field(..., example="vegan")
    primaryGoal: str = Field(..., example="weight_gain")
    allergies: List[str] = Field(default_factory=list, example=["Peanuts", "Shellfish"])
    medicalHistory: List[str] = Field(default_factory=list, example=["Diabetes Type 2", "Hypertension"])
    healthGoals: List[str] = Field(default_factory=list, example=["Weight Gain"])

class RecipeMatch(BaseModel):
    Recipe_title: str
    score: float

class NutrientRange(BaseModel):
    min: float
    max: float

class RecommendationResponse(BaseModel):
    nutrient_ranges: Dict[str, NutrientRange]

@app.get("/")
async def root():
    return {"message": "Foodoscope Recommendation API is running. Use /recommend for results."}

@app.post("/recommend", response_model=RecommendationResponse)
async def get_recommendations(profile: UserProfileRequest):
    """
    Triggers the recommendation pipeline for a given user profile.
    Calculates min/max ranges for each nutrient across generative profiles.
    """
    try:
        # Convert Pydantic model to dict for the pipeline
        user_data = profile.dict()
        
        # Run the existing pipeline logic
        results = run_recommendation_pipeline(user_data)
        profiles = results["internal_preview"]["generative_profiles"]
        
        if not profiles or not isinstance(profiles, list):
            return {"nutrient_ranges": {}}

        # Aggregate min/max for each nutrient
        nutrient_keys = profiles[0].keys()
        nutrient_ranges = {}
        
        for key in nutrient_keys:
            values = [p[key] for p in profiles if key in p]
            if values:
                nutrient_ranges[key] = {
                    "min": min(values),
                    "max": max(values)
                }
        
        return {
            "nutrient_ranges": nutrient_ranges
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
