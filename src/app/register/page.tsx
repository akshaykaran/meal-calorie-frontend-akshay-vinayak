"use client";

import Image from "next/image";
import { AuthForm } from "@/components/AuthForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { registerUser } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  async function handleRegister(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    try {
      const user = await registerUser(data);
      login(user);
      toast.success(`Welcome ${user.firstName}! 🎉`, {
        description: "Your account has been created successfully.",
      });
      router.push("/login");
    } catch (err: any) {
      toast.error("Registration failed ❌", {
        description: err.message || "Something went wrong",
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

      <div className="absolute top-5 left-10 rounded-2xl flex items-center gap-4 bg-card p-4 px-6 sm:p-4">
        <Image
          src="/assets/images/apple.png"
          alt="NutriCount logo"
          width={50}
          height={50}
          className="hidden sm:block"
        />
        <div className="block sm:hidden">
          <div className="rounded-2xl  p-2 text-center drop-shadow-[0_0_2px_grey]">
            <Image
              src="/assets/images/apple.png"
              alt="NutriCount logo"
              width={32}
              height={32}
            />
          </div>
        </div>

        <div className="hidden sm:block">
          <div>
            <h1 className="text-2xl sm:text-2xl md:text-3xl font-bold ">
              <span className="bg-gradient-to-r from-[#95DF1A] to-[#FF9F1C] bg-clip-text text-transparent">
                NutriCount
              </span>
            </h1>

            <span className="text-sm text-foreground">
              Food Goals Made Easy.
            </span>
          </div>
        </div>
      </div>
      <div
        className="absolute top-35 left-20 cursor-pointer"
        onClick={() => router.push("/")}
      >
        ⟵ Back
      </div>

      <AuthForm mode="register" onSubmit={handleRegister} />
    </main>
  );
}
