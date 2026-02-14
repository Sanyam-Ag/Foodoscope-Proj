"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, ScanEye, ChefHat, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, ScaleOnHover } from "@/components/motion-wrapper";

const mockIngredients = [
    "Chicken Breast",
    "Broccoli",
    "Garlic",
    "Olive Oil",
    "Bell Pepper",
    "Brown Rice",
    "Soy Sauce",
    "Ginger",
];

const mockRecipes = [
    {
        name: "Teriyaki Chicken Bowl",
        time: "25 min",
        calories: 520,
        match: "95%",
    },
    {
        name: "Garlic Stir-Fry Veggies",
        time: "15 min",
        calories: 280,
        match: "88%",
    },
    {
        name: "Chicken & Broccoli Rice",
        time: "30 min",
        calories: 460,
        match: "92%",
    },
];

type UploadState = "idle" | "preview" | "loading" | "results";

export default function UploadPage() {
    const [state, setState] = useState<UploadState>("idle");
    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            setPreviewUrl(URL.createObjectURL(file));
            setState("preview");
        }
    }, []);

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file && file.type.startsWith("image/")) {
                setPreviewUrl(URL.createObjectURL(file));
                setState("preview");
            }
        },
        []
    );

    const handleDetect = () => {
        setState("loading");
        setTimeout(() => setState("results"), 2000);
    };

    const handleReset = () => {
        setState("idle");
        setPreviewUrl(null);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <FadeIn>
                <div>
                    <h1 className="font-heading text-2xl font-bold text-main">
                        Upload Ingredients
                    </h1>
                    <p className="text-sm text-secondary mt-1">
                        Snap or upload a photo of your ingredients and let AI identify them.
                    </p>
                </div>
            </FadeIn>

            <FadeIn delay={0.1}>
                <AnimatePresence mode="wait">
                    {/* Upload zone */}
                    {state === "idle" && (
                        <motion.div
                            key="upload"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <label
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragActive(true);
                                }}
                                onDragLeave={() => setDragActive(false)}
                                onDrop={handleDrop}
                                className={`flex flex-col items-center justify-center w-full h-72 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${dragActive
                                        ? "border-primary bg-primary/5 scale-[1.01]"
                                        : "border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50"
                                    }`}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4">
                                    <Upload className="w-6 h-6 text-primary" />
                                </div>
                                <p className="text-sm font-medium text-main mb-1">
                                    Drop your image here or click to browse
                                </p>
                                <p className="text-xs text-secondary">
                                    PNG, JPG up to 10MB
                                </p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileInput}
                                />
                            </label>
                        </motion.div>
                    )}

                    {/* Image Preview */}
                    {state === "preview" && previewUrl && (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-4"
                        >
                            <div className="relative rounded-2xl overflow-hidden border border-border bg-white">
                                <img
                                    src={previewUrl}
                                    alt="Ingredient preview"
                                    className="w-full h-72 object-cover"
                                />
                                <button
                                    onClick={handleReset}
                                    className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 hover:bg-white shadow-sm transition-colors"
                                >
                                    <X className="w-4 h-4 text-secondary" />
                                </button>
                            </div>
                            <Button onClick={handleDetect} variant="accent" size="lg" className="w-full">
                                <ScanEye className="w-5 h-5" />
                                Detect Ingredients
                            </Button>
                        </motion.div>
                    )}

                    {/* Loading State */}
                    {state === "loading" && (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-4"
                        >
                            <div className="rounded-2xl border border-border bg-white p-8 flex flex-col items-center justify-center h-72">
                                <motion.div
                                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                                <p className="text-sm font-medium text-main mt-4">
                                    Analyzing your ingredients...
                                </p>
                                <p className="text-xs text-secondary mt-1">
                                    This usually takes a few seconds
                                </p>
                            </div>

                            {/* Shimmer skeleton */}
                            <div className="grid grid-cols-4 gap-3">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-10 rounded-xl bg-muted animate-pulse"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Results */}
                    {state === "results" && (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Detected ingredients */}
                            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-main">
                                        Detected Ingredients
                                    </h3>
                                    <Badge variant="success">
                                        <Sparkles className="w-3 h-3 mr-1" />
                                        {mockIngredients.length} found
                                    </Badge>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {mockIngredients.map((ingredient, i) => (
                                        <motion.div
                                            key={ingredient}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05, duration: 0.3 }}
                                        >
                                            <Badge variant="accent" className="px-3 py-1.5 text-sm">
                                                {ingredient}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Suggested recipes */}
                            <div>
                                <h3 className="text-sm font-semibold text-main mb-3">
                                    Suggested Recipes
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {mockRecipes.map((recipe, i) => (
                                        <motion.div
                                            key={recipe.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                        >
                                            <ScaleOnHover>
                                                <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                                                    <div className="w-full h-28 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3">
                                                        <ChefHat className="w-8 h-8 text-primary/40" />
                                                    </div>
                                                    <h4 className="text-sm font-semibold text-main mb-2">
                                                        {recipe.name}
                                                    </h4>
                                                    <div className="flex items-center gap-3 text-xs text-secondary">
                                                        <span className="flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {recipe.time}
                                                        </span>
                                                        <span>{recipe.calories} kcal</span>
                                                        <Badge variant="success" className="ml-auto">
                                                            {recipe.match}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </ScaleOnHover>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <Button onClick={handleReset} variant="outline" className="w-full">
                                Upload New Photo
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </FadeIn>
        </div>
    );
}
