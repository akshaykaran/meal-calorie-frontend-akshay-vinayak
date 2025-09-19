"use client";

import Image from "next/image";
import { AuthForm } from "@/components/AuthForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { loginUser } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  async function handleLogin(data: { email: string; password: string }) {
    try {
      const user = await loginUser(data);
      login(user);

      toast.success("Login successful 🎉", {
        description: `Welcome back!`,
      });

      router.push("/dashboard");
    } catch (err: any) {
      toast.error("Login failed ❌", {
        description: err.message || "Invalid credentials",
      });
    }
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
      <div
        className="absolute top-35 left-20 cursor-pointer"
        onClick={() => router.push("/")}
      >
        ⟵ Back
      </div>

      <AuthForm mode="login" onSubmit={handleLogin} />
    </main>
  );
}
