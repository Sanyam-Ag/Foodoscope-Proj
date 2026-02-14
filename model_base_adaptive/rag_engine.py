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
        
        return [self.guidelines[i] for i in indices[0]]
