from datetime import datetime
from utils import load_json, save_json
import os

LOG_FILE = "logs/diet_logs.json"

def log_recommendations(user_id, recommendations):
    logs = load_json(LOG_FILE)

    if not isinstance(logs, dict):
        logs = {}

    if user_id not in logs:
        logs[user_id] = []

    logs[user_id].append({
        "timestamp": datetime.now().isoformat(),
        "data": recommendations.to_dict(orient="records") if hasattr(recommendations, 'to_dict') else recommendations
    })

    save_json(LOG_FILE, logs)
