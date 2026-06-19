"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormError } from "@/components/forms/FormError";
import { PasswordInput } from "@/components/forms/PasswordInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BinoMascot } from "@/components/BinoMascot";
import { ApiClientError } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";

const loginSchema = z.object({
  email: z.string().email("Adresse email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function getSafeRedirect(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return "/home";
  }

  if (value === "/login" || value === "/register") {
    return "/home";
  }

  return value;
}

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values: LoginFormValues) {
    setGlobalError(null);
    try {
      await login(values);
      const params = new URLSearchParams(window.location.search);
      router.replace(getSafeRedirect(params.get("redirect")));
    } catch (error) {
      if (error instanceof ApiClientError) {
        setGlobalError(error.message);
      } else {
        setGlobalError("Impossible de se connecter. Vérifie tes identifiants.");
      }
    }
  }

  return (
    <div className="flex flex-col justify-center min-h-screen px-5 py-8 bg-slate-50/50">
      <div className="flex flex-col items-center space-y-3 mb-6">
        <BinoMascot pose="waving" size={100} className="drop-shadow-md" />
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Bon retour !</h1>
          <p className="text-sm text-muted-foreground">
            Connectez-vous pour continuer
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormError message={globalError} />

        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-semibold text-text-secondary">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="nom@exemple.com"
            className={cn("h-12", errors.email && "border-destructive")}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-xs font-semibold text-text-secondary">Mot de passe</Label>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            className={errors.password ? "border-destructive" : undefined}
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="text-right">
          <Link href="/forgot-password" className="text-xs font-bold text-primary">
            Mot de passe oublié ?
          </Link>
        </div>

        <Button type="submit" className="h-12 w-full font-bold" disabled={isLoading}>
          {isLoading ? "Connexion..." : "Se connecter"}
        </Button>
      </form>

      <p className="text-center text-sm text-text-secondary mt-4">
        Pas encore de compte ?{" "}
        <Link
          href="/register"
          className="font-bold text-primary"
        >
          S'inscrire
        </Link>
      </p>
    </div>
  );
}
