import React from "react";
import { CheckCircle2, Clock3, XCircle, Truck } from "lucide-react";

interface TimelineItem {
  label: string;
  date?: string | null;
  active: boolean;
  icon: React.ReactNode;
  description?: string;
}

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
  const isAssigned = status === "ASSIGNED" || status === "COLLECTED";
  const isCollected = status === "COLLECTED";
  const isRejected = status === "REJECTED";

  const events: TimelineItem[] = [
    {
      label: "Créé",
      date: createdAt,
      active: true,
      icon: <CheckCircle2 className="h-4 w-4" />,
    },
    {
      label: isRejected ? "Rejeté" : "Pris en charge",
      date: isRejected ? undefined : assignedAt,
      active: isAssigned || isRejected,
      icon: isRejected ? <XCircle className="h-4 w-4" /> : <Truck className="h-4 w-4" />,
      description: isRejected ? rejectedReason ?? "Raison inconnue" : undefined,
    },
    ...(isCollected
      ? [
          {
            label: "Collecté",
            date: collectedAt,
            active: true,
            icon: <CheckCircle2 className="h-4 w-4" />,
          },
        ]
      : []),
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-3 text-sm font-semibold">Timeline</div>
      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.label} className="flex gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${event.active ? "bg-slate-900 text-white" : "bg-slate-200 text-slate-400"}`}>
                {event.icon}
              </div>
              {index < events.length - 1 ? (
                <span className="absolute top-8 left-1/2 h-full w-0.5 -translate-x-1/2 bg-slate-300"></span>
              ) : null}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-slate-900">{event.label}</p>
                <span className="text-xs text-slate-500">{event.date ? new Date(event.date).toLocaleString("fr-FR", { dateStyle: "short", timeStyle: "short" }) : "—"}</span>
              </div>
              {event.description ? <p className="mt-1 text-sm text-red-600">{event.description}</p> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
