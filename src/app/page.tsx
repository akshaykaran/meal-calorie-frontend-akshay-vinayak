"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center [background:var(--background)] relative">
      <div className="absolute top-4 right-4 cursor-pointer">
        <div className="rounded-2xl bg-card p-2 text-center drop-shadow-[0_0_2px_grey]">
          <ThemeToggle />
        </div>
      </div>

      <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C] shadow-xl">
        <div
          className="rounded-2xl bg-card p-10 sm:p-10 text-center
        w-full h-auto                      /* mobile: full width, auto height */
        sm:w-[600px] sm:h-[450px]          /* small screens (≥640px) */
        md:w-[800px] md:h-[470px]          /* medium screens (≥768px) */
        lg:w-[800px] lg:h-[500px]          /* large screens (≥1024px) */
        xl:w-5xl xl:h-[500px]              /* extra large screens (≥1280px) */
        "
        >
          <Image
            src="/assets/images/apple.png"
            alt="NutriCount logo"
            width={120}
            height={120}
            className="mx-auto mb-4"
          />

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold ">
            <span className="bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C] bg-clip-text text-transparent">
              NutriCount
            </span>
          </h1>

          <p className="text-lg mt-2">Food Goals Made Easy.</p>
          <p className="mt-4 text-md text-foreground">
            Nutrition count on your finger tips. <br />
            Accuracy you can rely on. Evidence-based, USDA powered.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button className="bg-[#95DF1A] hover:bg-[#7cc815] text-black font-semibold px-10 py-5 sm:px-8 sm:py-4 md:px-10 md:py-5 cursor-pointer">
                Get Started ⟶
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="border-[#FF9F1C] text-black dark:text-white hover:bg-[#FF9F1C]/10 px-17 py-5 sm:px-8 sm:py-4 md:px-10 md:py-5 cursor-pointer"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
