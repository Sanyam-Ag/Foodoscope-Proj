"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { X, ChevronDown, Check } from "lucide-react";
import {
    allergyGroups,
    medicalHistoryGroups,
    genderOptions,
    dietaryPreferenceOptions,
    activityLevelOptions,
    goalOptions,
    mealsPerDayOptions,
    alcoholOptions,
    dietRatingOptions,
    cuisineOptions
} from "./data";
import { cn } from "@/lib/utils";

// Helper component for the autocomplete dropdown
function AutocompleteInput({
    label,
    value,
    onChange,
    onSelect,
    placeholder,
    groups,
    selectedItems
}: {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSelect: (item: string) => void;
    placeholder: string;
    groups: { category: string; items: string[] }[];
    selectedItems: string[];
}) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputFocus = () => setIsOpen(true);

    // Filter groups based on input value
    const filteredGroups = groups.map(group => ({
        ...group,
        items: group.items.filter(item =>
            item.toLowerCase().includes(value.toLowerCase()) && !selectedItems.includes(item)
        )
    })).filter(group => group.items.length > 0);

    const hasSuggestions = filteredGroups.length > 0;

    return (
        <div className="relative space-y-2" ref={wrapperRef}>
            <Label className="text-base font-medium text-main">{label}</Label>
            <div className="relative group">
                <Input
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        onChange(e);
                        setIsOpen(true);
                    }}
                    onFocus={handleInputFocus}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && value.trim()) {
                            e.preventDefault();
                            onSelect(value.trim());
                            setIsOpen(false);
                        }
                    }}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />

                {/* Suggestion Dropdown */}
                {isOpen && (value.length > 0 || hasSuggestions) && (
                    <div className="absolute z-50 w-full mt-2 bg-card/95 backdrop-blur-md rounded-2xl border border-border/50 shadow-xl max-h-[350px] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 scrollbar-thin scrollbar-thumb-secondary/20 scrollbar-track-transparent">
                        {hasSuggestions ? (
                            filteredGroups.map((group) => (
                                <div key={group.category} className="py-2 first:pt-2 last:pb-2">
                                    <div className="px-4 py-2 text-[11px] font-bold text-primary uppercase tracking-wider bg-muted/40 sticky top-0 backdrop-blur-sm border-y border-border/40 first:border-t-0">
                                        {group.category}
                                    </div>
                                    {group.items.map((item) => (
                                        <div
                                            key={item}
                                            className="px-4 py-2.5 text-sm cursor-pointer text-main hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between group/item"
                                            onClick={() => {
                                                onSelect(item);
                                                setIsOpen(false);
                                            }}
                                        >
                                            <span className="font-medium">{item}</span>
                                            <div className="opacity-0 group-hover/item:opacity-100 transition-opacity text-primary">
                                                <Check className="h-4 w-4" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-6 text-sm text-secondary text-center italic">
                                No matching suggestions.<br />
                                <span className="not-italic text-xs mt-1 block text-muted-foreground">Press Enter to add "{value}"</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// Helper component for Single Select (Dropdown)
function CustomSelect({
    label,
    value,
    onChange,
    options,
    placeholder
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
    placeholder: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const selectedLabel = options.find((opt) => opt.value === value)?.label || "";

    return (
        <div className="relative space-y-2" ref={wrapperRef}>
            <Label className="text-base font-medium text-main">{label}</Label>
            <div className="relative group">
                <div
                    className={cn(
                        "flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-2 text-sm text-main placeholder:text-secondary/60 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary hover:bg-muted/50",
                        !value && "text-secondary/60",
                        // Ensure it has a minimum height but can grow if needed, or stick to h-10 for consistency
                        "min-h-[2.5rem] h-auto"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className="flex-1 text-left mr-2 break-words">{selectedLabel || placeholder}</span>
                    <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform flex-shrink-0", isOpen && "rotate-180")} />
                </div>

                {/* Dropdown Options */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-card/95 backdrop-blur-md rounded-2xl border border-border/50 shadow-xl max-h-[300px] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                        <div className="py-2">
                            {options.map((option) => (
                                <div
                                    key={option.value}
                                    className={cn(
                                        "px-4 py-2.5 text-sm cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors flex items-center justify-between group/item",
                                        value === option.value && "bg-primary/5 text-primary font-medium"
                                    )}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                >
                                    <span>{option.label}</span>
                                    {value === option.value && (
                                        <Check className="h-4 w-4 text-primary" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function DietPreferencesPage() {
    const [formData, setFormData] = useState({
        medicalHistory: [] as string[],
        previousDiet: "",
        previousDietRating: "",
        age: "",
        height: "",
        weight: "",
        gender: "",
        dietaryPreference: "",
        activityLevel: "",
        primaryGoal: "",
        cuisines: [] as string[],

        // Flavor & Macros (1-5 Scale)
        spiceLevel: 3,
        sweetness: 3,
        proteinLevel: 3,
        carbsLevel: 3,
        fatsLevel: 3,

        alcohol: "",
        eatingPreferences: "",
        allergies: [] as string[],
        wakeUpTime: "",
        sleepTime: "",
        mealsPerDay: "",
        mealTimes: {
            breakfast: "",
            lunch: "",
            dinner: ""
        }
    });

    const [inputStates, setInputStates] = useState({
        allergies: "",
        medicalHistory: "",
        cuisines: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleMealTimeChange = (meal: "breakfast" | "lunch" | "dinner", value: string) => {
        setFormData(prev => ({
            ...prev,
            mealTimes: {
                ...prev.mealTimes,
                [meal]: value
            }
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: "allergies" | "medicalHistory" | "cuisines") => {
        const { value } = e.target;
        setInputStates((prev) => ({ ...prev, [field]: value }));
    };

    const addItem = (field: "allergies" | "medicalHistory" | "cuisines", item: string) => {
        const formattedItem = item.trim();
        // @ts-ignore
        if (formattedItem && !formData[field].includes(formattedItem)) {
            setFormData((prev) => ({
                ...prev,
                // @ts-ignore
                [field]: [...prev[field], formattedItem],
            }));
            setInputStates((prev) => ({ ...prev, [field]: "" }));
        }
    };

    const removeItem = (field: "allergies" | "medicalHistory" | "cuisines", item: string) => {
        setFormData((prev) => ({
            ...prev,
            // @ts-ignore
            [field]: prev[field].filter((i) => i !== item),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Diet Preferences Submitted:", formData);
        alert("Preferences saved! Check console for data.");
    };

    return (
        <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-main">Customize Your Diet Plan</h1>
                    <p className="mt-2 text-secondary">
                        Tell us about yourself so we can generate the perfect meal plan for you.
                    </p>
                </div>

                <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-sm border border-border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Details Section */}
                        <div>
                            <h2 className="text-xl font-semibold text-main mb-4">Personal Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="age">Age</Label>
                                    <Input
                                        id="age"
                                        name="age"
                                        type="number"
                                        placeholder="e.g. 30"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <CustomSelect
                                        label="Gender"
                                        placeholder="Select Gender"
                                        value={formData.gender}
                                        onChange={(val) => handleSelectChange("gender", val)}
                                        options={genderOptions}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="height">Height (cm)</Label>
                                    <Input
                                        id="height"
                                        name="height"
                                        type="number"
                                        step="0.01"
                                        placeholder="e.g. 175"
                                        value={formData.height}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input
                                        id="weight"
                                        name="weight"
                                        type="number"
                                        step="0.1"
                                        placeholder="e.g. 70"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Health & Medical Section */}
                        <div className="pt-4 border-t border-border">
                            <h2 className="text-xl font-semibold text-main mb-4">Health & Medical History</h2>
                            <div className="space-y-4">
                                {/* Allergies Input */}
                                <div>
                                    <AutocompleteInput
                                        label="Allergies"
                                        placeholder="Search or type an allergy..."
                                        value={inputStates.allergies}
                                        onChange={(e) => handleInputChange(e, "allergies")}
                                        onSelect={(item) => addItem("allergies", item)}
                                        groups={allergyGroups}
                                        selectedItems={formData.allergies}
                                    />
                                    {formData.allergies.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {formData.allergies.map((allergy, index) => (
                                                <Badge key={index} variant="secondary" className="px-3 py-1 text-sm flex items-center gap-1 hover:bg-secondary/20 transition-colors">
                                                    {allergy}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem("allergies", allergy)}
                                                        className="ml-1 text-muted-foreground hover:text-danger focus:outline-none transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Medical History Input */}
                                <div>
                                    <AutocompleteInput
                                        label="Medical History"
                                        placeholder="Search or type a condition..."
                                        value={inputStates.medicalHistory}
                                        onChange={(e) => handleInputChange(e, "medicalHistory")}
                                        onSelect={(item) => addItem("medicalHistory", item)}
                                        groups={medicalHistoryGroups}
                                        selectedItems={formData.medicalHistory}
                                    />
                                    {formData.medicalHistory.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {formData.medicalHistory.map((condition, index) => (
                                                <Badge key={index} variant="secondary" className="px-3 py-1 text-sm flex items-center gap-1 hover:bg-secondary/20 transition-colors">
                                                    {condition}
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem("medicalHistory", condition)}
                                                        className="ml-1 text-muted-foreground hover:text-danger focus:outline-none transition-colors"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </button>
                                                </Badge>
                                            ))}
                                        </div>
                                    )}
                                </div>


                            </div>
                        </div>

                        {/* Daily Schedule Section */}
                        <div className="pt-4 border-t border-border">
                            <h2 className="text-xl font-semibold text-main mb-4">Daily Schedule</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <Label htmlFor="wakeUpTime">Wake-up Time</Label>
                                    <Input
                                        id="wakeUpTime"
                                        name="wakeUpTime"
                                        type="time"
                                        value={formData.wakeUpTime}
                                        onChange={handleChange}
                                        required
                                        className="block"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sleepTime">Sleep Time</Label>
                                    <Input
                                        id="sleepTime"
                                        name="sleepTime"
                                        type="time"
                                        value={formData.sleepTime}
                                        onChange={handleChange}
                                        required
                                        className="block"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <CustomSelect
                                    label="Number of Meals per Day"
                                    placeholder="Select Number of Meals"
                                    value={formData.mealsPerDay}
                                    onChange={(val) => handleSelectChange("mealsPerDay", val)}
                                    options={mealsPerDayOptions}
                                />
                            </div>

                            <div className="space-y-4">
                                <Label className="text-base font-medium text-main">Preferred Meal Times</Label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="breakfastTime" className="text-xs text-muted-foreground uppercase tracking-wider">Breakfast</Label>
                                        <Input
                                            id="breakfastTime"
                                            type="time"
                                            value={formData.mealTimes.breakfast}
                                            onChange={(e) => handleMealTimeChange("breakfast", e.target.value)}
                                            className="block"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lunchTime" className="text-xs text-muted-foreground uppercase tracking-wider">Lunch</Label>
                                        <Input
                                            id="lunchTime"
                                            type="time"
                                            value={formData.mealTimes.lunch}
                                            onChange={(e) => handleMealTimeChange("lunch", e.target.value)}
                                            className="block"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dinnerTime" className="text-xs text-muted-foreground uppercase tracking-wider">Dinner</Label>
                                        <Input
                                            id="dinnerTime"
                                            type="time"
                                            value={formData.mealTimes.dinner}
                                            onChange={(e) => handleMealTimeChange("dinner", e.target.value)}
                                            className="block"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lifestyle & Refined Preferences Section */}
                        <div className="pt-4 border-t border-border">
                            <h2 className="text-xl font-semibold text-main mb-4">Lifestyle & Refined Preferences</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <CustomSelect
                                        label="Dietary Preference"
                                        placeholder="Select Preference"
                                        value={formData.dietaryPreference}
                                        onChange={(val) => handleSelectChange("dietaryPreference", val)}
                                        options={dietaryPreferenceOptions}
                                    />
                                </div>
                                <div>
                                    <CustomSelect
                                        label="Activity Level"
                                        placeholder="Select Activity Level"
                                        value={formData.activityLevel}
                                        onChange={(val) => handleSelectChange("activityLevel", val)}
                                        options={activityLevelOptions}
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <CustomSelect
                                    label="Primary Goal"
                                    placeholder="Select Goal"
                                    value={formData.primaryGoal}
                                    onChange={(val) => handleSelectChange("primaryGoal", val)}
                                    options={goalOptions}
                                />
                            </div>

                            {/* Alcohol Consumption */}
                            <div className="mb-4">
                                <CustomSelect
                                    label="Alcohol Consumption"
                                    placeholder="Select Frequency"
                                    value={formData.alcohol}
                                    onChange={(val) => handleSelectChange("alcohol", val)}
                                    options={alcoholOptions}
                                />
                            </div>

                            {/* Previous Diet Rating */}
                            <div className="mb-4 space-y-2">
                                <CustomSelect
                                    label="Previous Diet Experience Rating"
                                    placeholder="Rate your experience"
                                    value={formData.previousDietRating}
                                    onChange={(val) => handleSelectChange("previousDietRating", val)}
                                    options={dietRatingOptions}
                                />
                                <Label htmlFor="previousDiet" className="sr-only">Details</Label>
                                <Textarea
                                    id="previousDiet"
                                    name="previousDiet"
                                    placeholder="Optional details: What worked? What didn't?"
                                    value={formData.previousDiet}
                                    onChange={handleChange}
                                    className="min-h-[80px]"
                                />
                            </div>

                            {/* Cuisines - Multi-select Autocomplete */}
                            <div className="mb-6">
                                <AutocompleteInput
                                    label="Preferred Types / Cuisines"
                                    placeholder="Select cuisines (e.g., Italian, Mexican)..."
                                    value={inputStates.cuisines}
                                    onChange={(e) => handleInputChange(e, "cuisines")}
                                    onSelect={(item) => addItem("cuisines", item)}
                                    groups={cuisineOptions}
                                    selectedItems={formData.cuisines}
                                />
                                {formData.cuisines.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {formData.cuisines.map((item, index) => (
                                            <Badge key={index} variant="secondary" className="px-3 py-1 text-sm flex items-center gap-1 hover:bg-secondary/20 transition-colors">
                                                {item}
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem("cuisines", item)}
                                                    className="ml-1 text-muted-foreground hover:text-danger focus:outline-none transition-colors"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Flavor & Macro Preferences (Sliders) */}
                            <div className="pt-4 border-t border-border">
                                <h2 className="text-xl font-semibold text-main mb-6">Flavor & Macronutrient Preferences</h2>
                                <p className="text-sm text-secondary mb-6">Adjust the sliders to match your taste and nutritional goals (1 = Low, 5 = High).</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                    {/* Spice Level */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-base">Spice Level</Label>
                                            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                                {formData.spiceLevel}/5
                                            </span>
                                        </div>
                                        <Slider
                                            defaultValue={[3]}
                                            max={5}
                                            min={1}
                                            step={1}
                                            value={[formData.spiceLevel]}
                                            onValueChange={(vals) => setFormData(prev => ({ ...prev, spiceLevel: vals[0] }))}
                                            className="py-2"
                                        />
                                        <div className="flex justify-between text-xs text-muted-foreground px-1 font-medium">
                                            <span>Mild</span>
                                            <span>Medium</span>
                                            <span>Hot</span>
                                        </div>
                                    </div>

                                    {/* Sweetness */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-base">Sweetness</Label>
                                            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                                {formData.sweetness}/5
                                            </span>
                                        </div>
                                        <Slider
                                            defaultValue={[3]}
                                            max={5}
                                            min={1}
                                            step={1}
                                            value={[formData.sweetness]}
                                            onValueChange={(vals) => setFormData(prev => ({ ...prev, sweetness: vals[0] }))}
                                            className="py-2"
                                        />
                                        <div className="flex justify-between text-xs text-muted-foreground px-1 font-medium">
                                            <span>Savory</span>
                                            <span>Balanced</span>
                                            <span>Sweet</span>
                                        </div>
                                    </div>

                                    {/* Protein */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-base">Protein</Label>
                                            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                                {formData.proteinLevel}/5
                                            </span>
                                        </div>
                                        <Slider
                                            defaultValue={[3]}
                                            max={5}
                                            min={1}
                                            step={1}
                                            value={[formData.proteinLevel]}
                                            onValueChange={(vals) => setFormData(prev => ({ ...prev, proteinLevel: vals[0] }))}
                                            className="py-2"
                                        />
                                        <div className="flex justify-between text-xs text-muted-foreground px-1 font-medium">
                                            <span>Low</span>
                                            <span>Moderate</span>
                                            <span>High</span>
                                        </div>
                                    </div>

                                    {/* Carbs */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-base">Carbohydrates</Label>
                                            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                                {formData.carbsLevel}/5
                                            </span>
                                        </div>
                                        <Slider
                                            defaultValue={[3]}
                                            max={5}
                                            min={1}
                                            step={1}
                                            value={[formData.carbsLevel]}
                                            onValueChange={(vals) => setFormData(prev => ({ ...prev, carbsLevel: vals[0] }))}
                                            className="py-2"
                                        />
                                        <div className="flex justify-between text-xs text-muted-foreground px-1 font-medium">
                                            <span>Low</span>
                                            <span>Moderate</span>
                                            <span>High</span>
                                        </div>
                                    </div>

                                    {/* Fats */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <Label className="text-base">Fats</Label>
                                            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                                                {formData.fatsLevel}/5
                                            </span>
                                        </div>
                                        <Slider
                                            defaultValue={[3]}
                                            max={5}
                                            min={1}
                                            step={1}
                                            value={[formData.fatsLevel]}
                                            onValueChange={(vals) => setFormData(prev => ({ ...prev, fatsLevel: vals[0] }))}
                                            className="py-2"
                                        />
                                        <div className="flex justify-between text-xs text-muted-foreground px-1 font-medium">
                                            <span>Low</span>
                                            <span>Moderate</span>
                                            <span>High</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="pt-6">
                            <Button type="submit" size="lg" className="w-full text-base font-semibold">
                                Generate Diet Plan
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
