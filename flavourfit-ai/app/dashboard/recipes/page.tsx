"use client";

import React from "react";
import { ChefHat, Clock, Heart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/motion-wrapper";

const recipes = [
    {
        name: "Mediterranean Quinoa Bowl",
        time: "25 min",
        calories: 420,
        tags: ["High Protein", "Gluten-Free"],
        match: "96%",
        difficulty: "Easy",
    },
    {
        name: "Thai Basil Chicken Stir-fry",
        time: "20 min",
        calories: 380,
        tags: ["Dairy-Free", "Quick"],
        match: "92%",
        difficulty: "Easy",
    },
    {
        name: "Roasted Salmon with Asparagus",
        time: "35 min",
        calories: 520,
        tags: ["Omega-3", "Keto"],
        match: "89%",
        difficulty: "Medium",
    },
    {
        name: "Chickpea & Spinach Curry",
        time: "30 min",
        calories: 360,
        tags: ["Vegan", "High Fiber"],
        match: "94%",
        difficulty: "Easy",
    },
    {
        name: "Avocado & Egg Toast",
        time: "10 min",
        calories: 310,
        tags: ["Vegetarian", "Quick"],
        match: "87%",
        difficulty: "Easy",
    },
    {
        name: "Grilled Chicken Caesar Wrap",
        time: "15 min",
        calories: 440,
        tags: ["High Protein", "Lunch"],
        match: "91%",
        difficulty: "Easy",
    },
];

const categories = ["All", "Quick", "High Protein", "Vegan", "Keto", "Gluten-Free"];

export default function RecipesPage() {
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
                    <Button variant="accent" size="sm">
                        <ChefHat className="w-4 h-4" />
                        Generate New
                    </Button>
                </div>
            </FadeIn>

            {/* Search + Filters */}
            <FadeIn delay={0.1}>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                        <Input placeholder="Search recipes..." className="pl-10" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                        {categories.map((cat, i) => (
                            <button
                                key={cat}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${i === 0
                                        ? "bg-primary text-white"
                                        : "bg-muted text-secondary hover:bg-border"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </FadeIn>

            {/* Recipe Grid */}
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe) => (
                    <StaggerItem key={recipe.name}>
                        <ScaleOnHover>
                            <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden group cursor-pointer">
                                {/* Image placeholder */}
                                <div className="h-36 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                                    <ChefHat className="w-10 h-10 text-primary/30" />
                                    <Badge
                                        variant="success"
                                        className="absolute top-3 right-3"
                                    >
                                        {recipe.match} match
                                    </Badge>
                                </div>

                                <div className="p-4">
                                    <h3 className="text-sm font-semibold text-main mb-2 group-hover:text-primary transition-colors">
                                        {recipe.name}
                                    </h3>
                                    <div className="flex items-center gap-3 text-xs text-secondary mb-3">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {recipe.time}
                                        </span>
                                        <span>{recipe.calories} kcal</span>
                                        <span className="text-primary font-medium">
                                            {recipe.difficulty}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {recipe.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-[10px]">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                                        <button className="text-xs text-primary font-medium hover:text-primary-hover transition-colors">
                                            View Recipe →
                                        </button>
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
        </div>
    );
}
