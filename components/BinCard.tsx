import { BinStatusBadge } from "@/components/BinStatusBadge";
import { Button } from "@/components/ui/button";
import { type Bin } from "@/lib/api/bins";

interface BinCardProps {
  bin: Bin;
  distanceMeters: number;
  onViewDetails: (bin: Bin) => void;
}

export function BinCard({ bin, distanceMeters, onViewDetails }: BinCardProps) {
  return (
    <div className="pointer-events-auto fixed inset-x-4 bottom-4 z-50 rounded-3xl bg-white/95 p-4 shadow-2xl ring-1 ring-slate-200 backdrop-blur sm:bottom-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-base font-semibold text-slate-900">{bin.name}</div>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <BinStatusBadge status={bin.status} />
            <span>Niveau : {bin.fill_level}%</span>
            <span>{distanceMeters.toFixed(0)} m</span>
          </div>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-700">
          <span className="text-2xl">🗑️</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="text-sm text-slate-500">
          Dernière mesure :{' '}
          {new Date(bin.last_measurement_at).toLocaleString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
        <Button onClick={() => onViewDetails(bin)} size="sm">
          Voir détails
        </Button>
      </div>
    </div>
  );
}
