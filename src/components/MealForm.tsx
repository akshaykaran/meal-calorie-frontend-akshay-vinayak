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
  const [servings, setServings] = useState<number | "">("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (servings === "" || isNaN(Number(servings))) return;
    onSubmit({ dish, servings: Number(servings) });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full">
      <div>
        <Label htmlFor="dish">Name of the dish</Label>
        <div className="p-[1px] rounded-md bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C]">
          <Input
            id="dish"
            placeholder="Enter the name of the dish"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
            className="rounded-md bg-transparent w-full px-3 py-2 text-foreground placeholder:text-gray-400 focus:outline-none"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="servings">Servings</Label>
        <div className="p-[1px] rounded-md bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C]">
          <Input
            id="servings"
            type="number"
            placeholder="Enter servings in numbers"
            value={servings}
            onChange={(e) =>
              setServings(e.target.value ? Number(e.target.value) : "")
            }
            className="rounded-md bg-transparent w-full px-3 py-2 text-foreground placeholder:text-gray-400 focus:outline-none"
            required
          />
        </div>
      </div>

      <Button
        type="submit"
        className="bg-[#95DF1A] hover:bg-[#7cc815] text-black font-bold w-full mt-4"
      >
        Check Nutrition Value
      </Button>
    </form>
  );
}
