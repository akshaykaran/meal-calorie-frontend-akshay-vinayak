import { create } from "zustand";

interface NutritionResult {
  total_calories: number;
  calories_per_serving: number;
  servings: number;
  dailyIntake: string;
  dish_name: string;
}

interface Meal {
  dish_name: string;
  total_calories: number;
}

interface MealState {
  dish_name: string;
  servings: number;
  result: NutritionResult | null;
  history: Meal[];
  setMeal: (dish_name: string, servings: number) => void;
  setResult: (result: NutritionResult) => void;
  clearMeal: () => void;
  addToHistory: (meal: Meal) => void;
}

export const useMealStore = create<MealState>((set) => ({
  dish_name: "",
  servings: 0,
  result: null,
  history: [],
  setMeal: (dish_name, servings) => set({ dish_name, servings }),
  setResult: (result) => set({ result }),
  clearMeal: () => set({ dish_name: "", servings: 0, result: null }),
  addToHistory: (meal) =>
    set((state) => ({
      history: [...state.history, meal],
    })),
}));
