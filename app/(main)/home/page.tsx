"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BinoMascot } from "@/components/BinoMascot";
import { useProfile } from "@/hooks/useProfile";
import { useReports } from "@/hooks/useReports";
import { Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export default function HomePage() {
  const { profile, stats, profileLoading } = useProfile();
  const { data: reportsData, isLoading: reportsLoading } = useReports();

  const firstName = profile?.name?.split(" ")[0] ?? "Citoyen";
  const myReports = reportsData?.data || [];

  // Map status to styling and text
  const getStatusDetails = (status: string) => {
    switch (status) {
      case "NEW":
        return { text: "Nouveau", className: "bg-blue-50 text-blue-700 border-blue-100" };
      case "ASSIGNED":
        return { text: "En cours", className: "bg-amber-50 text-amber-700 border-amber-100" };
      case "COLLECTED":
        return { text: "Résolu", className: "bg-emerald-50 text-emerald-700 border-emerald-100" };
      case "REJECTED":
        return { text: "Rejeté", className: "bg-slate-100 text-slate-600 border-slate-200" };
      default:
        return { text: status, className: "bg-slate-100 text-slate-600" };
    }
  };

  // Helper to get emoji/icon based on status or type
  const getReportIcon = (desc: string = "") => {
    const d = desc.toLowerCase();
    if (d.includes("feu") || d.includes("brûle") || d.includes("fume")) return "🔥";
    if (d.includes("sauvage") || d.includes("dépôt") || d.includes("ordure")) return "🚧";
    if (d.includes("cassé") || d.includes("endommagé") || d.includes("abîmé")) return "⚠️";
    return "🗑️";
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Green Topbar with simulated safe-area top padding */}
      <div className="bg-primary px-5 pt-5 pb-4 flex items-center justify-between flex-shrink-0 shadow-md">
        <div>
          <p className="text-xs font-medium text-white/80">Bonjour 👋</p>
          <p className="text-xl font-black text-white mt-0.5 tracking-wide">
            {profileLoading ? "Chargement..." : firstName}
          </p>
        </div>
        <Link
          href="/notifications"
          className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white transition-all relative"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {/* Subtle notification dot if needed */}
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-danger animate-pulse" />
        </Link>
      </div>

      {/* Main Page Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {/* Impact card - based on maquette */}
        <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-none shadow-sm rounded-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 translate-x-2 translate-y-2 text-6xl opacity-10">🌱</div>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Votre impact ce mois
              </p>
              <p className="text-3xl font-black text-emerald-700 mt-1">
                {stats?.totalReports ?? 0} signalement{ (stats?.totalReports ?? 0) > 1 ? 's' : '' }
              </p>
            </div>
            <span className="text-4xl filter drop-shadow-sm animate-bounce duration-1000">🌱</span>
          </CardContent>
        </Card>

        {/* Neighborhood statistics - based on maquette */}
        <section className="space-y-2.5">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
            Statistiques du quartier
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <Card className="text-center shadow-sm border-slate-100 rounded-2xl hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col justify-center items-center">
                <p className="text-2xl font-black text-primary">128</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-1 leading-tight">Bacs surveillés</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-sm border-slate-100 rounded-2xl hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col justify-center items-center">
                <p className="text-2xl font-black text-warning">9</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-1 leading-tight">Presque pleins</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-sm border-slate-100 rounded-2xl hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col justify-center items-center">
                <p className="text-2xl font-black text-danger">2</p>
                <p className="text-[10px] text-slate-500 font-semibold mt-1 leading-tight">Alertes actives</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick actions - based on maquette */}
        <section className="space-y-2.5">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 gap-2.5">
            <Button asChild className="w-full h-13 font-bold text-sm shadow-sm rounded-xl transition-transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2">
              <Link href="/reports/new">
                <span>📍</span> Signaler un bac ou dépôt
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-13 font-bold text-sm border-primary text-primary hover:bg-primary/5 rounded-xl shadow-sm transition-transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 bg-white">
              <Link href="/map">
                <span>🗺️</span> Voir la carte interactive
              </Link>
            </Button>
          </div>
        </section>

        {/* Recent reports - based on maquette */}
        <section className="space-y-2.5">
          <h2 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
            Signalements récents
          </h2>

          {reportsLoading ? (
            <Card className="shadow-sm border-slate-100 rounded-2xl">
              <CardContent className="p-5 space-y-3">
                <div className="h-10 bg-slate-100 rounded-lg animate-pulse" />
                <div className="h-10 bg-slate-100 rounded-lg animate-pulse" />
              </CardContent>
            </Card>
          ) : myReports.length > 0 ? (
            <div className="space-y-2">
              {myReports.slice(0, 3).map((report: any) => {
                const statusInfo = getStatusDetails(report.status);
                const createdDate = new Date(report.createdAt);
                let dateStr = "Récemment";
                try {
                  dateStr = formatDistanceToNow(createdDate, { addSuffix: true, locale: fr });
                } catch (e) {
                  // Fallback
                }
                return (
                  <Link href={`/reports/${report.id}`} key={report.id} className="block group">
                    <Card className="shadow-sm border-slate-100 rounded-2xl hover:shadow-md hover:border-slate-200 transition-all active:scale-[0.995]">
                      <CardContent className="p-4 flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl flex-shrink-0">
                          {getReportIcon(report.description)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 text-sm truncate group-hover:text-primary transition-colors">
                            {report.description || "Signalement de bac"}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                            {report.locationName || "Douala"} · {dateStr}
                          </p>
                        </div>
                        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${statusInfo.className}`}>
                          {statusInfo.text}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
              {myReports.length > 3 && (
                <Link href="/reports" className="block text-center text-xs font-bold text-primary hover:underline mt-2">
                  Voir tous mes signalements →
                </Link>
              )}
            </div>
          ) : (
            <Card className="shadow-sm border-slate-100 rounded-2xl">
              <CardContent className="py-8">
                <div className="flex flex-col items-center text-center">
                  <BinoMascot pose="standing" size={80} className="drop-shadow-sm" />
                  <p className="text-sm font-semibold text-slate-800 mt-4">
                    Aucun signalement pour le moment.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-[280px]">
                    Vous n&apos;avez encore signalé aucun bac plein ou dépôt sauvage.
                  </p>
                  <Button asChild variant="link" className="mt-3 text-primary font-extrabold hover:text-primary-light">
                    <Link href="/reports/new">Faire ton premier signalement →</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
}
