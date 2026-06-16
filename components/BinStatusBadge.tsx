import { cn } from "@/lib/utils";
import { type BinStatus } from "@/lib/api/bins";

const statusStyles: Record<BinStatus, string> = {
  NORMAL: "bg-emerald-100 text-emerald-700",
  ALMOST_FULL: "bg-orange-100 text-orange-700",
  FULL: "bg-red-100 text-red-700",
  FIRE: "bg-red-100 text-red-700",
  OFFLINE: "bg-slate-100 text-slate-700",
};

const statusLabels: Record<BinStatus, string> = {
  NORMAL: "Normal",
  ALMOST_FULL: "Presque plein",
  FULL: "Plein",
  FIRE: "Incendie",
  OFFLINE: "Hors ligne",
};

export function BinStatusBadge({
  status,
  className,
}: {
  status: BinStatus;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold",
        statusStyles[status] ?? statusStyles.OFFLINE,
        className
      )}
    >
      {statusLabels[status]}
    </span>
  );
}
