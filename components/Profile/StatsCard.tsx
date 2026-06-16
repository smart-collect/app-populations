import React from "react";

export default function StatsCard({
  total,
  collected,
  successRate,
}: {
  total: number;
  collected: number;
  successRate: number;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm">
        <p className="text-sm text-slate-500">Total</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{total}</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm">
        <p className="text-sm text-slate-500">Collectés</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{collected}</p>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm">
        <p className="text-sm text-slate-500">% de succès</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{successRate.toFixed(0)}%</p>
      </div>
    </div>
  );
}
