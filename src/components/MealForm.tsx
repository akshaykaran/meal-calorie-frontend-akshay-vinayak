"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface MealFormProps {
  onSubmit: (data: { dish: string; servings: number }) => void;
}

export function MealForm({ onSubmit }: MealFormProps) {
  const [dish, setDish] = useState("");
  const [servings, setServings] = useState(1);

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
