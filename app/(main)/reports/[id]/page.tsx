"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ReportPhoto from "@/components/ReportDetail/ReportPhoto";
import ReportTimeline from "@/components/ReportDetail/ReportTimeline";
import ReportMap from "@/components/ReportDetail/ReportMap";
import { useReportDetail } from "@/hooks/useReportDetail";

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params?.id as string | undefined;
  const { data: report, isLoading, isError } = useReportDetail(reportId ?? null);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="h-6 w-32 rounded-full bg-slate-200 animate-pulse" />
        <div className="mt-4 space-y-4">
          <div className="h-72 rounded-3xl bg-slate-200 animate-pulse" />
          <div className="h-6 w-3/4 rounded-full bg-slate-200 animate-pulse" />
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-16 rounded-3xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError || !report) {
    return (
      <div className="min-h-screen bg-white p-4 text-center">
        <div className="text-slate-700">Impossible de charger le signalement.</div>
        <div className="mt-4">
          <Button variant="outline" onClick={() => router.back()}>
            Retour
          </Button>
        </div>
      </div>
    );
  }

  const mapUrl = `/map?focus=${report.lat},${report.lng}`;

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-full border border-slate-200 bg-white px-3 py-2 text-slate-800"
        >
          ← Retour
        </button>
        <h1 className="text-xl font-semibold">Détail du signalement</h1>
      </div>

      <div className="mt-4 space-y-6">
        <ReportPhoto photoUrl={report.photoUrl} alt={report.description ?? "Photo du signalement"} />

        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="text-sm text-slate-500">{report.description ?? "Aucune description fournie."}</p>
            </div>
            <Link href={mapUrl} className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white">
              Voir sur la carte
            </Link>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">Localisation</h2>
          <ReportMap lat={report.lat} lng={report.lng} />
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">Suivi</h2>
          <ReportTimeline
            status={report.status}
            createdAt={report.createdAt}
            assignedAt={report.assignedAt}
            collectedAt={report.collectedAt}
            rejectedReason={report.rejectedReason}
          />
        </section>

        {report.status === "REJECTED" && report.rejectedReason ? (
          <section className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <div className="font-semibold">Raison du rejet</div>
            <p className="mt-2">{report.rejectedReason}</p>
          </section>
        ) : null}
      </div>
    </div>
  );
}
