"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const profileSchema = z.object({
  name: z.string().min(2, "Le nom est requis."),
  phone: z.string().min(10, "Le téléphone est requis.").optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfileForm({
  defaultValues,
  onSubmit,
  loading,
}: {
  defaultValues: { name: string; email: string; phone?: string | null };
  onSubmit: (values: ProfileFormValues) => Promise<void>;
  loading: boolean;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: defaultValues.name,
      phone: defaultValues.phone ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="name">Nom</Label>
        <Input id="name" {...register("name")} />
        {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name.message}</p> : null}
      </div>

      <div>
        <Label>Email</Label>
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-base text-slate-700">
          {defaultValues.email}
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Téléphone</Label>
        <Input id="phone" {...register("phone")} />
        {errors.phone ? <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p> : null}
      </div>

      <div className="space-y-3">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </div>
    </form>
  );
}
