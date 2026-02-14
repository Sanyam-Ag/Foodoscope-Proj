import { NextResponse } from "next/server";

export async function GET() {
    try {
        const apiKey = process.env.FOODOSCOPE_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const headers = {
            "Authorization": `Bearer ${apiKey}`
        };

        // 1. Get Recipe of the Day ID
        const dailyRecipeRes = await fetch("http://cosylab.iiitd.edu.in:6969/recipe2-api/recipe/recipeofday", { headers });
        const dailyData = await dailyRecipeRes.json();

        if (dailyData.error) {
            return NextResponse.json({ error: dailyData.error }, { status: 400 });
        }

        const recipeId = dailyData.payload.data.Recipe_id;

        // 2. Search for full details including ingredients
        const detailRes = await fetch(`http://cosylab.iiitd.edu.in:6969/recipe2-api/search-recipe/${recipeId}`, { headers });
        const detailData = await detailRes.json();

        if (!detailData.recipe) {
            return NextResponse.json({ error: "Failed to fetch recipe details" }, { status: 500 });
        }

        const recipe = detailData.recipe;

        // Image logic - improve placeholder
        let imageUrl = recipe.img_url;
        if (!imageUrl || imageUrl.includes("gk-shareGraphic.png") || imageUrl.includes("placeholder")) {
            // Using a high-quality generic food image as fallback
            imageUrl = `https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop`;
        }

        const mappedRecipe = {
            id: recipe.Recipe_id,
            title: recipe.Recipe_title,
            description: `A delicious ${recipe.Region || ""} dish from the ${recipe.Continent || ""} continent. Prepared using ${recipe.Processes?.split("||").length || 0} unique processes and ${recipe.Utensils?.split("||").length || 0} utensils.`,
            calories: Math.round(parseFloat(recipe.Calories || "0")),
            prepTime: recipe.prep_time !== "0" ? `${recipe.prep_time} min` : `${recipe.total_time} min`,
            servings: parseInt(recipe.servings || "1"),
            difficulty: recipe.Processes?.split("||").length > 10 ? "Medium" : "Easy",
            rating: 4.5,
            reviews: Math.floor(Math.random() * 200) + 50,
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
            ingredients: detailData.ingredients.map((ing: any) => ing.ingredient_Phrase)
        };

        return NextResponse.json(mappedRecipe);

    } catch (error: any) {
        console.error("Recipe API Error:", error);
        return NextResponse.json({ error: "Failed to fetch daily recipe", details: error.message }, { status: 500 });
    }
}
