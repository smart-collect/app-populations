"use client";

import { CheckCircle2, Info, ShieldCheck, XCircle, AlertTriangle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { NotificationItem } from "@/lib/api/notifications";

const typeMap: Record<NotificationItem["type"], { icon: React.ReactNode; className: string }> = {
  REPORT_ASSIGNED: { icon: <CheckCircle2 className="h-5 w-5 text-blue-600" />, className: "border-blue-100 bg-blue-50" },
  REPORT_COLLECTED: { icon: <ShieldCheck className="h-5 w-5 text-emerald-600" />, className: "border-emerald-100 bg-emerald-50" },
  REPORT_REJECTED: { icon: <XCircle className="h-5 w-5 text-red-600" />, className: "border-red-100 bg-red-50" },
  BIN_FULL_NEARBY: { icon: <AlertTriangle className="h-5 w-5 text-orange-600" />, className: "border-orange-100 bg-orange-50" },
  INFO: { icon: <Info className="h-5 w-5 text-blue-600" />, className: "border-blue-100 bg-blue-50" },
};

export default function NotificationCard({
  notification,
  onClick,
}: {
  notification: NotificationItem;
  onClick: () => void;
}) {
  const typeMeta = typeMap[notification.type];
  const target = notification.relatedId ? `/reports/${notification.relatedId}` : "/notifications";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-3xl border p-4 text-left transition hover:bg-slate-50 ${notification.read ? "bg-slate-50 border-slate-200" : "bg-white border-slate-200 shadow-sm"}`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-1 flex h-10 w-10 items-center justify-center rounded-3xl ${typeMeta.className}`}>
          {typeMeta.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="text-sm font-semibold text-slate-900">{notification.title}</div>
            {!notification.read ? <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" /> : null}
          </div>
          <p className="mt-2 text-sm text-slate-600">{notification.message}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true, locale: fr })}</span>
            {notification.relatedId ? <span className="rounded-full bg-slate-100 px-2 py-0.5">Voir</span> : null}
          </div>
        </div>
      </div>
    </button>
  );
}
