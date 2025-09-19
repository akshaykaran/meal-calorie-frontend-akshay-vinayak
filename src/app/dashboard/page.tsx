"use client";

import { useState } from "react";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MealForm } from "@/components/MealForm";
import { useAuthStore } from "@/stores/authStore";
import { useMealStore } from "@/stores/mealStore";
import { getCalories } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function DashboardPage() {
  const logout = useAuthStore((state) => state.logout);
  const token = useAuthStore((state) => state.user?.token);
  const router = useRouter();

  const { setMeal, setResult } = useMealStore();

  function handleLogout() {
    logout();
    toast("Logged out ✅");
    router.push("/login");
  }

  async function handleCheck(data: { dish: string; servings: number }) {
    if (!token) {
      toast.error("You must be logged in ❌");
      return;
    }

    try {
      setMeal(data.dish, data.servings);

      const result = await getCalories(
        { dish_name: data.dish, servings: data.servings },
        token
      );

      setResult(result);

      toast.success("Nutrition fetched ✅");
      router.push("/calories");
    } catch (err: any) {
      toast.error("Failed to fetch nutrition ❌", {
        description: err.message,
      });
    }
  }

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen items-center justify-center [background:var(--background)] relative">
        <div className="absolute top-4 right-4 cursor-pointer">
          <div className="rounded-2xl bg-card p-2 text-center drop-shadow-[0_0_2px_grey]">
            <ThemeToggle />
          </div>
        </div>

        <div
          className="absolute top-4 right-20 cursor-pointer"
          onClick={handleLogout}
        >
          <div className="rounded-2xl bg-card p-4 text-center drop-shadow-[0_0_2px_grey]">
            <LogOut size={20} className="text-red-500" />
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

            <span className="text-sm text-foreground ">
              Food Goals Made Easy.
            </span>
          </div>
        </div>

        <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C] shadow-xl mt-30 lg:mt-15 md:mt-15 sm:mt-30">
          <div
            className="rounded-2xl bg-card p-10 sm:p-10 text-center
            w-full h-auto                      /* mobile: full width, auto height */
            sm:w-[600px] sm:h-[700px]          /* small screens (≥640px) */
            md:w-[800px] md:h-[470px]          /* medium screens (≥768px) */
            lg:w-[800px] lg:h-[500px]          /* large screens (≥1024px) */
            xl:w-5xl xl:h-[500px]              /* extra large screens (≥1280px) */"
          >
            <div>
              <h2 className="text-4xl font-bold">Nutrition Counter</h2>
              <p className="text-sm text-foreground mt-2">
                Your nutrition on your finger tips.
              </p>
              <p className="mb-10 mt-2">
                Enter the details of your dish to find the nutritional results.
              </p>
            </div>
            <div className="w-full gap-15 flex flex-col md:flex-row items-center justify-center">
              <Image
                src="/assets/images/plate 2.png"
                alt="Healthy meal"
                width={280}
                height={280}
                className="rounded-full sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px]"
              />
              <div className="w-full md:w-1/2 mt-6 md:mt-0">
                <MealForm onSubmit={handleCheck} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
