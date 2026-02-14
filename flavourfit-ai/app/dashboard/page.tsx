"use client";

import React from "react";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { RecipeOfTheDay } from "@/components/dashboard/recipe-of-the-day";
import { DashboardCharts } from "@/components/dashboard/charts";
import { RecentMeals } from "@/components/dashboard/recent-meals";
import { FadeIn } from "@/components/motion-wrapper";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <FadeIn>
                <div>
                    <h1 className="font-heading text-2xl font-bold text-main">
                        Welcome back, Anshul
                    </h1>
                    <p className="text-sm text-secondary mt-1">
                        Here&#39;s your nutrition overview for today.
                    </p>
                </div>
            </FadeIn>

            <FadeIn delay={0.1}>
                <StatsCards />
            </FadeIn>

            <FadeIn delay={0.2}>
                <RecipeOfTheDay />
            </FadeIn>

            <FadeIn delay={0.3}>
                <QuickActions />
            </FadeIn>

            <FadeIn delay={0.4}>
                <DashboardCharts />
            </FadeIn>

            <FadeIn delay={0.4}>
                <RecentMeals />
            </FadeIn>
        </div>
    );
}
