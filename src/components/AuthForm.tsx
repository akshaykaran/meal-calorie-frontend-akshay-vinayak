"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => void;
}

export function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit({ firstName, lastName, email, password });
  }

  return (
    <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C] shadow-xl">
      <div
        className="rounded-2xl bg-card p-8 sm:p-8 text-center
        w-full h-auto                      /* mobile: full width, auto height */
        sm:w-[600px] sm:h-[500px]          /* small screens (≥640px) */
        md:w-[600px] md:h-[500px]          /* medium screens (≥768px) */
        lg:w-[600px] lg:h-[500px]          /* large screens (≥1024px) */
        xl:w-2xl xl:h-[500px]              /* extra large screens (≥1280px) */
        "
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full max-w-md mx-auto p-8 rounded-2xl bg-card"
        >
          <h2 className="text-3xl font-bold text-center">
            {mode === "register" ? "Create Account" : "Good to see you!"}
          </h2>
          <p className="text-center text-sm text-foreground mb-6">
            {mode === "register"
              ? "Let’s Start your health log!"
              : "Sign in to continue your progress."}
          </p>

          {mode === "register" && (
            <div className="flex flex-col sm:flex-row md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="firstName" className="mb-2">
                  First Name
                </Label>
                <div className="p-[1px] rounded-md bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C]">
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="rounded-md bg-white dark:bg-black w-full px-3 py-2 outline-none"
                    required
                  />
                </div>
              </div>
              <div className="flex-1">
                <Label htmlFor="lastName" className="mb-2">
                  Last Name
                </Label>
                <div className="p-[1px] rounded-md bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C]">
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="rounded-md bg-white dark:bg-black w-full px-3 py-2 outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <div className="p-[1px] rounded-md bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C]">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md bg-white dark:bg-black w-full px-3 py-2 outline-none"
                required
              />
            </div>
          </div>

          <div className="relative">
            <Label htmlFor="password" className="mb-2">
              Password
            </Label>
            <div className="p-[1px] rounded-md bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C]">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md bg-white dark:bg-black w-full px-3 py-2 outline-none"
                required
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[32px] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            type="submit"
            className="bg-[#95DF1A] hover:bg-[#7cc815] text-black font-semibold w-full cursor-pointer mt-4"
          >
            {mode === "register" ? "Create Account" : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
