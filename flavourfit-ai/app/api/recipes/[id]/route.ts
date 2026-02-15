import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const apiKey = process.env.FOODOSCOPE_API_KEY;

        if (!apiKey) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const headers = {
            "Authorization": `Bearer ${apiKey}`
        };

        const detailRes = await fetch(`http://cosylab.iiitd.edu.in:6969/recipe2-api/search-recipe/${id}`, { headers });
        const detailData = await detailRes.json();

        if (!detailData.recipe) {
            return NextResponse.json({ error: "Failed to fetch recipe details" }, { status: 500 });
        }

        const recipe = detailData.recipe;

        // Image logic - improve placeholder
        // Image logic - consistent with frontend
        let imageUrl = recipe.img_url;
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

        if (!imageUrl || imageUrl.includes("gk-shareGraphic.png") || imageUrl.includes("placeholder")) {
            const title = recipe.Recipe_title || "Recipe";
            let hash = 0;
            for (let i = 0; i < title.length; i++) {
                hash = title.charCodeAt(i) + ((hash << 5) - hash);
            }
            const index = Math.abs(hash) % fallbackImages.length;
            imageUrl = fallbackImages[index];
        }

        const mappedRecipe = {
            id: recipe.Recipe_id,
            title: recipe.Recipe_title,
            description: `A delicious ${recipe.Region || ""} dish from the ${recipe.Continent || ""} continent. Prepared using ${recipe.Processes?.split("||").length || 0} unique processes and ${recipe.Utensils?.split("||").length || 0} utensils.`,
            calories: Math.round(parseFloat(recipe.Calories || "0")),
            prepTime: recipe.prep_time !== "0" ? `${recipe.prep_time} min` : `${recipe.total_time} min`,
            servings: parseInt(recipe.servings || "1"),
            difficulty: (recipe.Processes?.split("||").length > 10) ? "Medium" : "Easy",
            rating: 4.5,
            reviews: 120,
            tags: [
                recipe.Region,
                recipe.Continent,
                recipe.vegan === "1.0" ? "Vegan" : null
            ].filter(Boolean),
            macros: {
                protein: recipe["Protein (g)"] ? `${Math.round(parseFloat(recipe["Protein (g)"]))}g` : "N/A",
                carbs: recipe["Carbohydrate, by difference (g)"] ? `${Math.round(parseFloat(recipe["Carbohydrate, by difference (g)"]))}g` : "N/A",
                fats: recipe["Total lipid (fat) (g)"] ? `${Math.round(parseFloat(recipe["Total lipid (fat) (g)"]))}g` : "N/A"
            },
            image: imageUrl,
            ingredients: detailData.ingredients.map((ing: any) => ing.ingredient_Phrase),
            processes: recipe.Processes?.split("||") || [],
            utensils: recipe.Utensils?.split("||") || []
        };

        return NextResponse.json(mappedRecipe);

    } catch (error: any) {
        console.error("Recipe API Error:", error);
        return NextResponse.json({ error: "Failed to fetch recipe details", details: error.message }, { status: 500 });
    }
}
