"use client";

import React from "react";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";

export function Topbar() {
    return (
        <header className="h-16 border-b border-border bg-white flex items-center justify-between px-6 gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                <Input
                    placeholder="Ask AI or search meals..."
                    className="pl-10 bg-muted/50 border-transparent focus-visible:bg-white"
                />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
                <div className="relative p-2 rounded-xl hover:bg-muted transition-colors text-secondary cursor-pointer">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
                </div>

                <div className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-muted transition-colors">
                    <UserButton />
                </div>
            </div>
        </header>
    );
}
