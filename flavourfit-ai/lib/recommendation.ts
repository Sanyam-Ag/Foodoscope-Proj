import { connectDB } from "./connectDB";
import User from "@/model/user.model";

const FOODOSCOPE_API_KEY = process.env.FOODOSCOPE_API_KEY;

const headers = {
    "Authorization": `Bearer ${FOODOSCOPE_API_KEY}`,
    "Content-Type": "application/json"
};

// High-quality high-resolution Unsplash fallbacks for diverse food categories
const fallbackImages = [
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop", // Salad
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop", // Healthy bowl
    "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop", // Light meal
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2032&auto=format&fit=crop", // Plated dish
    "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop", // Ingredients
    "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=2094&auto=format&fit=crop", // Pasta/Grain
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2070&auto=format&fit=crop", // Meat/Protein
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2070&auto=format&fit=crop"  // Mediterranean
];

// Simple hash function to select a deterministic fallback image based on title
const getFallbackImage = (title: string) => {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % fallbackImages.length;
    return fallbackImages[index];
};

export const getNutrientRanges = async () => {
    try {
        await connectDB();
        const user = await User.findOne();

        if (!user) throw new Error("User not found");

        const activityMap: Record<string, string> = {
            "sedentary": "sedentary",
            "lightly-active": "light",
            "moderately-active": "moderately_active",
            "very-active": "active",
            "extra-active": "active"
        };

        const goalMap: Record<string, string> = {
            "weight-loss": "weight_loss",
            "muscle-gain": "muscle_gain",
            "maintenance": "maintenance",
            "improved-health": "maintenance"
        };

        const payload = {
            user_id: user.clerkId || "default",
            age: user.age,
            gender: user.gender,
            weight: user.weight,
            height: user.height,
            activityLevel: activityMap[user.activityLevel] || "moderately_active",
            dietaryPreference: user.dietaryPreference,
            primaryGoal: goalMap[user.primaryGoal] || "maintenance",
            allergies: user.allergies,
            medicalHistory: user.medicalHistory,
            healthGoals: [goalMap[user.primaryGoal] || "maintenance"]
        };

        const res = await fetch("http://127.0.0.1:8000/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("Python Backend Error:", errText);
            throw new Error("Backend service unavailable");
        }

        return await res.json();
    } catch (err) {
        console.error("Error in getNutrientRanges:", err);
        // Fallback mock data to prevent app crash if backend is down
        return {
            nutrient_ranges: {
                "Carbohydrate, by difference (g)": { min: 10, max: 100 },
                "Protein (g)": { min: 10, max: 100 },
                "Energy (kcal)": { min: 100, max: 800 },
                "Calories": { min: 100, max: 800 }
            },
            target_nutrients: {
                "Carbohydrate, by difference (g)": 50,
                "Protein (g)": 50,
                "Energy (kcal)": 500,
                "Calories": 500
            },
            weights: {
                "Carbohydrate, by difference (g)": 1,
                "Protein (g)": 1,
                "Energy (kcal)": 1,
                "Calories": 1
            }
        };
    }
};

export const fetchFoodoscopeRecipes = async (url: string): Promise<{ recipes: any[]; error?: string }> => {
    console.log(`[Foodoscope] Fetching: ${url}`);
    try {
        const res = await fetch(url, { headers });
        console.log(`[Foodoscope] Status: ${res.status}`);

        if (!res.ok) {
            const text = await res.text();
            console.error(`[Foodoscope] Error response:`, text);
            try {
                const errJson = JSON.parse(text);
                if (errJson.error === "Not enough tokens") {
                    return { recipes: [], error: "API token limit reached. Please try again later." };
                }
            } catch { }
            return { recipes: [], error: `API returned status ${res.status}` };
        }

        const data = await res.json();
        const recipes = data.payload?.data || data.recipes || data.payload || data;
        const arr = Array.isArray(recipes) ? recipes : [];
        console.log(`[Foodoscope] Parsed ${arr.length} recipes`);
        return { recipes: arr };
    } catch (err) {
        console.error(`[Foodoscope] Network error:`, err);
        return { recipes: [], error: "Network error connecting to recipe API" };
    }
};

export const mapRecipe = (recipe: any, targets?: any, weights?: any) => {
    const title = recipe.Recipe_title || recipe.name || "Delicious Recipe";

    // Calculate Match % if targets/weights available, else use a smart estimate
    let matchScore = 85;

    const relevantNutrientKeys = [
        "Calories",
        "Energy (kcal)",
        "Protein (g)",
        "Carbohydrate, by difference (g)"
    ];

    if (targets && weights) {
        let totalWeightedDiff = 0;
        let totalWeight = 0;

        relevantNutrientKeys.forEach(n => {
            const target = targets[n];
            const weight = weights[n] || 1;
            const actual = parseFloat(recipe[n] || "0");

            if (target !== undefined && target !== 0) {
                const diff = Math.abs(actual - target) / target;
                totalWeightedDiff += diff * weight;
                totalWeight += weight;
            }
        });

        if (totalWeight > 0) {
            const similarity = 1 - (totalWeightedDiff / totalWeight);
            matchScore = Math.max(70, Math.min(98, Math.round(similarity * 100)));
        }
    } else {
        const seed = title.length + (parseFloat(recipe.Calories || "0") % 10);
        matchScore = 80 + (seed % 18); // 80% - 98%
    }

    return {
        id: recipe.Recipe_id || recipe._id || recipe.id || Math.random().toString(36).substr(2, 9),
        name: title,
        time: recipe.cook_time || "25 min",
        calories: Math.round(parseFloat(recipe.Calories || recipe["Energy (kcal)"] || "400")),
        tags: recipe.dietary_tags || ["Healthy", "Balanced"],
        match: `${matchScore}%`,
        difficulty: recipe.difficulty || "Easy",
        image: recipe.img_url || getFallbackImage(title)
    };
};
