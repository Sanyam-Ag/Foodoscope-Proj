import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMacroPreferences {
    protein: number;
    carbs: number;
    fats: number;
}

export interface IFlavorPreferences {
    spiceLevel: number;
    sweetness: number;
}

export interface IMealTimes {
    breakfast: string;
    lunch: string;
    dinner: string;
}

export interface IUser extends Document {
    clerkId: string; // Clerk unique user ID
    email: string;   // Optional but good to sync

    // Personal Details
    age: number;
    gender: string;
    height: number;
    weight: number;
    activityLevel: string;
    primaryGoal: string;

    // Health & Diet
    medicalHistory: string[];
    allergies: string[];
    dietaryPreference: string;

    // History & Habits
    previousDiet: string;
    previousDietRating: string;
    alcohol: string;

    // Preferences
    cuisines: string[];
    flavorPreferences: IFlavorPreferences;
    macroPreferences: IMacroPreferences;

    // Schedule
    wakeUpTime: string;
    sleepTime: string;
    mealsPerDay: string;
    mealTimes: IMealTimes;

    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
    {
        clerkId: { type: String, required: true, unique: true },
        email: { type: String },

        age: { type: Number, required: true },
        gender: {
            type: String,
            required: true,
            enum: ["male", "female", "other", "prefer-not-to-say"]
        },
        height: { type: Number, required: true },
        weight: { type: Number, required: true },
        activityLevel: {
            type: String,
            required: true,
            enum: [
                "sedentary",
                "lightly-active",
                "moderately-active",
                "very-active",
                "extra-active"
            ]
        },
        primaryGoal: {
            type: String,
            required: true,
            enum: [
                "weight-loss",
                "muscle-gain",
                "maintenance",
                "improved-health"
            ]
        },

        medicalHistory: { type: [String], required: true, default: [] },
        allergies: { type: [String], required: true, default: [] },
        dietaryPreference: {
            type: String,
            required: true,
            enum: [
                "vegan",
                "vegetarian",
                "non-vegetarian",
                "pescatarian",
                "keto",
                "paleo",
                "gluten-free",
                "no-preference"
            ]
        },

        previousDiet: { type: String, required: true, default: "" },
        previousDietRating: {
            type: String,
            required: true,
            default: "",
            enum: ["worst", "bad", "neutral", "good", "very-good"]
        },
        alcohol: {
            type: String,
            required: true,
            default: "none",
            enum: ["none", "socially", "moderate", "frequent"]
        },

        cuisines: { type: [String], required: true, default: [] },

        flavorPreferences: {
            spiceLevel: { type: Number, required: true, min: 1, max: 5, default: 3 },
            sweetness: { type: Number, required: true, min: 1, max: 5, default: 3 },
        },

        macroPreferences: {
            protein: { type: Number, required: true, min: 1, max: 5, default: 3 },
            carbs: { type: Number, required: true, min: 1, max: 5, default: 3 },
            fats: { type: Number, required: true, min: 1, max: 5, default: 3 },
        },

        wakeUpTime: { type: String, required: true },
        sleepTime: { type: String, required: true },
        mealsPerDay: {
            type: String,
            required: true,
            enum: ["3", "4", "5", "6+"]
        },
        mealTimes: {
            breakfast: { type: String, required: true, default: "" },
            lunch: { type: String, required: true, default: "" },
            dinner: { type: String, required: true, default: "" },
        },
    },
    {
        timestamps: true,
    }
);

const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
