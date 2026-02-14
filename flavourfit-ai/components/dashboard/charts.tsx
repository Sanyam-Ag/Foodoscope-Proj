"use client";

import React from "react";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const energyData = [
    { day: "Mon", energy: 72 },
    { day: "Tue", energy: 78 },
    { day: "Wed", energy: 65 },
    { day: "Thu", energy: 82 },
    { day: "Fri", energy: 90 },
    { day: "Sat", energy: 85 },
    { day: "Sun", energy: 88 },
];

const flavorData = [
    { taste: "Sweet", A: 80 },
    { taste: "Sour", A: 60 },
    { taste: "Salty", A: 70 },
    { taste: "Bitter", A: 40 },
    { taste: "Umami", A: 90 },
    { taste: "Spicy", A: 55 },
];

const nutritionData = [
    { name: "Protein", value: 82, fill: "#0F766E" },
    { name: "Carbs", value: 65, fill: "#34D399" },
    { name: "Fats", value: 58, fill: "#115E59" },
    { name: "Fiber", value: 74, fill: "#A7F3D0" },
    { name: "Vitamins", value: 91, fill: "#0F766E" },
];

export function DashboardCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Weekly Energy Line Chart */}
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-main mb-4">Weekly Energy</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={energyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                        <XAxis
                            dataKey="day"
                            tick={{ fontSize: 11, fill: "#64748B" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: "#64748B" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #E2E8F0",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                                fontSize: "12px",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="energy"
                            stroke="#0F766E"
                            strokeWidth={2.5}
                            dot={{ fill: "#0F766E", strokeWidth: 0, r: 3 }}
                            activeDot={{ r: 5, fill: "#34D399" }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Flavor Radar Chart */}
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-main mb-4">Flavor Profile</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <RadarChart data={flavorData} cx="50%" cy="50%" outerRadius="70%">
                        <PolarGrid stroke="#E2E8F0" />
                        <PolarAngleAxis
                            dataKey="taste"
                            tick={{ fontSize: 10, fill: "#64748B" }}
                        />
                        <PolarRadiusAxis tick={false} axisLine={false} />
                        <Radar
                            dataKey="A"
                            stroke="#0F766E"
                            fill="#0F766E"
                            fillOpacity={0.15}
                            strokeWidth={2}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Nutrition Distribution Bar Chart */}
            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-main mb-4">Nutrition</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={nutritionData} layout="vertical" barCategoryGap="20%">
                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" horizontal={false} />
                        <XAxis
                            type="number"
                            tick={{ fontSize: 11, fill: "#64748B" }}
                            axisLine={false}
                            tickLine={false}
                            domain={[0, 100]}
                        />
                        <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fontSize: 11, fill: "#64748B" }}
                            axisLine={false}
                            tickLine={false}
                            width={55}
                        />
                        <Tooltip
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #E2E8F0",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05)",
                                fontSize: "12px",
                            }}
                        />
                        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={14} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
