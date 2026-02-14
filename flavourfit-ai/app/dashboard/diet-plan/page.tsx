"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Coffee,
    UtensilsCrossed,
    Sunset,
    Apple,
    ChevronLeft,
    ChevronRight,
    MessageSquare,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FadeIn, ScaleOnHover } from "@/components/motion-wrapper";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const meals = [
    {
        type: "Breakfast",
        icon: Coffee,
        time: "8:00 AM",
        name: "Overnight Oats with Berries",
        calories: 380,
        protein: 14,
        carbs: 52,
        fat: 12,
        note: "Rich in antioxidants and slow-release energy.",
        gradient: "from-accent/10 to-primary/5",
    },
    {
        type: "Lunch",
        icon: UtensilsCrossed,
        time: "12:30 PM",
        name: "Grilled Chicken Quinoa Bowl",
        calories: 520,
        protein: 42,
        carbs: 48,
        fat: 16,
        note: "High protein, supports muscle recovery.",
        gradient: "from-primary/10 to-accent/5",
    },
    {
        type: "Dinner",
        icon: Sunset,
        time: "7:00 PM",
        name: "Salmon with Roasted Vegetables",
        calories: 480,
        protein: 36,
        carbs: 28,
        fat: 22,
        note: "Omega-3 rich. Supports brain health.",
        gradient: "from-primary-hover/10 to-primary/5",
    },
    {
        type: "Snack",
        icon: Apple,
        time: "3:30 PM",
        name: "Greek Yogurt & Almonds",
        calories: 220,
        protein: 18,
        carbs: 12,
        fat: 10,
        note: "Great afternoon pick-me-up.",
        gradient: "from-accent-light/20 to-accent/5",
    },
];

const nutritionTotals = [
    { label: "Calories", current: 1600, total: 2100, unit: "kcal" },
    { label: "Protein", current: 110, total: 140, unit: "g" },
    { label: "Carbs", current: 140, total: 220, unit: "g" },
    { label: "Fat", current: 60, total: 75, unit: "g" },
];

export default function DietPlanPage() {
    const [selectedDay, setSelectedDay] = useState(2); // Wednesday

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <FadeIn>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="font-heading text-2xl font-bold text-main">
                            Diet Plan
                        </h1>
                        <p className="text-sm text-secondary mt-1">
                            Your personalized meal plan for the week.
                        </p>
                    </div>
                    <Button variant="accent" size="sm">
                        Regenerate Plan
                    </Button>
                </div>
            </FadeIn>

            {/* Weekly Calendar */}
            <FadeIn delay={0.1}>
                <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-secondary">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-semibold text-main">
                            Feb 10 — Feb 16, 2026
                        </span>
                        <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-secondary">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {weekDays.map((day, i) => (
                            <button
                                key={day}
                                onClick={() => setSelectedDay(i)}
                                className={`flex flex-col items-center py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${selectedDay === i
                                        ? "bg-gradient-to-b from-primary to-primary-hover text-white shadow-md"
                                        : "text-secondary hover:bg-muted"
                                    }`}
                            >
                                <span>{day}</span>
                                <span className="text-lg font-bold mt-0.5 font-heading">
                                    {10 + i}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </FadeIn>

            {/* Nutrition Progress */}
            <FadeIn delay={0.15}>
                <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-main mb-4">
                        Daily Nutrition Progress
                    </h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {nutritionTotals.map((item) => (
                            <div key={item.label}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <span className="text-xs text-secondary">{item.label}</span>
                                    <span className="text-xs font-medium text-main">
                                        {item.current}/{item.total} {item.unit}
                                    </span>
                                </div>
                                <Progress value={item.current} max={item.total} />
                            </div>
                        ))}
                    </div>
                </div>
            </FadeIn>

            {/* Meal Timeline */}
            <FadeIn delay={0.2}>
                <div className="space-y-4">
                    {meals.map((meal, i) => (
                        <motion.div
                            key={meal.type}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                        >
                            <ScaleOnHover>
                                <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
                                    <div className="flex flex-col sm:flex-row">
                                        {/* Left accent stripe + icon */}
                                        <div
                                            className={`flex sm:flex-col items-center gap-3 sm:gap-2 p-4 sm:p-5 bg-gradient-to-br ${meal.gradient} sm:w-28 shrink-0`}
                                        >
                                            <meal.icon className="w-6 h-6 text-primary" />
                                            <div className="text-center">
                                                <p className="text-xs font-semibold text-main">
                                                    {meal.type}
                                                </p>
                                                <p className="text-[10px] text-secondary">{meal.time}</p>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 p-4 sm:p-5">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-semibold text-main mb-1">
                                                        {meal.name}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2 mb-3">
                                                        <Badge variant="secondary">
                                                            {meal.calories} kcal
                                                        </Badge>
                                                        <Badge variant="default">P: {meal.protein}g</Badge>
                                                        <Badge variant="accent">C: {meal.carbs}g</Badge>
                                                        <Badge variant="secondary">F: {meal.fat}g</Badge>
                                                    </div>
                                                    <div className="flex items-start gap-2 text-xs text-secondary">
                                                        <AlertCircle className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                                                        {meal.note}
                                                    </div>
                                                </div>

                                                <Button variant="outline" size="sm" className="shrink-0">
                                                    <MessageSquare className="w-3.5 h-3.5" />
                                                    Feedback
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScaleOnHover>
                        </motion.div>
                    ))}
                </div>
            </FadeIn>
        </div>
    );
}
