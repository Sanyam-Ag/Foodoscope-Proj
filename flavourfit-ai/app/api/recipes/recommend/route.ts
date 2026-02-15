import { NextResponse } from "next/server";
import { getNutrientRanges, fetchFoodoscopeRecipes, mapRecipe } from "@/lib/recommendation";

export async function POST() {
    try {
        const rangesData = await getNutrientRanges();
        if (!rangesData || !rangesData.nutrient_ranges) {
            return NextResponse.json({ error: "Could not fetch nutrient ranges" }, { status: 500 });
        }

        const { nutrient_ranges, target_nutrients, weights } = rangesData;

        // Construct URLs with rounded values
        const urls: Record<string, string | null> = {
            calories: nutrient_ranges["Calories"]
                ? `http://cosylab.iiitd.edu.in:6969/recipe2-api/recipes-calories/calories?minCalories=${Math.floor(nutrient_ranges["Calories"].min)}&maxCalories=${Math.ceil(nutrient_ranges["Calories"].max)}&limit=10`
                : null,
            energy: nutrient_ranges["Energy (kcal)"]
                ? `http://cosylab.iiitd.edu.in:6969/recipe2-api/byenergy/energy?minEnergy=${Math.floor(nutrient_ranges["Energy (kcal)"].min)}&maxEnergy=${Math.ceil(nutrient_ranges["Energy (kcal)"].max)}&page=1&limit=20`
                : null,
            carbs: nutrient_ranges["Carbohydrate, by difference (g)"]
                ? `http://cosylab.iiitd.edu.in:6969/recipe2-api/recipe-carbo/recipes-by-carbs?minCarbs=${Math.floor(nutrient_ranges["Carbohydrate, by difference (g)"].min)}&maxCarbs=${Math.ceil(nutrient_ranges["Carbohydrate, by difference (g)"].max)}&page=1&limit=10`
                : null,
            protein: nutrient_ranges["Protein (g)"]
                ? `http://cosylab.iiitd.edu.in:6969/recipe2-api/protein/protein-range?min=${Math.floor(nutrient_ranges["Protein (g)"].min)}&max=${Math.ceil(nutrient_ranges["Protein (g)"].max)}&page=1&limit=10`
                : null
        };

        // Fetch all categories in parallel
        const results = await Promise.all(
            Object.entries(urls).map(async ([key, url]) => {
                if (!url) return { key, recipes: [], error: undefined };
                const result = await fetchFoodoscopeRecipes(url);
                return { key, ...result };
            })
        );

        const sortAndSlice = (recipes: any[]) => {
            return recipes
                .map(r => mapRecipe(r, target_nutrients, weights))
                .sort((a: any, b: any) => parseInt(b.match) - parseInt(a.match))
                .slice(0, 6);
        };

        const response: Record<string, any> = {};
        let apiError: string | undefined;

        for (const result of results) {
            response[result.key] = sortAndSlice(result.recipes);
            if (result.error) apiError = result.error;
        }

        if (apiError) {
            response.error = apiError;
        }

        return NextResponse.json(response);

    } catch (err) {
        console.error("Main Recommendation Route Error:", err);
        return NextResponse.json({ error: "Failed to fetch recommendations" }, { status: 500 });
    }
}
