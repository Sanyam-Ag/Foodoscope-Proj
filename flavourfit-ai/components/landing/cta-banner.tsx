"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion-wrapper";

export function CtaBanner() {
    return (
        <section className="py-20 lg:py-28">
            <div className="max-w-7xl mx-auto px-6">
                <FadeIn>
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-hover to-primary p-12 lg:p-16">
                        {/* Decorative circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-accent/15 blur-2xl" />

                        <div className="relative z-10 text-center max-w-2xl mx-auto">
                            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
                                Ready to transform your nutrition?
                            </h2>
                            <p className="text-white/80 text-base mb-8 leading-relaxed">
                                Join thousands of users who are eating smarter, feeling better,
                                and saving time with AI-powered meal planning.
                            </p>
                            <div className="flex flex-wrap justify-center gap-3">
                                <Link href="/signup">
                                    <Button
                                        size="lg"
                                        className="bg-white text-primary hover:bg-white/90 shadow-lg group"
                                    >
                                        Get Started Free
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                                    </Button>
                                </Link>
                                <Link href="/login">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-white/30 text-white hover:bg-white/10"
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
