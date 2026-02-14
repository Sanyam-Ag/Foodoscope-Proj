from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import json
from config import GUIDELINES_DATA, EMBEDDING_MODEL

class MedicalRAG:
    _model = None
    _index = None
    _embeddings = None
    _texts = None
    _conditions = None
    _guidelines = None

    def __init__(self):
        if MedicalRAG._model is None:
            print("Initializing MedicalRAG (Model & Index)...")
            MedicalRAG._model = SentenceTransformer(EMBEDDING_MODEL)
            
            with open(GUIDELINES_DATA, "r") as f:
                MedicalRAG._guidelines = json.load(f)
            
            MedicalRAG._texts = [g["guideline"] for g in MedicalRAG._guidelines]
            MedicalRAG._conditions = [g["condition"] for g in MedicalRAG._guidelines]
            
            MedicalRAG._embeddings = MedicalRAG._model.encode(MedicalRAG._texts)
            
            dim = MedicalRAG._embeddings.shape[1]
            MedicalRAG._index = faiss.IndexFlatL2(dim)
            MedicalRAG._index.add(np.array(MedicalRAG._embeddings))
        
        self.model = MedicalRAG._model
        self.guidelines = MedicalRAG._guidelines
        self.texts = MedicalRAG._texts
        self.conditions = MedicalRAG._conditions
        self.embeddings = MedicalRAG._embeddings
        self.index = MedicalRAG._index
    
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
