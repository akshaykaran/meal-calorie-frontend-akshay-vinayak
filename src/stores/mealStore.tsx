import { create } from "zustand";

interface NutritionResult {
  calories: number;
  servings: number;
  servingSize: number;
  dailyIntake: string;
}

interface MealState {
  dish: string;
  servings: number;
  result: NutritionResult | null;
  setMeal: (dish: string, servings: number) => void;
  setResult: (result: NutritionResult) => void;
  clearMeal: () => void;
}

export const useMealStore = create<MealState>((set) => ({
  dish: "",
  servings: 0,
  result: null,
  setMeal: (dish, servings) => set({ dish, servings }),
  setResult: (result) => set({ result }),
  clearMeal: () => set({ dish: "", servings: 0, result: null }),
}));
