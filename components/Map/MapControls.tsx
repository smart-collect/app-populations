"use client";

import { useMemo } from "react";
import { Crosshair, SlidersHorizontal } from "lucide-react";
import { type BinStatus } from "@/lib/api/bins";
import { cn } from "@/lib/utils";

const statuses: BinStatus[] = [
  "NORMAL",
  "ALMOST_FULL",
  "FULL",
  "FIRE",
  "OFFLINE",
];

const statusLabels: Record<BinStatus, string> = {
  NORMAL: "Normal",
  ALMOST_FULL: "Presque plein",
  FULL: "Plein",
  FIRE: "Incendie",
  OFFLINE: "Hors ligne",
};

interface MapControlsProps {
  activeFilters: BinStatus[];
  onRecenter: () => void;
  onFilterChange: (filters: BinStatus[]) => void;
}

export function MapControls({
  activeFilters,
  onRecenter,
  onFilterChange,
}: MapControlsProps) {
  const selectedMap = useMemo(
    () => new Set(activeFilters),
    [activeFilters]
  );

  function toggleStatus(status: BinStatus) {
    const nextFilters = new Set(activeFilters);

    if (nextFilters.has(status)) {
      nextFilters.delete(status);
    } else {
      nextFilters.add(status);
    }

    onFilterChange(Array.from(nextFilters));
  }

  return (
    <div className="pointer-events-none absolute top-4 right-4 z-40 flex flex-col gap-2 px-2">
      <button
        type="button"
        onClick={onRecenter}
        className="pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-slate-700 shadow-lg ring-1 ring-slate-200 transition hover:bg-slate-100"
        aria-label="Me recentrer"
      >
        <Crosshair className="h-5 w-5" />
      </button>

      <details className="pointer-events-auto rounded-3xl bg-white/95 shadow-lg ring-1 ring-slate-200">
        <summary className="flex cursor-pointer items-center justify-between gap-2 px-4 py-3 text-sm font-medium text-slate-700">
          <span className="inline-flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filtrer
          </span>
          <span className="text-slate-500">{activeFilters.length || "Tous"}</span>
        </summary>
        <div className="space-y-2 border-t border-slate-200 px-4 py-3 text-sm text-slate-700">
          {statuses.map((status) => (
            <label
              key={status}
              className={cn(
                "flex items-center justify-between gap-3 rounded-2xl border px-3 py-3",
                selectedMap.has(status)
                  ? "border-primary/40 bg-primary/5"
                  : "border-slate-200 bg-white"
              )}
            >
              <span>{statusLabels[status]}</span>
              <input
                type="checkbox"
                checked={selectedMap.has(status)}
                onChange={() => toggleStatus(status)}
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
            </label>
          ))}
        </div>
      </details>
    </div>
  );
}
