import requests
import json

def test_recommendation_api():
    url = "http://127.0.0.1:8000/recommend"
    
    # Load profile data from the central JSON file
    with open("data/initial_user_pref.json", "r") as f:
        profile_data = json.load(f)
    
    # Ensure mandatory fields for API are present and correctly typed
    payload = {
        "user_id": "api_test_user",
        "age": int(profile_data.get("age", 25)),
        "gender": profile_data.get("gender", "male"),
        "weight": float(profile_data.get("weight", 65.0)),
        "height": float(profile_data.get("height", 175.0)),
        "activityLevel": profile_data.get("activityLevel", "moderately_active"),
        "dietaryPreference": profile_data.get("dietaryPreference", "vegan"),
        "primaryGoal": profile_data.get("primaryGoal", "weight_gain"),
        "allergies": profile_data.get("allergies", []),
        "medicalHistory": profile_data.get("medicalHistory", []),
        "healthGoals": profile_data.get("healthGoals", ["Weight Gain"])
    }
    
    print(f"Sending request to {url} with data from initial_user_pref.json...")
    try:
        response = requests.post(url, json=payload, timeout=30)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            print("Response JSON:")
            print(json.dumps(response.json(), indent=4))
        else:
            print(f"Error: {response.text}")
            
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_recommendation_api()
