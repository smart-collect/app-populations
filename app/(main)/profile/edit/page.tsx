"use client";

import { useRouter } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";
import ProfileForm from "@/components/Profile/ProfileForm";
import { Button } from "@/components/ui/button";

export default function EditProfilePage() {
  const router = useRouter();
  const { profile, profileLoading, updateProfile } = useProfile();

  if (profileLoading || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
        <div className="space-y-4">
          <div className="h-10 w-3/4 rounded-full bg-slate-200 animate-pulse" />
          <div className="h-72 rounded-3xl bg-slate-200 animate-pulse" />
        </div>
      </div>
    );
  }

  const handleSubmit = async (values: { name: string; phone?: string | null }) => {
    await updateProfile.mutateAsync(values);
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Modifier mon profil</p>
            <h1 className="text-2xl font-semibold text-slate-900">Mes informations</h1>
          </div>
          <Button variant="outline" onClick={() => router.back()}>
            Annuler
          </Button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <ProfileForm
            defaultValues={{ name: profile.name, email: profile.email, phone: profile.phone }}
            onSubmit={handleSubmit}
            loading={updateProfile.isLoading}
          />
        </div>
      </div>
    </div>
  );
}
