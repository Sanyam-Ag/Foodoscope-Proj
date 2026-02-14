from utils import load_json
from config import USER_PREF
from user_profile import UserProfile
from rag_engine import MedicalRAG
from constraint_engine import generate_constraints
from recommender_engine import NutritionRecommender
from logger import log_recommendations
import numpy as np
import json

def main():

    user_data = load_json(USER_PREF)
    
    recommender = NutritionRecommender()
    all_nutrients = recommender.nutrients

    profile = UserProfile(user_data)
    user_vector = profile.generate_nutrient_vector(all_nutrients, nutrient_means=recommender.means)

    rag = MedicalRAG()
    retrieved_guidelines, r_constraints = rag.retrieve(user_data["medicalHistory"])

    # Adaptive Weight Training: Dataset Variance * Medical Priority
    adaptive_weights = recommender.get_adaptive_weights()
    priority_weights = np.ones(len(all_nutrients))
    nutrient_map = {name.lower(): i for i, name in enumerate(all_nutrients)}

    for g in retrieved_guidelines:
        text = g["guideline"].lower()
        for name, idx in nutrient_map.items():
            keyword = name.split(',')[0].split('(')[0].strip()
            if keyword in text:
                priority_weights[idx] = 2.0

    # Final combined weight vector
    final_weights = adaptive_weights * priority_weights

    constraints = generate_constraints(user_data["medicalHistory"])
    
    # Merge explicit User Profile constraints with RAG-derived ones
    consolidated_avoid = []
    if r_constraints and "avoid_ingredients" in r_constraints:
        consolidated_avoid.extend(r_constraints["avoid_ingredients"])
    
    # 1. Add Allergies from User Profile
    user_allergies = user_data.get("allergies", [])
    consolidated_avoid.extend(user_allergies)
    
    # 2. Add Medical Keywords (broader avoidance logic)
    medical_hist = user_data.get("medicalHistory", [])
    if any(d in str(medical_hist) for d in ["Diabetes", "Diabetic"]):
        if "Sugar" not in consolidated_avoid:
            consolidated_avoid.append("Sugar")

    # Update the constraint object
    if r_constraints is None:
        r_constraints = {"avoid_ingredients": [], "nutrient_thresholds": {}}
    
    r_constraints["avoid_ingredients"] = list(set(consolidated_avoid))

    # Ranking with adaptive weights and consolidated constraints
    recommendations = recommender.rank(user_vector, constraints, user_data, weights=final_weights, r_constraints=r_constraints)

    # Generative Component: Optimal Nutrient Combinations with RAG constraints
    optimal_profiles = recommender.generate_optimal_combinations(user_data, r_constraints=r_constraints)
    
    # API Payload Generation: Formalizing values for external backend
    api_payload = recommender.generate_search_query(user_vector, final_weights, r_constraints, dietary_preference=user_data.get("dietaryPreference", ""))
    
    # Structure output as JSON
    results = {
        "status": "success",
        "user_id": "user_001",
        "api_request_payload": api_payload, # The primary output for backend integration
        "internal_preview": {
            "top_local_matches": recommendations[["Recipe_title", "score"]].head(3).to_dict(orient="records"),
            "generative_profiles": optimal_profiles
        }
    }
    
    print("\nAPI Request Payload (JSON Format):")
    print(json.dumps(results, indent=4))
    
    log_recommendations("user_001", results)

if __name__ == "__main__":
    main()
