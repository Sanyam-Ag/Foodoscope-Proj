"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Leaf, Mail, Lock, User, ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signupSchema = z
    .object({
        name: z.string().min(2, "Name is required"),
        email: z.string().email("Enter a valid email"),
        password: z.string().min(8, "At least 8 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupForm>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-background to-primary/5 -z-10" />
            <div className="absolute top-32 left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl -z-10" />
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-heading text-2xl font-bold text-main">
                        FlavorFit
                    </span>
                </div>

                <div className="rounded-2xl border border-border bg-white p-8 shadow-lg">
                    <div className="text-center mb-6">
                        <h1 className="text-xl font-bold text-main mb-1">
                            Create your account
                        </h1>
                        <p className="text-sm text-secondary">
                            Start your personalized nutrition journey
                        </p>
                    </div>

                    {/* Social Buttons */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <Button variant="outline" className="w-full">
                            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="w-full">
                            <Github className="w-4 h-4" />
                            GitHub
                        </Button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                            <span className="bg-white px-3 text-secondary">
                                or sign up with email
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <div className="relative mt-1.5">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    className="pl-10"
                                    {...register("name")}
                                />
                            </div>
                            {errors.name && (
                                <p className="text-xs text-danger mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <div className="relative mt-1.5">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="pl-10"
                                    {...register("email")}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-xs text-danger mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative mt-1.5">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                    {...register("password")}
                                />
                            </div>
                            {errors.password && (
                                <p className="text-xs text-danger mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <div className="relative mt-1.5">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10"
                                    {...register("confirmPassword")}
                                />
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-danger mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            variant="accent"
                            size="lg"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <motion.div
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="text-center text-sm text-secondary mt-6">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="text-primary font-medium hover:text-primary-hover"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-secondary mt-4">
                    By creating an account, you agree to our{" "}
                    <a href="#" className="text-primary hover:underline">
                        Terms
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                    </a>
                    .
                </p>
            </motion.div>
        </div>
    );
}
