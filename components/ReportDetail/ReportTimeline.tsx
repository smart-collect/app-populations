import React from "react";
import { CheckCircle2, Clock, Calendar, CheckCircle } from "lucide-react";

export default function ReportTimeline({
  status,
  createdAt,
  assignedAt,
  collectedAt,
  rejectedReason,
}: {
  status: string;
  createdAt?: string | null;
  assignedAt?: string | null;
  collectedAt?: string | null;
  rejectedReason?: string | null;
}) {
  const isRejected = status === "REJECTED";
  const isAssigned = status === "ASSIGNED" || status === "COLLECTED";
  const isCollected = status === "COLLECTED";

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return null;
    try {
      return new Date(dateStr).toLocaleString("fr-FR", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateStr;
    }
  };

  const steps = [
    {
      label: "Signalement envoyé",
      date: formatDate(createdAt),
      active: true,
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
    {
      label: isRejected ? "Signalement rejeté" : "Pris en charge par Hysacam",
      date: isRejected ? "Rejeté" : formatDate(assignedAt) || "En attente",
      active: isAssigned || isRejected,
      icon: isRejected ? <span className="text-xs">✕</span> : <Clock className="h-4 w-4" />,
      description: isRejected ? rejectedReason ?? "Le signalement ne respecte pas les critères." : undefined,
    },
    {
      label: "Collecte planifiée",
      date: isCollected || isAssigned ? (isCollected ? formatDate(assignedAt) : "Planifiée") : "En attente",
      active: isAssigned || isCollected,
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      label: "Résolu",
      date: formatDate(collectedAt) || "—",
      active: isCollected,
      icon: <CheckCircle className="h-4 w-4" />,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">
        Suivi du signalement
      </h3>
      <div className="relative pl-6 space-y-6">
        {/* Line divider */}
        <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-100" />

        {steps.map((step, index) => {
          const isActive = step.active;
          return (
            <div key={index} className="relative flex gap-4 items-start">
              {/* Dot icon */}
              <div
                className={`absolute -left-[22px] w-5 h-5 rounded-full flex items-center justify-center border-2 bg-white transition-colors z-10 ${
                  isActive
                    ? isRejected && index === 1
                      ? "border-danger text-danger"
                      : "border-primary text-primary"
                    : "border-slate-200 text-slate-300"
                }`}
              >
                {isActive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                )}
              </div>

              {/* Step info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <p className={`text-xs font-bold ${isActive ? "text-slate-800" : "text-slate-400"}`}>
                    {step.label}
                  </p>
                  <span className="text-[10px] font-semibold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded">
                    {step.date}
                  </span>
                </div>
                {step.description && (
                  <p className="mt-1 text-xs text-danger font-medium leading-relaxed">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
