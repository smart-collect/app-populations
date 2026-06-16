"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import StatsCard from "@/components/Profile/StatsCard";
import LogoutButton from "@/components/Profile/LogoutButton";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, profileLoading, stats } = useProfile();

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="h-28 rounded-3xl bg-slate-200 animate-pulse" />
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="h-28 rounded-3xl bg-slate-200 animate-pulse" />
            <div className="h-28 rounded-3xl bg-slate-200 animate-pulse" />
            <div className="h-28 rounded-3xl bg-slate-200 animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="h-14 rounded-3xl bg-slate-200 animate-pulse" />
            <div className="h-14 rounded-3xl bg-slate-200 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <p className="text-sm text-slate-500">Mon profil</p>
          <h1 className="text-2xl font-semibold text-slate-900">
            Bonjour {profile?.name?.split(" ")[0] ?? "Utilisateur"}
          </h1>
        </div>

        <ProfileHeader user={profile ?? null} />

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 text-lg font-semibold text-slate-900">Statistiques personnelles</div>
          <StatsCard
            total={stats?.totalReports ?? 0}
            collected={stats?.collectedReports ?? 0}
            successRate={stats?.successRate ?? 0}
          />
        </div>

        <div className="grid gap-3">
          <Button className="w-full" onClick={() => router.push("/profile/edit")}>Modifier mon profil</Button>
          <Button variant="outline" className="w-full" onClick={() => router.push("/notifications")}>Mes notifications</Button>
        </div>

        <div className="pt-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
