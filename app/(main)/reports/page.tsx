"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BinoMascot } from "@/components/BinoMascot";
import { useReports } from "@/hooks/useReports";
import { Settings } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

type TabType = "all" | "pending" | "resolved";

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const { data: reportsData, isLoading, isError } = useReports();

  const reports = reportsData?.data || [];

  // Filter reports based on active tab
  const filteredReports = reports.filter((report: any) => {
    if (activeTab === "pending") {
      return report.status === "NEW" || report.status === "ASSIGNED";
    }
    if (activeTab === "resolved") {
      return report.status === "COLLECTED" || report.status === "REJECTED";
    }
    return true; // "all"
  });

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

  const getReportIcon = (desc: string = "") => {
    const d = desc.toLowerCase();
    if (d.includes("feu") || d.includes("brûle") || d.includes("fume")) return "🔥";
    if (d.includes("sauvage") || d.includes("dépôt") || d.includes("ordure")) return "🚧";
    if (d.includes("cassé") || d.includes("endommagé") || d.includes("abîmé")) return "⚠️";
    return "🗑️";
  };

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* Green Topbar */}
      <div className="bg-primary px-5 pt-5 pb-4 flex items-center justify-between flex-shrink-0 shadow-md text-white">
        <h2 className="text-lg font-bold tracking-wide">Mes signalements</h2>
        <button
          className="w-10 h-10 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 flex items-center justify-center text-white transition-all"
          title="Réglages"
        >
          <Settings size={18} />
        </button>
      </div>

      {/* Pill tabs selector - based on mockup 7 */}
      <div className="px-5 pt-4 pb-2">
        <div className="flex bg-green-50/80 backdrop-blur border border-green-100 rounded-xl p-1 shadow-sm">
          <button
            onClick={() => setActiveTab("all")}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "all" ? "bg-primary text-white shadow-sm" : "text-primary hover:bg-primary/5"
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "pending" ? "bg-primary text-white shadow-sm" : "text-primary hover:bg-primary/5"
            }`}
          >
            En cours
          </button>
          <button
            onClick={() => setActiveTab("resolved")}
            className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === "resolved" ? "bg-primary text-white shadow-sm" : "text-primary hover:bg-primary/5"
            }`}
          >
            Résolus
          </button>
        </div>
      </div>

      {/* Reports List */}
      <div className="flex-1 overflow-y-auto px-5 pb-5 pt-2">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-slate-200/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-10">
            <BinoMascot pose="surprised" size={80} className="mx-auto mb-3" />
            <p className="text-sm font-semibold text-danger">Erreur de chargement des données.</p>
          </div>
        ) : filteredReports.length > 0 ? (
          <div className="space-y-3">
            {filteredReports.map((report: any) => {
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
                  <Card className="shadow-sm border-slate-100/80 rounded-2xl hover:shadow-md hover:border-slate-200 transition-all active:scale-[0.995] bg-white">
                    <CardContent className="p-4 flex items-center gap-3.5">
                      <div className="w-13 h-13 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl flex-shrink-0">
                        {getReportIcon(report.description)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-extrabold text-slate-800 text-sm truncate group-hover:text-primary transition-colors">
                          {report.description || "Signalement de bac"}
                        </p>
                        <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                          {report.locationName || "Douala"} · {dateStr}
                        </p>
                      </div>
                      <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border flex-shrink-0 ${statusInfo.className}`}>
                        {statusInfo.text}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-14 px-4 bg-white border border-slate-100 rounded-2xl mt-2">
            <BinoMascot pose="standing" size={90} className="drop-shadow-sm" />
            <h3 className="font-bold text-slate-800 text-base mt-4">Aucun signalement</h3>
            <p className="text-xs text-slate-500 mt-1.5 max-w-[260px] leading-relaxed">
              Il n&apos;y a aucun signalement correspondant à ce filtre pour le moment.
            </p>
            <Button asChild size="sm" className="mt-4 font-bold text-xs shadow-sm h-10 rounded-lg">
              <Link href="/reports/new">📍 Nouveau signalement</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
