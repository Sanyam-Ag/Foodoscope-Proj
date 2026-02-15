"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, ArrowRight, Sparkles, BarChart3, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion-wrapper";

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
                <motion.div
                    className="absolute top-20 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/20 to-primary/10 blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute -bottom-20 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-primary/15 to-accent/10 blur-3xl"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div className="max-w-xl">
                        <FadeIn delay={0.1}>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                AI-Powered Nutrition Intelligence
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-main leading-[1.1] tracking-tight mb-6">
                                Eat smarter with{" "}
                                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                    personalized AI
                                </span>{" "}
                                nutrition
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p className="text-lg text-secondary leading-relaxed mb-8">
                                Snap your ingredients, get personalized recipes, build smart
                                diet plans, and let our AI learn from your feedback to craft
                                meals you&apos;ll actually love.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <div className="flex flex-wrap gap-3">
                                <Link href="/dashboard">
                                    <Button size="lg" variant="accent" className="group">
                                        Start
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="group">
                                    <Play className="w-4 h-4" />
                                    Watch Demo
                                </Button>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.5}>
                            <div className="flex items-center gap-6 mt-10 pt-6 border-t border-border">
                                <div className="flex items-center gap-2 text-xs text-secondary">
                                    <Shield className="w-4 h-4 text-primary" />
                                    HIPAA-ready
                                </div>
                                <div className="flex items-center gap-2 text-xs text-secondary">
                                    <BarChart3 className="w-4 h-4 text-primary" />
                                    10k+ meals planned
                                </div>
                                <div className="flex items-center gap-2 text-xs text-secondary">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    98% accuracy
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right — Dashboard Mockup */}
                    <FadeIn delay={0.3} direction="right">
                        <div className="relative">
                            <div className="relative rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
                                {/* Fake browser bar */}
                                <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
                                    </div>
                                    <div className="flex-1 mx-4 h-6 rounded-md bg-muted" />
                                </div>

                                {/* Dashboard preview content */}
                                <div className="p-6 space-y-4">
                                    {/* Mini stats row */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { label: "Diet Score", value: "92", color: "from-primary to-accent" },
                                            { label: "Calories", value: "1,847", color: "from-accent to-accent-light" },
                                            { label: "Energy", value: "↑ 12%", color: "from-primary to-primary-hover" },
                                        ].map((stat) => (
                                            <div
                                                key={stat.label}
                                                className="rounded-xl bg-muted/50 p-3"
                                            >
                                                <p className="text-[10px] text-secondary mb-1">{stat.label}</p>
                                                <p className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                                                    {stat.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mini chart bars */}
                                    <div className="rounded-xl bg-muted/30 p-4">
                                        <p className="text-[10px] text-secondary mb-3">Weekly Energy</p>
                                        <div className="flex items-end gap-2 h-20">
                                            {[40, 65, 50, 80, 70, 90, 60].map((h, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-accent"
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${h}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.6, delay: 0.5 + i * 0.08, ease: "easeOut" }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Mini meal row */}
                                    <div className="space-y-2">
                                        {["Grilled Salmon Bowl", "Quinoa Power Salad"].map((meal) => (
                                            <div key={meal} className="flex items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20" />
                                                <div>
                                                    <p className="text-xs font-medium text-main">{meal}</p>
                                                    <p className="text-[10px] text-secondary">AI Generated</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Decorative floating elements */}
                            <motion.div
                                className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/30 to-primary/20 blur-md -z-10"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                                className="absolute -bottom-3 -left-3 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 blur-md -z-10"
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
