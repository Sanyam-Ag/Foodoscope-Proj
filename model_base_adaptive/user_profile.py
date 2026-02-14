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

    def generate_nutrient_vector(self):

        calories = self.compute_calories()
        weight = float(self.data["weight"])

        return np.array([
            calories,    
            1.2 * weight,
            200,         
            60,          
            30,          
            25,          
            1500         
        ])
