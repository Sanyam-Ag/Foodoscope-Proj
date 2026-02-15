"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle2, Smile, Meh, Frown, Zap, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FadeIn } from "@/components/motion-wrapper";

const feedbackSchema = z.object({
    comment: z.string().min(3, "Please share at least a few words"),
});

type FeedbackForm = z.infer<typeof feedbackSchema>;

const moods = [
    { icon: Frown, label: "Bad", value: 1, color: "text-danger" },
    { icon: Meh, label: "Okay", value: 2, color: "text-warning" },
    { icon: Smile, label: "Good", value: 3, color: "text-accent" },
    { icon: Heart, label: "Great", value: 4, color: "text-primary" },
    { icon: Zap, label: "Amazing", value: 5, color: "text-success" },
];

const digestionOptions = [
    { label: "Uncomfortable", value: 1 },
    { label: "Okay", value: 2 },
    { label: "Good", value: 3 },
    { label: "Excellent", value: 4 },
];

export default function FeedbackPage() {
    const [selectedMood, setSelectedMood] = useState<number | null>(null);
    const [energyLevel, setEnergyLevel] = useState(3);
    const [digestion, setDigestion] = useState<number | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FeedbackForm>({
        resolver: zodResolver(feedbackSchema),
    });

    const onSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <FadeIn>
                <div>
                    <h1 className="font-heading text-2xl font-bold text-main">
                        Give Feedback
                    </h1>
                    <p className="text-sm text-secondary mt-1">
                        Tell us how your meals made you feel. This helps our AI learn.
                    </p>
                </div>
            </FadeIn>

            <AnimatePresence mode="wait">
                {!submitted ? (
                    <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Comment */}
                        <FadeIn delay={0.1}>
                            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm space-y-3">
                                <Label htmlFor="comment">How did your meals go?</Label>
                                <Textarea
                                    id="comment"
                                    placeholder="The salmon bowl was delicious but felt a bit heavy. I'd prefer lighter dinners..."
                                    {...register("comment")}
                                />
                                {errors.comment && (
                                    <p className="text-xs text-danger">{errors.comment.message}</p>
                                )}
                            </div>
                        </FadeIn>

                        {/* Mood Selector */}
                        <FadeIn delay={0.15}>
                            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                                <Label className="mb-3 block">Overall Mood</Label>
                                <div className="flex gap-3">
                                    {moods.map((mood) => (
                                        <button
                                            key={mood.value}
                                            type="button"
                                            onClick={() => setSelectedMood(mood.value)}
                                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl flex-1 transition-all duration-200 border ${selectedMood === mood.value
                                                ? "border-primary bg-primary/5 scale-105"
                                                : "border-transparent hover:bg-muted"
                                                }`}
                                        >
                                            <mood.icon
                                                className={`w-6 h-6 ${selectedMood === mood.value
                                                    ? mood.color
                                                    : "text-secondary"
                                                    }`}
                                            />
                                            <span className="text-[10px] font-medium text-secondary">
                                                {mood.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>

                        {/* Energy Level */}
                        <FadeIn delay={0.2}>
                            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between mb-3">
                                    <Label>Energy Level</Label>
                                    <span className="text-sm font-semibold text-primary">
                                        {energyLevel}/5
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    step="1"
                                    value={energyLevel}
                                    onChange={(e) => setEnergyLevel(Number(e.target.value))}
                                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between mt-2">
                                    <span className="text-[10px] text-secondary">Low</span>
                                    <span className="text-[10px] text-secondary">High</span>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Digestion Comfort */}
                        <FadeIn delay={0.25}>
                            <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
                                <Label className="mb-3 block">Digestion Comfort</Label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    {digestionOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setDigestion(option.value)}
                                            className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border ${digestion === option.value
                                                ? "border-primary bg-primary/5 text-primary"
                                                : "border-border text-secondary hover:bg-muted"
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>

                        {/* Submit */}
                        <FadeIn delay={0.3}>
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
                                        <Send className="w-4 h-4" />
                                        Submit Feedback
                                    </>
                                )}
                            </Button>
                        </FadeIn>
                    </motion.form>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="rounded-2xl border border-border bg-white p-12 shadow-sm text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-white" />
                            </div>
                        </motion.div>
                        <h2 className="font-heading text-xl font-bold text-main mb-2">
                            Thanks for your feedback!
                        </h2>
                        <p className="text-sm text-secondary mb-6">
                            Your input helps our AI personalize your meals even better.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSubmitted(false);
                                setSelectedMood(null);
                                setEnergyLevel(3);
                                setDigestion(null);
                            }}
                        >
                            Submit Another
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}