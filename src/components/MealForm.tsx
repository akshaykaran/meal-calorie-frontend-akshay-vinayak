"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Fuse from "fuse.js";
import { useDebounce } from "@/lib/hooks";

const DISHES = [
  "Pizza",
  "Omelette",
  "Chicken Curry",
  "Pasta Arrabbiata",
  "Burger",
  "Salad",
  "Soup",
  "Chicken Curry",
  "Grilled Chicken",
  "Chicken Biryani",
  "Fried Chicken",
  "Paneer Curry",
  "Vegetable Curry",
  "Pasta Arrabbiata",
  "Pizza Margherita",
  "Salad",
  "Soup",
  "Burger",
];

interface MealFormProps {
  onSubmit: (data: { dish: string; servings: number }) => void;
}

export function MealForm({ onSubmit }: MealFormProps) {
  const [dish, setDish] = useState("");
  const [servings, setServings] = useState(1);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const debouncedDish = useDebounce(dish, 300);

  const fuse = useMemo(
    () =>
      new Fuse(DISHES, {
        includeScore: true,
        threshold: 0.45,
        minMatchCharLength: 2,
        keys: [],
      }),
    []
  );

  useMemo(() => {
    if (debouncedDish) {
      const results = fuse.search(debouncedDish);
      setSuggestions(results.map((r) => r.item).slice(0, 5)); // top 5
    } else {
      setSuggestions([]);
    }
  }, [debouncedDish, fuse]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ dish, servings: Number(servings) });
  }

  function handleServings(e: React.ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value);

    if (value < 1) value = 1;
    if (value > 1000) value = 1000;

    setServings(value);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div>
        <Label htmlFor="dish" className="mb-2">
          Name of the dish
        </Label>
        <div className="relative">
          <div className="p-[1px] rounded-md bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C]">
            <Input
              id="dish"
              placeholder="Enter the name of the dish"
              value={dish}
              onChange={(e) => setDish(e.target.value)}
              className="rounded-md bg-white dark:bg-black w-full px-3 py-2 outline-none"
              required
              maxLength={50}
            />
          </div>
        </div>
        {suggestions.length > 0 && (
          <ul className="absolute mt-1 w-80 rounded-md border border-muted bg-card shadow-lg z-50">
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="px-4 py-2 cursor-pointer hover:bg-muted text-foreground truncate"
                onClick={() => {
                  setDish(s);
                  setSuggestions([]);
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <Label htmlFor="servings" className="mb-2">
          Servings
        </Label>
        <div className="p-[1px] rounded-md bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C]">
          <Input
            id="servings"
            type="number"
            placeholder="Enter servings in numbers"
            value={servings}
            onChange={handleServings}
            min={1}
            max={1000}
            className="rounded-md bg-white dark:bg-black w-full px-3 py-2 outline-none"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="bg-[#95DF1A] hover:bg-[#7cc815] text-black font-bold w-full mt-4 py-5"
      >
        Check Nutrition Value ⟶
      </Button>
    </form>
  );
}
