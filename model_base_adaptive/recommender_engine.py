import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import GradientBoostingRegressor
from config import FOOD_DATA

class NutritionRecommender:
    def __init__(self):
        self.foods = pd.read_csv(FOOD_DATA)

        # Identify nutritional columns dynamically
        # Exclude metadata and non-nutritive flags
        excluded_cols = [
            "Recipe_id", "servings", "Recipe_title", "Region", "Sub_region", 
            "Continent", "vegan", "pescetarian", "lacto_vegetarian"
        ]
        
        self.nutrients = [
            col for col in self.foods.select_dtypes(include=[np.number]).columns 
            if col not in excluded_cols
        ]
        
        self.foods[self.nutrients] = self.foods[self.nutrients].fillna(0)
        self.scaler = StandardScaler()
        # Pre-fit scaler on the entire dataset for normalization
        self.scaler.fit(self.foods[self.nutrients])
        
        # Population knowledge for micro-nutrients and weighting
        self.means = self.foods[self.nutrients].mean().to_dict()
        self.stds = self.foods[self.nutrients].std()

    def get_adaptive_weights(self):
        """
        Calculates weights based on dataset variance. 
        Highly variable nutrients are more distinguishing features.
        """
        # Use inverse log variance or simply normalized std
        weights = self.stds.values / (self.stds.values.max() + 1e-6)
        # Ensure a minimum weight
        return np.maximum(0.1, weights)

    def filter_foods(self, user_data, avoid_ingredients=None):
        df = self.foods.copy()
        avoid_ingredients = avoid_ingredients or []
        
        # Strict Diet-based Ingredient Avoidance
        diet = user_data.get("dietaryPreference", "").lower()
        diet_avoidance = {
            "vegan": ["chicken", "beef", "pork", "fish", "egg", "dairy", "milk", "cheese", "honey", "meat", "lamb", "shrimp", "seafood", "clam", "oyster", "crab", "bacon", "steak"],
            "vegetarian": ["chicken", "beef", "pork", "fish", "meat", "lamb", "shrimp", "seafood", "clam", "oyster", "crab", "bacon", "steak"],
            "pescetarian": ["chicken", "beef", "pork", "meat", "lamb", "bacon", "steak"]
        }
        
        if diet in diet_avoidance:
            avoid_ingredients.extend(diet_avoidance[diet])
            # Remove duplicates
            avoid_ingredients = list(set(avoid_ingredients))

        # Dietary Preferences
        diet = user_data.get("dietaryPreference", "")
        if diet == "vegan":
            df = df[df["vegan"] == 1]
        elif diet == "pescetarian":
            df = df[df["pescetarian"] == 1]
        elif diet == "lacto_vegetarian":
            df = df[df["lacto_vegetarian"] == 1]

        # Allergy-based ingredient filtering (keyword match in Title)
        allergies = user_data.get("allergies", [])
        for allergy in allergies:
            df = df[~df["Recipe_title"].str.contains(allergy, case=False, na=False)]

        # RAG-driven negative ingredient filtering (Robust Matching)
        if avoid_ingredients:
            for ingredient in avoid_ingredients:
                # Use a simple stem (remove 's' at end) for broader matching
                stem = ingredient.lower().rstrip('s')
                df = df[~df["Recipe_title"].str.lower().str.contains(stem, na=False)]

        if "regions" in user_data:
            df = df[df["Region"].isin(user_data["regions"])]

        return df.reset_index(drop=True)

    def _fuzzy_match(self, user_val, row_val):
        """Simple fuzzy matching for categorical preferences."""
        if not user_val or not row_val: return 0.5
        user_val, row_val = str(user_val).lower(), str(row_val).lower()
        if user_val == row_val: return 1.0
        if user_val in row_val or row_val in user_val: return 0.8
        return 0.2

    def rank(self, user_vector, constraints, user_data, weights=None, top_n=5, r_constraints=None):
        """
        Rank foods based on weighted cosine similarity and fuzzy preference overlap.
        Generates score ranges [min, max] to reflect fuzzy uncertainty.
        Includes RAG-driven negative constraints.
        """
        avoid_ingredients = r_constraints.get("avoid_ingredients", []) if r_constraints else []
        
        # Ensure Diet Enforcement is included in avoid_ingredients
        diet = user_data.get("dietaryPreference", "").lower()
        diet_avoidance = {
            "vegan": ["chicken", "beef", "pork", "fish", "egg", "dairy", "milk", "cheese", "honey", "meat", "lamb", "shrimp", "seafood", "clam", "oyster", "crab", "bacon", "steak"],
            "vegetarian": ["chicken", "beef", "pork", "fish", "meat", "lamb", "shrimp", "seafood", "clam", "oyster", "crab", "bacon", "steak"],
            "pescetarian": ["chicken", "beef", "pork", "meat", "lamb", "bacon", "steak"]
        }
        if diet in diet_avoidance:
            avoid_ingredients.extend(diet_avoidance[diet])
            avoid_ingredients = list(set(avoid_ingredients))

        filtered_df = self.filter_foods(user_data, avoid_ingredients=avoid_ingredients)
        
        if filtered_df.empty:
            return pd.DataFrame()

        # Nutritional Similarity
        food_vectors = filtered_df[self.nutrients].values
        u_norm = self.scaler.transform(user_vector.reshape(1, -1))
        X_norm = self.scaler.transform(food_vectors)

        # Apply ReLU to focus on above-average features
        u_relu = np.maximum(0, u_norm)
        X_relu = np.maximum(0, X_norm)

        if weights is not None:
            weights = np.array(weights).reshape(1, -1)
            X_weighted = X_relu * weights
            u_weighted = u_relu * weights
        else:
            X_weighted, u_weighted = X_relu, u_relu

        sims = cosine_similarity(u_weighted, X_weighted)[0]

        # Preference Scoring (Fuzzy)
        pref_region = user_data.get("regionPreference", "")
        pref_scores = filtered_df.apply(lambda row: self._fuzzy_match(pref_region, row.get("Region", "")), axis=1).values

        # Combined Base Score
        base_scores = 0.7 * sims + 0.3 * pref_scores
        
        # Apply medical constraints as penalties (static + RAG-driven)
        r_thresholds = r_constraints.get("nutrient_thresholds", {}) if r_constraints else {}
        
        for i in range(len(filtered_df)):
            row = filtered_df.iloc[i]
            penalty = 1.0
            
            # Static constraints from constraint_engine
            if "max_sugar" in constraints:
                if row.get("Sugars, total (g)", 0) > constraints["max_sugar"]:
                    penalty *= 0.5
            if "max_sodium" in constraints:
                if row.get("Sodium, Na (mg)", 0) > constraints["max_sodium"]:
                    penalty *= 0.3
            
            # RAG-driven thresholds
            for nutrient, threshold in r_thresholds.items():
                if row.get(nutrient, 0) > threshold:
                    penalty *= 0.1 # Severe penalty for medically dangerous recipes

            # Consolidated Ingredient Avoidance Check (Robust Matching)
            if avoid_ingredients:
                title = str(row.get("Recipe_title", "")).lower()
                for ing in avoid_ingredients:
                    stem = ing.lower().rstrip('s')
                    if stem in title:
                        penalty *= 0.001 # Extreme penalty to ensure it's at the bottom
                        break

            base_scores[i] *= penalty

        # Generate Score Ranges
        std_dev = np.std(base_scores) if len(base_scores) > 1 else 0.05
        filtered_df["score_min"] = (base_scores - 0.1 * std_dev).clip(0, 1)
        filtered_df["score_max"] = (base_scores + 0.1 * std_dev).clip(base_scores, 1)
        filtered_df["score"] = base_scores

        # Generate Fuzzy Nutrient Ranges (perturbing original values slightly)
        nutrient_ranges = []
        for i, row in filtered_df.iterrows():
            recipe_ranges = {}
            for nutrient in self.nutrients:
                val = float(row[nutrient])
                # Simulate 5% uncertainty range
                recipe_ranges[nutrient] = {
                    "min": round(max(0, val * 0.95), 4),
                    "max": round(val * 1.05, 4)
                }
            nutrient_ranges.append(recipe_ranges)
        
        filtered_df["nutrient_ranges"] = nutrient_ranges

        return filtered_df.sort_values(by="score", ascending=False)[
            ["Recipe_id", "Recipe_title", "Region", "score", "score_min", "score_max", "nutrient_ranges"]
        ].head(top_n)

    def generate_optimal_combinations(self, user_data, target_nutrient="score", r_constraints=None):
        """
        Uses Gradient Boosting to find nutrient combinations that maximize similarity score.
        Respects RAG-driven negative ingredient constraints.
        """
        avoid_ingredients = r_constraints.get("avoid_ingredients", []) if r_constraints else None
        df = self.filter_foods(user_data, avoid_ingredients=avoid_ingredients)
        if df.empty or len(df) < 5:
            return "Insufficient data to train generative model"

        # Train on normalized data
        X_orig = df[self.nutrients].values
        X_norm = self.scaler.transform(X_orig)
        y = df["Calories"].values 

        model = GradientBoostingRegressor(n_estimators=100)
        model.fit(X_norm, y)
        
        # Perturb in normalized space
        top_norm = X_norm[:3]
        synthetic_norm = []
        for vec in top_norm:
            for _ in range(2):
                perturbation = np.random.normal(0, 0.05, size=vec.shape)
                synthetic_norm.append(vec + perturbation)
        
        # Denormalize and clip negative values
        synthetic_orig = self.scaler.inverse_transform(synthetic_norm)
        synthetic_orig = np.clip(synthetic_orig, 0, None)
        
        # Format as labeled dictionaries
        labeled_results = []
        for profile in synthetic_orig:
            profile_dict = {name: float(val) for name, val in zip(self.nutrients, profile)}
            labeled_results.append(profile_dict)
            
        return labeled_results

    def generate_search_query(self, user_vector, final_weights, r_constraints, dietary_preference=""):
        """
        Formalizes the internal state into a Search Query payload for external APIs.
        """
        # Denormalize the target vector for human-readable API request
        target_orig = self.scaler.inverse_transform(user_vector.reshape(1, -1))[0]
        target_dict = {name: float(val) for name, val in zip(self.nutrients, target_orig)}
        
        # Format weights
        weight_dict = {name: float(w) for name, w in zip(self.nutrients, final_weights)}
        
        return {
            "target_nutrients": target_dict,
            "weights": weight_dict,
            "constraints": r_constraints,
            "dietary_preference": dietary_preference,
            "query_metadata": {
                "engine": "Foodoscope-Adaptive-v2",
                "similarity_mode": "ReLU-Cosine",
                "adaptive_weighting": True
            }
        }
