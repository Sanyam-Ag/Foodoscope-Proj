export const allergyGroups = [
    {
        category: "Nuts & Seeds",
        items: ["Peanut", "Almond", "Cashew", "Walnut", "Pistachio", "Hazelnut", "Pecan", "Macadamia", "Pine Nut", "Sesame", "Sunflower Seeds", "Poppy Seeds"],
    },
    {
        category: "Dairy & Animal Products",
        items: ["Milk", "Lactose", "Casein", "Whey", "Egg White", "Egg Yolk", "Red Meat (Alpha-gal)", "Chicken", "Gelatin"],
    },
    {
        category: "Seafood",
        items: ["Fish (General)", "Tuna", "Salmon", "Cod", "Crab", "Lobster", "Shrimp", "Prawns", "Mussels", "Clams", "Oysters", "Scallops", "Squid/Calamari"],
    },
    {
        category: "Grains & Legumes",
        items: ["Gluten", "Wheat", "Barley", "Rye", "Oats", "Corn", "Soy", "Lentils", "Chickpeas", "Peas", "Beans (Kidney, Black, etc.)", "Lupin"],
    },
    {
        category: "Fruits & Vegetables",
        items: ["Strawberry", "Kiwi", "Banana", "Mango", "Avocado", "Tomato", "Potato", "Eggplant", "Peppers", "Garlic", "Onion", "Mushroom", "Citrus Fruits", "Peach", "Apple"],
    },
    {
        category: "Additives & Others",
        items: ["Sulfites", "MSG (Monosodium Glutamate)", "Food Coloring (Red 40, Yellow 5, etc.)", "Artificial Sweeteners (Aspartame, etc.)", "Nitrates/Nitrites", "Benzoates", "Yeast", "Honey", "Chocolate/Cocoa", "Mustard", "Caffeine"],
    },
];

export const medicalHistoryGroups = [
    {
        category: "Metabolic & Endocrine",
        items: ["Diabetes Type 1", "Diabetes Type 2", "Prediabetes", "Insulin Resistance", "Hypothyroidism", "Hyperthyroidism", "Hashimoto's", "PCOS (Polycystic Ovary Syndrome)", "Metabolic Syndrome", "Obesity", "Gout"],
    },
    {
        category: "Cardiovascular",
        items: ["Hypertension (High Blood Pressure)", "High Cholesterol", "Coronary Artery Disease", "Arrhythmia", "Heart Failure", "History of Stroke", "Peripheral Artery Disease", "Deep Vein Thrombosis"],
    },
    {
        category: "Digestive & Gut Health",
        items: ["IBS (Irritable Bowel Syndrome)", "IBD (Crohn's, Ulcerative Colitis)", "GERD (Acid Reflux)", "Celiac Disease", "Gastritis", "Fatty Liver Disease", "Gallstones", "Pancreatitis", "Lactose Intolerance", "Diverticulitis"],
    },
    {
        category: "Nutritional Deficiencies",
        items: ["Iron Deficiency Anemia", "Vitamin D Deficiency", "Vitamin B12 Deficiency", "Magnesium Deficiency", "Calcium Deficiency"],
    },
    {
        category: "Kidney & Urinary",
        items: ["Chronic Kidney Disease", "Kidney Stones", "History of UTI", "Proteinuria"],
    },
    {
        category: "Respiratory & Immune",
        items: ["Asthma", "COPD", "Sleep Apnea", "Seasonal Allergies", "Rheumatoid Arthritis", "Lupus", "Psoriasis", "Eczema"],
    },
    {
        category: "Mental Health & Neurological",
        items: ["Anxiety", "Depression", "ADHD", "Migraines", "Binge Eating Disorder", "Anorexia History", "Bulimia History", "Stress/Burnout", "Insomnia"],
    },
    {
        category: "Hormonal & Reproductive",
        items: ["Menopause", "Perimenopause", "Endometriosis", "Infertility", "Gestational Diabetes History"],
    },
];

export const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-say", label: "Prefer not to say" }
];

export const dietaryPreferenceOptions = [
    { value: "vegan", label: "Vegan" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "non-vegetarian", label: "Non-Vegetarian" },
    { value: "pescatarian", label: "Pescatarian" },
    { value: "keto", label: "Keto" },
    { value: "paleo", label: "Paleo" },
    { value: "gluten-free", label: "Gluten-Free" },
    { value: "no-preference", label: "No Preference" }
];

export const activityLevelOptions = [
    { value: "sedentary", label: "Sedentary (little or no exercise)" },
    { value: "lightly-active", label: "Lightly Active (light exercise/sports 1-3 days/week)" },
    { value: "moderately-active", label: "Moderately Active (moderate exercise/sports 3-5 days/week)" },
    { value: "very-active", label: "Very Active (hard exercise/sports 6-7 days/week)" },
    { value: "extra-active", label: "Extra Active (very hard exercise & physical job)" }
];

export const goalOptions = [
    { value: "weight-loss", label: "Weight Loss" },
    { value: "muscle-gain", label: "Muscle Gain" },
    { value: "maintenance", label: "Maintenance" },
    { value: "improved-health", label: "Improved Health" }
];

export const mealsPerDayOptions = [
    { value: "3", label: "3 Meals (Breakfast, Lunch, Dinner)" },
    { value: "4", label: "4 Meals (includes 1 Snack)" },
    { value: "5", label: "5 Meals (includes 2 Snacks)" },
    { value: "6+", label: "6+ Meals (Frequent Small Meals)" }
];

export const alcoholOptions = [
    { value: "none", label: "None" },
    { value: "socially", label: "Socially (Occasional)" },
    { value: "moderate", label: "Moderate (1-2 drinks/week)" },
    { value: "frequent", label: "Frequent (3+ drinks/week)" }
];

export const dietRatingOptions = [
    { value: "worst", label: "Worst (Did not work at all)" },
    { value: "bad", label: "Bad (Difficult to stick to)" },
    { value: "neutral", label: "Neutral (Okay but no major results)" },
    { value: "good", label: "Good (Saw some results)" },
    { value: "very-good", label: "Very Good (Loved it & effective)" }
];

export const cuisineOptions = [
    { category: "Asian", items: ["Chinese", "Japanese", "Thai", "Indian", "Korean", "Vietnamese"] },
    { category: "European", items: ["Italian", "French", "Greek", "Spanish", "German"] },
    { category: "American", items: ["American", "Mexican/Tex-Mex", "Cajun", "Soul Food"] },
    { category: "Middle Eastern & African", items: ["Lebanese", "Turkish", "Moroccan", "Ethiopian"] }
];




