"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, ChevronRight, HelpCircle, Mail, LogOut } from "lucide-react";
import { useProfile } from "@/hooks/useProfile";
import { useAuthStore } from "@/stores/auth.store";

export default function ProfilePage() {
  const router = useRouter();
  const { profile, profileLoading, stats } = useProfile();
  const logout = useAuthStore((state) => state.logout);

  if (profileLoading) {
    return (
      <div className="flex flex-col h-full bg-bg-page">
        <div className="bg-primary px-5 py-3 flex items-center justify-between flex-shrink-0">
          <h2 className="text-lg font-bold text-white">Mon profil</h2>
          <button className="w-8 h-8 rounded-full bg-white/18 flex items-center justify-center text-white">
            <Settings size={16} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          <div className="h-20 rounded-lg bg-slate-200 animate-pulse" />
          <div className="grid grid-cols-3 gap-2.5">
            <div className="h-20 rounded-lg bg-slate-200 animate-pulse" />
            <div className="h-20 rounded-lg bg-slate-200 animate-pulse" />
            <div className="h-20 rounded-lg bg-slate-200 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-14 rounded-lg bg-slate-200 animate-pulse" />
            <div className="h-14 rounded-lg bg-slate-200 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const firstName = profile?.name?.split(" ")[0] ?? "";
  const lastName = profile?.name?.split(" ").slice(1).join(" ") ?? "";
  const initials = (firstName[0] + (lastName[0] || "")).toUpperCase();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full bg-bg-page">
      {/* Green Topbar */}
      <div className="bg-primary px-5 pt-5 pb-4 flex items-center justify-between flex-shrink-0 shadow-md text-white">
        <h2 className="text-lg font-bold tracking-wide">Mon profil</h2>
        <button className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white transition-all">
          <Settings size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {/* Avatar section */}
        <div className="flex flex-col items-center py-4">
          <div className="w-18 h-18 rounded-full bg-green-50 text-primary flex items-center justify-center font-bold text-2xl mb-3" style={{ width: 72, height: 72 }}>
            {initials}
          </div>
          <div className="font-bold text-lg">{profile?.name ?? "Utilisateur"}</div>
          <div className="text-xs text-text-secondary">
            {profile?.phone ?? "Douala"} · membre depuis mai 2026
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-3 gap-2.5">
          <Card className="text-center shadow-sm">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-primary">{stats?.totalReports ?? 0}</div>
              <div className="text-xs text-text-secondary">Signalements</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-primary">{stats?.collectedReports ?? 0}</div>
              <div className="text-xs text-text-secondary">Résolus</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-sm">
            <CardContent className="p-3">
              <div className="text-xl font-bold text-primary">🌱 {stats?.totalReports ? stats.totalReports * 4 : 0}</div>
              <div className="text-xs text-text-secondary">Points impact</div>
            </CardContent>
          </Card>
        </div>

        {/* Account section */}
        <div>
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Compte</h3>
          <div className="space-y-2">
            <Link href="/profile/edit" className="block active:scale-[0.995] transition-all">
              <Card className="shadow-sm border-slate-100 hover:border-slate-200 transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span>✏️</span>
                    <span className="text-sm font-semibold text-slate-700">Modifier mon profil</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </CardContent>
              </Card>
            </Link>
            <Link href="/notifications" className="block active:scale-[0.995] transition-all">
              <Card className="shadow-sm border-slate-100 hover:border-slate-200 transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span>🔔</span>
                    <span className="text-sm font-semibold text-slate-700">Notifications</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </CardContent>
              </Card>
            </Link>
            <div className="block active:scale-[0.995] transition-all cursor-pointer" onClick={() => alert("Fonctionnalité de confidentialité bientôt disponible.")}>
              <Card className="shadow-sm border-slate-100 hover:border-slate-200 transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span>🔒</span>
                    <span className="text-sm font-semibold text-slate-700">Confidentialité</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Help section */}
        <div>
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider mb-2">Aide</h3>
          <div className="space-y-2">
            <div className="block active:scale-[0.995] transition-all cursor-pointer" onClick={() => alert("FAQ bientôt disponible.")}>
              <Card className="shadow-sm border-slate-100 hover:border-slate-200 transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span>❓</span>
                    <span className="text-sm font-semibold text-slate-700">FAQ</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </CardContent>
              </Card>
            </div>
            <div className="block active:scale-[0.995] transition-all cursor-pointer" onClick={() => alert("Support bientôt disponible.")}>
              <Card className="shadow-sm border-slate-100 hover:border-slate-200 transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span>📩</span>
                    <span className="text-sm font-semibold text-slate-700">Contacter le support</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Logout button */}
        <Button
          variant="ghost"
          className="w-full text-danger font-semibold"
          onClick={handleLogout}
        >
          Se déconnecter
        </Button>
      </div>
    </div>
  );
}
