import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/connectDB";
import User, { IUser } from "@/model/user.model";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await currentUser();
        const email = user?.emailAddresses[0]?.emailAddress;

        const data = await req.json();
        await connectDB();

        // Map frontend data to the schema structure
        // Note: Page.tsx formData has fields like proteinLevel, carbsLevel, etc.
        // We need to map them to flavorPreferences and macroPreferences in the schema.

        const updateData: Partial<IUser> = {
            clerkId: userId,
            email: email || "",
            age: Number(data.age),
            gender: data.gender,
            height: Number(data.height),
            weight: Number(data.weight),
            activityLevel: data.activityLevel,
            primaryGoal: data.primaryGoal,
            medicalHistory: data.medicalHistory,
            allergies: data.allergies,
            dietaryPreference: data.dietaryPreference,
            previousDiet: data.previousDiet,
            previousDietRating: data.previousDietRating,
            alcohol: data.alcohol,
            cuisines: data.cuisines,
            flavorPreferences: {
                spiceLevel: Number(data.spiceLevel) || 3,
                sweetness: Number(data.sweetness) || 3,
            },
            macroPreferences: {
                protein: Number(data.proteinLevel) || 3,
                carbs: Number(data.carbsLevel) || 3,
                fats: Number(data.fatsLevel) || 3,
            },
            wakeUpTime: data.wakeUpTime,
            sleepTime: data.sleepTime,
            mealsPerDay: data.mealsPerDay,
            mealTimes: data.mealTimes,
        };

        // Use findOneAndUpdate with upsert to create or update the user preferences
        const updatedUser = await User.findOneAndUpdate(
            { clerkId: userId },
            { $set: updateData },
            { new: true, upsert: true }
        );

        return NextResponse.json({
            message: "Preferences saved successfully",
            user: updatedUser
        }, { status: 200 });

    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({
            message: "Failed to save preferences",
            error: error.message
        }, { status: 500 });
    }
}
