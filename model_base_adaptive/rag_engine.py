from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import json
from config import GUIDELINES_DATA, EMBEDDING_MODEL

class MedicalRAG:
    def __init__(self):
        self.model = SentenceTransformer(EMBEDDING_MODEL)
        
        with open(GUIDELINES_DATA, "r") as f:
            self.guidelines = json.load(f)
        
        self.texts = [g["guideline"] for g in self.guidelines]
        self.conditions = [g["condition"] for g in self.guidelines]
        
        self.embeddings = self.model.encode(self.texts)
        
        dim = self.embeddings.shape[1]
        self.index = faiss.IndexFlatL2(dim)
        self.index.add(np.array(self.embeddings))
    
    def retrieve(self, medical_conditions, top_k=3):
        query = " ".join(medical_conditions)
        query_vec = self.model.encode([query])
        
        _, indices = self.index.search(query_vec, top_k)
        retrieved = [self.guidelines[i] for i in indices[0]]

        # Extract negative constraints dynamically
        constraints = {
            "avoid_ingredients": [],
            "nutrient_thresholds": {} # e.g., {"Sodium, Na (mg)": 1500}
        }

        # Simple keyword-based extraction (in a real app, use an LLM here)
        for g in retrieved:
            text = g["guideline"].lower()
            # Ingredient avoidance
            if "avoid" in text or "limit" in text:
                # Mock extraction logic based on common dietary triggers
                if "sugar" in text: constraints["avoid_ingredients"].append("sugar")
                if "salt" in text or "sodium" in text: constraints["avoid_ingredients"].append("salt")
                if "fat" in text: constraints["avoid_ingredients"].append("fat")
                if "oil" in text: constraints["avoid_ingredients"].append("oil")
            
            # Nutrient thresholds
            if "low sodium" in text:
                constraints["nutrient_thresholds"]["Sodium, Na (mg)"] = 1500
            if "low sugar" in text:
                constraints["nutrient_thresholds"]["Sugars, total (g)"] = 25

        return retrieved, constraints
