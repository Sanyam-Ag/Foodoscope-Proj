import React from "react";
import Link from "next/link";
import { Leaf } from "lucide-react";

const footerLinks = {
    Product: ["Features", "Pricing", "Integrations", "Changelog"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Resources: ["Documentation", "API Reference", "Community", "Support"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export function Footer() {
    return (
        <footer className="bg-main text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <Leaf className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-heading text-lg font-bold">FlavorFit</span>
                        </Link>
                        <p className="text-sm text-white/50 leading-relaxed">
                            AI-powered nutrition for a healthier, happier you.
                        </p>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(footerLinks).map(([heading, links]) => (
                        <div key={heading}>
                            <h4 className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-4">
                                {heading}
                            </h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/40">
                        © {new Date().getFullYear()} FlavorFit AI. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="text-xs text-white/40 hover:text-white transition-colors"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
