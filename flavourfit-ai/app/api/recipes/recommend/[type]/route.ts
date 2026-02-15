import { NextResponse } from "next/server";
import { getNutrientRanges, fetchFoodoscopeRecipes, mapRecipe } from "@/lib/recommendation";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ type: string }> }
) {
    try {
        const { type } = await params;
        console.log("[Recommend/type] Type:", type);

        if (!type) {
            return NextResponse.json({ error: "Missing type parameter" }, { status: 400 });
        }

        const rangesData = await getNutrientRanges();
        if (!rangesData || !rangesData.nutrient_ranges) {
            return NextResponse.json({ error: "Could not fetch nutrient ranges. Make sure the Python backend is running." }, { status: 500 });
        }

        const { nutrient_ranges, target_nutrients, weights } = rangesData;
        let url = "";

        const lowerType = type.toLowerCase();

        switch (lowerType) {
            case "carbs": {
                const carbs = nutrient_ranges["Carbohydrate, by difference (g)"];
                if (carbs) {
                    url = `http://cosylab.iiitd.edu.in:6969/recipe2-api/recipe-carbo/recipes-by-carbs?minCarbs=${Math.floor(carbs.min)}&maxCarbs=${Math.ceil(carbs.max)}&limit=10`;
                }
                break;
            }
            case "protein": {
                const protein = nutrient_ranges["Protein (g)"];
                if (protein) {
                    url = `http://cosylab.iiitd.edu.in:6969/recipe2-api/protein/protein-range?min=${Math.floor(protein.min)}&max=${Math.ceil(protein.max)}&page=1&limit=10`;
                }
                break;
            }
            case "energy": {
                const energy = nutrient_ranges["Energy (kcal)"];
                if (energy) {
                    url = `http://cosylab.iiitd.edu.in:6969/recipe2-api/byenergy/energy?minEnergy=${Math.floor(energy.min)}&maxEnergy=${Math.ceil(energy.max)}&page=1&limit=20`;
                }
                break;
            }
            case "calories": {
                const calories = nutrient_ranges["Calories"];
                if (calories) {
                    url = `http://cosylab.iiitd.edu.in:6969/recipe2-api/recipes-calories/calories?minCalories=${Math.floor(calories.min)}&maxCalories=${Math.ceil(calories.max)}&limit=10`;
                }
                break;
            }
            default:
                return NextResponse.json({ error: "Invalid nutrient type" }, { status: 400 });
        }

        if (!url) {
            return NextResponse.json({ recipes: [], error: `No nutrient range found for ${lowerType}` });
        }

        console.log(`[Recommend/${lowerType}] Fetching: ${url}`);
        const result = await fetchFoodoscopeRecipes(url);

        if (result.error) {
            console.error(`[Recommend/${lowerType}] API error: ${result.error}`);
            return NextResponse.json({
                recipes: [],
                error: result.error
            });
        }

        // Map and rank recipes
        const recipes = result.recipes
            .map((r: any) => mapRecipe(r, target_nutrients, weights))
            .sort((a: any, b: any) => parseInt(b.match) - parseInt(a.match))
            .slice(0, 10);

        console.log(`[Recommend/${lowerType}] Returning ${recipes.length} recipes`);
        return NextResponse.json({ recipes });

    } catch (err) {
        console.error("[Recommend/type] CRITICAL ERROR:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
