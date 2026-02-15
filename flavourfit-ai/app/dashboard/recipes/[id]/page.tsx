"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    ChefHat,
    Clock,
    Users,
    Flame,
    ChevronLeft,
    Star,
    Heart,
    Share2,
    Printer,
    UtensilsCrossed,
    Sparkles,
    CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";

export default function RecipeDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const [recipe, setRecipe] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // NEW: feedback state
    const [feedback, setFeedback] = useState("");
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!feedback.trim()) return;

        // Here you could call an API to store feedback
        // await fetch('/api/feedback', { method:'POST', body: JSON.stringify({ recipeId:id, feedback }) })

        setSubmitted(true);
        setFeedback("");

        // Hide success message after 3s
        setTimeout(() => setSubmitted(false), 3000);
    };

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                <p className="text-secondary font-medium animate-pulse">
                    Loading recipe secrets...
                </p>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="text-center py-20">
                <ChefHat className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h2 className="text-xl font-bold text-main">Recipe not found</h2>
                <p className="text-secondary mt-2 mb-6">
                    We couldn't find the recipe you're looking for.
                </p>
                <Button onClick={() => router.back()}>Go Back</Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Header / Back */}
            <div className="flex items-center justify-between">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.back()}
                    className="gap-2"
                >
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
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:text-danger"
                    >
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
                            (e.target as HTMLImageElement).src =
                                "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-8 sm:p-12">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {recipe.tags?.map((tag: string) => (
                                <Badge
                                    key={tag}
                                    variant="accent"
                                    className="bg-white/20 backdrop-blur-md text-white border-none"
                                >
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
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                <Stat icon={<Clock className="w-5 h-5" />} label="Time" value={recipe.prepTime} />
                <Stat
                    icon={<Flame className="w-5 h-5" />}
                    label="Calories"
                    value={`${recipe.calories} kcal`}
                />
                <Stat icon={<Users className="w-5 h-5" />} label="Servings" value={recipe.servings} />
                <Stat
                    icon={<Star className="w-5 h-5" />}
                    label="Rating"
                    value={`${recipe.rating} (120+)`}
                />

                <div
                    className="group bg-white rounded-2xl p-5 border border-border flex items-center gap-4 hover:border-primary/40 hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={() => router.push("/dashboard/features")}
                >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition">
                        <Sparkles className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-semibold">Feedback</p>
                        <p className="text-xs text-muted-foreground">Visit</p>
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Ingredients */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-3xl p-6 border border-border shadow-sm">
                        <h3 className="text-lg font-bold text-main mb-6 flex items-center gap-2">
                            <UtensilsCrossed className="w-5 h-5 text-primary" />
                            Ingredients
                        </h3>
                        <ul className="space-y-4">
                            {recipe.ingredients?.map((ing: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full border-2 border-primary/20 mt-0.5" />
                                    <span className="text-sm text-secondary leading-relaxed">{ing}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-6 text-white shadow-lg">
                        <h4 className="font-bold mb-4">Nutrition Facts</h4>
                        <div className="space-y-3 opacity-90">
                            <Row label="Protein" value={recipe.macros.protein} />
                            <Row label="Carbohydrates" value={recipe.macros.carbs} />
                            <Row label="Total Fat" value={recipe.macros.fats} />
                        </div>
                    </div>
                </div>

                {/* Steps + Feedback */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-3xl p-8 border border-border shadow-sm">
                        <h3 className="text-lg font-bold text-main mb-8">Preparation Steps</h3>
                        <div className="space-y-10 relative">
                            <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-muted" />

                            {recipe.processes?.map((step: string, i: number) => (
                                <div key={i} className="relative pl-12">
                                    <div className="absolute left-0 w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center text-xs font-bold text-primary z-10 shadow-sm">
                                        {i + 1}
                                    </div>
                                    <p className="text-secondary leading-relaxed tracking-wide">
                                        {step.trim()}.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* NEW: Feedback Form */}
                    <div className="bg-white rounded-3xl p-8 border border-border shadow-sm space-y-4">
                        <h3 className="text-lg font-bold">Leave Feedback</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <textarea
                                placeholder="Tell us how this recipe was..."
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="w-full min-h-[120px] rounded-xl border border-border p-4 text-sm outline-none focus:ring-2 focus:ring-primary/40"
                            />

                            <Button type="submit" className="rounded-xl px-6">
                                Submit Feedback
                            </Button>
                        </form>

                        {submitted && (
                            <div className="flex items-center gap-2 text-success text-sm font-medium animate-fade-in">
                                <CheckCircle2 className="w-4 h-4" />
                                Well noted! We'll keep this in mind for next time.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Stat({ icon, label, value }: any) {
    return (
        <div className="bg-white rounded-2xl p-4 border border-border flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                    {label}
                </p>
                <p className="text-sm font-bold text-main">{value}</p>
            </div>
        </div>
    );
}

function Row({ label, value }: any) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-white/10 last:border-none">
            <span className="text-sm">{label}</span>
            <span className="font-bold">{value}</span>
        </div>
    );
}
