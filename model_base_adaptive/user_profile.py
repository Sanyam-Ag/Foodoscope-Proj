import numpy as np

class UserProfile:
    def __init__(self, user_data):
        self.data = user_data
        
    def compute_calories(self):
        weight = float(self.data["weight"])
        height = float(self.data["height"])
        age = float(self.data["age"])
        gender = self.data["gender"]
        activity = self.data["activityLevel"]

        bmr = 10*weight + 6.25*height - 5*age + (5 if gender=="male" else -161)

        activity_factor = {
            "sedentary": 1.2,
            "light": 1.375,
            "moderately_active": 1.55,
            "active": 1.725
        }.get(activity, 1.55)

        tdee = bmr * activity_factor

        if self.data["primaryGoal"] == "weight_loss":
            tdee *= 0.85

        return tdee

    def generate_nutrient_vector(self, nutrient_list, nutrient_means=None):
        """
        Generates a nutrient vector aligned with the provided nutrient_list.
        Uses nutrient_means as fallback for micro-nutrients.
        """
        calories = self.compute_calories()
        weight = float(self.data["weight"])

        # Mapping of common field names to calculated/target values
        targets = {
            "Energy (kcal)": calories,
            "Calories": calories,
            "Protein (g)": 1.2 * weight,
            "Carbohydrate, by difference (g)": 200.0,
            "Total lipid (fat) (g)": 60.0,
            "Fiber, total dietary (g)": 30.0,
            "Sugars, total (g)": 25.0,
            "Sodium, Na (mg)": 1500.0,
            "Iron, Fe (mg)": 18.0,
            "Potassium, K (mg)": 3500.0,
            "Magnesium, Mg (mg)": 400.0,
            "Zinc, Zn (mg)": 11.0,
            "Vitamin C, total ascorbic acid (mg)": 90.0
        }

        # Build vector based on nutrient_list
        vector = []
        for nutrient in nutrient_list:
            # Fallback priority: 1. Manual targets, 2. Population Mean, 3. Zero
            default_val = nutrient_means.get(nutrient, 0.0) if nutrient_means else 0.0
            vector.append(targets.get(nutrient, default_val))
            
        return np.array(vector)
