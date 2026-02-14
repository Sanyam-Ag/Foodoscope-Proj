"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const meals = [
    {
        name: "Grilled Salmon Bowl",
        type: "Lunch",
        calories: 520,
        status: "completed",
        time: "Today, 12:30 PM",
    },
    {
        name: "Greek Yogurt Parfait",
        type: "Breakfast",
        calories: 310,
        status: "completed",
        time: "Today, 8:00 AM",
    },
    {
        name: "Quinoa Veggie Stir-fry",
        type: "Dinner",
        calories: 480,
        status: "upcoming",
        time: "Today, 7:00 PM",
    },
    {
        name: "Almond Butter Toast",
        type: "Snack",
        calories: 220,
        status: "skipped",
        time: "Yesterday",
    },
    {
        name: "Chicken Caesar Salad",
        type: "Lunch",
        calories: 440,
        status: "completed",
        time: "Yesterday",
    },
];

const statusVariant: Record<string, "success" | "default" | "warning" | "danger"> = {
    completed: "success",
    upcoming: "default",
    skipped: "danger",
};

export function RecentMeals() {
    return (
        <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border">
                <h3 className="text-sm font-semibold text-main">Recent Meals</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-muted/30">
                            <th className="text-left text-xs font-medium text-secondary uppercase tracking-wider px-5 py-3">
                                Meal
                            </th>
                            <th className="text-left text-xs font-medium text-secondary uppercase tracking-wider px-5 py-3">
                                Type
                            </th>
                            <th className="text-left text-xs font-medium text-secondary uppercase tracking-wider px-5 py-3">
                                Calories
                            </th>
                            <th className="text-left text-xs font-medium text-secondary uppercase tracking-wider px-5 py-3">
                                Status
                            </th>
                            <th className="text-left text-xs font-medium text-secondary uppercase tracking-wider px-5 py-3">
                                Time
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {meals.map((meal, i) => (
                            <tr
                                key={i}
                                className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                            >
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center shrink-0">
                                            <span className="text-xs font-bold text-primary">
                                                {meal.name[0]}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-main">
                                            {meal.name}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-5 py-3.5 text-sm text-secondary">
                                    {meal.type}
                                </td>
                                <td className="px-5 py-3.5 text-sm text-main font-medium">
                                    {meal.calories} kcal
                                </td>
                                <td className="px-5 py-3.5">
                                    <Badge variant={statusVariant[meal.status]}>
                                        {meal.status}
                                    </Badge>
                                </td>
                                <td className="px-5 py-3.5 text-sm text-secondary">
                                    {meal.time}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
