"use client";

import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MealForm } from "@/components/MealForm";

export default function DashboardPage() {
  function handleMealSubmit(data: { dish: string; servings: number }) {
    console.log("Meal input:", data);
    // TODO: Connect to /lib/api.ts for nutrition values
  }

  return (
    <main className="flex min-h-screen items-center justify-center [background:var(--background)] relative">
      <div className="absolute top-4 right-4 cursor-pointer">
        <div className="rounded-2xl bg-card p-2 text-center drop-shadow-[0_0_2px_grey]">
          <ThemeToggle />
        </div>
      </div>

      <div className="absolute top-5 left-10 rounded-2xl flex flex-center gap-4 bg-card p-4 px-8">
        <Image
          src="/assets/images/apple.png"
          alt="NutriCount logo"
          width={50}
          height={50}
        />
        <div>
          <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold ">
            <span className="bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C] bg-clip-text text-transparent">
              NutriCount
            </span>
          </h1>

          <span className="text-sm text-foreground">Food Goals Made Easy.</span>
        </div>
      </div>

      <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C] shadow-xl">
        <div
          className="rounded-2xl bg-card p-10 sm:p-10 text-center
            w-full h-auto                      /* mobile: full width, auto height */
            sm:w-[600px] sm:h-[450px]          /* small screens (≥640px) */
            md:w-[800px] md:h-[470px]          /* medium screens (≥768px) */
            lg:w-[800px] lg:h-[500px]          /* large screens (≥1024px) */
            xl:w-5xl xl:h-[500px]              /* extra large screens (≥1280px) */"
        >
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/food.png"
              alt="Healthy meal"
              width={280}
              height={280}
              className="rounded-full"
            />
          </div>

          {/* Right form */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold">Nutrition Count</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Your nutrition on your finger tips.
            </p>
            <MealForm onSubmit={handleMealSubmit} />
          </div>
        </div>
      </div>
    </main>
  );
}
