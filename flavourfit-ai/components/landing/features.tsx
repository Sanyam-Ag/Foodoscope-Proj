"use client";

import React from "react";
import {
    ScanEye,
    Utensils,
    CalendarDays,
    ShieldAlert,
    Brain,
} from "lucide-react";
import { StaggerContainer, StaggerItem, ScaleOnHover } from "@/components/motion-wrapper";
import { FadeIn } from "@/components/motion-wrapper";

const features = [
    {
        icon: ScanEye,
        title: "Ingredient Image Detection",
        description:
            "Point your camera and our computer vision model identifies ingredients instantly with 98% accuracy.",
        gradient: "from-primary to-primary-hover",
    },
    {
        icon: Utensils,
        title: "Smart Recipe Generation",
        description:
            "AI generates delicious recipes from your available ingredients, matching your flavor preferences.",
        gradient: "from-primary to-accent",
    },
    {
        icon: CalendarDays,
        title: "Personalized Diet Planning",
        description:
            "Weekly meal plans optimized for your health goals, lifestyle, and nutritional needs.",
        gradient: "from-accent to-accent-light",
    },
    {
        icon: ShieldAlert,
        title: "Allergy & Substitution AI",
        description:
            "Automatically detects allergens and suggests safe, tasty substitutions you'll enjoy.",
        gradient: "from-warning to-accent",
    },
    {
        icon: Brain,
        title: "Feedback Learning AI",
        description:
            "The more you use it, the smarter it gets. Your feedback shapes every recommendation.",
        gradient: "from-primary to-accent",
    },
];

export function Features() {
    return (
        <section id="features" className="py-20 lg:py-28 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <FadeIn className="text-center max-w-2xl mx-auto mb-16">
                    <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
                        Features
                    </p>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold text-main mb-4">
                        Everything you need for{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            intelligent nutrition
                        </span>
                    </h2>
                    <p className="text-secondary text-base">
                        Powerful AI features designed to make healthy eating effortless and enjoyable.
                    </p>
                </FadeIn>

                <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <StaggerItem key={feature.title}>
                            <ScaleOnHover>
                                <div
                                    className={`relative p-6 rounded-2xl border border-border bg-white hover:shadow-lg transition-shadow duration-300 h-full ${i === features.length - 1 && features.length % 3 === 2
                                            ? "sm:col-span-2 lg:col-span-1"
                                            : ""
                                        }`}
                                >
                                    <div
                                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}
                                    >
                                        <feature.icon className="w-5 h-5 text-white" />
                                    </div>

                                    <h3 className="text-base font-semibold text-main mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-secondary leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </ScaleOnHover>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
