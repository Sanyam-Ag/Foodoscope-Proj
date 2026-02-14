import json
import os

def load_json(path):
    if not os.path.exists(path):
        with open(path, "w") as f:
            json.dump({}, f)
        return {}

    if os.path.getsize(path) == 0:
        return {}

    with open(path, "r") as f:
        return json.load(f)

def save_json(path, data):
    with open(path, "w") as f:
        json.dump(data, f, indent=4)

def ensure_log_file(path):
    if not os.path.exists(path):
        save_json(path, [])

