"use client";

import React from "react";
import Link from "next/link";
import { Camera, CalendarDays, Bot, ArrowRight } from "lucide-react";
import { ScaleOnHover } from "@/components/motion-wrapper";

const actions = [
    {
        href: "/dashboard/upload",
        icon: Camera,
        title: "Upload Ingredients",
        description: "Snap a photo to detect ingredients",
        gradient: "from-primary to-accent",
    },
    {
        href: "/dashboard/diet-plan",
        icon: CalendarDays,
        title: "Generate Diet Plan",
        description: "Create your weekly meal plan",
        gradient: "from-accent to-accent-light",
    },
    {
        href: "/dashboard/feedback",
        icon: Bot,
        title: "Ask AI Assistant",
        description: "Get nutrition advice instantly",
        gradient: "from-primary-hover to-primary",
    },
];

export function QuickActions() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {actions.map((action) => (
                <ScaleOnHover key={action.title}>
                    <Link href={action.href} className="block">
                        <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-5 shadow-sm group cursor-pointer">
                            <div
                                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3`}
                            >
                                <action.icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-sm font-semibold text-main mb-1">
                                {action.title}
                            </h3>
                            <p className="text-xs text-secondary">{action.description}</p>
                            <ArrowRight className="absolute bottom-5 right-5 w-4 h-4 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </div>
                    </Link>
                </ScaleOnHover>
            ))}
        </div>
    );
}
