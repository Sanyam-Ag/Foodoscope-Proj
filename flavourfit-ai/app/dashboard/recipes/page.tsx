"use client";

import React from "react";
import { ChefHat, Clock, Heart, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/motion-wrapper";

export default function RecipesPage() {
    const [activeTab] = React.useState("All"); // Kept simple for now, or just remove
    const [recommendations, setRecommendations] = React.useState<{ [key: string]: any[] }>({
        carbs: [],
        protein: [],
        energy: [],
        calories: []
    });
    const [loadingStates, setLoadingStates] = React.useState<{ [key: string]: boolean }>({
        carbs: true,
        protein: true,
        energy: true,
        calories: true
    });
    const [errors, setErrors] = React.useState<{ [key: string]: boolean }>({
        carbs: false,
        protein: false,
        energy: false,
        calories: false
    });

    const [apiError, setApiError] = React.useState<string | null>(null);

    const fetchNutrient = async (type: string) => {
        const key = type.toLowerCase();
        setLoadingStates(prev => ({ ...prev, [key]: true }));
        setErrors(prev => ({ ...prev, [key]: false }));

        try {
            const res = await fetch(`/api/recipes/recommend/${key}`, { method: "POST" });
            console.log(`[RecipesPage] Fetch ${type} status: ${res.status}`);
            if (res.ok) {
                const data = await res.json();
                console.log(`[RecipesPage] ${type} response:`, {
                    recipesCount: data.recipes?.length,
                    error: data.error
                });

                if (data.error) {
                    setApiError(data.error);
                }

                // Handle both { recipes: [...] } and direct array response
                const recipes = Array.isArray(data) ? data : (data.recipes || []);
                setRecommendations(prev => ({ ...prev, [key]: recipes }));
            } else {
                const errData = await res.json().catch(() => ({}));
                console.error(`[RecipesPage] ${type} error:`, errData);
                setErrors(prev => ({ ...prev, [key]: true }));
                if (errData.error) setApiError(errData.error);
            }
        } catch (err) {
            console.error(`[RecipesPage] Failed to fetch ${type}:`, err);
            setErrors(prev => ({ ...prev, [key]: true }));
        } finally {
            setLoadingStates(prev => ({ ...prev, [key]: false }));
        }
    };

    const fetchAll = () => {
        ["carbs", "protein", "energy", "calories"].forEach(fetchNutrient);
    };

    React.useEffect(() => {
        fetchAll();
    }, []);

    const recipesToShow = React.useMemo(() => {
        const all = [
            ...recommendations.carbs,
            ...recommendations.protein,
            ...recommendations.energy,
            ...recommendations.calories
        ];
        // Unique by ID and sort globally
        const unique = Array.from(new Map(all.map(r => [r.id, r])).values());
        console.log("Filtered Recipes Count:", unique.length);
        return unique.sort((a, b) => parseInt(b.match) - parseInt(a.match)).slice(0, 50); // Increased limit as we show all
    }, [recommendations]);

    const isLoading = Object.values(loadingStates).some(Boolean) && recipesToShow.length === 0;

    return (
        <div className="space-y-6">
            <FadeIn>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="font-heading text-2xl font-bold text-main">
                            Recipes
                        </h1>
                        <p className="text-sm text-secondary mt-1">
                            AI-curated recipes personalized to your taste and goals.
                        </p>
                    </div>
                    <Button variant="accent" size="sm" onClick={fetchAll} disabled={Object.values(loadingStates).some(Boolean)}>
                        <ChefHat className={`w-4 h-4 ${Object.values(loadingStates).some(Boolean) ? "animate-spin" : ""}`} />
                        {Object.values(loadingStates).some(Boolean) ? "Generating..." : "Generate New"}
                    </Button>
                </div>
            </FadeIn>

            {/* Search */}
            <FadeIn delay={0.1}>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                        <Input placeholder="Search recipes..." className="pl-10" />
                    </div>
                </div>
            </FadeIn>

            {/* Recipe Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-64 rounded-2xl bg-muted animate-pulse" />
                    ))}
                </div>
            ) : Object.values(errors).every(Boolean) && recipesToShow.length === 0 ? (
                <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                    <ChefHat className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg font-bold text-main">Failed to load recommendations</h3>
                    <p className="text-secondary text-sm mb-6">
                        {apiError || "Make sure your adaptive backend is running."}
                    </p>
                    <Button variant="outline" onClick={fetchAll}>Try Again</Button>
                </div>
            ) : recipesToShow.length === 0 ? (
                <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-border">
                    <ChefHat className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg font-bold text-main">No recipes found</h3>
                    <p className="text-secondary text-sm mb-6">
                        {apiError || "No recipes matched your nutritional profile. Try generating new recommendations."}
                    </p>
                    <Button variant="outline" onClick={fetchAll}>Generate New</Button>
                </div>
            ) : (
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recipesToShow.map((recipe: any) => (
                        <StaggerItem key={recipe.id}>
                            <ScaleOnHover>
                                <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden group cursor-pointer h-full flex flex-col">
                                    {/* Image */}
                                    <div className="h-36 bg-muted relative overflow-hidden">
                                        <img
                                            src={recipe.image}
                                            alt={recipe.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop";
                                            }}
                                        />
                                        <Badge
                                            variant="success"
                                            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm shadow-sm"
                                        >
                                            {recipe.match} match
                                        </Badge>
                                    </div>

                                    <div className="p-4 flex flex-col flex-1">
                                        <h3 className="text-sm font-semibold text-main mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                            {recipe.name}
                                        </h3>
                                        <div className="flex items-center gap-3 text-xs text-secondary mb-3">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {recipe.time}
                                            </span>
                                            <span>{recipe.calories} kcal</span>
                                            <span className="text-primary font-medium ml-auto">
                                                {recipe.difficulty}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {recipe.tags.map((tag: string) => (
                                                <Badge key={tag} variant="secondary" className="text-[10px]">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between">
                                            <a
                                                href={`/dashboard/recipes/${recipe.id}`}
                                                className="text-xs text-primary font-medium hover:text-primary-hover transition-colors"
                                            >
                                                View Recipe →
                                            </a>
                                            <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-secondary hover:text-danger">
                                                <Heart className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </ScaleOnHover>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            )}
        </div>
    );
}
