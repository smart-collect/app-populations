import { cn } from "@/lib/utils";
import { type BinStatus } from "@/lib/api/bins";
import { Trash2, Flame, WifiOff } from "lucide-react";

const statusStyles: Record<BinStatus, { bg: string; text: string; iconBg: string; animation?: string }> = {
  NORMAL: {
    bg: "bg-primary-50",
    text: "text-primary-600",
    iconBg: "bg-primary-200",
    animation: "animate-pulse-green",
  },
  ALMOST_FULL: {
    bg: "bg-orange-50",
    text: "text-orange-600",
    iconBg: "bg-orange-200",
  },
  FULL: {
    bg: "bg-red-50",
    text: "text-red-600",
    iconBg: "bg-red-200",
  },
  FIRE: {
    bg: "bg-red-600",
    text: "text-white",
    iconBg: "bg-red-500",
    animation: "animate-blink",
  },
  OFFLINE: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    iconBg: "bg-gray-200",
  },
};

const statusLabels: Record<BinStatus, string> = {
  NORMAL: "Normal",
  ALMOST_FULL: "Presque plein",
  FULL: "Plein",
  FIRE: "Urgence",
  OFFLINE: "Hors ligne",
};

export function BinStatusBadge({
  status,
  className,
  showIcon = true,
}: {
  status: BinStatus;
  className?: string;
  showIcon?: boolean;
}) {
  const style = statusStyles[status] ?? statusStyles.OFFLINE;

  const renderIcon = () => {
    if (!showIcon) return null;

    const iconWrapper = cn(
      "w-6 h-6 rounded-lg flex items-center justify-center",
      style.iconBg,
      style.animation
    );

    switch (status) {
      case "NORMAL":
        return (
          <div className={iconWrapper}>
            <Trash2 className="w-4 h-4" style={{ color: "#0F6E56" }} />
          </div>
        );
      case "ALMOST_FULL":
        return (
          <div className={iconWrapper}>
            <Trash2 className="w-4 h-4" style={{ color: "#E65100" }} />
          </div>
        );
      case "FULL":
        return (
          <div className={iconWrapper}>
            <Trash2 className="w-4 h-4" style={{ color: "#A32D2D" }} />
          </div>
        );
      case "FIRE":
        return (
          <div className={cn(iconWrapper, style.animation)}>
            <Flame className="w-4 h-4 text-white" />
          </div>
        );
      case "OFFLINE":
        return (
          <div className={cn(iconWrapper, "opacity-50")}>
            <WifiOff className="w-4 h-4" style={{ color: "#707070" }} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold",
        style.bg,
        style.text,
        className
      )}
      aria-label={`Statut du bac: ${statusLabels[status]}`}
    >
      {renderIcon()}
      {statusLabels[status]}
    </span>
  );
}
