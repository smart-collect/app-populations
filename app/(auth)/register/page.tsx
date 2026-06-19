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
import { ArrowLeft } from "lucide-react";
import { BinoMascot } from "@/components/BinoMascot";
import { ApiClientError } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth.store";

const phoneRegex = /^\+237[0-9]{9}$/;

const registerSchema = z
  .object({
    name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z.string().email("Adresse email invalide"),
    phone: z
      .string()
      .optional()
      .refine((value) => !value || /^\+237[0-9]{9}$/.test(value), {
        message: "Format attendu : +237XXXXXXXXX",
      }),
    password: z
      .string()
      .min(8, "Minimum 8 caractères")
      .regex(/[A-Z]/, "Au moins une majuscule")
      .regex(/[0-9]/, "Au moins un chiffre")
      .regex(/[^A-Za-z0-9]/, "Au moins un caractère spécial"),
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const registerUser = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: RegisterFormValues) {
    setGlobalError(null);
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone || undefined,
      });
      router.replace("/home");
    } catch (error) {
      if (error instanceof ApiClientError) {
        setGlobalError(error.message);
      } else {
        setGlobalError("Impossible de créer le compte. Réessaie plus tard.");
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      {/* Topbar with back button */}
      <div className="px-5 py-3 flex items-center justify-between flex-shrink-0 bg-background border-b shadow-sm">
        <button onClick={() => router.back()} className="text-slate-700 hover:text-primary transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-md font-bold text-slate-800">Créer un compte</h2>
        <div className="w-5"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="flex flex-col items-center text-center mb-6">
          <BinoMascot pose="waving" size={80} className="drop-shadow-sm mb-3" />
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[320px]">
            Rejoignez Smart-Collect pour signaler les bacs et suivre la collecte dans votre quartier.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormError message={globalError} />

          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-semibold text-text-secondary">Nom complet</Label>
            <Input
              id="name"
              autoComplete="name"
              placeholder="Ex. Maeva Nguemo"
              className={cn("h-12", errors.name && "border-destructive")}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

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
            <Label htmlFor="phone" className="text-xs font-semibold text-text-secondary">Numéro de téléphone (optionnel)</Label>
            <Input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+237 6XX XX XX XX"
              className={cn("h-12", errors.phone && "border-destructive")}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-xs font-semibold text-text-secondary">Mot de passe</Label>
            <PasswordInput
              id="password"
              autoComplete="new-password"
              placeholder="8 caractères minimum, 1 majuscule, 1 chiffre, 1 spécial"
              className={errors.password ? "border-destructive" : undefined}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="h-12 w-full font-bold mt-2" disabled={isLoading}>
            {isLoading ? "Création..." : "Créer mon compte"}
          </Button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-4">
          Déjà inscrit ?{" "}
          <Link
            href="/login"
            className="font-bold text-primary"
          >
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
