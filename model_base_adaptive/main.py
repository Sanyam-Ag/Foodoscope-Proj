from utils import load_json
from config import USER_PREF
from user_profile import UserProfile
from rag_engine import MedicalRAG
from constraint_engine import generate_constraints
from recommender_engine import NutritionRecommender
from logger import log_recommendations

def main():

    user_data = load_json(USER_PREF)

    profile = UserProfile(user_data)
    user_vector = profile.generate_nutrient_vector()

    rag = MedicalRAG()
    retrieved = rag.retrieve(user_data["medicalHistory"])

    constraints = generate_constraints(user_data["medicalHistory"])

    recommender = NutritionRecommender()
    recommendations = recommender.rank(user_vector, constraints, user_data)

    print("\nTop Recommendations:")
    print(recommendations)
    log_recommendations("user_001", recommendations)

if __name__ == "__main__":
    main()
