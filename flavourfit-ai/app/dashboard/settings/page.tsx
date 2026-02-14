"use client";

import React from "react";
import { User, Bell, Shield, Palette, Globe, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FadeIn } from "@/components/motion-wrapper";

const settingSections = [
    {
        icon: User,
        title: "Profile",
        description: "Manage your personal information",
        fields: [
            { label: "Full Name", placeholder: "Anshul", type: "text" },
            { label: "Email", placeholder: "anshul@example.com", type: "email" },
        ],
    },
    {
        icon: Bell,
        title: "Notifications",
        description: "Choose what you want to be notified about",
        toggles: [
            { label: "Meal reminders", enabled: true },
            { label: "Weekly report", enabled: true },
            { label: "AI suggestions", enabled: false },
        ],
    },
    {
        icon: Shield,
        title: "Dietary Preferences",
        description: "Set your dietary restrictions and allergies",
        tags: ["Dairy-Free", "Low Sodium", "Nut Allergy"],
    },
];

export default function SettingsPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <FadeIn>
                <div>
                    <h1 className="font-heading text-2xl font-bold text-main">
                        Settings
                    </h1>
                    <p className="text-sm text-secondary mt-1">
                        Manage your account and preferences.
                    </p>
                </div>
            </FadeIn>

            {/* Profile Section */}
            <FadeIn delay={0.1}>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-main">Profile</h3>
                            <p className="text-xs text-secondary">Manage your personal information</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                            <span className="text-xl font-bold text-white">A</span>
                        </div>
                        <div>
                            <Button variant="outline" size="sm">Change Photo</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue="Anshul" className="mt-1.5" />
                        </div>
                        <div>
                            <Label htmlFor="email-setting">Email</Label>
                            <Input id="email-setting" defaultValue="anshul@example.com" className="mt-1.5" />
                        </div>
                    </div>
                </div>
            </FadeIn>

            {/* Notifications */}
            <FadeIn delay={0.15}>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                            <Bell className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-main">Notifications</h3>
                            <p className="text-xs text-secondary">Choose what you want to be notified about</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {[
                            { label: "Meal reminders", desc: "Get reminded before each meal", enabled: true },
                            { label: "Weekly progress report", desc: "Summary of your nutrition week", enabled: true },
                            { label: "AI recipe suggestions", desc: "New personalized recipes", enabled: false },
                        ].map((toggle) => (
                            <div
                                key={toggle.label}
                                className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
                            >
                                <div>
                                    <p className="text-sm font-medium text-main">{toggle.label}</p>
                                    <p className="text-xs text-secondary">{toggle.desc}</p>
                                </div>
                                <button
                                    className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${toggle.enabled ? "bg-primary" : "bg-border"
                                        }`}
                                >
                                    <span
                                        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${toggle.enabled ? "left-5" : "left-1"
                                            }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </FadeIn>

            {/* Dietary Preferences */}
            <FadeIn delay={0.2}>
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-hover to-primary flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-main">Dietary Preferences</h3>
                            <p className="text-xs text-secondary">Set your dietary restrictions and allergies</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {["Dairy-Free", "Low Sodium", "Nut Allergy"].map((pref) => (
                            <span
                                key={pref}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                            >
                                {pref}
                                <button className="hover:text-danger transition-colors">×</button>
                            </span>
                        ))}
                    </div>
                    <Input placeholder="Add dietary preference..." />
                </div>
            </FadeIn>

            {/* Actions */}
            <FadeIn delay={0.25}>
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="accent" className="flex-1">Save Changes</Button>
                    <Button variant="outline" className="text-danger hover:bg-danger/5 border-danger/20">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Button>
                </div>
            </FadeIn>
        </div>
    );
}
