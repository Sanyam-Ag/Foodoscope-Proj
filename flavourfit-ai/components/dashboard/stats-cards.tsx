"use client";

import React from "react";
import { Activity, Flame, TrendingUp, AlertCircle } from "lucide-react";
import { ScaleOnHover } from "@/components/motion-wrapper";

const stats = [
    {
        label: "Diet Score",
        value: "92",
        unit: "/100",
        change: "+4 this week",
        changeType: "positive" as const,
        icon: Activity,
        gradient: "from-primary to-accent",
        bgGradient: "from-primary/10 to-accent/5",
    },
    {
        label: "Calories Remaining",
        value: "847",
        unit: "kcal",
        change: "of 2,100 daily",
        changeType: "neutral" as const,
        icon: Flame,
        gradient: "from-accent to-accent-light",
        bgGradient: "from-accent/10 to-accent-light/5",
    },
    {
        label: "Energy Trend",
        value: "+12%",
        unit: "",
        change: "vs last week",
        changeType: "positive" as const,
        icon: TrendingUp,
        gradient: "from-primary to-primary-hover",
        bgGradient: "from-primary/10 to-primary-hover/5",
    },
    {
        label: "Recent Reaction",
        value: "Mild",
        unit: "",
        change: "Dairy sensitivity",
        changeType: "warning" as const,
        icon: AlertCircle,
        gradient: "from-warning to-warning",
        bgGradient: "from-warning/10 to-warning/5",
    },
];

export function StatsCards() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <ScaleOnHover key={stat.label}>
                    <div
                        className={`relative overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm`}
                    >
                        {/* Subtle gradient bg */}
                        <div
                            className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.bgGradient} rounded-full blur-2xl -translate-y-4 translate-x-4`}
                        />

                        <div className="relative">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-medium text-secondary uppercase tracking-wider">
                                    {stat.label}
                                </span>
                                <div
                                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}
                                >
                                    <stat.icon className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            <p className="text-2xl font-bold text-main font-heading">
                                {stat.value}
                                <span className="text-sm font-normal text-secondary ml-1">
                                    {stat.unit}
                                </span>
                            </p>

                            <p
                                className={`text-xs mt-1 ${stat.changeType === "positive"
                                        ? "text-success"
                                        : stat.changeType === "warning"
                                            ? "text-warning"
                                            : "text-secondary"
                                    }`}
                            >
                                {stat.change}
                            </p>
                        </div>
                    </div>
                </ScaleOnHover>
            ))}
        </div>
    );
}
