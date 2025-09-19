"use client";

import { ReactNode } from "react";

interface ResultCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

export function ResultCard({ icon, label, value }: ResultCardProps) {
  return (
    <div className="p-[1px] rounded-md bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C] ">
      <div className="rounded-md bg-white dark:bg-black px-3 py-2 outline-none flex items-center justify-center text-center w-full sm:w-1/2 md:w-1/4  min-w-[224px] gap-6">
        <div className="text-[#95DF1A] mb-2">{icon}</div>
        <div className="flex flex-col items-start">
          <p className="text-sm font-semibold">{label}</p>
          <p className="text-lg font-bold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
}
