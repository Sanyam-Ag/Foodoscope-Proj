"use client";

import React from "react";
import { HeartPulse, TrendingUp, ShieldCheck, FlaskConical } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

const metrics = [
    {
        icon: HeartPulse,
        stat: "98.2%",
        label: "Ingredient Detection Accuracy",
    },
    {
        icon: TrendingUp,
        stat: "47%",
        label: "Avg. Health Improvement in 30 Days",
    },
    {
        icon: ShieldCheck,
        stat: "100%",
        label: "Allergen Safety Checks",
    },
    {
        icon: FlaskConical,
        stat: "12M+",
        label: "Nutritional Data Points Analyzed",
    },
];

export function TrustSection() {
    return (
        <section id="trust" className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left — Text Content */}
                    <FadeIn direction="left">
                        <div>
                            <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
                                Health Intelligence
                            </p>
                            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-main mb-4">
                                Backed by science.{" "}
                                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    Powered by AI.
                                </span>
                            </h2>
                            <p className="text-secondary text-base leading-relaxed mb-6">
                                Our models are trained on millions of nutritional data points
                                and validated by registered dietitians. Every recommendation
                                is evidence-based, safe, and personalized to your body.
                            </p>
                            <div className="flex gap-3">
                                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary to-accent" />
                                <div className="h-1 w-6 rounded-full bg-accent/30" />
                                <div className="h-1 w-3 rounded-full bg-accent/20" />
                            </div>
                        </div>
                    </FadeIn>

                    {/* Right — Metrics Grid */}
                    <StaggerContainer className="grid grid-cols-2 gap-4">
                        {metrics.map((metric) => (
                            <StaggerItem key={metric.label}>
                                <div className="p-6 rounded-2xl border border-border bg-background hover:shadow-md transition-shadow duration-300">
                                    <metric.icon className="w-8 h-8 text-primary mb-3" />
                                    <p className="text-2xl font-bold text-main font-heading">
                                        {metric.stat}
                                    </p>
                                    <p className="text-xs text-secondary mt-1">{metric.label}</p>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </div>
        </section>
    );
}
