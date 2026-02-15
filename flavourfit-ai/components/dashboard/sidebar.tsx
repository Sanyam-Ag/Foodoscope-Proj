"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Upload,
    ChefHat,
    CalendarDays,
    MessageSquare,
    Settings,
    Leaf,
    ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/recipes", icon: ChefHat, label: "Recipes" },
    { href: "/dashboard/diet-plan", icon: CalendarDays, label: "Diet Plan" },

    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: collapsed ? 72 : 256 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 bg-white border-r border-border"
            >
                {/* Logo */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-border">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shrink-0">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.span
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="font-heading text-lg font-bold text-main whitespace-nowrap overflow-hidden"
                                >
                                    FlavorFit
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors text-secondary"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <ChevronLeft
                            className={cn(
                                "w-4 h-4 transition-transform duration-300",
                                collapsed && "rotate-180"
                            )}
                        />
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-secondary hover:text-main hover:bg-muted"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="sidebar-active"
                                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <item.icon className="w-5 h-5 shrink-0" />
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: "auto" }}
                                            exit={{ opacity: 0, width: 0 }}
                                            className="whitespace-nowrap overflow-hidden"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        );
                    })}
                </nav>
            </motion.aside>

            {/* Mobile Bottom Nav */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border px-2 py-2">
                <div className="flex items-center justify-around">
                    {sidebarItems.slice(0, 5).map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-xs transition-colors",
                                    isActive ? "text-primary" : "text-secondary"
                                )}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="truncate max-w-[60px]">
                                    {item.label.split(" ")[0]}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </>
    );
}
