import pandas as pd
from backend_ranking_service import BackendRanker

def run_demo():
    api_payload = {
        "target_nutrients": {"Calories": 2200.0, "Protein (g)": 84.0, "Sodium, Na (mg)": 1500.0},
        "weights": {"Calories": 1.0, "Protein (g)": 1.5, "Sodium, Na (mg)": 2.5},
        "dietary_preference": "vegan",
        "constraints": {
            "avoid_ingredients": ["Peanuts"],
            "nutrient_thresholds": {"Sodium, Na (mg)": 1000.0}
        }
    }

    candidates_data = [
        {"Recipe_id": 101, "Recipe_title": "Chicken Salad", "Calories": 450, "Protein (g)": 35, "Sodium, Na (mg)": 200},
        {"Recipe_id": 102, "Recipe_title": "Peanut Soup", "Calories": 600, "Protein (g)": 15, "Sodium, Na (mg)": 350},
        {"Recipe_id": 103, "Recipe_title": "Salt Soup", "Calories": 200, "Protein (g)": 5, "Sodium, Na (mg)": 1200},
        {"Recipe_id": 104, "Recipe_title": "Sugar Cookie", "Calories": 150, "Protein (g)": 2, "Sodium, Na (mg)": 50},
        {"Recipe_id": 105, "Recipe_title": "Vegan Quinoa Salad", "Calories": 400, "Protein (g)": 12, "Sodium, Na (mg)": 150}
    ]
    df = pd.DataFrame(candidates_data)

    ranker = BackendRanker(api_payload)
    results = ranker.rank_candidates(df)

    print("RANKING_RESULTS_START")
    for _, row in results.iterrows():
        print(f"TITLE: {row['Recipe_title']} SCORE: {row['interest_score']:.4f}")
    print("RANKING_RESULTS_END")

if __name__ == "__main__":
    run_demo()
