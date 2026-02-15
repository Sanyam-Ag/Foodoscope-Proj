"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
        id: "2800",
        icon: Coffee,
        time: "8:00 AM",
        name: "Tunisian Grilled Salad (Selata Mishwiya)",
        calories: 320,
        protein: 16,
        carbs: 20,
        fat: 14,
        note: "Fresh start to the day.",
        gradient: "from-accent/10 to-primary/5",
    },
    {
        type: "Lunch",
        id: "2695",
        icon: UtensilsCrossed,
        time: "12:30 PM",
        name: "Moroccan Lamb Kabobs",
        calories: 554,
        protein: 51,
        carbs: 38,
        fat: 22,
        note: "High protein, flavorful mid-day meal.",
        gradient: "from-primary/10 to-accent/5",
    },
    {
        type: "Dinner",
        id: "2703",
        icon: Sunset,
        time: "7:00 PM",
        name: "Mushroom and Chickpea Tagine",
        calories: 292,
        protein: 19,
        carbs: 45,
        fat: 12,
        note: "Hearty and warming for the evening.",
        gradient: "from-primary-hover/10 to-primary/5",
    },
    {
        type: "Snack",
        id: "2613",
        icon: Apple,
        time: "3:30 PM",
        name: "Magpie's Easy Falafel Cakes",
        calories: 409,
        protein: 22,
        carbs: 75,
        fat: 20,
        note: "Satisfying afternoon snack.",
        gradient: "from-accent-light/20 to-accent/5",
    },
];

const nutritionTotals = [
    { label: "Calories", current: 1575, total: 2100, unit: "kcal" },
    { label: "Protein", current: 108, total: 140, unit: "g" },
    { label: "Carbs", current: 178, total: 220, unit: "g" },
    { label: "Fat", current: 68, total: 75, unit: "g" },
];

export default function DietPlanPage() {
    const [selectedDay, setSelectedDay] = useState(2); // Wednesday
    const router = useRouter();

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
                                <div
                                    onClick={() => router.push(`/dashboard/recipes/${meal.id}`)}
                                    className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                                >
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
