import { create } from "zustand";

interface NutritionResult {
  total_calories: number;
  calories_per_serving: number;
  servings: number;
  dailyIntake: string;
  dish_name: string;
}

interface MealState {
  dish_name: string;
  servings: number;
  result: NutritionResult | null;
  setMeal: (dish: string, servings: number) => void;
  setResult: (result: NutritionResult) => void;
  clearMeal: () => void;
}

export const useMealStore = create<MealState>((set) => ({
  dish_name: "",
  servings: 0,
  result: null,
  setMeal: (dish_name, servings) => set({ dish_name, servings }),
  setResult: (result) => set({ result }),
  clearMeal: () => set({ dish_name: "", servings: 0, result: null }),
}));
