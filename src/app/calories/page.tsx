"use client";

import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ResultCard } from "@/components/ResultCard";
import { Flame, PieChart, Scale, Database } from "lucide-react";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut } from "lucide-react";
import { useMealStore } from "@/stores/mealStore";

export default function CaloriesPage() {
  const { dish_name, result } = useMealStore();
  console.log("result", result);

  if (!result) {
    return toast.error("Login failed ❌", {
      description: "No dish found Please search Again!",
    });
  }
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  function handleLogout() {
    logout();
    toast("Logged out ✅");
    router.push("/login");
  }

  function calculateDailyCalories(
    totalCalories: number,
    dailyRecommended: number = 2000
  ) {
    if (!totalCalories) return "N/A";

    const percentage = (totalCalories / dailyRecommended) * 100;

    return `${percentage.toFixed(2)}%`;
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

        <div
          className="absolute top-35 left-20 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          ⟵ Back
        </div>
        <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C] shadow-xl mt-30 lg:mt-15 md:mt-15 sm:mt-30">
          <div
            className="rounded-2xl bg-card p-10 sm:p-10 text-center
            w-full h-auto                      /* mobile: full width, auto height */
            sm:w-[600px] sm:h-[770px]          /* small screens (≥640px) */
            md:w-[800px] md:h-[550px]          /* medium screens (≥768px) */
            lg:w-[800px] lg:h-[550px]          /* large screens (≥1024px) */
            xl:w-5xl xl:h-[500px]              /* extra large screens (≥1280px) */"
          >
            <div>
              <h2 className="text-4xl font-bold">Nutrition Result</h2>
              <p className="text-sm text-foreground mb-10 mt-2">
                Your nutrition on your finger tips.
              </p>
            </div>

            <div className="w-full gap-15 flex flex-col md:flex-row items-center justify-center">
              <Image
                src="/assets/images/plate 4.png"
                alt="Healthy meal"
                width={280}
                height={280}
                className="rounded-full sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px]"
              />

              <div className="w-full md:w-1/2 mt-6 md:mt-0">
                <div className="flex items-center bg-[#95DF1A] text-black font-bold rounded-md px-4 py-4 mb-6">
                  <Image
                    src="/assets/images/serving.png"
                    alt="Healthy meal"
                    width={30}
                    height={30}
                  />
                  &nbsp;&nbsp;
                  <span>
                    Dish Name:&nbsp;{" "}
                    <span className="ml-2 truncate">{result.dish_name}</span>
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4">
                  <ResultCard
                    icon={<Flame size={35} />}
                    label="Total Calories"
                    value={result.total_calories}
                  />
                  <ResultCard
                    icon={<PieChart size={35} />}
                    label="Servings No."
                    value={result.servings}
                  />

                  <ResultCard
                    icon={<Scale size={35} />}
                    label="Serving Size"
                    value={result.calories_per_serving}
                  />
                  <ResultCard
                    icon={<Database size={35} />}
                    label="Daily Calories"
                    value={calculateDailyCalories(result.total_calories)}
                  />
                </div>

                <p className="text-xs text-muted-foreground">
                  Powered by USDA FoodData Central, a reliable source of
                  information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
