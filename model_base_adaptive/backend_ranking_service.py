import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler

class BackendRanker:
    def __init__(self, api_payload):
        """
        Initializes the ranker with the API request payload.
        """
        self.target_nutrients = api_payload["target_nutrients"]
        self.weights = api_payload["weights"]
        self.constraints = api_payload["constraints"]
        self.dietary_preference = api_payload.get("dietary_preference", "").lower()
        self.nutrients = list(self.target_nutrients.keys())
        
        # Prepare target vector and weight vector
        self.target_vec = np.array([self.target_nutrients[n] for n in self.nutrients]).reshape(1, -1)
        self.weight_vec = np.array([self.weights[n] for n in self.nutrients]).reshape(1, -1)
        
        # Dictionary of non-compliant ingredients based on diet
        self.diet_avoidance = {
            "vegan": ["chicken", "beef", "pork", "fish", "egg", "dairy", "milk", "cheese", "honey", "meat", "lamb", "shrimp", "seafood", "clam", "oyster", "crab", "bacon", "steak"],
            "vegetarian": ["chicken", "beef", "pork", "fish", "meat", "lamb", "shrimp", "seafood", "clam", "oyster", "crab", "bacon", "steak"],
            "pescetarian": ["chicken", "beef", "pork", "meat", "lamb", "bacon", "steak"]
        }

        # Initialize scaler for normalization within the receiver's context
        self.scaler = StandardScaler()

    def rank_candidates(self, candidates_df, top_n=5):
        """
        Ranks candidate recipes based on the api_payload specifications.
        """
        if candidates_df.empty:
            return pd.DataFrame()

        # Consolidate avoid ingredients
        avoid_ingredients = self.constraints.get("avoid_ingredients", [])
        if self.dietary_preference in self.diet_avoidance:
            avoid_ingredients.extend(self.diet_avoidance[self.dietary_preference])
            avoid_ingredients = list(set(avoid_ingredients))

        # Extract only the relevant nutrients
        X_orig = candidates_df[self.nutrients].values
        
        # Normalize candidates and target relative to the candidates pool
        # For simplicity in this demo, we normalize candidates based on their own distribution
        # Real-world apps should use consistent scaling factors
        X_norm = self.scaler.fit_transform(X_orig)
        target_norm = self.scaler.transform(self.target_vec)

        # Apply ReLU to focus on above-average features
        X_relu = np.maximum(0, X_norm)
        target_relu = np.maximum(0, target_norm)

        # Apply weights
        X_weighted = X_relu * self.weight_vec
        target_weighted = target_relu * self.weight_vec

        # Calculate Cosine Similarity
        sims = cosine_similarity(target_weighted, X_weighted)[0]

        # Apply Medical Constraints (Penalties)
        r_thresholds = self.constraints.get("nutrient_thresholds", {})
        avoid_ingredients = self.constraints.get("avoid_ingredients", [])

        scores = sims.copy()
        
        for i in range(len(candidates_df)):
            row = candidates_df.iloc[i]
            penalty = 1.0
            
            # 1. Ingredient Avoidance (Title based - Robust Stemming)
            title = str(row.get("Recipe_title", "")).lower()
            for ing in avoid_ingredients:
                stem = ing.lower().rstrip('s')
                if stem in title:
                    penalty *= 0.01 # Extreme penalty
                    break
            
            # 2. Nutrient Thresholds
            for nutrient, threshold in r_thresholds.items():
                if row.get(nutrient, 0) > threshold:
                    penalty *= 0.5 # Substantial penalty for exceeding medical limits

            scores[i] *= penalty

        # Add scores and sort
        candidates_df["interest_score"] = scores
        return candidates_df.sort_values(by="interest_score", ascending=False).head(top_n)
