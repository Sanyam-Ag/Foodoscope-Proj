import requests
import json

def test_recommendation_api():
    url = "http://127.0.0.1:8000/recommend"
    
    payload = {
        "user_id": "api_test_user",
        "age": 28,
        "gender": "male",
        "weight": 60.0,
        "height": 165.0,
        "activityLevel": "moderately_active",
        "dietaryPreference": "vegan",
        "primaryGoal": "weight_loss",
        "allergies": ["Peanuts"],
        "medicalHistory": ["Diabetes"],
        "healthGoals": ["Weight Loss"]
    }
    
    print(f"Sending request to {url}...")
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
