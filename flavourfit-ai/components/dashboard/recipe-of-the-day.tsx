"use client";

import React from "react";
import { Clock, Users, Flame, ChevronRight, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RecipeOfTheDay() {
    const [recipe, setRecipe] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await fetch("/api/recipe-of-the-day");
                if (res.ok) {
                    const data = await res.json();
                    setRecipe(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to fetch recipe:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, []);

    if (loading) {
        return (
            <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-sm p-8 animate-pulse">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-2/5 h-64 bg-muted rounded-2xl" />
                    <div className="flex-1 space-y-4">
                        <div className="h-4 w-24 bg-muted rounded" />
                        <div className="h-8 w-3/4 bg-muted rounded" />
                        <div className="h-4 w-full bg-muted rounded" />
                        <div className="h-20 w-full bg-muted rounded" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !recipe) {
        return null;
    }

    return (
        <div className="relative overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all duration-300 hover:shadow-md">
            <div className="flex flex-col lg:flex-row">
                {/* Image Section */}
                <div className="relative w-full lg:w-2/5 h-64 lg:h-auto overflow-hidden">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop";
                        }}
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold tracking-wide shadow-lg flex items-center gap-1.5">
                            <Star className="w-3 h-3 fill-current" />
                            RECIPE OF THE DAY
                        </span>
                    </div>
                    <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-secondary hover:text-danger transition-colors shadow-sm">
                        <Heart className="w-4 h-4" />
                    </button>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {recipe.tags.map((tag: string) => (
                                <span key={tag} className="px-2.5 py-1 rounded-lg bg-muted text-secondary text-[11px] font-semibold uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <Link href={`/dashboard/recipes/${recipe.id}`}>
                            <h2 className="text-2xl sm:text-3xl font-bold text-main font-heading mb-3 leading-tight hover:text-primary transition-colors cursor-pointer">
                                {recipe.title}
                            </h2>
                        </Link>

                        <p className="text-secondary text-sm sm:text-base mb-6 max-w-xl line-clamp-3">
                            {recipe.description}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <Flame className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-secondary font-bold uppercase tracking-tighter">Calories</p>
                                    <p className="text-sm font-bold text-main">{recipe.calories} kcal</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-secondary font-bold uppercase tracking-tighter">Time</p>
                                    <p className="text-sm font-bold text-main">{recipe.prepTime}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <Users className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-secondary font-bold uppercase tracking-tighter">Servings</p>
                                    <p className="text-sm font-bold text-main">{recipe.servings}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                                    <Star className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-[10px] text-secondary font-bold uppercase tracking-tighter">Difficulty</p>
                                    <p className="text-sm font-bold text-main">{recipe.difficulty}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-6 border-t border-border mt-auto">
                        <div className="flex gap-8">
                            <div>
                                <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">Protein</p>
                                <p className="text-sm font-bold text-main">{recipe.macros.protein}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">Carbs</p>
                                <p className="text-sm font-bold text-main">{recipe.macros.carbs}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-secondary font-bold uppercase tracking-widest mb-1">Fats</p>
                                <p className="text-sm font-bold text-main">{recipe.macros.fats}</p>
                            </div>
                        </div>

                        <div className="ml-auto w-full sm:w-auto">
                            <Link href={`/dashboard/recipes/${recipe.id}`} className="w-full sm:w-auto">
                                <Button className="w-full sm:w-auto h-12 px-8 rounded-2xl text-base font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1">
                                    View Full Recipe
                                    <ChevronRight className="ml-2 w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
