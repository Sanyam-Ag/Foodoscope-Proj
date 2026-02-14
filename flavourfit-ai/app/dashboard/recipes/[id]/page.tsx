"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChefHat, Clock, Users, Flame, ChevronLeft, Star, Heart, Share2, Printer, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";

export default function RecipeDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [recipe, setRecipe] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                // We'll create this API route next
                const res = await fetch(`/api/recipes/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setRecipe(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to fetch recipe details:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchRecipeDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-secondary font-medium animate-pulse">Loading recipe secrets...</p>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="text-center py-20">
                <ChefHat className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h2 className="text-xl font-bold text-main">Recipe not found</h2>
                <p className="text-secondary mt-2 mb-6">We couldn't find the recipe you're looking for.</p>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Header / Back */}
            <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
                    <ChevronLeft className="w-4 h-4" />
                    Back
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Printer className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full hover:text-danger">
                        <Heart className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Hero Section */}
            <FadeIn>
                <div className="relative rounded-3xl overflow-hidden aspect-[16/9] shadow-xl">
                    <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 sm:p-12">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {recipe.tags?.map((tag: string) => (
                                <Badge key={tag} variant="accent" className="bg-white/20 backdrop-blur-md text-white border-none">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-bold text-white font-heading">
                            {recipe.title}
                        </h1>
                    </div>
                </div>
            </FadeIn>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-4 border border-border flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Time</p>
                        <p className="text-sm font-bold text-main">{recipe.prepTime}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-border flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                        <Flame className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Calories</p>
                        <p className="text-sm font-bold text-main">{recipe.calories} kcal</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-border flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                        <Users className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Servings</p>
                        <p className="text-sm font-bold text-main">{recipe.servings}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-border flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center text-warning">
                        <Star className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">Rating</p>
                        <p className="text-sm font-bold text-main">{recipe.rating} (120+)</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Ingredients */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
                        <h3 className="text-lg font-bold text-main mb-6 flex items-center gap-2">
                            <UtensilsCrossed className="w-5 h-5 text-primary" />
                            Ingredients
                        </h3>
                        <ul className="space-y-4">
                            {recipe.ingredients?.map((ing: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 group">
                                    <div className="w-5 h-5 rounded-full border-2 border-primary/20 flex-shrink-0 mt-0.5 group-hover:border-primary transition-colors" />
                                    <span className="text-sm text-secondary group-hover:text-main transition-colors leading-relaxed">
                                        {ing}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-6 text-white shadow-lg">
                        <h4 className="font-bold mb-4">Nutrition Facts</h4>
                        <div className="space-y-3 opacity-90">
                            <div className="flex justify-between items-center py-2 border-b border-white/10">
                                <span className="text-sm">Protein</span>
                                <span className="font-bold">{recipe.macros.protein}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/10">
                                <span className="text-sm">Carbohydrates</span>
                                <span className="font-bold">{recipe.macros.carbs}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm">Total Fat</span>
                                <span className="font-bold">{recipe.macros.fats}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Steps / Instructions */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                        <h3 className="text-lg font-bold text-main mb-8">Preparation Steps</h3>
                        <div className="space-y-10 relative">
                            {/* Vertical Line */}
                            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-muted" />

                            {recipe.processes?.map((step: string, i: number) => (
                                <div key={i} className="relative pl-12">
                                    <div className="absolute left-0 w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center text-xs font-bold text-primary z-10 transition-transform group-hover:scale-110 shadow-sm">
                                        {i + 1}
                                    </div>
                                    <p className="text-secondary leading-relaxed first-letter:uppercase tracking-wide">
                                        {step.trim()}.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-muted lg:p-8 rounded-3xl border border-border/50">
                        <h4 className="text-sm font-bold text-main mb-4 uppercase tracking-widest">Utensils Needed</h4>
                        <div className="flex flex-wrap gap-2">
                            {recipe.utensils?.map((u: string) => (
                                <Badge key={u} variant="outline" className="bg-white/50 backdrop-blur-sm px-4 py-2 text-secondary">
                                    {u.trim()}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
