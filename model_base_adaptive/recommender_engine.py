import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from config import FOOD_DATA

class NutritionRecommender:
    def __init__(self):
        self.foods = pd.read_csv(FOOD_DATA)

        self.nutrients = [
            "Energy (kcal)",
            "Protein (g)",
            "Carbohydrate, by difference (g)",
            "Total lipid (fat) (g)",
            "Fiber, total dietary (g)",
            "Sugars, total (g)",
            "Sodium, Na (mg)"
        ]
        
        self.foods[self.nutrients] = self.foods[self.nutrients].fillna(0)

    def filter_foods(self, user_data):
        df = self.foods.copy()

        diet = user_data["dietaryPreference"]

        if diet == "vegan":
            df = df[df["vegan"] == 1]
        elif diet == "pescetarian":
            df = df[df["pescetarian"] == 1]
        elif diet == "lacto_vegetarian":
            df = df[df["lacto_vegetarian"] == 1]

        if "regions" in user_data:
            df = df[df["Region"].isin(user_data["regions"])]

        return df.reset_index(drop=True)

    def rank(self, user_vector, constraints, user_data):

        df = self.filter_foods(user_data)

        if df.empty:
            return pd.DataFrame()

        food_vectors = df[self.nutrients].values

        scores = cosine_similarity([user_vector], food_vectors)[0]

        for i in range(len(df)):
            row = df.iloc[i]

            if "max_sugar" in constraints:
                if row["Sugars, total (g)"] > constraints["max_sugar"]:
                    scores[i] *= 0.5

            if "max_sodium" in constraints:
                if row["Sodium, Na (mg)"] > constraints["max_sodium"]:
                    scores[i] *= 0.3

        df["score"] = scores

        return df.sort_values(by="score", ascending=False)[
            ["Recipe_id", "Recipe_title", "Region", "score"]
        ].head(5)
