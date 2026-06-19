"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ReportPhoto from "@/components/ReportDetail/ReportPhoto";
import ReportTimeline from "@/components/ReportDetail/ReportTimeline";
import ReportMap from "@/components/ReportDetail/ReportMap";
import { useReportDetail } from "@/hooks/useReportDetail";
import { BinoMascot } from "@/components/BinoMascot";
import { ChevronLeft, MoreVertical } from "lucide-react";

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params?.id as string | undefined;
  const { data: report, isLoading, isError } = useReportDetail(reportId ?? null);

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-slate-50/50 animate-pulse">
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <div className="w-8 h-8 rounded-full bg-slate-200" />
          <div className="h-5 w-24 bg-slate-200 rounded-lg" />
          <div className="w-8 h-8 rounded-full bg-slate-200" />
        </div>
        <div className="flex-1 p-5 space-y-4">
          <div className="h-44 bg-slate-200 rounded-2xl" />
          <div className="h-6 w-3/4 bg-slate-200 rounded-full" />
          <div className="h-24 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="flex flex-col h-full bg-slate-50/50">
        <div className="bg-white border-b px-4 py-3 flex items-center justify-between">
          <button onClick={() => router.back()} className="p-1 rounded-full hover:bg-slate-100">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-sm font-bold text-slate-800">Détail</h2>
          <div className="w-5" />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <BinoMascot pose="surprised" size={80} className="drop-shadow-sm mb-3" />
          <p className="text-sm font-semibold text-slate-700">Impossible de charger le signalement.</p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => router.back()}>
            Retour
          </Button>
        </div>
      </div>
    );
  }

  const mapUrl = `/map?focus=${report.lat},${report.lng}`;

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "ASSIGNED":
        return "bg-amber-50 text-amber-700 border-amber-100"; // badge-almost
      case "COLLECTED":
        return "bg-emerald-50 text-emerald-700 border-emerald-100"; // badge-normal
      case "REJECTED":
        return "bg-slate-100 text-slate-600 border-slate-200"; // badge-offline
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "NEW":
        return "Nouveau";
      case "ASSIGNED":
        return "En cours";
      case "COLLECTED":
        return "Résolu";
      case "REJECTED":
        return "Décliné";
      default:
        return status;
    }
  };

  const showCancelButton = report.status === "NEW" || report.status === "ASSIGNED";

  return (
    <div className="flex flex-col h-full bg-slate-50/50">
      {/* White Topbar - based on mockup 8 */}
      <div className="bg-white border-b px-4 py-3 flex items-center justify-between flex-shrink-0 shadow-sm">
        <button
          onClick={() => router.back()}
          className="p-1 rounded-full text-slate-700 hover:bg-slate-100 hover:text-primary transition-all"
          aria-label="Retour"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-sm font-bold text-slate-800">Détail</h2>
        <button className="p-1 rounded-full text-slate-700 hover:bg-slate-100 transition-all">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5 pb-20">
        {/* Photo and description block */}
        <div className="bg-white border border-slate-100/80 rounded-2xl overflow-hidden shadow-sm">
          <ReportPhoto photoUrl={report.photoUrl} alt={report.description ?? "Photo du signalement"} />
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">
                  {report.description || "Signalement de bac"}
                </h3>
                <p className="text-[11px] text-slate-400 font-semibold mt-1">
                  {report.locationName || "Douala"} · Signalé le {new Date(report.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}
                </p>
              </div>
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${getStatusBadgeClass(report.status)}`}>
                {getStatusLabel(report.status)}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {report.description || "Aucune description supplémentaire."}
            </p>
          </div>
        </div>

        {/* Mascot status message */}
        {report.status === "COLLECTED" && (
          <div className="bg-emerald-50/80 border border-emerald-100/50 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <BinoMascot pose="waving" size={52} className="drop-shadow-sm flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-800">Bac nettoyé ! 💚</p>
              <p className="text-[10px] text-emerald-700/90 leading-normal mt-0.5 font-medium">
                Grâce à votre signalement, les agents Hysacam ont pu intervenir rapidement. Merci d&apos;avoir rendu votre quartier plus propre !
              </p>
            </div>
          </div>
        )}

        {report.status === "ASSIGNED" && (
          <div className="bg-amber-50/80 border border-amber-100/50 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <BinoMascot pose="standing" size={52} className="drop-shadow-sm flex-shrink-0 animate-pulse" />
            <div>
              <p className="text-xs font-bold text-amber-800">En cours de traitement</p>
              <p className="text-[10px] text-amber-700/90 leading-normal mt-0.5 font-medium">
                Hysacam a été notifié de l&apos;état du bac et a planifié son passage de collecte. C&apos;est en route !
              </p>
            </div>
          </div>
        )}

        {report.status === "NEW" && (
          <div className="bg-blue-50/80 border border-blue-100/50 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <BinoMascot pose="standing" size={52} className="drop-shadow-sm flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-blue-800">Signalement reçu</p>
              <p className="text-[10px] text-blue-700/90 leading-normal mt-0.5 font-medium">
                Votre signalement a bien été enregistré. Il sera bientôt assigné à un camion de collecte Hysacam.
              </p>
            </div>
          </div>
        )}

        {report.status === "REJECTED" && (
          <div className="bg-red-50/80 border border-red-100/50 rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
            <BinoMascot pose="surprised" size={52} className="drop-shadow-sm flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-red-800">Signalement décliné</p>
              <p className="text-[10px] text-red-700/90 leading-normal mt-0.5 font-medium">
                Le signalement n&apos;a pas pu être validé. Raison : {report.rejectedReason || "Non conforme aux critères."}
              </p>
            </div>
          </div>
        )}

        {/* Timeline Tracking */}
        <div className="bg-white border border-slate-100/80 rounded-2xl p-4 shadow-sm">
          <ReportTimeline
            status={report.status}
            createdAt={report.createdAt}
            assignedAt={report.assignedAt}
            collectedAt={report.collectedAt}
            rejectedReason={report.rejectedReason}
          />
        </div>

        {/* Map Location Preview */}
        <div className="bg-white border border-slate-100/80 rounded-2xl p-4 shadow-sm space-y-2.5">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">
              Localisation
            </h3>
            <Link href={mapUrl} className="text-xs font-bold text-primary hover:underline">
              Voir sur la carte →
            </Link>
          </div>
          <div className="h-44 rounded-xl overflow-hidden border border-slate-100">
            <ReportMap lat={report.lat} lng={report.lng} />
          </div>
        </div>

        {/* Actions button */}
        {showCancelButton && (
          <Button
            variant="outline"
            className="w-full h-12 border-red-200 text-danger hover:bg-danger/5 hover:text-danger rounded-xl font-bold transition-all"
            onClick={() => {
              if (confirm("Voulez-vous vraiment annuler ce signalement ?")) {
                alert("Annulation demandée (fonctionnalité de l'API en cours)");
              }
            }}
          >
            Annuler le signalement
          </Button>
        )}
      </div>
    </div>
  );
}
