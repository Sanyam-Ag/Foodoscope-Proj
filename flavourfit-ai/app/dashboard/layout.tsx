"use client";

import React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background">
            <Sidebar />
            <div className="lg:pl-64 flex flex-col min-h-screen">
                <Topbar />
                <main className="flex-1 p-6 pb-24 lg:pb-6">{children}</main>
            </div>
        </div>
    );
}
