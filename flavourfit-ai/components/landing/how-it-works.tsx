"use client";

import React from "react";
import { Camera, ChefHat, Send } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

const steps = [
    {
        icon: Camera,
        title: "Snap Your Ingredients",
        description:
            "Take a photo of what you have. Our AI instantly identifies every ingredient.",
        step: "01",
    },
    {
        icon: ChefHat,
        title: "Get Personalized Recipes",
        description:
            "Receive recipes tailored to your dietary needs, allergies, and taste preferences.",
        step: "02",
    },
    {
        icon: Send,
        title: "Give Feedback & Improve",
        description:
            "Rate meals and share how you feel. The AI learns and improves every recommendation.",
        step: "03",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 lg:py-28 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <FadeIn className="text-center max-w-2xl mx-auto mb-16">
                    <p className="text-sm font-medium text-primary mb-2 tracking-wide uppercase">
                        How It Works
                    </p>
                    <h2 className="font-heading text-3xl sm:text-4xl font-bold text-main mb-4">
                        Three simple steps to{" "}
                        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            better nutrition
                        </span>
                    </h2>
                    <p className="text-secondary text-base">
                        No complicated setup. Just snap, eat, and let AI handle the rest.
                    </p>
                </FadeIn>

                <StaggerContainer className="grid md:grid-cols-3 gap-8">
                    {steps.map((step) => (
                        <StaggerItem key={step.step}>
                            <div className="relative p-8 rounded-2xl border border-border bg-background hover:shadow-lg transition-shadow duration-300 group">
                                {/* Step number */}
                                <span className="absolute top-6 right-6 text-5xl font-bold text-muted font-heading">
                                    {step.step}
                                </span>

                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                                    <step.icon className="w-6 h-6 text-white" />
                                </div>

                                <h3 className="text-lg font-semibold text-main mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-secondary leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
