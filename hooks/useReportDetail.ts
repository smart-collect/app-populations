"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchReportDetail } from "@/lib/api/reports";

export function useReportDetail(id: string | null) {
  return useQuery([
    "report-detail",
    id,
  ],
  async () => {
    if (!id) throw new Error("Report id is required");
    return fetchReportDetail(id);
  },
  {
    enabled: Boolean(id),
    refetchInterval: 30000,
    staleTime: 30000,
  });
}
